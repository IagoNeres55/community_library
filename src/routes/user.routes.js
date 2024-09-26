import { Router } from "express";
import userController from "../controller/user.controllers.js";
import {
  validate,
  validateUserId,
} from "../middlewares/validation.middlewares.js";
import { userSchema, updateUser, userLogin } from "../schema/user.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// Create User
router.post(
  "/users",
  validate(userSchema),
  userController.createUserController
);

// Login
router.post("/login", validate(userLogin), userController.loginUserController);

router.use(authMiddleware); //valida as rotas
router.get("/users/:id", validateUserId, userController.findUsers);
router.get("/users", userController.findAllUsers);
router.delete("/users/:id", validateUserId, userController.deleteUserById);

router.put(
  "/users/:id",
  validate(updateUser),
  validateUserId,
  userController.updateUserController
);

export default router;
