import ColorWheel from './ColorWheel';
import AnimationPanel from './AnimationPanel';
import ExportMenu from './ExportMenu';
import type { ExportFormat } from './ExportMenu';
import type { AnimationParams } from '../utils/animationUtils';
import type { ThemeMode } from '../utils/colorUtils';

interface ToolbarProps {
  hue: number;
  onHueChange: (hue: number) => void;
  onRegenerate: () => void;
  onDownloadAll: (format: ExportFormat) => void;
  isExporting: boolean;
  animationParams: AnimationParams;
  onAnimationChange: (params: AnimationParams) => void;
  mode: ThemeMode;
  onToggleMode: () => void;
}

export default function Toolbar({
  hue,
  onHueChange,
  onRegenerate,
  onDownloadAll,
  isExporting,
  animationParams,
  onAnimationChange,
  mode,
  onToggleMode,
}: ToolbarProps) {
  const toggleAnimation = () => {
    const enabling = !animationParams.enabled;
    onAnimationChange({
      ...animationParams,
      enabled: enabling,
      drift: enabling && animationParams.drift === 0 ? 8 : animationParams.drift,
      scale: enabling && animationParams.scale === 0 ? 0.15 : animationParams.scale,
    });
  };

  return (
    <div className="toolbar-wrapper">
      <header className="toolbar">
        <h1 className="toolbar-title">Illustra</h1>
        <div className="toolbar-center">
          <ColorWheel hue={hue} onHueChange={onHueChange} size={44} />
        </div>
        <div className="toolbar-actions">
          <button
            className="btn btn-secondary btn-icon"
            onClick={onToggleMode}
            title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {mode === 'dark' ? (
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
                  <line
                    key={a}
                    x1={8 + 6 * Math.cos(a * Math.PI / 180)}
                    y1={8 + 6 * Math.sin(a * Math.PI / 180)}
                    x2={8 + 7.5 * Math.cos(a * Math.PI / 180)}
                    y2={8 + 7.5 * Math.sin(a * Math.PI / 180)}
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                  />
                ))}
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M13,10 A5.5,5.5 0 1,1 6,3 A4.5,4.5 0 0,0 13,10 Z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            )}
          </button>
          <div className="toggle-switch-wrap" onClick={toggleAnimation}>
            <span className="toggle-switch-label">animate</span>
            <div className={`toggle-switch ${animationParams.enabled ? 'toggle-switch-on' : ''}`}>
              <div className="toggle-switch-knob" />
            </div>
          </div>
          <button className="btn btn-secondary" onClick={onRegenerate}>
            regenerate
          </button>
          {isExporting ? (
            <button className="btn btn-primary" disabled>
              <span className="btn-loading">
                <span className="spinner" />
                exporting...
              </span>
            </button>
          ) : (
            <ExportMenu variant="toolbar" onExport={onDownloadAll} />
          )}
        </div>
      </header>
      <AnimationPanel params={animationParams} onChange={onAnimationChange} />
    </div>
  );
}