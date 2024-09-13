import { id } from "date-fns/locale";
import { z } from "zod";

const userSchema = z.object({
  username: z.string().min(3, "Username is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  avatar: z.string().url("invalid URL").optional(),
});

const updateUser = z.object({
  username: z.string().min(3, "User name").optional(),
  email: z.string().email("E-mail invalido").optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .optional(),
  avatar: z.string().url("invalid URL").optional(),
});

const userIdSchema = z.object({
  userId: z.number().int().positive("User ID must be a positive integer"),
});

const userLogin = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export { userSchema, updateUser, userIdSchema,userLogin};
