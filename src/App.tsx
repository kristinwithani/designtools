import { useState, useCallback, useEffect, useRef } from 'react';
import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar';
import IllustrationGrid from './components/IllustrationGrid';
import { getPalette, updateCSSVariables, type ThemeMode } from './utils/colorUtils';
import { generateCards, type CardData } from './utils/randomiser';
import { downloadAllCards } from './utils/exportUtils';
import { DEFAULT_ANIMATION_PARAMS, type AnimationParams } from './utils/animationUtils';
import type { ExportFormat } from './components/ExportMenu';
import './App.css';

const DEFAULT_HUE = 135;

function App() {
  const [hue, setHue] = useState(DEFAULT_HUE);
  const [mode, setMode] = useState<ThemeMode>('dark');
  const [cards, setCards] = useState<CardData[]>(() => generateCards(9));
  const [animating, setAnimating] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [animationParams, setAnimationParams] = useState<AnimationParams>(DEFAULT_ANIMATION_PARAMS);
  const [useTertiary, setUseTertiary] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const palette = getPalette(hue, mode);

  useEffect(() => {
    updateCSSVariables(hue, mode);
  }, [hue, mode]);

  useEffect(() => {
    const timer = setTimeout(() => setAnimating(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleRegenerate = useCallback(() => {
    setAnimating(false);
    requestAnimationFrame(() => {
      setCards(generateCards(9));
      setAnimating(true);
      setTimeout(() => setAnimating(false), 600);
    });
  }, []);

  const handleDownloadAll = useCallback(async (format: ExportFormat) => {
    if (!gridRef.current) return;
    setIsExporting(true);
    try {
      const cardElements = Array.from(
        gridRef.current.querySelectorAll<HTMLElement>('.illustration-card')
      );
      const names = cards.map(
        (c) => `illustra-${c.name}`
      );
      await downloadAllCards(cardElements, names, format, palette, animationParams);
    } finally {
      setIsExporting(false);
    }
  }, [cards, palette, animationParams]);

  const toggleMode = useCallback(() => {
    setMode((m) => (m === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <div className="app" style={{ backgroundColor: palette.appBg }}>
      <Toolbar
        hue={hue}
        onHueChange={setHue}
        onRegenerate={handleRegenerate}
        animationParams={animationParams}
        onAnimationChange={setAnimationParams}
        mode={mode}
        onToggleMode={toggleMode}
        useTertiary={useTertiary}
        onToggleTertiary={() => setUseTertiary(t => !t)}
      />
      <div className="app-body">
        <main className="main-content" ref={gridRef}>
          <IllustrationGrid
            cards={cards}
            palette={palette}
            animating={animating}
            animationParams={animationParams}
            useTertiary={useTertiary}
          />
        </main>
        <Sidebar
          animationParams={animationParams}
          onAnimationChange={setAnimationParams}
          onDownloadAll={handleDownloadAll}
          isExporting={isExporting}
        />
      </div>
    </div>
  );
}

export default App;