import { clsx } from 'clsx';
import { format as formatDate, parseISO } from 'date-fns';
import Link from 'next/link';
import type { FC } from 'react';

import type { CVEntryGroup } from '@/lib/queries';

import { Tag, TagList } from './tags';

const formatCVDate = (date?: string | null) => {
  if (!date) return 'present';
  const parsed = parseISO(date);
  const month = formatDate(parsed, 'MMM');
  return `${month} ${formatDate(parsed, 'yyyy')}`;
};

export const CVEntryGroupCard: FC<CVEntryGroup> = ({ company, url, technologies, cvEntries }) => {
  const latest = cvEntries?.[0];
  const earliest = cvEntries?.[cvEntries.length - 1];
  const overallStart = earliest?.startDate;
  const overallEnd = latest?.endDate;
  const singleEntry = cvEntries?.length === 1;

  const heading = (
    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
      <h3 className="text-xl font-mono font-bold">{company}</h3>
      <span className="text-sm text-base-content/60 font-mono tabular-nums">
        {formatCVDate(overallStart)} – {formatCVDate(overallEnd)}
      </span>
    </div>
  );

  return (
    <article className="border-t border-neutral/50 py-8 first:border-t-0 first:pt-0">
      {url ? (
        <Link href={url} rel="noreferrer" target="_blank">
          {heading}
        </Link>
      ) : (
        heading
      )}
      {technologies && technologies.length > 0 && (
        <TagList>
          {technologies.map(({ name }) => (
            <Tag key={name} variant="neutral">
              {name}
            </Tag>
          ))}
        </TagList>
      )}
      <div className="mt-4">
        {cvEntries?.map((entry, i) => (
          <div key={entry._id} className="grid grid-cols-[12px_1fr] gap-x-3">
            <div className="flex flex-col items-center">
              <div className={clsx('shrink-0 my-1.5', i === 0 && 'mt-[0.4em]')}>{i > 0 && <TimelineChevrons />}</div>
              <div className="w-px flex-1 bg-base-content/20" />
            </div>
            <div className={clsx(i < cvEntries.length - 1 && 'pb-5')}>
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
                <p className="text-accent italic">{entry.jobTitle}</p>
                {!singleEntry && (
                  <span className="text-sm text-base-content/40 font-mono tabular-nums">
                    {formatCVDate(entry.startDate)} – {formatCVDate(entry.endDate)}
                  </span>
                )}
              </div>
              {entry.highlights && entry.highlights.length > 0 && (
                <ul className="mt-4 space-y-1.5 text-base-content/70 leading-relaxed">
                  {entry.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="pl-4 relative break-normal before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:h-px before:w-2 before:bg-base-content/40"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

/** Three stacked upward-pointing chevrons — <<<, rotated to vertical. */
const TimelineChevrons = () => (
  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className="text-base-content/30" aria-hidden="true">
    <path d="M8 3.5 5 1 2 3.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 6.5 5 4 2 6.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 9.5 5 7 2 9.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
