import { object, string, z } from "zod";

export const signupInputSchema = object({
    email: string().email(),
    password: string().min(6),
    name: string().optional()
});

export const signinInputSchema = object({
    email: string().email(),
    password: string().min(6),
    name: string().optional()
});

export const createBlogInputSchema = object({
    title: string(),
    content: string(),
});

export const updateBlogInputSchema = object({
    title: string(),
    content: string(),
    id: string(),
});

export type SignupInput = z.infer<typeof signupInputSchema>;
export type SigninInput = z.infer<typeof signinInputSchema>;
export type CreateBlogInput = z.infer<typeof createBlogInputSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogInputSchema>;
