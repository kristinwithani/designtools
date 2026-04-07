import ColorWheel from './ColorWheel';
import type { AnimationParams } from '../utils/animationUtils';
import type { ThemeMode } from '../utils/colorUtils';

interface ToolbarProps {
  hue: number;
  onHueChange: (hue: number) => void;
  onRegenerate: () => void;
  animationParams: AnimationParams;
  onAnimationChange: (params: AnimationParams) => void;
  mode: ThemeMode;
  onToggleMode: () => void;
  useTertiary: boolean;
  onToggleTertiary: () => void;
}

export default function Toolbar({
  hue,
  onHueChange,
  onRegenerate,
  animationParams,
  onAnimationChange,
  mode,
  onToggleMode,
  useTertiary,
  onToggleTertiary,
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
    <header className="toolbar">
      <h1 className="toolbar-title">Illustra</h1>
      <div className="toolbar-center">
        <ColorWheel hue={hue} onHueChange={onHueChange} size={44} />
        <button
          className={`btn btn-icon ${useTertiary ? 'btn-active' : 'btn-secondary'}`}
          onClick={onToggleTertiary}
          title={useTertiary ? 'Triad colours on' : 'Triad colours off'}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="5" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.2" fill={useTertiary ? 'currentColor' : 'none'} opacity="0.7" />
            <circle cx="11" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.2" fill={useTertiary ? 'currentColor' : 'none'} opacity="0.7" />
            <circle cx="8" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.2" fill={useTertiary ? 'currentColor' : 'none'} opacity="0.7" />
          </svg>
        </button>
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
      </div>
    </header>
  );
}