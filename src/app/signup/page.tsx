"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toast } from "react-hot-toast";

export default function SignupPage() {
	const router = useRouter();
	const [user, setUser] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);

	useEffect(() => {
		if (
			user.email.length > 0 &&
			user.password.length > 0 &&
			user.username.length > 0
		) {
			setIsButtonDisabled(false);
		} else {
			setIsButtonDisabled(true);
		}
	}, [user]);

	const onSignup = async () => {
		setLoading(true);
		// setIsButtonDisabled(true);
		try {
			const response = await axios.post("/api/users/signup", user);
			console.log("User signed up successfully" + response);
			toast.success("User signed up successfully");
			router.push("/login"); // .push se yeh hota h ki jo apne home route h uske aage yeh route laag jata ha
		} catch (error: any) {
			console.log(error.message);
			toast(error.message);
		}
	};
	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<h1>{loading ? "Processing" : "Signup"}</h1>
			<hr />
			<label htmlFor="username">username</label>
			<input
				className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
				id="username"
				type="text"
				value={user.username}
				onChange={(e) => setUser({ ...user, username: e.target.value })}
				placeholder="username"
			/>
			<label htmlFor="email">email</label>
			<input
				className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
				id="email"
				type="text"
				value={user.email}
				onChange={(e) => setUser({ ...user, email: e.target.value })}
				placeholder="email"
			/>
			<label htmlFor="password">password</label>
			<input
				className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
				id="password"
				type="password"
				value={user.password}
				onChange={(e) => setUser({ ...user, password: e.target.value })}
				placeholder="password"
			/>
			<button
				type="submit"
				onClick={onSignup}
				className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
				{isButtonDisabled ? "please wait" : "Signup"}
			</button>
			<Link href="/login">Visit login page</Link>
		</div>
	);
}
