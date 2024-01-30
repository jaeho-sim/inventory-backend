import { pool } from '../db';

export const listInventory = async () => {
  const result = await pool.query(
    `SELECT i.*, users.name AS user_name, users.email
      FROM inventories AS i
      LEFT JOIN users ON i.user_id = users.id`
  );
  if (!result?.rows) return [];
  return result.rows;
};

export const createInventory = async (id: string, name: string, expiration: string, user_id: string, user_name: string, email: string) => {
  await pool.query(`INSERT INTO users (id, name, email) VALUES ('${user_id}', '${user_name}', '${email}') ON CONFLICT DO NOTHING`);
  await pool.query(`INSERT INTO inventories (id, name, expiration, user_id) VALUES ('${id}', '${name}', '${expiration}', '${user_id}')`);
};

export const updateInventory = async (id: string, name: string, expiration: string) => {
  await pool.query(`UPDATE inventories SET name='${name}', expiration='${expiration}' WHERE id='${id}'`);
};

export const deleteInventory = async (id: string) => {
  await pool.query(`DELETE FROM inventories WHERE id='${id}'`);
};
