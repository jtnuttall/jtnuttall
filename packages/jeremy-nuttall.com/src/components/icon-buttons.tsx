import type { ComponentProps, FC } from 'react';
import type { IconType } from 'react-icons';

interface IconAnchorProps extends Omit<ComponentProps<'a'>, 'className'> {
  icon: IconType;
}

export const IconAnchor: FC<IconAnchorProps> = ({ icon: Icon, ...anchorProps }) => (
  <a
    {...anchorProps}
    className="flex justify-center items-center h-10 w-10 rounded text-base-content/50 transition-colors hover:text-base-content"
  >
    <Icon size={24} />
  </a>
);
