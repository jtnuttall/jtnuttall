import { ComponentProps, FC } from 'react';
import { IconType } from 'react-icons';

interface IconAnchorProps extends ComponentProps<'a'> {
  className?: undefined;
  icon: IconType;
}

export const IconAnchor: FC<IconAnchorProps> = ({ icon: Icon, ...anchorProps }) => (
  <a
    {...anchorProps}
    className="flex justify-center items-center h-10 w-10 rounded text-base-content/40 transition-colors hover:text-base-content"
  >
    <Icon size={24} />
  </a>
);
