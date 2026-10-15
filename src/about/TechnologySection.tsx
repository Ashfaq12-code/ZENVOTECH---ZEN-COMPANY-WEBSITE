type TechLogo = { name: string; image: string; width: number; height: number };

// PI! NEED DATA: confirm license or replace dynessco.com tech logo PNGs
const dynesscoLogo = (name: string, file: string): TechLogo => ({
  name,
  image: `https://dynessco.com/wp-content/uploads/2025/06/${file}.png`,
  width: 152,
  height: 40,
});

const techStack: readonly TechLogo[] = [
  dynesscoLogo('React', 'React'),
  dynesscoLogo('Vue.js', 'Veu-JS'),
  dynesscoLogo('Node.js', 'Node'),
  dynesscoLogo('CSS', 'CSS'),
  dynesscoLogo('Spring', 'Spring'),
  dynesscoLogo('Laravel', 'Laravel'),
  dynesscoLogo('Firebase', 'Firebase'),
  { name: 'Next.js', image: '/media/about/tech-nextjs.webp', width: 320, height: 80 },
  { name: 'PHP', image: '/media/about/tech-php.webp', width: 320, height: 220 },
  { name: 'Docker', image: '/media/about/tech-docker.webp', width: 320, height: 76 },
  { name: 'Python', image: '/media/about/tech-python.webp', width: 320, height: 180 },
  { name: 'Java', image: '/media/about/tech-java.webp', width: 320, height: 200 },
  { name: 'Flutter', image: '/media/about/tech-flutter.webp', width: 320, height: 320 },
  { name: 'MySQL', image: '/media/about/tech-mysql.webp', width: 320, height: 214 },
  { name: 'TypeScript', image: '/media/about/tech-typescript.webp', width: 320, height: 362 },
];

const logoOnlyIndexes = [1, 2, 5, 8, 10, 12, 14];

export function TechnologySection() {
  return (
    <section className="tech-section who-tech-section">
      <div className="section-pad">
        <div className="section-heading tech-heading">
          <p className="eyebrow">Our toolkit</p>
          <h2>Modern technologies<br /><span>we use.</span></h2>
          <p className="section-lede">The right tools for the right job. Always thoughtfully chosen, never just for show.</p>
        </div>
        <div className="tech-grid">
          {techStack.map((tech, index) => (
            <div className={`tech-card${logoOnlyIndexes.includes(index) ? ' tech-card--logo-only' : ''}`} key={tech.image}>
              <img
                src={tech.image}
                alt={tech.name}
                width={tech.width}
                height={tech.height}
                loading="lazy"
                decoding="async"
                className={`tech-logo${index === techStack.length - 1 ? ' tech-logo-next' : ''}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
