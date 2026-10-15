import { InViewVideo } from '@/components/InViewVideo';
import type { AppCard } from './appCards';

export function PhoneScreen({ app }: { app: AppCard }) {
  const hasVideo = app.videos.length > 0;
  return (
    <div className={`iphone-mockup iphone-mockup--portfolio${hasVideo ? ' iphone-mockup--video' : ''}`}>
      <div className="iphone-screen">
        <div className="dynamic-island" />
        <div className="screen-content">
          {hasVideo ? (
            <InViewVideo
              sources={app.videos}
              poster={app.poster}
              width={app.width ?? 400}
              height={app.height ?? 690}
              label={`${app.name} app preview`}
              className="project-preview-video"
            />
          ) : (
            <img src={app.poster} alt={`${app.name} app screen`} width={app.width} height={app.height} loading="lazy" decoding="async" />
          )}
        </div>
        <div className="home-indicator" />
      </div>
    </div>
  );
}
