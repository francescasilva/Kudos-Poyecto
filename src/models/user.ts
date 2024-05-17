import { z } from "zod";

export const userSchema = z.object({

  username: z
    .string({
      required_error: "Username es requerido",
      invalid_type_error: "Username debe ser un string",
    })
    .optional(),

  password: z
    .string({
      required_error: "Password es requerido",
      invalid_type_error: "Password debe ser un string",
    })
    .min(6, "Password debe tener al menos 6 caracteres")
    .optional(),
  role: z
    .enum(["admin", "user"], {
      errorMap: () => ({ message: "El rol debe ser admin o user" }),
    })
    .default("user")
    .optional(),
});

export interface UpdateUserParams {
  id: number;
  fieldsToUpdate: Record<string, any>;
}
export type UserParams = z.infer<typeof userSchema>;

export type User = UserParams & { id: number };

export interface UpdateReviewParams {
  id: number;
  fieldsToUpdate: Record<string, any>;
}