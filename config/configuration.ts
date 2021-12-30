import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  environment: process.env.ENV,
  secretKey: process.env.SECRET_KEY,
  tempSecretKey: process.env.TEMP_SECRET_KEY,
  server: {
    port: parseInt(process.env.PORT, 10) || 3000,
    endpoint: process.env.END_POINT,
    hostname: process.env.HOSTNAME,
  },
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    sync: process.env.DB_SYNCHRONIZE,
  },
}));
