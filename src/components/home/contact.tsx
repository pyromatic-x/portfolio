"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/app/api/contact/schema";
import { Section } from "../../components/ui/shared/section";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Input, Textarea } from "@/components/ui/form/input";
import { Button } from "@/components/ui/form/button";

export const HomeContact = () => {
	const [loadedAt] = useState(Date.now);
	const honeypotRef = useRef<HTMLInputElement>(null);

	const form = useForm<ContactFormData>({
		resolver: zodResolver(contactSchema),
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting, isValid },
	} = form;

	const onSubmit = (data: ContactFormData) => {
		const promise = fetch("/api/contact", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				...data,
				_t: loadedAt,
				website: honeypotRef.current?.value,
			}),
		}).then(async (res) => {
			if (!res.ok) {
				const json = await res.json();
				throw new Error(json.error ?? "Ошибка при отправке");
			}
			reset();
		});

		toast.promise(promise, {
			loading: "Отправляем письмо...",
			success: "Письмо отправлено!",
			error: (e: Error) => e.message,
		});
	};

	return (
		<Section
			title={{
				primary: "bottom",
				top: "начать",
				bottom: "диалог",
			}}
		>
			<FormProvider {...form}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-6 w-full max-w-lg mt-6"
				>
					<input
						ref={honeypotRef}
						name="website"
						autoComplete="off"
						tabIndex={-1}
						className="absolute opacity-0 pointer-events-none h-0 w-0"
					/>

					<div className="grid grid-cols-2 gap-2">
						<div>
							<Input
								{...register("name")}
								name="name"
								label="Имя"
								placeholder="Ваше имя..."
								autoComplete="name"
								charsLimit={contactSchema?._def?.shape?.name?.maxLength || 30}
							/>
							{errors.name && (
								<p className="text-red-500 text-sm mt-1">
									{errors.name.message}
								</p>
							)}
						</div>

						<div>
							<Input
								{...register("email")}
								label="Почта"
								placeholder="Ваша почта..."
								type="email"
								autoComplete="email"
								charsLimit={contactSchema?._def?.shape?.email?.maxLength || 30}
							/>
						</div>
					</div>

					<div>
						<Textarea
							{...register("message")}
							label="Сообщение"
							placeholder="Текст вашего сообщения..."
							rows={3}
							charsLimit={contactSchema?._def?.shape?.message?.maxLength || 200}
							className="resize-none"
						/>
						{errors.message && (
							<p className="text-red-500 text-sm mt-1">
								{errors.message.message}
							</p>
						)}
					</div>

					<Button
						type="submit"
						disabled={isSubmitting || !isValid}
						className="w-max self-end"
					>
						{isSubmitting ? "Отправка..." : "Отправить"}
					</Button>
				</form>
			</FormProvider>
		</Section>
	);
};
