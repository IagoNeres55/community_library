import userRepository from "../repositories/user.repositories.js";
import bcrypt from "bcrypt";

async function createUserService(newUser) {
  const foundUser = await userRepository.findUserByEmailRepository(
    newUser.email
  );
  if (foundUser) throw new Error("User already exists!");

  const passHash = await bcrypt.hash(newUser.password, 10);

  const user = await userRepository.createUserRepository({
    ...newUser,
    password: passHash,
    createAt: new Date()
  });

  if (!user) throw new Error("Error Creating User");
  return user;
}

async function GetfindAllUsers() {
  const allUsers = await userRepository.findAllUsersRepository();
  if (!allUsers || allUsers.length === 0) {
    throw new Error("Nenhum usuário encontrado!");
  }
  return allUsers;
}

async function GetfindUserById(id) {
  const user = await userRepository.findUserByIdRepository(id)
  if(!user) {
    throw new Error("Usuário não encontrado!")
  }
  return user
  
}

async function DeleteUserService(id) {
  const user = await userRepository.DeleteUserRepository(id)
  if(!user){
    throw new Error("Usuário não existe!")
  }
  return user
  
}

export default { createUserService, GetfindAllUsers, GetfindUserById, DeleteUserService };
