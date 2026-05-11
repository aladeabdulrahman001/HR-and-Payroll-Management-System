import { config } from 'dotenv';
import dns from 'node:dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);

config({path: '.env.development.local'});

export const { PORT, DB_URI, JWT_SECRET, JWT_EXPIRES_IN} = process.env;