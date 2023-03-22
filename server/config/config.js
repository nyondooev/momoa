require('dotenv').config();
const env = process.env;

const development = {
  host: env.MYSQL_HOST,
  database: env.MYSQL_DATABASE,
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  dialect: 'mysql',
};

module.exports = { development };
