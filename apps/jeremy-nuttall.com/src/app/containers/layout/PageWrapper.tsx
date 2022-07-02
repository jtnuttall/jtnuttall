import { FC, ReactNode } from 'react';
import { Toolbar } from '@mui/material';

const PageWrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <Toolbar sx={{ mb: '5px' }} />
    {children}
  </>
);

export default PageWrapper;
