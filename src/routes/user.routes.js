import { Router } from "express";
import userController from "../controller/user.controllers.js";
const router = Router()

router.post('/users', userController)

export default router