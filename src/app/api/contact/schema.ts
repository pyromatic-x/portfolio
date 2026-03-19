import { z } from "zod";

export const contactSchema = z.object({
	name: z.string().min(1, "Введите имя").max(30, "Имя слишком длинное"),
	email: z.email("Некорректный email").max(30, "Email слишком длинный"),
	message: z
		.string()
		.min(1, "Введите сообщение")
		.max(200, "Сообщение слишком длинное"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
