import { z } from "zod";

const phoneSchema = z.string().trim().refine((phone) => {
	if (!phone) return true;
	const digitsOnly = phone.replace(/\D/g, "");
	return digitsOnly.length >= 10;
}, "Phone number must be at least 10 digits").refine((phone) => {
	if (!phone) return true;
	return /^[\d\s()+.-]+$/.test(phone);
}, "Phone number contains invalid characters");

export const simpleIntakeSchema = z.object({
	name: z.string().min(2, "Name is required"),
	email: z.string()
		.min(1, "Email is required")
		.refine((email) => email.includes("@"), "Email must contain @ symbol")
		.refine((email) => email.includes("."), "Email must contain a domain (.)")
		.refine((email) => email.indexOf("@") < email.lastIndexOf("."), "Invalid email format"),
	phone: phoneSchema.optional().or(z.literal("")),
	businessName: z.string().max(120, "Business / Company name must be 120 characters or less").optional().or(z.literal("")),
	roleInCompany: z.string().max(120, "Role in company must be 120 characters or less").optional().or(z.literal("")),
	businessSize: z.enum(["solo", "small", "growing", "established", "enterprise"]),
	services: z.array(z.enum(["web_development", "social_media_management", "ai_automation"]))
		.min(1, "Select at least one service"),
	urgencyTag: z.enum(["asap", "2_4_weeks", "1_2_months", "flexible"]).optional().or(z.literal("")),
	projectDetails: z.string().max(1200, "Project details must be 1200 characters or less").optional().or(z.literal("")),
	preferredContactMethod: z.enum(["email", "phone"]),
	turnstileToken: z.string().optional()
}).superRefine((data, ctx) => {
	if (data.preferredContactMethod === "phone" && !data.phone?.trim()) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			path: ["phone"],
			message: "Phone number is required if you prefer a phone call"
		});
	}
});

export type SimpleIntake = z.infer<typeof simpleIntakeSchema>;


