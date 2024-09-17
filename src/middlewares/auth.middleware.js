import jwt from "jsonwebtoken";
import "dotenv/config";
import userServices from "../service/user.services.js";

export function authMiddleware(req, res, next) {
  const tokenHeader = req.headers.authorization;
  if (!tokenHeader) {
    return res.status(401).send({ message: "The token was not informed!" });
  }
  
  // separa meu token em um array de acordo com o espaço 
  const partsToken = tokenHeader.split(" ");
  if (partsToken.length !== 2) {
    return res.status(401).send({ message: "Invalid Token!" });
  }

  const [schema, token] = partsToken;

  // Regex na palavra Bearer 
  if (!/^Bearer$/i.test(schema)) {
    return res.status(401).send({ message: "Malformatted Token" });
  }

  // verificação jwt, passando o token a minha key e uma função async
  jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Invalid Token!", error: err.message });
    }

    const user = await userServices.GetfindUserById(decoded.id);
    if (!user || !user.id) {
      return res.status(401).send({ message: "Invalid Token!" });
    }

    req.userId = user.id;

    return next();
  });
}
