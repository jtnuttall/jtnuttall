'use client';

import { FC, useCallback, useState } from 'react';

import ReactTypewriter, { typewriterBuilder } from '@jtnuttall/react-typewriter';

const typewriterActions = typewriterBuilder()
  .write("Hi! I'm Jeremy.")
  .pause(250)
  .delete()
  .write("I'm...")
  .pause(250)
  .delete()
  .write('a software engineer')
  .pause(750)
  .delete('software engineer'.length)
  .write('code enthusiast')
  .moveCursorBackward('enthusiast'.length)
  .delete('code '.length)
  .pause(500)
  .write('cat ')
  .pause(500)
  .moveCursorBackward('cat '.length)
  .write('full-stack ')
  .pause(500)
  .moveCursorForward()
  .delete('enthusiast'.length)
  .write('engineer')
  .pause(150)
  .moveCursorBackward('engineer'.length)
  .delete('cat '.length)
  .moveCursorForward()
  .pause(1750)
  .delete()
  .buildActions();

const Typewriter: FC = () => {
  const [paused, setPaused] = useState(false);
  const toggle = useCallback(() => {
    setPaused((p) => !p);
  }, []);

  return (
    <div
      className="min-w-full cursor-pointer select-none"
      role="button"
      tabIndex={0}
      aria-label={
        paused
          ? 'Typewriter animation paused. Click or press Enter to resume.'
          : 'Typewriter animation playing. Click or press Enter to pause.'
      }
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      }}
    >
      <ReactTypewriter
        prompt="λ "
        cpm={750}
        paused={paused}
        cursorType={paused ? 'underscore' : 'ibeam'}
        actions={typewriterActions}
        render={(text) => (
          <code
            className={`block text-2xl sm:text-3xl font-mono transition-opacity duration-300 ${paused ? 'text-base-content/60' : 'text-base-content/90'}`}
          >
            {text}
          </code>
        )}
      />
    </div>
  );
};

export default Typewriter;
