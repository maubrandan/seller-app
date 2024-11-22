import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../shared/App';

export default function template() {
  const appHtml = renderToString(<App />);
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Server Side Rendering</title>
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `;
}