"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
	noPhone: z
		.string()
		.min(9)
		.max(12)
		.refine(
			(value) => {
				const phoneRegex = /^\d{10}$/;
				return phoneRegex.test(value);
			},
			{
				message: "Invalid phone number format",
			}
		),
	provider: z.string(),
});

export default function InputForm() {
	const { toast } = useToast();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			noPhone: undefined,
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const data = {
			noPhone: values.noPhone,
			provider: values.provider,
		};
		const response = await fetch("http://localhost:4321/input", {
			method: "POST",
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			throw new Error("Failed to fetch data");
		}

		toast({
			title: "Data added!",
			description: `Phone number: ${values.noPhone} & Provider: ${values.provider}`,
		});


		console.log(response.json);
	}

	async function AutoGenerate(){
		const response = await fetch("http://localhost:4321/auto", {
			method: "POST",
		});
		if (!response.ok) {
			throw new Error("Failed to fetch data");
		}

		toast({
			title: "Success",
			description: 'Auto generated 25 data',
		});
	}
	return (
		<div>
			{/* <Button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</Button> */}
			<Card className="w-96">
				<CardHeader>
					<CardTitle>Data No Handphone</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-4">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<FormField
								control={form.control}
								name="noPhone"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone Number</FormLabel>
										<FormControl>
											<Input placeholder="Enter your phone number" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="provider"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Provider List</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select your desired provider" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="Thelkomsel">Thelkomsel</SelectItem>
												<SelectItem value="BYe.U">BYe.U</SelectItem>
												<SelectItem value="Four">Four</SelectItem>
												<SelectItem value="Xtra">Xtra</SelectItem>
												<SelectItem value="Indobro">Indobro</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex flex-row justify-end gap-4">
								<Button type="submit">Save</Button>
								<Button onClick={AutoGenerate}>Auto</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
			<Toaster />
		</div>
	);
}
