import { ReactNode } from 'react';
import { Block, Inline } from '@contentful/rich-text-types';
import { styled } from '@mui/material';

export const orderedListRenderer = (
  node: Inline | Block,
  children: ReactNode,
): JSX.Element => <ol>{children}</ol>;

export const unorderedListRenderer = (
  node: Inline | Block,
  children: ReactNode,
): JSX.Element => <ul>{children}</ul>;

const ListItem = styled('li')`
  & > p {
    margin-bottom: 0.15rem;
  }

  & > p:last-child {
    margin-bottom: 0.45rem;
  }
`;

export const listItemRenderer = (
  node: Inline | Block,
  children: ReactNode,
): JSX.Element => <ListItem>{children}</ListItem>;
