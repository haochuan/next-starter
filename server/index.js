import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import next from 'next';
import morgan from 'morgan';
import env from './config/env';
import logger from './config/logger';

import routes from './routes/index';

const port = env.port;
const app = next({ dev: env.name === 'development' });
const handle = app.getRequestHandler();
app.prepare().then(() => {
  const server = express();
  /*==================================
=            Middleware            =
==================================*/
  server.use(morgan('tiny', { stream: logger.stream }));
  server.use(helmet());
  server.use(compression());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use('/api', routes);
  server.get('*', (req, res) => {
    return handle(req, res);
  });
  server.listen(port, err => {
    if (err) throw err;
    logger.info(`> ${env.name} server ready on http://localhost:${port}`);
  });
});
