'use client';

import { FC } from 'react';

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
  return (
    <div className="min-w-full">
      <ReactTypewriter
        prompt="λ "
        cpm={750}
        cursorType="ibeam"
        actions={typewriterActions}
        render={(text) => <code className="block p-5 bg-gray-950/80 rounded-lg">{text}</code>}
      />
    </div>
  );
};

export default Typewriter;
