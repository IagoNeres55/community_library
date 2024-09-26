import { Router } from "express";
import loanController from "../controller/loan.controller.js";
import {
  validate,
  validadeLoanId,
} from "../middlewares/validation.middlewares.js";
import { loanSchema } from "../schema/loan.schema.js";

const router = Router();

router.post(
  "/loans",
  validate(loanSchema),
  loanController.createLoanController
);
router.get("/loans", loanController.findAllLoanController);

// buscar por id
router.get("/loans/:id", validadeLoanId, loanController.findLoanByIdController);

// criar o delete
router.delete(
  "/loans/:id",
  validadeLoanId,
  loanController.deleteLoanController
);

export default router;
