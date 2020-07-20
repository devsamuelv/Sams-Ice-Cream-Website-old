import * as dot from 'dotenv';

dot.config();

export const environment = {
  production: true,
  ADMIN_KEY: process.env.ADMIN_KEY,
  APP_ID: "PGMKTGVFVP"
};
