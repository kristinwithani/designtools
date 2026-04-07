import { useRef, useCallback } from 'react';
import type { CardData } from '../utils/randomiser';
import type { ColorPalette } from '../utils/colorUtils';
import type { AnimationParams } from '../utils/animationUtils';
import type { ExportFormat } from './ExportMenu';
import ExportMenu from './ExportMenu';
import { exportCard } from '../utils/exportUtils';

interface IllustrationCardProps {
  card: CardData;
  palette: ColorPalette;
  delay: number;
  animating: boolean;
  animationParams: AnimationParams;
}

export default function IllustrationCard({ card, palette, delay, animating, animationParams }: IllustrationCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { Component } = card.illustration;

  const handleExport = useCallback(
    (format: ExportFormat) => {
      if (!cardRef.current) return;
      const filename = `illustra-${card.illustration.name}-${card.word.toLowerCase().replace(/\s+/g, '-')}`;
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
        backgroundColor: palette.cardBg,
      }}
    >
      <ExportMenu onExport={handleExport} variant="card" />
      <div className="card-illustration">
        <Component
          primary={palette.primary}
          dark={palette.dark}
          light={palette.white}
          complementary={palette.complementary}
          animated={animationParams.enabled}
          animationParams={animationParams}
        />
      </div>
    </div>
  );
}