import userRepository from "../repositories/user.repositories.js";
import bcrypt from "bcrypt";
import { format } from "date-fns";

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
  return user;
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
  const user = await userRepository.DeleteUserRepository(id);
  if (!user) {
    throw new Error("Usuário não existe!");
  }
  return user;
}

async function UpdateUserServices(newUser, userId) {
  const user = await userRepository.findUserByIdRepositoryPassword(userId);
  console.log(user);
  if (!user) {
    throw new Error("User Not Found");
  }

  if (newUser.password) {
    newUser.password = await bcrypt.hash(newUser.password, 10);
  }

  const editUser = {
    username: newUser.username || user.username,
    email: newUser.email || user.email,
    password: newUser.password || user.password,
    avatar: newUser.avatar || user.avatar,
  };

  const userUpdate = await userRepository.UpdateUserRepository(
    userId,
    editUser
  );
  return userUpdate;
}

export default {
  createUserService,
  GetfindAllUsers,
  GetfindUserById,
  DeleteUserService,
  UpdateUserServices,
};
