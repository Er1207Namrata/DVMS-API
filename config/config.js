import dotenv from 'dotenv';

dotenv.config({ path: `${process.cwd()}/.env` });

const config = {
  development: {
    username: process.env.DB_USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.HOST_NAME,
    port: 5432,
    dialect: "postgres"
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false
    //   }
    // },
  }
};
9
export default config;
