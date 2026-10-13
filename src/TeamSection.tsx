import { ArrowUpRight } from 'lucide-react';

type TeamMember = {
  initials: string;
  name: string;
  role: string;
  badge?: string;
  description: string;
  skills: string[];
  image?: string;
};

const team: TeamMember[] = [
  {
    initials: 'AA',
    name: 'Ashfaq',
    role: 'DATA ANALYST',
    badge: 'LEADERSHIP',
    description: 'Visionary tech leader directing digital strategy, scalable system design, and brand execution.',
    skills: ['System Design', 'Python', 'Node js' , 'c#'],
    image: 'https://i.ibb.co/DHMbJ7Zs/IMG-1396.jpg',
  },
  {
    initials: 'AA',
    name: 'Ashfaq Ahamed',
    role: 'FULLSTACK DEVELOPER',
    badge: 'CORE ENG',
    description: 'Architecting end-to-end web platforms with high-throughput cloud backends and responsive UIs.',
    skills: ['Next js', 'Node js', 'APIs', 'TypeScript', 'Python'],
    image: 'https://i.ibb.co/hJ4wzBZ2/IMG-1397.jpg',
  },
  {
    initials: 'JR',
    name: 'Zaid',
    role: 'SENIOR FULLSTACK DEVELOPER',
    badge: 'CORE ENG',
    description: 'Engineering interactive frontend interfaces, state management, and backend microservices.',
    skills: ['Next js', 'Fullstack', 'APIs', 'TypeScript', 'Python'],
    image: 'https://i.ibb.co/FqbjQ4bt/Professional-Blue-Suit-Portrait.png',
  },
  {
    initials: 'KS',
    name: 'Firaz',
    role: 'JUNIOR DEVELOPER',
    badge: 'ENGINEERING',
    description: 'Building clean responsive components, QA automation, and seamless user interaction workflows.',
    skills: ['React', 'JavaScript', 'Python & UI', 'Git'],
    image: 'https://i.ibb.co/fYFXDghm/IMG-1398-1.jpg',
  },
];

export default function TeamSection() {
  return (
    <section className="section-pad team-section" id="team">
      <div className="section-heading compact">
        <p className="eyebrow">Good people, great work</p>
        <h2>Our Expert <span>Developers</span></h2>
      </div>
      <div className="team-grid">
        {team.map((member) => (
          <article className="person" key={member.name}>
            <div className="person-card-outer">
              <div className={`person-image${member.image ? ' person-image--photo' : ' person-image--placeholder'}`}>
                <div className="person-card-bg" />
                <div className="person-circle-wrapper">
                  <svg className="person-circle-svg" viewBox="0 0 160 160" aria-hidden="true">
                    <circle className="circle-track" cx="80" cy="80" r="70" />
                    <circle className="circle-dots-accent" cx="80" cy="80" r="70" />
                    <circle className="circle-progress" cx="80" cy="80" r="70" />
                  </svg>
                  <div className="person-avatar-circle">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="person-avatar-img" loading="lazy" />
                    ) : (
                      <div className="person-initials-slot">
                        <span className="person-initials-text">{member.initials}</span>
                        <span className="person-space-hint">Add Photo</span>
                      </div>
                    )}
                  </div>
                </div>
                {member.badge && <span className="person-badge">{member.badge}</span>}
                <div className="person-hover-card">
                  <p className="person-hover-desc">{member.description}</p>
                  <div className="person-skill-tags">
                    {member.skills.map((skill) => (
                      <span key={skill} className="skill-chip">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="person-meta">
                <div className="person-meta-content">
                  <div className="person-headline">
                    <h3>{member.name}</h3>
                    <ArrowUpRight size={17} className="person-arrow" />
                  </div>
                  <p className="person-role">{member.role}</p>
                  <p className="person-brief-desc">{member.description}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}