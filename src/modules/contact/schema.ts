import { z } from 'zod';

/* Validation shared by the form (client) and the API route (server).
   `company` is a honeypot — humans never see it, bots fill it. The schema
   ACCEPTS any value so a tripped honeypot still parses; the route then
   answers a filled honeypot with a fake success instead of a validation
   error that would tip the bot off. */
export const contactSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  message: z.string().trim().min(10),
  company: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
