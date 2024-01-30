import * as express from 'express';
import * as service from './service';

export const getInventoriesHandler: express.RequestHandler = async (request: express.Request, response: express.Response) => {
  console.log('GET request received');
  try {
    const inventories = await service.listInventory();
    console.log('response...', inventories);
    return response.status(200).json(JSON.stringify(inventories));
  } catch (error) {
    console.error(error);
    return response.status(400).json("Could not get inventories");
  }
};

export const postInventoryHandler: express.RequestHandler = async (request: express.Request, response: express.Response) => {
  try {
    console.log('POST request received', request.body);
    const { id, name, expiration, user_id, user_name, email } = request.body;
    await service.createInventory(id, name, expiration, user_id, user_name, email);
    return response.status(201).json();
  } catch (error) {
    console.error(error);
    return response.status(400).json("Could not create inventory");
  }
};

export const patchInventoryHandler: express.RequestHandler = async (request: express.Request, response: express.Response) => {
  try {
    console.log('PATCH request received', request.body);
    const { id, name, expiration } = request.body;
    await service.updateInventory(id, name, expiration);
    return response.status(201).json();
  } catch (error) {
    console.error(error);
    return response.status(400).json("Could not update inventory");
  }
};

export const deleteInventoryHandler: express.RequestHandler = async (request: express.Request, response: express.Response) => {
  try {
    console.log('DELETE request received', request.query);
    const { id } = request.query;
    if (!id || typeof id !== 'string') return response.status(400).json("Missing id");
    await service.deleteInventory(id);
    return response.status(201).json();
  } catch (error) {
    console.error(error);
    return response.status(400).json("Could not delete inventory");
  }
};
