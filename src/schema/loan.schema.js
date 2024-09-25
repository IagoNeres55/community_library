import { z } from "zod";

const loanSchema = z.object({
  bookId: z.number().int().positive("loan ID must be a positive interger"),
  dueDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .min(10, "Due date must be in the format YYYY-MM-DD"),
});

const loadIdSchema = z.object({
  loanId: z.number().int().positive("Loan ID must be a possitive integer"),
});

export { loanSchema, loadIdSchema };
