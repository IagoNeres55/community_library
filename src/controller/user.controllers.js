import { query } from "express";
import userService from "../service/user.services.js";

async function createUserController(req, res) {
  const newUser = req.body;
  try {
    const user = await userService.createUserService(newUser);
    delete user.password;
    res.status(201).send({ user });
  } catch (err) {
    return res.status(400).send(err.message);
  }
}

async function findUsers(req, res) {
  const userId = req.query.id_user;
  try {
    const user = await userService.GetfindUserById(userId);
    res.status(200).send({ user });
  } catch (err) {
    return res.status(400).send(err.message);
  }
}

async function findAllUsers(req, res) {
  try {
    const users = await userService.GetfindAllUsers();
    res.status(200).send({ users });
  } catch (err) {
    return res.status(400).send(err.message);
  }
}

async function deleteUserById(req, res) {
  const userId = req.query.id_user;
  console.log(userId);
  try {
    const user = await userService.DeleteUserService(userId);
    res.status(200).send({ message: "usuário deletado com sucesso." });
  } catch (err) {
    return res.status(400).send(err.message);
  }
}

export default {
  createUserController,
  findUsers,
  findAllUsers,
  deleteUserById,
};
