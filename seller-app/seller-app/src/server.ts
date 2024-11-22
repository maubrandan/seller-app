import * as express from 'express';
import * as path from 'path';
import * as history from 'connect-history-api-fallback';
import * as serveStatic from 'serve-static';

const app = express();
const PORT = process.env.PORT || 4000;
const DIST_FOLDER = path.join(process.cwd(), 'dist/seller-app/browser');

app.use(history({
  index: 'index.html'
}));

app.use(serveStatic(DIST_FOLDER, {
  'index': ['index.html', 'index.htm'],
  'maxAge': 0
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_FOLDER, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
