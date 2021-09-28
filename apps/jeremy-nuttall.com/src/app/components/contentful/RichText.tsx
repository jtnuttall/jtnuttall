import React, { useMemo } from 'react';
import {
  documentToReactComponents,
  Options as RichTextOptions,
} from '@contentful/rich-text-react-renderer';
import {
  BLOCKS,
  Document as RichTextDocument,
  INLINES,
} from '@contentful/rich-text-types';
import { Box, BoxProps } from '@mui/material';
import documentNodeRenderer from './renderers/document';
import paragraphNodeRenderer from './renderers/paragraph';
import quoteRenderer from './renderers/quote';
import textNodeRenderer from './renderers/text';
import {
  listItemRenderer,
  orderedListRenderer,
  unorderedListRenderer,
} from './renderers/lists';

const inlineRegex = new RegExp(Object.values(INLINES).join('|'));

const richTextOptions: RichTextOptions = {
  renderNode: {
    [BLOCKS.DOCUMENT]: documentNodeRenderer,
    [BLOCKS.PARAGRAPH]: paragraphNodeRenderer,
    [BLOCKS.HEADING_1]: textNodeRenderer('h1'),
    [BLOCKS.HEADING_2]: textNodeRenderer('h2'),
    [BLOCKS.HEADING_3]: textNodeRenderer('h3'),
    [BLOCKS.HEADING_4]: textNodeRenderer('h4'),
    [BLOCKS.HEADING_5]: textNodeRenderer('h5'),
    [BLOCKS.HEADING_6]: textNodeRenderer('h6'),
    [BLOCKS.QUOTE]: quoteRenderer,
    [BLOCKS.OL_LIST]: orderedListRenderer,
    [BLOCKS.UL_LIST]: unorderedListRenderer,
    [BLOCKS.LIST_ITEM]: listItemRenderer,
  },
};

type RichTextProps = {
  document: RichTextDocument;
  sx?: BoxProps['sx'];
};

const RichText = React.forwardRef<HTMLDivElement, RichTextProps>(
  (props, ref): JSX.Element => {
    const { document, sx } = props;

    const elements = useMemo(
      () => documentToReactComponents(document, richTextOptions),
      [document],
    );

    return (
      <Box ref={ref} sx={sx}>
        {elements}
      </Box>
    );
  },
);

export default React.memo(RichText);
