import fs from "fs";
import pkg from "pg";
import bcrypt from "bcrypt";

const { Pool } = pkg;

// koneksi database
const pool = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  database: "mydb",
  password: "123123",
  port: 5432,
});



const insertUsers = async () => {
  try {
    // baca file JSON
    const data = fs.readFileSync("./users.json", "utf-8");
    const users = JSON.parse(data);

    for (const user of users) {
      const { email, name, password } = user;

      // hash password
      const password_hash = await bcrypt.hash(password, 10);

      try {
        await pool.query(
          `INSERT INTO users (email, password_hash, name)
           VALUES ($1, $2, $3)
           ON CONFLICT (email) DO NOTHING`,
          [email, password_hash, name]
        );

        console.log(`✅ Inserted: ${email}`);
      } catch (err) {
        console.error(`❌ Failed insert ${email}:`, err.message);
      }
    }

    console.log("🚀 Done insert users");
    process.exit();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

insertUsers();