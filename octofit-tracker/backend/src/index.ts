import express from 'express';
import type { ErrorRequestHandler } from 'express';
import { apiBaseUrl } from './config/apiUrl';
import './config/database';
import apiRoutes from './routes';

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

app.listen(port, () => {
  console.log(`OctoFit API listening at ${apiBaseUrl}`);
});