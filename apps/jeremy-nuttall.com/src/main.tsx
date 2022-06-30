import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import '@fontsource/space-grotesk/300.css';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/space-mono';
import { init, trackPages } from 'insights-js';
import App from './app/App';

const insightsId = process.env.NX_INSIGHTS_ID;

if (insightsId) {
  init(insightsId);
}

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
