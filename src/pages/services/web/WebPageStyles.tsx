// Page-scoped CSS for headings and the iMac link overlay; the hover scroll lives in useScreenshotScroll.
const css = `
  @media (max-width: 640px) {
    .webdev-mobile-section-heading {
      font-size: clamp(1.75rem, 7.5vw, 2.5rem) !important;
      line-height: 1.15 !important;
    }

    .webdev-mobile-cta-heading {
      font-size: clamp(1.65rem, 7.2vw, 2.5rem) !important;
      line-height: 1.15 !important;
    }
  }

  .webdev-project-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    backdrop-filter: none;
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 0.75rem;
    z-index: 20;
    cursor: pointer;
  }

  .webdev-project-card:hover .webdev-project-overlay {
    opacity: 1;
  }
`;

export function WebPageStyles() {
  return <style>{css}</style>;
}
