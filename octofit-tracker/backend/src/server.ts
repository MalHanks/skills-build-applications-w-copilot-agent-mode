import express from 'express';
import type { ErrorRequestHandler } from 'express';
import apiRoutes from './routes';

const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());
app.use('/api', apiRoutes);

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ error: 'Internal server error' });
};

app.use(errorHandler);

export function startServer() {
  app.listen(port, () => {
    console.log(`OctoFit API listening at ${apiBaseUrl}`);
  });
}

export { app, apiBaseUrl };