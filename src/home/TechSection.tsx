import { techStack } from './techStack';

export function TechSection() {
  const lastIndex = techStack.length - 1;
  return (
    <section className="tech-section" id="toolkit">
      <div className="section-pad">
        <div className="section-heading tech-heading">
          <p className="eyebrow">Our toolkit</p>
          <h2>Modern technologies<br /><span>we use.</span></h2>
          <p className="section-lede">The right tools for the right job. Always thoughtfully chosen, never just for show.</p>
        </div>
        <div className="tech-grid">
          {techStack.map((tech, index) => (
            <div className="tech-card" key={tech.src}>
              <img
                src={tech.src}
                width={tech.width}
                height={tech.height}
                loading="lazy"
                decoding="async"
                alt={`${tech.name} logo`}
                className={`tech-logo${index === lastIndex ? ' tech-logo-next' : ''}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
