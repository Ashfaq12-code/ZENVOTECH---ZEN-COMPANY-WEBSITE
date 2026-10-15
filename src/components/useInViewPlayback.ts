import { useEffect, useState, useSyncExternalStore, type RefObject } from 'react';

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

const readReducedMotion = () => window.matchMedia(reducedMotionQuery).matches;

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribeReducedMotion, readReducedMotion, () => true);
}

type Playback = { playing: boolean; reducedMotion: boolean };

// Plays only while on screen, never under reduced motion and never after the viewer paused it.
// With preload="none", an off-screen video downloads nothing.
export function useInViewPlayback(ref: RefObject<HTMLVideoElement>, userPaused: boolean): Playback {
  const reducedMotion = usePrefersReducedMotion();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;
    const allowed = !userPaused && !reducedMotion;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    if (!allowed) video.pause();

    const observer = typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver(([entry]) => {
        if (allowed && entry?.isIntersecting) void video.play().catch(onPause);
        else video.pause();
      }, { threshold: 0.25 });
    observer?.observe(video);

    return () => {
      observer?.disconnect();
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, [ref, userPaused, reducedMotion]);

  return { playing, reducedMotion };
}
