import express from 'express';
import path from 'path';

import routes from './routes'; // importamos as rotas
import './database';

// yarn add sucrase nodemon -D -> para chamar melhor os require
// para rodar -> yarn sucrase src/server.js

class App {
  constructor() {
    // chamado automaticamente quando instaciarmos a class app
    this.server = express();
    this.middleeares();
    this.routes();
  }

  middleeares() {
    this.server.use(express.json()); // aplicação pronta para receber requisições no formato de json
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
