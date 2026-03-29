import { InferResultItem } from 'groqd';

import { client } from '@/../sanity/lib/client';

import { q } from './groqd-client';

export type CVEntryGroup = InferResultItem<typeof CVEntryGroups>;
const CVEntryGroups = q.star.filterByType('cvEntryGroup').project((sub) => ({
  _id: true,
  company: true,
  url: true,
  technologies: sub.field('technologies[]').deref().project({ name: true }),
  cvEntries: sub.field('cvEntries[]').deref().order('startDate desc').project({
    _id: true,
    jobTitle: true,
    startDate: true,
    endDate: true,
    highlights: true,
  }),
}));
export const queryCVEntryGroups = async () => {
  const groups = CVEntryGroups.parse(await client.fetch(CVEntryGroups.query));
  return groups.sort((a, b) => {
    const aDate = a.cvEntries?.[0]?.startDate ?? '';
    const bDate = b.cvEntries?.[0]?.startDate ?? '';
    return bDate.localeCompare(aDate);
  });
};

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
