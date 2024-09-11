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
  const { id } = req.params;
  // const userId = req.query.id_user;
  try {
    const user = await userService.GetfindUserById(id);
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
    return res.status(404).send(err.message);
  }
}

async function deleteUserById(req, res) {
  const userId = req.params.id;
  try {
    const message = await userService.DeleteUserService(userId);
    res.status(200).send(message);
  } catch (err) {
    return res.status(400).send(err.message);
  }
}

async function updateUserController(req, res) {
  const { id } = req.params;
  const newUser = req.body;
  try {
    const message = await userService.UpdateUserServices(newUser, id);
    res.send(message);
  } catch (err) {
    return res.status(400).send(err.message);
  }
}

export default {
  createUserController,
  findUsers,
  findAllUsers,
  deleteUserById,
  updateUserController,
};
