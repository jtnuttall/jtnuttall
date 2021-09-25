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

const FooterSection = (
  props: Pick<SectionBoxProps, 'headerTitle' | 'name'>,
): JSX.Element => {
  const { headerTitle } = props;

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
          <Link variant="button" color="secondary" underline="hover" href="/">
            Projects
          </Link>
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
          <Typography variant="h6">Contact</Typography>
          <Link variant="button" color="secondary" underline="hover" href="/">
            Inquiries
          </Link>
          <Link variant="button" color="secondary" underline="hover" href="/">
            Site Feedback
          </Link>
          <Link variant="button" color="secondary" underline="hover" href="/">
            Alternatives
          </Link>
        </Stack>
        <Stack spacing={1} sx={{ ml: 10 }}>
          <Typography variant="h6">Disclosures</Typography>
          <Link variant="button" color="secondary" underline="hover" href="/">
            Licenses
          </Link>
          <Link variant="button" color="secondary" underline="hover" href="/">
            Privacy
          </Link>
          <Link variant="button" color="secondary" underline="hover" href="/">
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
