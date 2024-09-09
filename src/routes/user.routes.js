import { Router } from "express";
import userController from "../controller/user.controllers.js";
import { validate } from "../middlewares/validation.middlewares.js";
import { userSchema } from "../schema/user.schema.js";

const router = Router();

router.post("/users", validate(userSchema), userController.createUserController);

router.get("/users", userController.findUsers);

router.get("/all_users", userController.findAllUsers);

router.delete("/delete_user", userController.deleteUserById)

// router.put("/delete_user", userController.deleteUserById)




export default router;
