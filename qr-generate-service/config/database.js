import mysql from 'mysql2';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'mysql',
  database: process.env.MYSQL_DATABASE || 'short_url_db'
});

export default pool.promise();