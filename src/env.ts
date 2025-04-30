import { z } from "zod";

export const envSchema = z.object({
  REACT_APP_API_DOMAIN: z.string(),
});

console.log({ env: process.env });
console.log(envSchema.safeParse(process.env));
export const validateEnv = () => envSchema.parse(process.env);
