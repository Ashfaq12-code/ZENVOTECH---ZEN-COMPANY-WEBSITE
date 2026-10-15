import { ArrowUpRight, X } from 'lucide-react';

import { SITE } from '@/config/site';
import { logoImage, whatsappBadgeImage } from './media';

type WhatsAppWidgetProps = {
  open: boolean;
  heroVisible: boolean;
  onToggle: () => void;
  onClose: () => void;
};

export function WhatsAppWidget({ open, heroVisible, onToggle, onClose }: WhatsAppWidgetProps) {
  return (
    <div className={`home-whatsapp-widget${heroVisible ? ' is-hero-visible' : ''}`}>
      {open && (
        <section className="home-whatsapp-panel" aria-label="WhatsApp chat">
          <div className="home-whatsapp-panel-header">
            <img src={logoImage.src} width={logoImage.width} height={logoImage.height} alt={`${SITE.name} logo`} />
            <div>
              <strong>Chat with {SITE.name}</strong>
              <span>We’re here to help</span>
            </div>
            <button type="button" className="home-whatsapp-close" aria-label="Close WhatsApp chat" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
          <p>Hi! Have a project or question? Message our team on WhatsApp.</p>
          <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer">
            Continue to WhatsApp <ArrowUpRight size={16} />
          </a>
        </section>
      )}
      <button
        type="button"
        className="home-whatsapp-trigger mobile-only-trigger"
        aria-label={open ? 'Close WhatsApp chat' : 'Open WhatsApp chat'}
        aria-expanded={open}
        onClick={onToggle}
      >
        <img className="home-whatsapp-trigger-brand" src={logoImage.src} width={logoImage.width} height={logoImage.height} alt="" />
        <img className="home-whatsapp-trigger-badge" src={whatsappBadgeImage.src} width={whatsappBadgeImage.width} height={whatsappBadgeImage.height} alt="" />
      </button>
    </div>
  );
}
