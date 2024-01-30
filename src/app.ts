import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as queries from './queries';

export const createServer = () => {
  const app: Express = express();

  app.use(cors());
  app.use(bodyParser.json());
  
  app.get('/inventories', queries.getInventories);
  app.post('/inventory', queries.postInventory);
  app.patch('/inventory', queries.patchInventory);
  app.delete('/inventory', queries.deleteInventory);
  return app;
};
