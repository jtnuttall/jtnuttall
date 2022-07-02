import { FC } from 'react';
import { Box, Link, Stack, styled, Typography, useTheme } from '@mui/material';
import {
  SectionBoxBase,
  SectionBoxProps,
  SectionHeaderBox,
} from './SectionBase';

const FooterBox = styled(SectionBoxBase)`
  position: relative;
  height: 0;
  align-items: flex-end;
  padding-bottom: 0.5rem !important;
  min-height: 25rem;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    min-height: 50rem;
  }
`;

const CopyrightBox = styled(Box)`
  position: absolute;
  right: 0;
  bottom: 0;
  padding-right: inherit;
  padding-bottom: inherit;
`;

const FooterSection: FC<Pick<SectionBoxProps, 'headerTitle' | 'name'>> = ({
  headerTitle,
}) => {
  const { palette } = useTheme();

  return (
    <FooterBox sx={{ backgroundColor: palette.primary.main }}>
      {headerTitle && (
        <SectionHeaderBox>
          <Typography variant="h5">{headerTitle}</Typography>
        </SectionHeaderBox>
      )}
      <Stack
        direction={{ xs: 'column', sm: 'column', md: 'row' }}
        spacing={{ xs: '2rem', sm: '3rem', md: '15rem' }}
        sx={{ mr: '2rem', ml: '2rem' }}
      >
        <Stack spacing={1}>
          <Typography variant="h6">More from Jeremy</Typography>
          <Link
            variant="button"
            color="secondary"
            underline="hover"
            target="_blank"
            rel="noopener"
            href="https://www.github.com/jtnuttall"
          >
            GitHub
          </Link>
          <Link
            variant="button"
            color="secondary"
            underline="hover"
            target="_blank"
            rel="noopener"
            href="https://linkedin.com/"
          >
            LinkedIn
          </Link>
        </Stack>
        <Stack spacing={1} sx={{ ml: 10 }}>
          <Typography variant="h6">FYIs</Typography>
          <Link
            variant="button"
            color="secondary"
            underline="hover"
            target="_blank"
            rel="noopener"
            href="https://github.com/jtnuttall/jtnuttall"
          >
            Source Code
          </Link>
        </Stack>
      </Stack>
      <CopyrightBox>
        <Typography variant="caption">&copy; 2021 Jeremy Nuttall</Typography>
      </CopyrightBox>
    </FooterBox>
  );
};

export default FooterSection;
