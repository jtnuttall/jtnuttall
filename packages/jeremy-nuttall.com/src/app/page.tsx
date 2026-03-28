import { client } from '@/../sanity/lib/client';
import { IconAnchor } from '@/components/icon-buttons';
import Typewriter from '@/components/typewriter';
import { q } from '@/lib/groqd-client';
import { format as formatDate } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { LuArrowBigRightDash, LuExternalLink, LuGithub, LuLinkedin } from 'react-icons/lu';

export const revalidate = 3600;

const formatCVDate = (date?: string | null) => (date ? formatDate(new Date(date), 'MMM. yyyy') : 'present');

const CVEntry = q.star
  .filterByType('cvEntry')
  .order('startDate desc')
  .project((sub) => ({
    _id: true,
    company: true,
    jobTitle: true,
    description: true,
    highlights: true,
    startDate: true,
    endDate: true,
    technologies: sub.field('technologies[]').deref().project({ name: true }),
  }));

const Project = q.star
  .filterByType('project')
  .filterRaw('priority >= 0')
  .order('priority desc')
  .project((sub) => ({
    _id: true,
    title: true,
    tagline: true,
    featured: true,
    keyMetric: true,
    keyContribution: true,
    contributionType: true,
    image: sub.field('image').project((imgSub) => ({
      asset: imgSub.field('asset').deref().project({ url: true }),
    })),
    repository: true,
    demoUrl: true,
    description: true,
    technologies: sub.field('technologies[]').deref().project({ name: true }),
  }))
  .slice(0, 7);

const ProjectImage = ({
  src,
  demoUrl,
  title,
  width,
  height,
  className,
}: {
  src: string;
  demoUrl?: string | null;
  title?: string | null;
  width: number;
  height: number;
  className?: string;
}) => {
  const img = (
    <Image
      className={`rounded object-cover aspect-video${demoUrl ? ' transition-opacity hover:opacity-80' : ''}${className ? ` ${className}` : ''}`}
      alt={`Demo of ${title ?? ''}`}
      src={src}
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

export default async function Home() {
  const cvEntries = CVEntry.parse(await client.fetch(CVEntry.query));
  const projects = [...Project.parse(await client.fetch(Project.query))].sort(
    (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0),
  );

  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
      <div className="lg:flex lg:justify-between lg:gap-4">
        <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-5/12 lg:flex-col lg:justify-between">
          <div className="lg:pt-24">
            <div>
              <h1 className="text-4xl font-bold font-mono tracking-tight sm:text-5xl lg:text-6xl">Jeremy Nuttall</h1>
              <h2 className="mt-4 font-mono tracking-wider text-accent text-sm sm:text-base">
                Principal Software Engineer ✕ Tech Lead
              </h2>
              <p className="mt-4 max-w-xs leading-relaxed text-base-content/50">
                Infrastructure, architecture, and the occasional existential crisis.
              </p>
            </div>
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
          </div>
          <div className="flex flex-row mt-8 lg:mt-0 lg:justify-end gap-4 lg:px-24 lg:py-12 text-base-content/50">
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
                    Well.co
                  </a>
                  , where I build healthcare software and think about distributed systems more than is probably healthy.
                  I lead cloud infrastructure and platform architecture — the kind of work where the problems are
                  interesting precisely because they shouldn&apos;t exist.
                </p>
                <p>
                  Off the clock I write{' '}
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
            {cvEntries.map(({ _id, company, jobTitle, startDate, endDate, highlights, technologies }) => (
              <article key={_id} className="border-t border-neutral/50 py-8 first:border-t-0 first:pt-0">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
                  <h3 className="text-lg font-mono font-bold">{company}</h3>
                  <span className="text-sm text-base-content/50 font-mono tabular-nums">
                    {formatCVDate(startDate)} – {formatCVDate(endDate)}
                  </span>
                </div>
                <p className="mt-1 text-base-content/60 italic">{jobTitle}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {technologies?.map(({ name }) => (
                    <span key={name} className="badge badge-sm badge-outline text-base-content/60 border-neutral/50">
                      {name}
                    </span>
                  ))}
                </div>
                {highlights && highlights.length > 0 && (
                  <ul className="mt-4 space-y-1.5 text-base-content/70 leading-relaxed">
                    {highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:h-px before:w-2 before:bg-base-content/40"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
            <Link
              href="/static/resume.pdf"
              className="btn btn-ghost mt-8 gap-2 self-end text-base-content/60 hover:text-base-content underline-offset-4"
            >
              View Full Résumé
              <LuArrowBigRightDash />
            </Link>
          </section>
          <section id="projects" aria-label="Projects" className="mt-24 flex flex-col gap-3">
            <h2 className="text-2xl font-mono font-bold mb-8">Projects</h2>
            {projects.map(
              ({
                _id,
                title,
                tagline,
                featured,
                keyMetric,
                keyContribution,
                description,
                repository,
                demoUrl,
                image,
                technologies,
              }) => {
                const assetUrl = image?.asset?.url;

                const techTags = technologies && technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {technologies.map(({ name }) => (
                      <span key={name} className="badge badge-sm badge-outline text-base-content/60 border-neutral/50">
                        {name}
                      </span>
                    ))}
                  </div>
                );

                const repoLink = repository && (
                  <Link
                    href={repository}
                    rel="noreferrer"
                    target="_blank"
                    className="btn btn-sm btn-ghost text-base-content/50 hover:text-base-content flex items-center gap-2"
                  >
                    <LuExternalLink />
                    Repo
                  </Link>
                );

                if (featured) {
                  return (
                    <div
                      key={_id}
                      className="card border border-neutral/20 transition-colors hover:border-neutral/50 lg:p-4 mb-3"
                    >
                      {assetUrl && (
                        <figure>
                          <ProjectImage
                            src={`${assetUrl}?w=640&h=360&fit=crop`}
                            demoUrl={demoUrl}
                            title={title}
                            width={640}
                            height={360}
                            className="w-full"
                          />
                        </figure>
                      )}
                      <div className="card-body">
                        <h3 className="card-title font-mono">{title}</h3>
                        {tagline && <p className="text-accent/80 text-sm italic">{tagline}</p>}
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          {keyMetric && (
                            <span className="badge badge-accent badge-outline font-mono text-xs">{keyMetric}</span>
                          )}
                          {keyContribution && <span className="text-base-content/60 text-sm">{keyContribution}</span>}
                        </div>
                        <p className="text-base-content/70 mt-2">{description}</p>
                        {techTags}
                        <div className="mt-2 card-actions justify-end">{repoLink}</div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={_id}
                    className={`card border border-neutral/20 transition-colors hover:border-neutral/50 lg:p-3${assetUrl ? ' card-side' : ''}`}
                  >
                    {assetUrl && (
                      <figure className="w-48 shrink-0">
                        <ProjectImage
                          src={`${assetUrl}?w=320&h=180&fit=crop`}
                          demoUrl={demoUrl}
                          title={title}
                          width={320}
                          height={180}
                        />
                      </figure>
                    )}
                    <div className="card-body">
                      <h3 className="card-title font-mono">{title}</h3>
                      {tagline && <p className="text-accent/80 text-sm italic">{tagline}</p>}
                      <p className="text-base-content/70">{description}</p>
                      {techTags}
                      <div className="mt-2 card-actions justify-end">{repoLink}</div>
                    </div>
                  </div>
                );
              },
            )}
          </section>
          <section className="mt-24 mb-12 text-sm font-light text-base-content/40">
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
          </section>
        </main>
      </div>
    </div>
  );
}
