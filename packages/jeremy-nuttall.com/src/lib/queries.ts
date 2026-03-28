import { InferResultItem } from 'groqd';

import { client } from '@/../sanity/lib/client';

import { q } from './groqd-client';

export type CVEntry = InferResultItem<typeof CVEntries>;
const CVEntries = q.star
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
    url: true,
    technologies: sub.field('technologies[]').deref().project({ name: true }),
  }));
export const queryCVEntries = async () => CVEntries.parse(await client.fetch(CVEntries.query));

export type Project = InferResultItem<typeof Projects>;
const Projects = q.star
  .filterByType('project')
  .filterRaw('priority >= 0')
  .order('featured asc', 'priority desc')
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
    packageUrl: true,
    description: true,
    technologies: sub.field('technologies[]').deref().project({ name: true }),
  }))
  .slice(0, 7);
export const queryProjects = async () => Projects.parse(await client.fetch(Projects.query));
