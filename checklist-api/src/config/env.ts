import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL não foi configurada.");
}

export const env = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl: process.env.DATABASE_URL,
};