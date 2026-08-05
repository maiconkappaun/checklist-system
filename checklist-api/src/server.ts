import app from "./app";
import { env } from "./config/env";
import { prisma } from "./config/database";

async function startServer() {
  try {
    await prisma.$connect();

    console.log("🗄️ PostgreSQL conectado");

    app.listen(env.port, () => {
      console.log(`🚀 API rodando em http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("❌ Erro ao conectar com PostgreSQL:", error);

    await prisma.$disconnect();

    process.exit(1);
  }
}

startServer();