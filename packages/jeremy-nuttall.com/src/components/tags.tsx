import { clsx } from 'clsx';
import type { FC, ReactNode } from 'react';

type TagVariant = 'accent' | 'neutral';

const variantClasses: Record<TagVariant, string> = {
  accent: 'badge-accent',
  neutral: 'badge-sm text-base-content/60 border-neutral/50',
};

export interface TagProps {
  children: ReactNode;
  className?: string;
  variant: TagVariant;
}

export const Tag: FC<TagProps> = ({ children, className, variant }) => (
  <span className={clsx('badge badge-outline', variantClasses[variant], className)}>{children}</span>
);

export const TagList: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex flex-wrap gap-1.5 mt-3">{children}</div>
);
