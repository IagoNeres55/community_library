import { Router } from "express";
import loanController from "../controller/loan.controller.js";
import { validate } from "../middlewares/validation.middlewares.js";
import { loanSchema, loadIdSchema } from "../schema/loan.schema.js";

const router = Router();

router.post(
  "/loans",
  validate(loanSchema),
  loanController.createLoanController
);
router.get(
  "/loans",
  loanController.findAllLoanController
);

// buscar por id
// router.get(
//   "/loans",
//   loanController.findAllLoanController
// );

// criar o delete
// router.delete(
//   "/loans",
//   loanController.findAllLoanController
// );
export default router;
