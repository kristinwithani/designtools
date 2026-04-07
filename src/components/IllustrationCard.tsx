import { useRef, useCallback } from 'react';
import type { CardData } from '../utils/randomiser';
import type { ColorPalette } from '../utils/colorUtils';
import type { AnimationParams } from '../utils/animationUtils';
import type { ExportFormat } from './ExportMenu';
import ExportMenu from './ExportMenu';
import Generative from '../illustrations/Generative';
import { exportCard } from '../utils/exportUtils';

interface IllustrationCardProps {
  card: CardData;
  palette: ColorPalette;
  delay: number;
  animating: boolean;
  animationParams: AnimationParams;
  useTertiary: boolean;
}

export default function IllustrationCard({ card, palette, delay, animating, animationParams, useTertiary }: IllustrationCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleExport = useCallback(
    (format: ExportFormat) => {
      if (!cardRef.current) return;
      const filename = `illustra-${card.name}`;
      exportCard(cardRef.current, filename, format, palette, animationParams);
    },
    [card, palette, animationParams]
  );

  return (
    <div
      ref={cardRef}
      className={`illustration-card ${animating ? 'card-enter' : ''}`}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      <ExportMenu onExport={handleExport} variant="card" />
      <div className="card-illustration">
        <Generative
          primary={palette.primary}
          dark={palette.dark}
          light={palette.white}
          complementary={palette.complementary}
          tertiary={palette.tertiary}
          useTertiary={useTertiary}
          animated={animationParams.enabled}
          animationParams={animationParams}
          composition={card.composition}
        />
      </div>
    </div>
  );
}