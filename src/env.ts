import { z } from "zod";

export const envSchema = z.object({
  REACT_APP_API_DOMAIN: z.string(),
});

export const validateEnv = () => envSchema.parse(process.env);
