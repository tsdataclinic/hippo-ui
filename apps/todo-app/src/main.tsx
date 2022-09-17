import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@hippo/theme-provider';
import { ThemeEditor } from '@hippo/theme-editor';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
      {import.meta.env.DEV ? <ThemeEditor /> : <></>}
    </ThemeProvider>
  </React.StrictMode>,
);
