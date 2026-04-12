import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import checkoutRoutes from "./routes/checkout.route.js";
import client from 'prom-client';

dotenv.config();

const app = Fastify({
  logger: true,
});

const port = process.env.PORT || 3000;

client.collectDefaultMetrics();

const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration",
  labelNames: ["method", "route", "status_code"],
});


await app.register(cors, {
  origin: "*",
});


app.addHook("onRequest", async (request, reply) => {
  request.startTime = process.hrtime();
});

app.addHook("onResponse", async (request, reply) => {
  const diff = process.hrtime(request.startTime);
  const duration = diff[0] + diff[1] / 1e9;

  httpRequestDuration
    .labels(
      request.method,
      request.routerPath || request.url,
      reply.statusCode
    )
    .observe(duration);
});

app.get("/metrics", async (request, reply) => {
  reply.header("Content-Type", client.register.contentType);
  return client.register.metrics();
});


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
