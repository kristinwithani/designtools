import type { AnimationParams, AnimationMode, AnimationEasing } from '../utils/animationUtils';

interface AnimationPanelProps {
  params: AnimationParams;
  onChange: (params: AnimationParams) => void;
}

const MODES: { key: AnimationMode; label: string }[] = [
  { key: 'wiggle', label: 'wiggle' },
  { key: 'float', label: 'float' },
  { key: 'pulse', label: 'pulse' },
  { key: 'spin', label: 'spin' },
];

const EASINGS: { key: AnimationEasing; label: string }[] = [
  { key: 'ease-in-out', label: 'ease' },
  { key: 'linear', label: 'linear' },
  { key: 'ease-in', label: 'ease-in' },
  { key: 'steps(6)', label: 'steps' },
];

export default function AnimationPanel({ params, onChange }: AnimationPanelProps) {
  const update = (key: keyof AnimationParams, value: number | string) => {
    onChange({ ...params, [key]: value });
  };

  return (
    <div className={`animation-panel ${params.enabled ? 'panel-open' : ''}`}>
      <div className="panel-inner">
        {/* Mode selector */}
        <div className="panel-row">
          <span className="panel-row-label">mode</span>
          <div className="toggle-group">
            {MODES.map((m) => (
              <button
                key={m.key}
                className={`toggle-btn ${params.mode === m.key ? 'toggle-active' : ''}`}
                onClick={() => update('mode', m.key)}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sliders row 1 */}
        <div className="panel-row panel-sliders">
          <div className="slider-group">
            <label className="slider-label">
              speed
              <span className="slider-value">{params.speed.toFixed(1)}s</span>
            </label>
            <input type="range" min="0.5" max="3" step="0.1" value={params.speed} onChange={(e) => update('speed', parseFloat(e.target.value))} className="slider" />
          </div>
          <div className="slider-group">
            <label className="slider-label">
              intensity
              <span className="slider-value">{params.intensity}°</span>
            </label>
            <input type="range" min="1" max="15" step="1" value={params.intensity} onChange={(e) => update('intensity', parseFloat(e.target.value))} className="slider" />
          </div>
          <div className="slider-group">
            <label className="slider-label">
              stagger
              <span className="slider-value">{params.staggerOffset}ms</span>
            </label>
            <input type="range" min="0" max="200" step="10" value={params.staggerOffset} onChange={(e) => update('staggerOffset', parseInt(e.target.value))} className="slider" />
          </div>
        </div>

        {/* Sliders row 2 */}
        <div className="panel-row panel-sliders">
          <div className="slider-group">
            <label className="slider-label">
              drift
              <span className="slider-value">{params.drift}px</span>
            </label>
            <input type="range" min="0" max="15" step="1" value={params.drift} onChange={(e) => update('drift', parseInt(e.target.value))} className="slider" />
          </div>
          <div className="slider-group">
            <label className="slider-label">
              scale
              <span className="slider-value">{(params.scale * 100).toFixed(0)}%</span>
            </label>
            <input type="range" min="0" max="0.3" step="0.02" value={params.scale} onChange={(e) => update('scale', parseFloat(e.target.value))} className="slider" />
          </div>
          <div className="slider-group">
            <label className="slider-label">
              opacity
              <span className="slider-value">{(params.opacity * 100).toFixed(0)}%</span>
            </label>
            <input type="range" min="0" max="0.5" step="0.05" value={params.opacity} onChange={(e) => update('opacity', parseFloat(e.target.value))} className="slider" />
          </div>
        </div>

        {/* Easing selector */}
        <div className="panel-row">
          <span className="panel-row-label">easing</span>
          <div className="toggle-group">
            {EASINGS.map((e) => (
              <button
                key={e.key}
                className={`toggle-btn ${params.easing === e.key ? 'toggle-active' : ''}`}
                onClick={() => update('easing', e.key)}
              >
                {e.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}