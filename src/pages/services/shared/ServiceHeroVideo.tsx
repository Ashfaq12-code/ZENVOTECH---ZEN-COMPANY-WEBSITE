import { InViewVideo, type VideoSource } from '@/components/InViewVideo';

type ServiceHeroVideoProps = {
  sources: readonly VideoSource[];
  poster: string;
  width?: number;
  height?: number;
  /** Dark fade at the bottom of the frame (app page). */
  shade?: boolean;
};

// Decorative hero loop under every service page h1.
export function ServiceHeroVideo({ sources, poster, width = 1280, height = 720, shade = false }: ServiceHeroVideoProps) {
  return (
    <div className="relative w-full max-w-[68rem] mx-auto rounded-2xl overflow-hidden border border-[#dce8ff] mb-10 group">
      {shade && <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2e]/30 via-transparent to-transparent z-10 pointer-events-none" />}
      <InViewVideo
        sources={sources}
        poster={poster}
        width={width}
        height={height}
        className="webdev-mobile-hero-image pointer-events-none w-full object-cover h-[320px] md:h-[420px]"
      />
    </div>
  );
}
