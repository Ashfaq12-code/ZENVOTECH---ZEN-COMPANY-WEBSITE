import { useRef } from 'react';

const scrollDuration = 3500;

// Hovering a project slides its tall screenshot through the iMac screen.
export function useScreenshotScroll() {
  const images = useRef(new Map<string, HTMLImageElement>());
  const hovered = useRef(new Map<string, boolean>());
  const frames = useRef(new Map<string, number>());

  const scroll = (projectId: string, toBottom: boolean) => {
    hovered.current.set(projectId, toBottom);
    const image = images.current.get(projectId);
    const screen = image?.parentElement;
    if (!image || !screen || !image.complete || !image.naturalWidth) return;

    const existingFrame = frames.current.get(projectId);
    if (existingFrame !== undefined) window.cancelAnimationFrame(existingFrame);

    const startPosition = image.getBoundingClientRect().top - screen.getBoundingClientRect().top;
    const renderedHeight = screen.clientWidth * image.naturalHeight / image.naturalWidth;
    const endPosition = toBottom ? -Math.max(0, renderedHeight - screen.clientHeight) : 0;
    const startTime = window.performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / scrollDuration, 1);
      image.style.transform = `translateY(${startPosition + (endPosition - startPosition) * progress}px)`;
      if (progress < 1) frames.current.set(projectId, window.requestAnimationFrame(animate));
      else frames.current.delete(projectId);
    };
    frames.current.set(projectId, window.requestAnimationFrame(animate));
  };

  const register = (projectId: string) => (image: HTMLImageElement | null) => {
    if (image) images.current.set(projectId, image);
    else images.current.delete(projectId);
  };

  const resumeIfHovered = (projectId: string) => {
    if (hovered.current.get(projectId)) scroll(projectId, true);
  };

  return { scroll, register, resumeIfHovered };
}
