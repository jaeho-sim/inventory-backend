import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as inventories from './inventories/view';

export const createServer = () => {
  const app: Express = express();

  app.use(cors());
  app.use(bodyParser.json());
  
  app.get('/inventories', inventories.getInventoriesHandler);
  app.post('/inventory', inventories.postInventoryHandler);
  app.patch('/inventory', inventories.patchInventoryHandler);
  app.delete('/inventory', inventories.deleteInventoryHandler);
  return app;
};
