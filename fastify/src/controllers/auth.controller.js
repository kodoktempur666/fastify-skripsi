import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/user.model.js";
import { handleResponse } from "../utils/response.js";

const JWT_SECRET = "123";

const mockSendEmail = async (email, name) => {
  // delay random (50–250ms)
  const delay = Math.floor(Math.random() * 200) + 50;

  await new Promise((resolve) => setTimeout(resolve, delay));

  // simulasi failure 5%
  const isSuccess = Math.random() > 0.05;

  if (!isSuccess) {
    throw new Error("SMTP Error (mock)");
  }

  return {
    status: "sent",
    delay,
  };
};

export const register = async (request, reply) => {
  const { email, password, name } = request.body;
  try {
    const existing = await findUserByEmail(email);
    if (existing) return handleResponse(reply, 400, "Email already exists");

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await createUser(email, passwordHash, name, false);

    try {
      const emailResult = await mockSendEmail(newUser.email, newUser.name);

      console.log("Email sent:", emailResult);
    } catch (emailErr) {
      console.error("Email failed:", emailErr.message);
    }

    handleResponse(reply, 201, "User registered successfully", newUser);
  } catch (err) {
    reply.status(500).send({ status: 500, message: err.message });
  }
};

export const login = async (request, reply) => {
  const { email, password } = request.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) return handleResponse(reply, 401, "Invalid credentials");
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return handleResponse(reply, 401, "Invalid credentials");
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    handleResponse(reply, 200, "Login successful", {
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (err) {
    reply.status(500).send({ status: 500, message: err.message });
  }
};
