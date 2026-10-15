import { useScreenshotScroll } from '@/lib/useScreenshotScroll';

type ImacScreenProps = {
  title: string;
  href?: string;
  image: { src: string; width?: number; height?: number };
  variant: 'live' | 'curated';
};

// Two frame geometries: admin uploads use the older 16:10 crop, curated shots the 3:2 one.
const geometry = {
  live: {
    box: 'aspect-[16/10]',
    screen: 'top-[8.5%] left-[12.5%] w-[75%] h-[48%] rounded-sm bg-transparent',
    image: '',
  },
  curated: {
    box: 'aspect-[3/2]',
    screen: 'top-[10.3%] left-[13.75%] w-[73.8%] h-[54.8%] rounded-[4px] bg-white [isolation:isolate] [-webkit-mask-image:-webkit-radial-gradient(white,black)]',
    image: ' [image-rendering:-webkit-optimize-contrast]',
  },
};

const screenId = 'screen';

export function ImacScreen({ title, href, image, variant }: ImacScreenProps) {
  const shape = geometry[variant];
  const screenshotScroll = useScreenshotScroll();
  return (
    <div
      className={`relative w-full ${shape.box} overflow-hidden rounded-xl bg-transparent`}
      onMouseEnter={() => screenshotScroll.scroll(screenId, true)}
      onMouseLeave={() => screenshotScroll.scroll(screenId, false)}
    >
      <img
        src="/media/web/imac-frame.webp"
        alt=""
        width={612}
        height={408}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
      />
      <div className={`absolute ${shape.screen} overflow-hidden`}>
        <img
          ref={screenshotScroll.register(screenId)}
          src={image.src}
          alt={`Full-page screenshot of the ${title} website`}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
          onLoad={() => screenshotScroll.resumeIfHovered(screenId)}
          className={`w-full object-cover block will-change-transform${shape.image}`}
        />
      </div>
      {href && (
        <a href={href} target="_blank" rel="noopener noreferrer" className="webdev-project-overlay" aria-label={`Visit live website for ${title}`} />
      )}
    </div>
  );
}
