import { ReactNode } from 'react';
import { Toolbar } from '@mui/material';

type PageWrapperProps = {
  children: ReactNode;
};

const PageWrapper = ({ children }: PageWrapperProps): JSX.Element => (
  <>
    <Toolbar sx={{ mb: '5px' }} />
    {children}
  </>
);

export default PageWrapper;
