import express from 'express';
import cors from 'cors';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    // Habilitando Middleares e Rotas
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // Configurando JSON
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    // Configurando Rotas
    this.server.use(routes);
  }
}

export default new App().server;
