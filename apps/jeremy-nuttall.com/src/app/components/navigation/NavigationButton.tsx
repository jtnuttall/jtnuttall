import React, { ReactElement } from 'react';
import { Button, ButtonProps, Fab, FabProps, Typography } from '@mui/material';
import { Link, useRouteMatch } from 'react-router-dom';

type DisplayType = 'desktop' | 'mobile';
type ButtonType = 'fab' | 'grouped';

export type NavigationButtonProps = {
  link?: string;
  route?: string;
  icon?: ReactElement;
  label?: string;
  displayType?: DisplayType;
  buttonType?: ButtonType;
};

type NavigationFabProps = NavigationButtonProps & Pick<FabProps, 'color'>;

const NavigationFab = React.forwardRef<HTMLButtonElement, NavigationFabProps>(
  (props, ref) => {
    const { displayType, color, icon, label, route = '' } = props;

    return (
      <Fab
        ref={ref}
        size={displayType === 'desktop' ? 'medium' : 'large'}
        color={color}
        variant={displayType === 'desktop' ? 'extended' : 'circular'}
        component={route ? Link : 'button'}
        to={route}
      >
        {icon}
        {displayType === 'desktop' && label && (
          <Typography component="span" variant="h5" sx={{ ml: 1 }}>
            {label}
          </Typography>
        )}
      </Fab>
    );
  },
);

type NavigationGroupedButtonProps = NavigationButtonProps &
  Pick<ButtonProps, 'color'>;

const NavigationGroupedButton = React.forwardRef<
  HTMLButtonElement,
  NavigationGroupedButtonProps
>((props, ref) => {
  const { displayType, color, icon, label, route = '', link, ...rest } = props;

  return (
    <Button
      ref={ref}
      color={color}
      component={route ? Link : 'button'}
      to={route}
      href={!route && link ? link : undefined}
      target={!route && link ? '_blank' : undefined}
      rel={!route && link ? 'noopener' : undefined}
      {...rest}
    >
      {icon}
      {label && (
        <Typography component="span" variant="button" sx={{ ml: 1 }}>
          {label}
        </Typography>
      )}
    </Button>
  );
});

const NavigationButton = React.forwardRef<
  HTMLButtonElement,
  NavigationButtonProps
>((props, ref) => {
  const { route, displayType = 'desktop', buttonType = 'grouped' } = props;

  const routeMatch = useRouteMatch({
    path: route,
    exact: true,
    strict: true,
    sensitive: true,
  });

  const color = routeMatch ? 'secondary' : 'primary';

  if (buttonType === 'fab') {
    return <NavigationFab ref={ref} {...props} color={color} />;
  }

  return <NavigationGroupedButton ref={ref} {...props} color={color} />;
});

export default NavigationButton;
