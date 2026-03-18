import * as z from 'zod';

export const loginSchema = z.object({
  email: z.email('Please enter a valid university email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const signupSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.email('Please enter a valid university email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  roles: z.array(z.enum(['BUYER', 'SELLER'])),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;

export interface User {
  id: string;
  email: string;
  fullName: string;
  roles: ('BUYER' | 'SELLER')[];
  isVerified: boolean;
}