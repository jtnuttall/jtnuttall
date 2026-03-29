import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { LuExternalLink, LuGithub, LuPackage } from 'react-icons/lu';

import type { Project } from '@/lib/queries';

import { Tag, TagList } from './tags';

export const ProjectCard: FC<Project> = ({
  title,
  tagline,
  featured,
  keyMetric,
  keyContribution,
  description,
  repository,
  demoUrl,
  packageUrl,
  image,
  technologies,
}) => {
  const assetUrl = image?.asset?.url;

  return (
    <div
      className={clsx(
        'card border border-neutral/20 transition-colors hover:border-neutral/50',
        featured ? 'lg:p-4 mb-3' : 'lg:p-3',
        !featured && assetUrl && 'card-side',
      )}
    >
      {assetUrl && (
        <figure className={clsx(!featured && 'w-48 shrink-0')}>
          <ProjectImage
            src={assetUrl}
            demoUrl={demoUrl}
            title={title}
            width={featured ? 640 : 320}
            height={featured ? 360 : 180}
            className={clsx(featured && 'w-full')}
          />
        </figure>
      )}
      <div className="card-body">
        <h3 className="card-title font-mono">{title}</h3>
        {tagline && <p className="text-accent/80 italic">{tagline}</p>}
        {featured && (keyMetric || keyContribution) && (
          <div className="flex flex-wrap items-center gap-2 mt-1">
            {keyMetric && <Tag variant="accent">{keyMetric}</Tag>}
            {keyContribution && <span className="text-base-content/60 text-sm">{keyContribution}</span>}
          </div>
        )}
        <p className={clsx('text-base-content/70', featured && 'mt-2')}>{description}</p>
        {technologies && technologies.length > 0 && (
          <TagList>
            {technologies.map(({ name }) => (
              <Tag key={name} variant="neutral">
                {name}
              </Tag>
            ))}
          </TagList>
        )}
        <div className="mt-2 card-actions justify-end">
          <ProjectLinks demoUrl={demoUrl} packageUrl={packageUrl} repository={repository} />
        </div>
      </div>
    </div>
  );
};

interface ProjectImageProps {
  src: string;
  demoUrl?: string | null;
  title?: string | null;
  width: number;
  height: number;
  className?: string;
}

const ProjectImage: FC<ProjectImageProps> = ({ src, demoUrl, title, width, height, className }) => {
  const url = new URL(src);
  url.searchParams.set('w', String(width));
  url.searchParams.set('h', String(height));
  url.searchParams.set('fit', 'crop');

  const img = (
    <Image
      className={clsx('rounded object-cover aspect-video', demoUrl && 'transition-opacity hover:opacity-80', className)}
      alt={`Demo of ${title ?? ''}`}
      src={url.toString()}
      width={width}
      height={height}
    />
  );

  return demoUrl ? (
    <Link href={demoUrl} rel="noreferrer" target="_blank">
      {img}
    </Link>
  ) : (
    img
  );
};

interface ProjectLinksProps {
  demoUrl?: string | null;
  packageUrl?: string | null;
  repository?: string | null;
}

const ProjectLinks: FC<ProjectLinksProps> = ({ demoUrl, packageUrl, repository }) => (
  <>
    {demoUrl && (
      <Link
        href={demoUrl}
        rel="noreferrer"
        target="_blank"
        className="btn btn-sm btn-ghost text-base-content/60 hover:text-base-content flex items-center gap-2"
      >
        <LuExternalLink />
        Demo
      </Link>
    )}
    {packageUrl && (
      <Link
        href={packageUrl}
        rel="noreferrer"
        target="_blank"
        className="btn btn-sm btn-ghost text-base-content/60 hover:text-base-content flex items-center gap-2"
      >
        <LuPackage />
        Package
      </Link>
    )}
    {repository && (
      <Link
        href={repository}
        rel="noreferrer"
        target="_blank"
        className="btn btn-sm btn-ghost text-base-content/60 hover:text-base-content flex items-center gap-2"
      >
        <LuGithub />
        Repo
      </Link>
    )}
  </>
);
