import { useState, useRef, useEffect } from 'react';

export type ExportFormat = 'png' | 'svg' | 'gif' | 'lottie';

interface ExportMenuProps {
  onExport: (format: ExportFormat) => void;
  variant?: 'card' | 'toolbar';
}

export default function ExportMenu({ onExport, variant = 'card' }: ExportMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const formats: { key: ExportFormat; label: string }[] = [
    { key: 'png', label: 'PNG' },
    { key: 'svg', label: 'SVG' },
    { key: 'gif', label: 'GIF' },
    { key: 'lottie', label: 'Lottie' },
  ];

  if (variant === 'toolbar') {
    return (
      <div className="export-menu-wrap" ref={menuRef}>
        <button
          className="btn btn-primary"
          onClick={() => setOpen(!open)}
        >
          Download All
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        {open && (
          <div className="export-dropdown export-dropdown-toolbar">
            {formats.map((f) => (
              <button
                key={f.key}
                className="export-option"
                onClick={() => { onExport(f.key); setOpen(false); }}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="export-menu-wrap card-export" ref={menuRef}>
      <button
        className="card-download-btn"
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        title="Download"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2v8m0 0L5 7m3 3l3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="export-dropdown export-dropdown-card">
          {formats.map((f) => (
            <button
              key={f.key}
              className="export-option"
              onClick={(e) => { e.stopPropagation(); onExport(f.key); setOpen(false); }}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}