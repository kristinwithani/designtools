import type { AnimationParams } from '../utils/animationUtils';

interface AnimationPanelProps {
  params: AnimationParams;
  onChange: (params: AnimationParams) => void;
}

export default function AnimationPanel({ params, onChange }: AnimationPanelProps) {
  const update = (key: keyof AnimationParams, value: number) => {
    onChange({ ...params, [key]: value });
  };

  return (
    <div className={`animation-panel ${params.enabled ? 'panel-open' : ''}`}>
      <div className="panel-inner">
        <div className="slider-group">
          <label className="slider-label">
            Speed
            <span className="slider-value">{params.speed.toFixed(1)}s</span>
          </label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={params.speed}
            onChange={(e) => update('speed', parseFloat(e.target.value))}
            className="slider"
          />
        </div>
        <div className="slider-group">
          <label className="slider-label">
            Intensity
            <span className="slider-value">{params.intensity}°</span>
          </label>
          <input
            type="range"
            min="1"
            max="8"
            step="0.5"
            value={params.intensity}
            onChange={(e) => update('intensity', parseFloat(e.target.value))}
            className="slider"
          />
        </div>
        <div className="slider-group">
          <label className="slider-label">
            Stagger
            <span className="slider-value">{params.staggerOffset}ms</span>
          </label>
          <input
            type="range"
            min="0"
            max="200"
            step="10"
            value={params.staggerOffset}
            onChange={(e) => update('staggerOffset', parseInt(e.target.value))}
            className="slider"
          />
        </div>
      </div>
    </div>
  );
}