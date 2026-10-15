import { useState } from 'react';

import { serviceLinks } from '@/config/navigation';
import { formatAddress, SITE } from '@/config/site';
import { ContactForm } from './ContactForm';
import { trackCallClick } from './publicSupabase';

const serviceChipLabels: Record<string, string> = {
  web: 'Website Development',
  app: 'App Development',
  software: 'Software Development',
  automation: 'Automation',
};

export function ContactSection() {
  const [callTrackingError, setCallTrackingError] = useState('');
  const handlePhoneClick = (e164: string) => {
    setCallTrackingError('');
    void trackCallClick(toLocalNumber(e164)).catch(() => {
      setCallTrackingError('We could not record this call click. Please try again.');
    });
  };

  return (
    <section className="contact-section section-pad" id="contact">
      <div className="contact-copy">
        <p className="eyebrow">Have a good idea?</p>
        <h2>Get In Touch <span>With Us Today.</span></h2>
        <p>Have a project in mind or a question? Reach out to us for expert solutions and start building your next digital product.</p>
        <div className="contact-phone-list" aria-label="Call our team">
          {SITE.contactPhones.map((phone) => (
            <a key={phone.e164} href={`tel:${phone.e164}`} onClick={() => handlePhoneClick(phone.e164)}>{phone.display}</a>
          ))}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </div>
        <p>{formatAddress()}</p>
        {callTrackingError && <p className="contact-phone-error" role="alert">{callTrackingError}</p>}
        <nav className="contact-services" aria-label="Our services">
          {serviceLinks.map((link) => (
            <a className="contact-service" href={link.href} key={link.href}>{serviceChipLabels[link.page] ?? link.label}</a>
          ))}
        </nav>
      </div>
      <ContactForm />
    </section>
  );
}

// Call-click logs have always stored the local 0XXXXXXXXX form; keep it so admin stats stay comparable.
function toLocalNumber(e164: string): string {
  return `0${e164.slice(3)}`;
}
