import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

type ScrollTopButtonProps = {
  showAfter?: number;
  /** Hide while the footer is on screen (home page). */
  hideOverFooter?: boolean;
};

export function ScrollTopButton({ showAfter = 420, hideOverFooter = false }: ScrollTopButtonProps) {
  const visible = useScrollTopVisible(showAfter, hideOverFooter);
  if (!visible) return null;
  return (
    <button
      type="button"
      className="scroll-top-button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowUpRight size={18} />
    </button>
  );
}

function useScrollTopVisible(showAfter: number, hideOverFooter: boolean): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const footerTop = hideOverFooter ? document.querySelector('footer.footer')?.getBoundingClientRect().top : undefined;
      const inFooter = footerTop !== undefined && footerTop < window.innerHeight - 20;
      setVisible(window.scrollY > showAfter && !inFooter);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [showAfter, hideOverFooter]);

  return visible;
}
