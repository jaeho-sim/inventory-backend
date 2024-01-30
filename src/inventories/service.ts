import * as repo from './repository';

export const listInventory = async () => {
  return repo.listInventory();
};

export const createInventory = async (id: string, name: string, expiration: string, user_id: string, user_name: string, email: string) => {
  return repo.createInventory(id, name, expiration, user_id, user_name, email);
};

export const updateInventory = async (id: string, name: string, expiration: string) => {
  return repo.updateInventory(id, name, expiration);
};

export const deleteInventory = async (id: string) => {
  return repo.deleteInventory(id);
};
