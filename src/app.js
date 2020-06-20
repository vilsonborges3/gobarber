import 'dotenv/config';

import express from 'express';
import path from 'path';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry';

import 'express-async-errors';

import routes from './routes'; // importamos as rotas
import './database';

// yarn add sucrase nodemon -D -> para chamar melhor os require
// para rodar -> yarn sucrase src/server.js

class App {
  constructor() {
    // chamado automaticamente quando instaciarmos a class app
    this.server = express();

    Sentry.init(sentryConfig);

    this.middleeares();
    this.routes();
    this.exeptionHandle();
  }

  middleeares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json()); // aplicação pronta para receber requisições no formato de json
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exeptionHandle() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
