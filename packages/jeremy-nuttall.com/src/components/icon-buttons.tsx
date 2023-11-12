import { ComponentProps, FC } from 'react';
import { IconType } from 'react-icons';

interface IconAnchorProps extends ComponentProps<'a'> {
  className?: undefined;
  icon: IconType;
}

export const IconAnchor: FC<IconAnchorProps> = ({
  icon: Icon,
  ...anchorProps
}) => (
  <a
    {...anchorProps}
    className="flex justify-center items-center h-12 w-12 rounded-full text-accent transition-colors hover:bg-neutral-focus hover:text-primary"
  >
    <Icon size={24} />
  </a>
);
