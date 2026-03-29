import clsx from 'clsx';
import { format as formatDate, parseISO } from 'date-fns';
import Link from 'next/link';
import type { FC, ReactNode } from 'react';
import { LuArrowBigRightDash, LuGithub, LuLinkedin } from 'react-icons/lu';

import { IconAnchor } from '@/components/icon-buttons';
import { ProjectCard } from '@/components/project-card';
import { Tag, TagList } from '@/components/tags';
import Typewriter from '@/components/typewriter';
import { type CVEntryGroup, queryCVEntryGroups, queryProjects } from '@/lib/queries';

export const revalidate = 3600;

export default async function Home() {
  const cvEntryGroups = await queryCVEntryGroups();
  const projects = await queryProjects();

  return (
    <PageShell>
      <SidebarHeader />
      <main id="content" className="flex flex-col gap-5 lg:gap-10 pt-24 lg:w-7/12 lg:py-24 lg:pl-8">
        <section id="intro" aria-label="Introduction" className="hero">
          <div className="hero-content flex flex-col">
            <div className="w-full motion-reduce:hidden">
              <Typewriter />
            </div>
            <div className="hidden motion-reduce:block font-mono text-2xl">Hi! I&apos;m Jeremy.</div>
            <div className="prose mt-6 max-w-prose">
              <p>
                I&apos;m a principal engineer and tech lead at{' '}
                <a
                  href="https://well.co"
                  className="underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
                  rel="noreferrer"
                  target="_blank"
                >
                  Well
                </a>
                , where I build healthcare software and think about distributed systems more than is probably healthy. I
                lead cloud infrastructure and platform architecture — the kind of work where the problems are
                interesting precisely because they shouldn&apos;t exist.
              </p>
              <p>
                I really like{' '}
                <a
                  href="https://www.haskell.org/"
                  className="underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
                  rel="noreferrer"
                  target="_blank"
                >
                  Haskell
                </a>
                , which is either a programming language or a coping mechanism depending on who you ask. My cat and my
                toddler have independently concluded that my keyboard is a toy. They are not wrong.
              </p>
            </div>
          </div>
        </section>
        <section id="experience" aria-label="Work Experience" className="mt-20 flex flex-col">
          <h2 className="text-2xl font-mono font-bold mb-8">Experience</h2>
          {cvEntryGroups.map((group) => (
            <CVEntryGroupCard key={group._id} {...group} />
          ))}
        </section>
        <section id="projects" aria-label="Projects" className="mt-24 flex flex-col gap-3">
          <h2 className="text-2xl font-mono font-bold mb-8">Projects</h2>
          {projects.map((project) => (
            <ProjectCard key={project._id} {...project} />
          ))}
        </section>
        <footer className="mt-24 mb-12 text-sm font-light text-base-content/60">
          Built with Next.js, TailwindCSS, and daisyUI. Content managed with{' '}
          <a
            href="https://www.sanity.io/"
            className="underline decoration-base-content/20 underline-offset-2 hover:decoration-base-content/50 transition-colors"
            rel="noreferrer"
            target="_blank"
          >
            Sanity
          </a>
          .
        </footer>
      </main>
    </PageShell>
  );
}

const PageShell: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
    <div className="lg:flex lg:justify-between lg:gap-4">{children}</div>
  </div>
);

const SidebarHeader = () => (
  <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-5/12 lg:flex-col lg:justify-between">
    <div className="lg:pt-24">
      <hgroup>
        <h1 className="text-4xl font-bold font-mono tracking-tight sm:text-5xl lg:text-6xl">Jeremy Nuttall</h1>
        <h2 className="mt-4 font-mono tracking-wider text-accent text-sm sm:text-base">
          Principal Software Engineer ✕ Tech Lead
        </h2>
        <p className="mt-4 max-w-xs leading-relaxed text-base-content/60">
          Infrastructure, architecture, and the occasional existential crisis.
        </p>
      </hgroup>
      <nav aria-label="Site navigation">
        <ul className="mt-8 menu">
          <li>
            <Link href="#intro">Introduction</Link>
          </li>
          <li>
            <Link href="#experience">Experience</Link>
          </li>
          <li>
            <Link href="#projects">Projects</Link>
          </li>
        </ul>
      </nav>

      <Link
        href="/static/resume.pdf"
        className="btn btn-ghost mt-8 gap-2 self-end text-base-content/60 hover:text-base-content underline-offset-4"
      >
        View résumé
        <LuArrowBigRightDash />
      </Link>
    </div>
    <div className="flex flex-row mt-8 lg:mt-0 lg:justify-end gap-4 lg:px-24 lg:py-12 text-base-content/60">
      <IconAnchor
        icon={LuLinkedin}
        aria-label="My Linkedin"
        href="https://linkedin.com/in/jeremy-nuttall"
        rel="noreferrer"
        target="_blank"
      />
      <IconAnchor
        icon={LuGithub}
        aria-label="My Github"
        href="https://github.com/jtnuttall"
        rel="noreferrer"
        target="_blank"
      />
    </div>
  </header>
);

const formatCVDate = (date?: string | null) => {
  if (!date) return 'present';
  const parsed = parseISO(date);
  const month = formatDate(parsed, 'MMM');
  return month.length <= 3 ? `${month} ${formatDate(parsed, 'yyyy')}` : `${month}. ${formatDate(parsed, 'yyyy')}`;
};

const CVEntryGroupCard: FC<CVEntryGroup> = ({ company, url, technologies, cvEntries }) => {
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
