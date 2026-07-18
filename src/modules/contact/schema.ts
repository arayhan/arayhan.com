import { z } from 'zod';

/* Validation shared by the form (client) and the API route (server).
   `company` is a honeypot — humans never see it, bots fill it. */
export const contactSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  message: z.string().trim().min(10),
  company: z.string().max(0).optional().or(z.literal('')),
});

export type ContactInput = z.infer<typeof contactSchema>;
