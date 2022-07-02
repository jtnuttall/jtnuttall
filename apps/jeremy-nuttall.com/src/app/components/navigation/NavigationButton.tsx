import React, { ReactElement, useMemo } from 'react';
import {
  Button,
  ButtonProps,
  Fab,
  FabProps,
  Typography,
  useTheme,
} from '@mui/material';
import { Link, useMatch } from 'react-router-dom';
import { css } from '@emotion/react';

type DisplayType = 'desktop' | 'mobile';
type ButtonType = 'fab' | 'grouped';

export type NavigationButtonProps = {
  link?: string;
  to?: string;
  icon?: ReactElement;
  label?: string;
  displayType?: DisplayType;
  buttonType?: ButtonType;
  selected?: boolean;
};

type NavigationFabProps = NavigationButtonProps & Pick<FabProps, 'color'>;

const NavigationFab = React.forwardRef<HTMLButtonElement, NavigationFabProps>(
  ({ displayType, icon, label, to = '', selected }, ref) => (
    <Fab
      ref={ref}
      size={displayType === 'desktop' ? 'medium' : 'large'}
      color={selected ? 'primary' : 'secondary'}
      variant={displayType === 'desktop' ? 'extended' : 'circular'}
      component={to ? Link : 'button'}
      to={to}
    >
      {icon}
      {displayType === 'desktop' && label && (
        <Typography component="span" variant="h5" sx={{ ml: 1 }}>
          {label}
        </Typography>
      )}
    </Fab>
  ),
);

type GroupedNavButtonProps = NavigationButtonProps &
  Partial<Pick<ButtonProps, 'color'>>;

const useMobileCss = (selected = false) => {
  const { palette } = useTheme();

  const mobileCss = useMemo(
    () => css`
      color: ${selected
        ? palette.primary.light
        : palette.getContrastText(palette.background.paper)};
    `,
    [selected, palette],
  );

  return mobileCss;
};

const GroupedNavButton = React.forwardRef<
  HTMLButtonElement,
  GroupedNavButtonProps
>((props, ref) => {
  const {
    displayType,
    buttonType,
    icon,
    label,
    link,
    to = '',
    selected,
    ...rest
  } = props;

  const color = useMemo(() => {
    if (displayType !== 'desktop') {
      return undefined;
    }

    return selected ? 'primary' : 'secondary';
  }, [displayType, selected]);

  const mobileCss = useMobileCss(selected);

  return (
    <Button
      {...rest}
      ref={ref}
      color={color}
      css={displayType === 'mobile' && mobileCss}
      component={to ? Link : 'button'}
      to={to}
      href={!to && link ? link : undefined}
      target={!to && link ? '_blank' : undefined}
      rel={!to && link ? 'noopener' : undefined}
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
  const { to, link, buttonType = 'grouped' } = props;
  const routeMatch = useMatch({
    path: to || 'noroute',
    end: true,
    caseSensitive: true,
  });

  const selected = !!to && !link && !!routeMatch;

  if (buttonType === 'fab') {
    return <NavigationFab ref={ref} {...props} selected={selected} />;
  }

  return <GroupedNavButton ref={ref} {...props} selected={selected} />;
});

export default NavigationButton;
