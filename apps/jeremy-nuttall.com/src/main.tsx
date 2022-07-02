import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import '@fontsource/space-grotesk/300.css';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/space-mono';
import App from './app/App';

const rootEl = document.getElementById('root');

if (!rootEl) {
  throw Error('Failed to find the root!');
}

const root = ReactDOM.createRoot(rootEl);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
