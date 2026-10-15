import { useRef, useState, type CSSProperties } from 'react';
import { Pause, Play } from 'lucide-react';

import { useInViewPlayback } from './useInViewPlayback';

export type VideoSource = {
  src: string;
  type: 'video/mp4' | 'video/webm';
};

type InViewVideoProps = {
  /** One file; use `sources` for several formats. */
  src?: string;
  sources?: readonly VideoSource[];
  poster?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
  /** Omit for decorative video; it is then hidden from assistive tech. */
  label?: string;
  /** 44px pause/play button (WCAG 2.2.2). The parent must be positioned. */
  showControl?: boolean;
  controlClassName?: string;
};

const defaultControlClass = 'absolute bottom-4 right-4 z-10 grid size-11 place-items-center rounded-full bg-black/60 text-white';

// Muted, silent loop with a poster: nothing downloads until it scrolls into view.
export function InViewVideo(props: InViewVideoProps) {
  const { src, sources, poster, width, height, className, style, label, showControl = true, controlClassName = defaultControlClass } = props;
  const ref = useRef<HTMLVideoElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const { playing, reducedMotion } = useInViewPlayback(ref, userPaused);
  const name = label ?? 'video';

  return (
    <>
      <video
        ref={ref}
        src={src}
        poster={poster}
        width={width}
        height={height}
        aria-label={label}
        aria-hidden={label ? undefined : true}
        loop
        muted
        playsInline
        preload="none"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        className={className}
        style={style}
      >
        {sources?.map((source) => <source key={source.src} src={source.src} type={source.type} />)}
      </video>
      {showControl && !reducedMotion && (
        <button
          type="button"
          className={controlClassName}
          aria-label={playing ? `Pause ${name}` : `Play ${name}`}
          onClick={() => {
            setUserPaused(playing);
            if (!playing) void ref.current?.play().catch(() => undefined);
          }}
        >
          {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
        </button>
      )}
    </>
  );
}
