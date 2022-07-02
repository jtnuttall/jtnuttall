import { Breakpoint, useMediaQuery, useTheme } from '@mui/material';

const breakpointKeys: Breakpoint[] = ['xl', 'lg', 'md', 'sm', 'xs'];

type UseBreakpointsProps<T> = Partial<Record<Breakpoint, T>>;

/**
 * This is a really inefficient hook, but for non-mui components that can't be styled using standard CSS
 * media queries, there's not much of another option.
 */
const useBreakpoints = <T>(
  breapointMap: UseBreakpointsProps<T>,
): T | undefined => {
  const { breakpoints } = useTheme();

  const up = {
    xs: useMediaQuery(breakpoints.up('xs')),
    sm: useMediaQuery(breakpoints.up('sm')),
    md: useMediaQuery(breakpoints.up('md')),
    lg: useMediaQuery(breakpoints.up('lg')),
    xl: useMediaQuery(breakpoints.up('xl')),
  };

  const lowestBreakpoint = breakpointKeys.find(
    (key) => up[key] && breapointMap[key],
  );

  return lowestBreakpoint ? breapointMap[lowestBreakpoint] : undefined;
};

export default useBreakpoints;
