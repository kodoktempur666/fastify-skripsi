import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db.js";
import checkoutRoute from "./routes/checkout.route.js";
import client from "prom-client";

// konfigurasi dotenv
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// konfigurasi metrik prometheus
client.collectDefaultMetrics();

const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration",
  labelNames: ["method", "route", "status_code"],
});

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
        error: err.message
    });
}

// middleware untuk mengukur durasi setiap request
app.use((req, res, next) => {
  const start = process.hrtime();

  res.on("finish", () => {
    const diff = process.hrtime(start);
    const duration = diff[0] + diff[1] / 1e9;

    httpRequestDuration
      .labels(req.method, req.baseUrl + req.path, res.statusCode)
      .observe(duration);
  });

  next();
});

app.use(express.json());
app.use(cors());

app.use("/checkout", checkoutRoute);
app.use(errorHandler);

app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.send(`Connected to database: ${result.rows[0].current_database}`);
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
