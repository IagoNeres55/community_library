import jwt from "jsonwebtoken";
import "dotenv/config";
import userRepositories from "../repositories/user.repositories.js";
import bcrypt from "bcrypt";

function generateJWT(id) {
  return jwt.sign({ id }, process.env.SECRET_JWT, { expiresIn: 86400 });
}

async function LoginService(email, password) {
  const user = await userRepositories.findUserByEmailRepository(email);
  if (!user) throw new Error("invalid user");
  const isPassowordvalid = await bcrypt.compare(password, user.password);
  if (!isPassowordvalid) throw new Error("invalid user");
  return generateJWT(user.id);
}

export default { generateJWT, LoginService };
