import pg from "pg";
import * as express from 'express';

const pgConfig = {
  user: process.env.PG_USER || 'admin',
  password: process.env.PG_PASSWORD || 'password',
  host: process.env.PG_HOST || 'postgres',
  database: process.env.PG_DB || 'postgres',
  port: Number(process.env.PG_PORT || '5432'),
};

const pool = new pg.Pool(pgConfig);

export const getInventories: express.RequestHandler = (request: express.Request, response: express.Response) => {
  console.log('GET request received');
  try {
    pool.query(
      `SELECT i.*, users.name AS user_name, users.email
        FROM inventories AS i
        LEFT JOIN users ON i.user_id = users.id`,
    (error, results) => {
      if (error) {
        console.log(pool);
        throw error;
      }
      return response.status(200).json(JSON.stringify(results.rows));
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json("Internet Server Error");
  }
};

export const postInventory: express.RequestHandler = (request: express.Request, response: express.Response) => {
  try {
    console.log('POST request received', request.body);
    const { id, name, expiration, user_id, user_name, email } = request.body;
    if (user_id) {
      pool.query(
        `INSERT INTO users (id, name, email) VALUES ('${user_id}', '${user_name}', '${email}') ON CONFLICT DO NOTHING`,
        error => {
          if (error) {
            console.log(error);
            return response.status(500).json("Could not create user");
          }
          return response.status(201).json();
        }
      );
    }
    pool.query(
      `INSERT INTO inventories (id, name, expiration, user_id) VALUES ('${id}', '${name}', '${expiration}', '${user_id}')`,
      error => {
        if (error) {
          console.log(error);
          return response.status(500).json("Could not create inventory");
        }
        return response.status(201).json();
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).json("Internet Server Error");
  }
};

export const patchInventory: express.RequestHandler = (request: express.Request, response: express.Response) => {
  try {
    console.log('PATCH request received', request.body);
    const { id, name, expiration } = request.body;
    pool.query(
      `UPDATE inventories SET name='${name}', expiration='${expiration}' WHERE id='${id}'`,
      error => {
        if (error) {
          console.log(error);
          return response.status(500).json("Could not update inventory");
        }
        return response.status(201).json();
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).json("Internet Server Error");
  }
};

export const deleteInventory: express.RequestHandler = (request: express.Request, response: express.Response) => {
  try {
    console.log('DELETE request received', request.query);
    const { id } = request.query;
    pool.query(
      `DELETE FROM inventories WHERE id='${id}'`,
      error => {
        if (error) {
          console.log(error);
          return response.status(500).json("Could not delete inventory");
        }
        return response.status(201).json();
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).json("Internet Server Error");
  }
};
