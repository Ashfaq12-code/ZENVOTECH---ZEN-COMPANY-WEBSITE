import { SITE } from '@/config/site';
import { TeamCard } from './home/TeamCard';
import { teamMembers } from './home/teamMembers';

export default function TeamSection() {
  return (
    <section className="section-pad team-section" id="team">
      <div className="section-heading compact">
        <p className="eyebrow">Good people, great work</p>
        <h2>The {SITE.name} team <span>in Kandy</span></h2>
      </div>
      <div className="team-grid">
        {teamMembers.map((member) => <TeamCard member={member} view="about" key={member.id} />)}
      </div>
    </section>
  );
}
