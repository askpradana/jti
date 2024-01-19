"use client";

import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { signOut } from "next-auth/react";
import React, { useEffect } from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
	id: z.string(),
});

const formSchemaEdit = z.object({
	id: z.string(),
	noPhone: z.string(),
	provider: z.string(),
});

interface DataModel {
	id: string;
	noPhone: string;
	provider: string;
}

export default function InputForm() {
	const [data, setData] = React.useState<DataModel[]>([]);
	const [oddData, setOddData] = React.useState<DataModel[]>([]);
	const [evenData, setEvenData] = React.useState<DataModel[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:4321/output", {
					method: "GET",
				});

				if (response.ok) {
					const jsonData = await response.json();
					setData(jsonData);
				} else {
					console.error("Failed to fetch data");
				}
			} catch (e) {
				console.error(e);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {

		const sortedData = data.sort(
			(a, b) => parseInt(a.noPhone, 10) - parseInt(b.noPhone, 10)
		);
		const odd = sortedData.filter(
			(item) => parseInt(item.noPhone, 10) % 2 !== 0
		);
		const even = sortedData.filter(
			(item) => parseInt(item.noPhone, 10) % 2 === 0
		);

		setOddData(odd);
		setEvenData(even);
	}, [data]);

	async function handleDelete(id: string) {
		const param = {
			id: id,
		};
		const response = await fetch("http://localhost:4321/delete", {
			method: "POST",
			body: JSON.stringify(param),
		});
		if (!response.ok) {
			throw new Error("Failed to fetch data");
		} else {
			window.location.reload();
		}
	}

	async function handleEdit(values: z.infer<typeof formSchemaEdit>) {
		const param = {
			id: values.id,
			noPhone: values.noPhone,
			provider: values.provider,
		};
		const response = await fetch("http://localhost:4321/edit", {
			method: "POST",
			body: JSON.stringify(param),
		});
		if (!response.ok) {
			throw new Error("Failed to fetch data");
		} else {
			window.location.reload();
		}
	}

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: "",
		},
	});

	const formEdit = useForm<z.infer<typeof formSchemaEdit>>({
		resolver: zodResolver(formSchemaEdit),
		defaultValues: {
			id: "",
			noPhone: "",
			provider: "",
		},
	});


	function onSubmit(values: z.infer<typeof formSchema>) {

		handleDelete(values.id);
	}

	function onSubmitEdit(values: z.infer<typeof formSchemaEdit>) {

		handleEdit(values);
	}

	return (
		<div>
			<div className="flex flex-row justify-between">
				<br />
				<p>Output</p>
				<Button onClick={() => signOut()}>Log out</Button>
			</div>
			<Table>
				{/* <TableCaption>A list of your recent invoices.</TableCaption> */}
				<TableHeader>
					<TableRow>
						<TableHead>Ganjil</TableHead>
						<TableHead className="text-right">Genap</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>
							{oddData &&
								oddData.map((item) => (
									<div key={item.id}>
										{`ID: ${item.id} | No HP: ${item.noPhone} | provider: ${item.provider}`}
									</div>
								))}
						</TableCell>
						<TableCell className="text-right">
							{evenData &&
								evenData.map((item) => (
									<div key={item.id}>
										{`ID: ${item.id} | No HP: ${item.noPhone} | provider: ${item.provider}`}
									</div>
								))}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
			<div className="flex flex-row justify-end gap-4 mr-4">
				<Popover>
					<PopoverTrigger>Edit</PopoverTrigger>
					<PopoverContent className="w-80">
						<Form {...formEdit}>
							<form
								onSubmit={formEdit.handleSubmit(onSubmitEdit)}
								className="grid gap-4"
							>
								<FormField
									control={formEdit.control}
									name="id"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<SelectTrigger className="w-[180px]">
														<SelectValue placeholder="Select ID to edit" />
													</SelectTrigger>
													<SelectContent>
														<SelectGroup>
															{data &&
																data.map((item) => (
																	<SelectItem
																		key={item.id}
																		value={item.id}
																	>{`ID: ${item.id}`}</SelectItem>
																))}
														</SelectGroup>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={formEdit.control}
									name="noPhone"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input placeholder="Phone number" {...field} />
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={formEdit.control}
									name="provider"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<SelectTrigger className="w-[180px]">
														<SelectValue placeholder="Select provider" />
													</SelectTrigger>
													<SelectContent>
														<SelectGroup>
															{data &&
																data.map((item) => (
																	<SelectItem
																		key={item.provider}
																		value={item.provider}
																	>{`${item.provider}`}</SelectItem>
																))}
														</SelectGroup>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Button type="submit">Edit</Button>
							</form>
						</Form>
					</PopoverContent>
				</Popover>

				<Popover>
					<PopoverTrigger>Delete</PopoverTrigger>
					<PopoverContent className="w-80">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="grid gap-4"
							>
								<FormField
									control={form.control}
									name="id"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<SelectTrigger className="w-[180px]">
														<SelectValue placeholder="Select ID to delete" />
													</SelectTrigger>
													<SelectContent>
														<SelectGroup>
															{data &&
																data.map((item) => (
																	<SelectItem
																		key={item.id}
																		value={item.id}
																	>{`ID: ${item.id}`}</SelectItem>
																))}
														</SelectGroup>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit">Submit</Button>
							</form>
						</Form>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
}
