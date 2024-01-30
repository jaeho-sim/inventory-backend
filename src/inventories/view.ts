import * as express from 'express';
import * as service from './service';

export const getInventoriesHandler: express.RequestHandler = async (request: express.Request, response: express.Response) => {
  try {
    console.log('GET request received');
    if (!validateToken(request.headers.authorization)) {
      return response.status(401).json("Invalid token");
    }

    const inventories = await service.listInventory();
    return response.status(200).json(JSON.stringify(inventories));
  } catch (error) {
    console.error(error);
    return response.status(400).json("Could not get inventories");
  }
};

export const postInventoryHandler: express.RequestHandler = async (request: express.Request, response: express.Response) => {
  try {
    console.log('POST request received', request.body);
    if (!validateToken(request.headers.authorization)) {
      return response.status(401).json("Invalid token");
    }

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
    if (!validateToken(request.headers.authorization)) {
      return response.status(401).json("Invalid token");
    }

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
    if (!validateToken(request.headers.authorization)) {
      return response.status(401).json("Invalid token");
    }

    const { id } = request.query;
    if (!id || typeof id !== 'string') return response.status(400).json("Missing id");
    await service.deleteInventory(id);
    return response.status(201).json();
  } catch (error) {
    console.error(error);
    return response.status(400).json("Could not delete inventory");
  }
};

const validateToken = (token: string | undefined) => {
  if (!token) return false;
  const tokenParts = token.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer' || !tokenParts[1]) return false;
  return true;
};
