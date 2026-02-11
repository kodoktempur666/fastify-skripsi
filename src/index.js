import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import checkoutRoutes from "./routes/checkout.route.js";

dotenv.config();

const app = Fastify({
  logger: true,
});

const port = process.env.PORT || 3000;

// register cors
await app.register(cors, {
  origin: "*",
});

// test route
app.get("/", async (request, reply) => {
  try {
    const result = await pool.query("SELECT current_database()");
    return {
      database: result.rows[0].current_database,
    };
  } catch (err) {
    app.log.error(err);
    reply.code(500);
    return { error: "Database error" };
  }
});

app.register(checkoutRoutes)

// start server
const start = async () => {
  try {
    await app.listen({
      port: port,
      host: "0.0.0.0",
    });
    console.log(`Server listening on port ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
