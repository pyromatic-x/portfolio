import nodemailer from "nodemailer";
import { contactSchema } from "./schema";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_APP_PASSWORD,
	},
});

const rateLimit = new Map<string, number>();
const DAY_MS = 24 * 60 * 60 * 1000;

function isRateLimited(ip: string): boolean {
	const now = Date.now();
	const lastSent = rateLimit.get(ip);

	if (lastSent && now - lastSent < DAY_MS) return true;

	rateLimit.set(ip, now);
	return false;
}

export async function POST(req: Request) {
	try {
		const body = await req.json();

		if (body.website) {
			return Response.json({ ok: true });
		}

		if (typeof body._t === "number" && Date.now() - body._t < 3000) {
			return Response.json({ ok: true });
		}

		const ip =
			req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

		if (isRateLimited(ip)) {
			return Response.json(
				{ error: "Слишком много запросов. Попробуйте позже." },
				{ status: 429 },
			);
		}

		const result = contactSchema.safeParse(body);

		if (!result.success) {
			return Response.json({ error: "Некорректные данные" }, { status: 400 });
		}

		const { name, email, message } = result.data;

		await transporter.sendMail({
			from: `"Портфолио" <${process.env.GMAIL_USER}>`,
			to: process.env.GMAIL_USER,
			replyTo: email,
			subject: `Портфолио: ${name}`,
			text: `От: ${name}\nEmail: ${email}\n\n${message}`,
		});

		return Response.json({ ok: true });
	} catch {
		return Response.json(
			{ error: "Не удалось отправить сообщение" },
			{ status: 500 },
		);
	}
}
