import { Router } from "express";
import userController from "../controller/user.controllers.js";
import { validate } from "../middlewares/validation.middlewares.js";
import { userSchema, updateUser } from "../schema/user.schema.js";

const router = Router();

router.post(
  "/users",
  validate(userSchema),
  userController.createUserController
);

router.get("/users/:id", userController.findUsers);

router.get("/all_users", userController.findAllUsers);

router.delete("/delete_user", userController.deleteUserById);

router.put(
  "/users/:id",
  validate(updateUser),
  userController.updateUserController
);

export default router;
