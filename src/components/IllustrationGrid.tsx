import type { CardData } from '../utils/randomiser';
import type { ColorPalette } from '../utils/colorUtils';
import type { AnimationParams } from '../utils/animationUtils';
import IllustrationCard from './IllustrationCard';

interface IllustrationGridProps {
  cards: CardData[];
  palette: ColorPalette;
  animating: boolean;
  animationParams: AnimationParams;
}

export default function IllustrationGrid({ cards, palette, animating, animationParams }: IllustrationGridProps) {
  return (
    <div className="illustration-grid">
      {cards.map((card, i) => (
        <IllustrationCard
          key={card.id}
          card={card}
          palette={palette}
          delay={i * 50}
          animating={animating}
          animationParams={animationParams}
        />
      ))}
    </div>
  );
}