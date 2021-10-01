import { CssBaseline, ThemeProvider } from '@mui/material';
import { DecoratorFn } from '@storybook/react';
import theme from '../src/app/style/theme';

export const cssBaseline = (StoryFn) => (
  <ThemeProvider theme={theme.dark}>
    <CssBaseline />
    <StoryFn />
  </ThemeProvider>
);

export const decorators = [cssBaseline];
