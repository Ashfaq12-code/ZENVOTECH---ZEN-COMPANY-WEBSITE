import { InViewVideo } from '@/components/InViewVideo';
import { SITE } from '@/config/site';

const controlClass = 'absolute bottom-3 right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-[#0d1b2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1668e8]';

export function HeroVideo() {
  return (
    <div className="relative max-w-2xl md:max-w-3xl w-full mx-auto mt-0 md:mt-6 rounded-2xl overflow-hidden border border-[#dce8ff]">
      <InViewVideo
        src="/media/about/about-hero.mp4"
        poster="/media/about/about-hero-poster.webp"
        width={960}
        height={540}
        label={`${SITE.name} team video`}
        className="w-full h-64 md:h-[22rem] object-cover"
        controlClassName={controlClass}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(22,104,232,0.18), transparent 60%)' }} />
    </div>
  );
}
