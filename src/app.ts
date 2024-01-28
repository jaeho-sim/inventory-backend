import express, { Express, RequestHandler } from "express";
export const inventoryRouter: RequestHandler = (req, res) => {
  res.status(200).json({
    name: 'Inventory API'
  })
};

export const createServer = () => {
  const app: Express = express();
  
  app.use('/inventory', inventoryRouter);
  app.use('/', (req, res) => res.status(200).send('Hello World!'));
  return app;
};
