import userRepository from "../repositories/user.repositories.js";
import bcrypt from "bcrypt";
import { format } from "date-fns";
import authService from "./auth.service.js"

async function createUserService(newUser) {
  const foundUser = await userRepository.findUserByEmailRepository(
    newUser.email
  );
  if (foundUser) throw new Error("User already exists!");

  const passHash = await bcrypt.hash(newUser.password, 10);

  const user = await userRepository.createUserRepository({
    ...newUser,
    password: passHash,
    createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  });

  if (!user) throw new Error("Error Creating User");

  const token = authService.generateJWT(user.id)
  return token;
}

async function GetfindAllUsers() {
  const allUsers = await userRepository.findAllUsersRepository();
  return allUsers;
}

async function GetfindUserById(id) {
  const user = await userRepository.findUserByIdRepository(id);
  if (!user) {
    throw new Error("Usuário não encontrado!");
  }
  return user;
}

async function DeleteUserService(id) {
  const user = await userRepository.findUserByIdRepository(id);
  if (!user) throw new Error("User Not Found");

  const message = await userRepository.DeleteUserRepository(id);

  return message;
}

// async function UpdateUserServices(newUser, userId) {
//   const user = await userRepository.findUserByIdRepositoryPassword(userId);
//   if (!user) {
//     throw new Error("User Not Found");
//   }

//   if (newUser.password) {
//     newUser.password = await bcrypt.hash(newUser.password, 10);
//   }

//   const editUser = {
//     username: newUser.username ?? user.username,
//     email: newUser.email ?? user.email,
//     password: newUser.password ?? user.password,
//     avatar: newUser.avatar ?? user.avatar,
//   };

//   const userUpdate = await userRepository.UpdateUserRepository(
//     userId,
//     editUser
//   );
//   return userUpdate;
// }

async function UpdateUserServices(newUser, userId) {
 

  if (newUser.password) {
    newUser.password = await bcrypt.hash(newUser.password, 10);
  }

  const updatedUser = {
    username: newUser.username,
    email: newUser.email,
    password: newUser.password,
    avatar: newUser.avatar,
  };

  return await userRepository.UpdateUser(userId, updatedUser);
}

export default {
  createUserService,
  GetfindAllUsers,
  GetfindUserById,
  DeleteUserService,
  UpdateUserServices,
};
