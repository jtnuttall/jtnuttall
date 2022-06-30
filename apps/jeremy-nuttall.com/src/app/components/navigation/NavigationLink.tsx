import { Button, ButtonProps } from '@mui/material';
import React from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';

// export type NavigationLinkProps = Omit<LinkProps, 'href'> & RouterLinkProps;
const NavigationLink = () => <></>;

// const NavigationLink = React.forwardRef<HTMLAnchorElement, NavigationLinkProps>(
//   (props: NavigationLinkProps, ref): JSX.Element => (
//     <Button component={RouterLink} ref={ref} {...props} />
//   ),
// );

export default NavigationLink;
