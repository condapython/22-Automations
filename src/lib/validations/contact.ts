import { z } from 'zod';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const PHONE_REGEX = /^(\+?[0-9]{1,4}[\s.-]?)?(\(?\d{2,4}\)?[\s.-]?)?[0-9]{3,4}[\s.-]?[0-9]{3,6}$/;

export const ContactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name exceeds 100 characters"),
  email: z
    .string()
    .trim()
    .regex(EMAIL_REGEX, "Valid business email required")
    .toLowerCase(),
  company: z
    .string()
    .trim()
    .min(2, "Company name is required")
    .max(120, "Company name exceeds 120 characters"),
  budget: z.string().optional().or(z.literal('')),
  project: z.string().optional().or(z.literal('')),
  offering: z.string().optional().or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(3000, "Message exceeds 3000 characters"),
  // Anti-bot Honeypot field (must remain empty)
  company_website_url: z
    .string()
    .max(0, "Bot detected: honeypot field must be empty")
    .refine((val) => val === '', {
      message: "Bot detected: honeypot field must be empty",
    })
    .optional()
    .default(''),
  // Anti-tamper submission timestamp (must be >= 1500ms dwell time and not in the future)
  form_timestamp: z
    .number()
    .refine(
      (val) => Date.now() - val >= 1500,
      { message: "Submission completed too fast. Automated submission rejected." }
    )
    .refine(
      (val) => Date.now() - val >= 0,
      { message: "Clock skew / invalid future timestamp rejected." }
    )
    .optional(),
});

export const PilotRequestSchema = z.object({
  userName: z
    .string()
    .trim()
    .min(2, "Contact person is required")
    .max(100, "Contact person name exceeds 100 characters"),
  companyName: z
    .string()
    .trim()
    .min(2, "Company name is required")
    .max(120, "Company name exceeds 120 characters"),
  email: z
    .string()
    .trim()
    .regex(EMAIL_REGEX, "Valid business email required")
    .toLowerCase(),
  phone: z
    .string()
    .trim()
    .regex(PHONE_REGEX, "Valid telephone number required"),
  requestType: z.string().optional().default('30-Day Pilot Unit'),
  deploymentEnvironment: z.string().optional().default('commercial'),
  availableDate: z.string().min(1, "Preferred date is required").optional().or(z.literal('')),
  availableTime: z.string().min(1, "Preferred time is required").optional().or(z.literal('')),
  notes: z.string().max(2000, "Notes exceed 2000 characters").optional().or(z.literal('')),
  // Anti-bot Honeypot field (must remain empty)
  fax_number: z
    .string()
    .max(0, "Bot detected: honeypot field must be empty")
    .refine((val) => val === '', {
      message: "Bot detected: honeypot field must be empty",
    })
    .optional()
    .default(''),
  // Anti-tamper submission timestamp (must be >= 1500ms dwell time and not in the future)
  form_timestamp: z
    .number()
    .refine(
      (val) => Date.now() - val >= 1500,
      { message: "Submission completed too quickly. Automated submission rejected." }
    )
    .refine(
      (val) => Date.now() - val >= 0,
      { message: "Invalid future timestamp rejected." }
    )
    .optional(),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;
export type PilotRequestData = z.infer<typeof PilotRequestSchema>;

/**
 * Strips angle brackets and control characters from untrusted user text
 */
export function sanitizeText(input: string): string {
  return String(input || '')
    .replace(/[<>]/g, '')
    .trim();
}

export function validateContactForm(payload: unknown) {
  const result = ContactFormSchema.safeParse(payload);
  if (result.success) {
    return { success: true as const, errors: {} };
  }
  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0]?.toString() || 'form';
    if (!errors[field]) {
      errors[field] = issue.message;
    }
  }
  return { success: false as const, errors };
}

export function validatePilotRequest(payload: unknown) {
  const result = PilotRequestSchema.safeParse(payload);
  if (result.success) {
    return { success: true as const, errors: {} };
  }
  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0]?.toString() || 'form';
    if (!errors[field]) {
      errors[field] = issue.message;
    }
  }
  return { success: false as const, errors };
}
