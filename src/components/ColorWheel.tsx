import { useRef, useEffect, useCallback, useState } from 'react';
import { hslToHex } from '../utils/colorUtils';

interface ColorWheelProps {
  hue: number;
  onHueChange: (hue: number) => void;
  size?: number;
}

function hexToHue(hex: string): number | null {
  const match = hex.replace('#', '').match(/^([0-9a-f]{6})$/i);
  if (!match) return null;
  const r = parseInt(match[1].slice(0, 2), 16) / 255;
  const g = parseInt(match[1].slice(2, 4), 16) / 255;
  const b = parseInt(match[1].slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max === min) return 0;
  let h = 0;
  const d = max - min;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
  else if (max === g) h = ((b - r) / d + 2) * 60;
  else h = ((r - g) / d + 4) * 60;
  return Math.round(h) % 360;
}

export default function ColorWheel({ hue, onHueChange, size = 48 }: ColorWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDragging = useRef(false);
  const [hexInput, setHexInput] = useState(() => hslToHex(hue, 70, 55));
  const [focused, setFocused] = useState(false);

  // Sync hex display when hue changes externally (not while user is typing)
  useEffect(() => {
    if (!focused) {
      setHexInput(hslToHex(hue, 70, 55));
    }
  }, [hue, focused]);

  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const s = size * dpr;
    canvas.width = s;
    canvas.height = s;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const cx = s / 2;
    const cy = s / 2;
    const outerR = s / 2 - 2 * dpr;
    const innerR = outerR - 8 * dpr;

    for (let angle = 0; angle < 360; angle++) {
      const startAngle = ((angle - 1) * Math.PI) / 180;
      const endAngle = ((angle + 1) * Math.PI) / 180;
      ctx.beginPath();
      ctx.arc(cx, cy, outerR, startAngle, endAngle);
      ctx.arc(cx, cy, innerR, endAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = `hsl(${angle}, 75%, 55%)`;
      ctx.fill();
    }

    const indicatorAngle = ((hue - 90) * Math.PI) / 180;
    const midR = (outerR + innerR) / 2;
    const ix = cx + midR * Math.cos(indicatorAngle);
    const iy = cy + midR * Math.sin(indicatorAngle);

    ctx.beginPath();
    ctx.arc(ix, iy, 5 * dpr, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1.5 * dpr;
    ctx.stroke();
  }, [hue, size]);

  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

  const getHueFromEvent = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left - rect.width / 2;
      const y = clientY - rect.top - rect.height / 2;
      let angle = (Math.atan2(y, x) * 180) / Math.PI + 90;
      if (angle < 0) angle += 360;
      onHueChange(Math.round(angle) % 360);
    },
    [onHueChange]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      getHueFromEvent(e.clientX, e.clientY);
    },
    [getHueFromEvent]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      getHueFromEvent(e.clientX, e.clientY);
    },
    [getHueFromEvent]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('#')) val = '#' + val;
    setHexInput(val);
    const h = hexToHue(val);
    if (h !== null) onHueChange(h);
  };

  const handleHexBlur = () => {
    setFocused(false);
    setHexInput(hslToHex(hue, 70, 55));
  };

  const handleHexKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <div className="color-wheel-wrap">
      <canvas
        ref={canvasRef}
        className="color-wheel"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ cursor: 'pointer', touchAction: 'none' }}
      />
      <input
        type="text"
        className="hex-input"
        value={hexInput}
        onChange={handleHexChange}
        onFocus={() => setFocused(true)}
        onBlur={handleHexBlur}
        onKeyDown={handleHexKeyDown}
        maxLength={7}
        spellCheck={false}
      />
    </div>
  );
}