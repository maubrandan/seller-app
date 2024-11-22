import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../shared/App';
import { template } from './template';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('dist'));

app.get('/', (req, res) => {
  const appHtml = renderToString(<App />);
  const html = template(appHtml);
  res.send(html);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});