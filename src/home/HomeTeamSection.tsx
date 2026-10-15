import { TeamCard } from './TeamCard';
import { teamMembers } from './teamMembers';

export function HomeTeamSection() {
  return (
    <section className="section-pad team-section" id="team">
      <div className="section-heading compact">
        <p className="eyebrow">Good people, great work</p>
        <h2>Meet the <span>team.</span></h2>
      </div>
      <div className="team-grid">
        {teamMembers.map((member) => <TeamCard member={member} view="home" key={member.id} />)}
      </div>
    </section>
  );
}
