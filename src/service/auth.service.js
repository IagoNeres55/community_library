import jwt from "jsonwebtoken";
import "dotenv/config";
import userRepositories from "../repositories/user.repositories.js";
import bcrypt from "bcrypt";

function generateJWT(id) {
  return jwt.sign({ id }, process.env.SECRET_JWT, { expiresIn: '24h' });
}

async function LoginService(email, password) {
  const user = await userRepositories.findUserByEmailRepository(email);
  if (!user) throw new Error("invalid user");
  const isPassowordvalid = await bcrypt.compare(password, user.password);
  if (!isPassowordvalid) throw new Error("invalid user");

  const userInfo = {
    userId: user.id,
    username: user.username,
    email: user.email,
    token: generateJWT(user.id)
  

  }
  return userInfo
}

export default { generateJWT, LoginService };
