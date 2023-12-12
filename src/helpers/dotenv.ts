import dotenv from "dotenv";

dotenv.config();

const getEnv = (env: string): string | undefined => {
  return process.env[env];
};

export default getEnv;
