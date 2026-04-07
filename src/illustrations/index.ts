import type { IllustrationProps } from './types';
import Compass from './Compass';
import Hourglass from './Hourglass';
import Telescope from './Telescope';
import Lantern from './Lantern';
import Key from './Key';
import Feather from './Feather';
import Anchor from './Anchor';
import Magnifier from './Magnifier';
import Candle from './Candle';
import Envelope from './Envelope';
import Plant from './Plant';
import CrystalBall from './CrystalBall';
import Star from './Star';
import Book from './Book';
import Heart from './Heart';
import Teacup from './Teacup';
// Animals
import Bird from './Bird';
import Fish from './Fish';
import Cat from './Cat';
import Butterfly from './Butterfly';
import Rabbit from './Rabbit';
import Whale from './Whale';
// Everyday objects
import Camera from './Camera';
import Glasses from './Glasses';
import Pencil from './Pencil';
import Lighter from './Lighter';
import Clock from './Clock';
import Lock from './Lock';
// Shapes
import Hexagon from './Hexagon';
import Spiral from './Spiral';
import Cross from './Cross';
import Diamond from './Diamond';
import Wave from './Wave';
import Grid from './Grid';
// Word compositions
import WordCreateMore from './WordCreateMore';
import WordDreamBig from './WordDreamBig';
import WordFindYourWay from './WordFindYourWay';
import WordExplore from './WordExplore';
import WordBeStill from './WordBeStill';
import WordLetGo from './WordLetGo';
import WordKeepGoing from './WordKeepGoing';
import WordWonder from './WordWonder';
import WordStartHere from './WordStartHere';
import WordNotYet from './WordNotYet';
import WordSlowDown from './WordSlowDown';
import WordTrustIt from './WordTrustIt';

export type { IllustrationProps };

export interface IllustrationDef {
  name: string;
  Component: React.FC<IllustrationProps>;
}

export const illustrations: IllustrationDef[] = [
  // Original
  { name: 'Compass', Component: Compass },
  { name: 'Hourglass', Component: Hourglass },
  { name: 'Telescope', Component: Telescope },
  { name: 'Lantern', Component: Lantern },
  { name: 'Key', Component: Key },
  { name: 'Feather', Component: Feather },
  { name: 'Anchor', Component: Anchor },
  { name: 'Magnifier', Component: Magnifier },
  { name: 'Candle', Component: Candle },
  { name: 'Envelope', Component: Envelope },
  { name: 'Plant', Component: Plant },
  { name: 'CrystalBall', Component: CrystalBall },
  { name: 'Star', Component: Star },
  { name: 'Book', Component: Book },
  { name: 'Heart', Component: Heart },
  { name: 'Teacup', Component: Teacup },
  // Animals
  { name: 'Bird', Component: Bird },
  { name: 'Fish', Component: Fish },
  { name: 'Cat', Component: Cat },
  { name: 'Butterfly', Component: Butterfly },
  { name: 'Rabbit', Component: Rabbit },
  { name: 'Whale', Component: Whale },
  // Everyday objects
  { name: 'Camera', Component: Camera },
  { name: 'Glasses', Component: Glasses },
  { name: 'Pencil', Component: Pencil },
  { name: 'Lighter', Component: Lighter },
  { name: 'Clock', Component: Clock },
  { name: 'Lock', Component: Lock },
  // Shapes
  { name: 'Hexagon', Component: Hexagon },
  { name: 'Spiral', Component: Spiral },
  { name: 'Cross', Component: Cross },
  { name: 'Diamond', Component: Diamond },
  { name: 'Wave', Component: Wave },
  { name: 'Grid', Component: Grid },
  // Word compositions
  { name: 'CreateMore', Component: WordCreateMore },
  { name: 'DreamBig', Component: WordDreamBig },
  { name: 'FindYourWay', Component: WordFindYourWay },
  { name: 'Explore', Component: WordExplore },
  { name: 'BeStill', Component: WordBeStill },
  { name: 'LetGo', Component: WordLetGo },
  { name: 'KeepGoing', Component: WordKeepGoing },
  { name: 'Wonder', Component: WordWonder },
  { name: 'StartHere', Component: WordStartHere },
  { name: 'NotYet', Component: WordNotYet },
  { name: 'SlowDown', Component: WordSlowDown },
  { name: 'TrustIt', Component: WordTrustIt },
];