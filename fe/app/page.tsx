"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
	const { data: session } = useSession();

	if (session && session.user) {
		return (
			<div>
				<p>Halo {session.user.name}</p>
				<button onClick={()=>signOut()}>Sign out</button>
			</div>
		);
	}
	return (
		<main className="w-screen h-screen  ">
			<p>Login yuk</p>
			<Button onClick={()=>signIn()}>Sign in</Button>
		</main>
	);
}
