import { config } from "dotenv";

const file = `.env.${process.env.NODE_ENV || 'development'}.local`;
console.log(`Loading env from: ${file}`);
config({ path: file });

export const { PORT, NODE_ENV, MONGODB_URl,
    JWT_SECRET, JWT_EXPIRES_IN
 } = process.env;
