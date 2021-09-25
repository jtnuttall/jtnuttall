import { Box, styled, Typography, withTheme } from '@mui/material';
import CircuitBoard from '../../../assets/circuit-board.svg';
import HeroCard from './HeroCard';
import Typewriter, {
  TypewriterAction,
  TypewriterActions,
} from '../typewriter/Typewriter';
import { bluePurpleOrange } from '../../style/gradients';

const typewriterActions: TypewriterActions[] = [
  {
    type: TypewriterAction.Write,
    text: 'Lead Software Engineer',
  },
  {
    type: TypewriterAction.Pause,
    milliseconds: 1000,
  },
  {
    type: TypewriterAction.Delete,
  },
  {
    type: TypewriterAction.Write,
    text: 'Full-Stack Developer',
  },
  {
    type: TypewriterAction.Pause,
    milliseconds: 1000,
  },
  {
    type: TypewriterAction.Delete,
  },
  {
    type: TypewriterAction.Write,
    text: 'Software Architect',
  },
  {
    type: TypewriterAction.Pause,
    milliseconds: 1000,
  },
  {
    type: TypewriterAction.Delete,
  },
  {
    type: TypewriterAction.Write,
    text: 'Programming Generalist',
  },
  {
    type: TypewriterAction.Pause,
    milliseconds: 1000,
  },
  {
    type: TypewriterAction.Delete,
  },
];

const FakeTerminal = styled(Box)`
  background-color: rgba(0, 0, 0, 0.8);
  width: 95%;
  max-width: 50rem;
  padding: 1.25rem 2rem 1.25rem 2rem;
`;

type HomeHeroProps = {
  name: string;
};

const HomeHero = (props: HomeHeroProps): JSX.Element => {
  const { name } = props;

  return (
    <HeroCard image={CircuitBoard} linearGradient={bluePurpleOrange}>
      <Typography
        variant="h1"
        style={{ marginBottom: 10, textAlign: 'center' }}
      >
        Jeremy Nuttall
      </Typography>

      <FakeTerminal>
        <Typewriter
          prompt={'\u03BB '}
          cpm={1000}
          cursorType="ibeam"
          fontFamily="Space Mono"
          actions={typewriterActions}
        />
      </FakeTerminal>
    </HeroCard>
  );
};

export default HomeHero;
