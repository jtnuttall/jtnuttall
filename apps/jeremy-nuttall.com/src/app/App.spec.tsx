import { cleanup, getByText, render, waitFor } from '@testing-library/react';
import mockAxios from 'jest-mock-axios';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  afterEach(() => {
    cleanup();
  });

  it('should render successfully', async () => {
    const { baseElement } = render(<App />);
    await waitFor(() => getByText(baseElement as HTMLElement, 'my message'));
  });
});
