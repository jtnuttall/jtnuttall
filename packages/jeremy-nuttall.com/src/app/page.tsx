import { client } from '@/../sanity/lib/client';
import { IconAnchor } from '@/components/icon-buttons';
import Typewriter from '@/components/typewriter';
import { q } from '@/lib/groqd-client';
import clsx from 'clsx';
import { format as formatDate } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { LuArrowBigRightDash, LuExternalLink, LuGithub, LuLinkedin } from 'react-icons/lu';

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
    image: sub.field('image').project((imgSub) => ({
      asset: imgSub.field('asset').deref().project({ url: true }),
    })),
    repository: true,
    description: true,
  }))
  .slice(0, 7);

export default async function Home() {
  const cvEntries = CVEntry.parse(await client.fetch(CVEntry.query));
  const projects = Project.parse(await client.fetch(Project.query));

  return (
    <div className="mx-auto min-h-screen max-w-screen-2xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
      <div className="lg:flex lg:justify-between lg:gap-4">
        <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-5/12 lg:flex-col lg:justify-between">
          <div className="lg:pt-24">
            <div>
              <h1 className="text-5xl font-black sm:text-6xl">Jeremy Nuttall</h1>
              <h2 className="mt-5 text-xl font-semibold sm:text-2xl">Prinicpal Software Engineer ✕ Tech Lead</h2>
            </div>
            <ul className="mt-5 menu md:menu-lg">
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
          </div>
          <div className="flex flex-row mt-5 lg:mt-0 lg:justify-end gap-5 lg:px-24 lg:py-12 text-neutral-content">
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
        <main id="content" className="flex flex-col gap-5 lg:gap-10 pt-24 lg:w-7/12 lg:py-24">
          <section id="intro" aria-label="Introduction" className="hero">
            <div className="hero-content flex flex-col">
              <div className="w-full motion-reduce:hidden">
                <Typewriter />
              </div>
              <div className="hidden motion-reduce:block">Hi! I&apos;m Jeremy.</div>
              <div className="prose mt-4">
                <p>Working on healthcare applications to improve our health!</p>
              </div>
            </div>
          </section>
          <section id="experience" aria-label="Work Experience" className="mt-20 group flex flex-col gap-3">
            {cvEntries.map(({ _id, company, jobTitle, startDate, endDate, highlights, technologies }) => (
              <div
                key={_id}
                className={clsx(
                  'collapse',
                  'collapse-arrow',
                  '[&:has(input:checked)]:bg-base-200',
                  '[&:has(input:checked)]:-x-scale-105',
                  '[&:not(:has(input:checked))]:hover:scale-105',
                  'border',
                  'shadow-lg',
                  'border-neutral',
                  'hover:bg-base-200',
                  'py-5',
                  'transition-all',
                )}
              >
                <input
                  type="checkbox"
                  name="work-experience-accordion"
                  aria-label={`Toggle collapse for experience at ${company ?? ''}`}
                />
                <div className="collapse-title">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <h3 className="text-2xl font-semibold">{company}</h3>
                    <div className="opacity-50">
                      {formatCVDate(startDate)} – {formatCVDate(endDate)}
                    </div>
                  </div>
                  <h4 className="mt-2 font-light">{jobTitle}</h4>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {technologies?.map(({ name }) => (
                      <div key={name} className="badge badge-secondary">
                        {name}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="collapse-content prose font-thin pb-2">
                  <ul>
                    {highlights?.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            <Link
              href="/static/resume.pdf"
              className="mt-5 link link-accent hover:link-primary flex items-center gap-2 self-end transition-colors"
            >
              View full Resume
              <LuArrowBigRightDash />
            </Link>
          </section>
          <section id="projects" aria-label="Projects" className="mt-24 flex flex-col gap-3">
            {projects.map(({ _id, title, description, repository, image }) => (
              <div
                key={_id}
                className="card border border-neutral justify-center card-side md:hover:scale-105 shadow-lg transition-transform lg:p-2"
              >
                <figure className="min-w-fit">
                  <Image
                    className="rounded-2xl"
                    alt={`Demo of ${title ?? ''}`}
                    src={`${image?.asset?.url ?? ''}?max-w=100`}
                    width={100}
                    height={100}
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{title}</h3>
                  <p>{description}</p>
                  <div className="mt-2 card-actions justify-end">
                    {repository && (
                      <Link
                        href={repository}
                        rel="noreferrer"
                        target="_blank"
                        className="btn btn-sm btn-secondary flex items-center gap-2"
                      >
                        <LuExternalLink />
                        Repo
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </section>
          <section className="mt-24 text-sm font-extralight prose">
            Inspired by Brittany Chiang&apos;s excellent{' '}
            <a href="https://brittanychiang.com/" className="link" rel="noreferrer" target="_blank">
              online resume
            </a>
            . Built with Next.js, TailwindCSS, and daisyUI. Deployed on Vercel. Content is managed with{' '}
            <a href="https://www.sanity.io/" className="link" rel="noreferrer" target="_blank">
              Sanity
            </a>
            .
          </section>
        </main>
      </div>
    </div>
  );
}
