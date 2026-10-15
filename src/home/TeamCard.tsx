import { ArrowUpRight } from 'lucide-react';

import type { TeamMember, TeamView } from './teamMembers';

type TeamCardProps = { member: TeamMember; view: TeamView };

export function TeamCard({ member, view }: TeamCardProps) {
  const profile = member[view];
  return (
    <article className="person">
      <div className="person-card-outer">
        <div className={`person-image${member.photo ? ' person-image--photo' : ' person-image--placeholder'}`}>
          <div className="person-card-bg" />
          <div className="person-circle-wrapper">
            <svg className="person-circle-svg" viewBox="0 0 160 160" aria-hidden="true">
              <circle className="circle-track" cx="80" cy="80" r="70" />
              <circle className="circle-dots-accent" cx="80" cy="80" r="70" />
              <circle className="circle-progress" cx="80" cy="80" r="70" />
            </svg>
            <TeamAvatar member={member} />
          </div>
          <span className="person-badge">{profile.badge}</span>
          <div className="person-hover-card">
            <p className="person-hover-desc">{member.description}</p>
            <div className="person-skill-tags">
              {profile.skills.map((skill) => <span key={skill} className="skill-chip">{skill}</span>)}
            </div>
          </div>
        </div>
        <div className="person-meta">
          <div className="person-meta-content">
            <div className="person-headline">
              <h3>{member.name}</h3>
              <ArrowUpRight size={17} className="person-arrow" aria-hidden="true" />
            </div>
            <p className="person-role">{profile.role}</p>
            <p className="person-brief-desc">{member.description}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

function TeamAvatar({ member }: { member: TeamMember }) {
  return (
    <div className="person-avatar-circle">
      {member.photo ? (
        <img
          src={member.photo.src}
          width={member.photo.width}
          height={member.photo.height}
          alt={member.name}
          className="person-avatar-img"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="person-initials-slot">
          <span className="person-initials-text">{member.initials}</span>
          <span className="person-space-hint">Add Photo</span>
        </div>
      )}
    </div>
  );
}
