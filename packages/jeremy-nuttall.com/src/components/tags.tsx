import { clsx } from 'clsx';
import { useMemo, type FC, type ReactNode } from 'react';

type TagVariant = 'accent' | 'neutral';

export interface TagProps {
  children: ReactNode;
  className?: string;
  variant: TagVariant;
}

export const Tag: FC<TagProps> = ({ children, className, variant }) => {
  const variantClasses = useMemo(() => {
    switch (variant) {
      case 'accent': {
        return 'badge-accent';
      }
      case 'neutral': {
        return 'badge-sm text-base-content/60 border-neutral/50';
      }
    }
  }, [variant]);
  return <span className={clsx('badge badge-outline', variantClasses, className)}>{children}</span>;
};

export const TagList: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex flex-wrap gap-1.5 mt-3">{children}</div>
);
