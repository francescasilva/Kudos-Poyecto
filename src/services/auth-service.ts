import bcrypt from "bcrypt";
import { User, UserParams } from "../models/auth";
import * as userDB from "../data/auth-data";
import { ApiError } from "../middlewares/error";

export async function createUser(data: UserParams): Promise<User> {
  const { email, password, role } = data;

  const user = await userDB.getUserByEmail(email);
  if (user) {
    throw new ApiError("El email ya está registrado", 400);
  }

  const costFactor = 10;
  const hashedPassword = await bcrypt.hash(password, costFactor);
  const newUser = await userDB.createUser(email, hashedPassword, role);
  return newUser;
}

export async function validateCredentials(
  credentials: UserParams
): Promise<User> {
  const { email, password } = credentials;
  const user = await userDB.getUserByEmail(email);
  const isValid = await bcrypt.compare(password, user?.password || "");
  if (!user || !isValid) {
    throw new ApiError("Credenciales incorrectas", 400);
  }
  return user;
}
