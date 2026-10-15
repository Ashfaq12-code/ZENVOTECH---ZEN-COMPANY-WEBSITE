import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { countries, countryFlagCodes } from './adminData';

export function CountrySelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const flagCode = countryFlagCodes[value];

  useEffect(() => {
    if (!open) return;
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (event.target instanceof Node && !pickerRef.current?.contains(event.target)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  return (
    <div className="admin-country-picker" ref={pickerRef}>
      <button
        type="button"
        className="admin-country-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {flagCode && <img src={`https://flagcdn.com/w40/${flagCode}.png`} alt="" />}
        <span>{value}</span>
        <ChevronDown size={15} />
      </button>
      {open && (
        <div className="admin-country-options" role="listbox" aria-label="Choose country">
          {countries.map((country) => {
            const optionFlag = countryFlagCodes[country];
            return (
              <button
                type="button"
                role="option"
                aria-selected={country === value}
                className="admin-country-option"
                key={country}
                onClick={() => {
                  onChange(country);
                  setOpen(false);
                }}
              >
                {optionFlag
                  ? <img src={`https://flagcdn.com/w40/${optionFlag}.png`} alt="" />
                  : <span className="admin-country-flag-placeholder" aria-hidden="true" />}
                <span>{country}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
