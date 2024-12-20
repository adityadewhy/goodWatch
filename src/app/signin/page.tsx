"use client";

import React, {useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Signin() {
	const router = useRouter();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value);
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleSigninClick = async () => {
		try {
			const response = await axios.post("/api/signin", {username, password});
			alert(response.data.message);
			localStorage.setItem("userId", response.data.userId);

			router.push("/");
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				alert(
					error.response?.data.message || "an error occured while signing in"
				);
			} else {
				console.error("error during signin", error);
				alert("failed to signin. please try again later");
			}
		}
	};

	return (
		<div className="flex flex-row min-h-screen justify-center items-center">
			<div className="bg-gray-900 border-2 p-2 px-6 rounded">
				<div className="m-2 p-2">
					<div className="flex items-center justify-center">
						<Image
							src="/flowbiteLogo.svg"
							className="h-8 w-auto"
							// layout="intrinsic" // Ensures the image preserves its original aspect ratio
							width={25} // You can specify either width or height (Next.js calculates the other)
							height={0} // Height can be omitted; Next.js will auto-calculate it
							alt="Goodwatch Logo"
						/>
						<span className="text-2xl px-2 font-extrabold">GoodWatch</span>
					</div>
				</div>

				<div className="m-5 flex flex-col justify-center">
					<p className="font-semibold">Enter username</p>
					<input
						type="text"
						placeholder="aditya29"
						value={username}
						onChange={handleUsernameChange}
						className="placeholder-gray-900 placeholder:text-base placeholder:font-light rounded p-1 text-gray-900 text-base font-bold"
					/>
				</div>

				<div className="m-5 flex flex-col justify-center">
					<p className="font-semibold">Enter password</p>
					<input
						type="password"
						value={password}
						placeholder="hashed"
						onChange={handlePasswordChange}
						className="placeholder-gray-900 placeholder:text-base placeholder:font-light rounded p-1 text-gray-900 text-base font-bold"
					/>
				</div>

				<div className="m-5 flex justify-center">
					<button
						onClick={handleSigninClick}
						className={`px-4 py-2 rounded ${
							username && password
								? "bg-blue-500 hover:bg-blue-700 text-white"
								: "bg-gray-500 cursor-not-allowed"
						}`}
						disabled={!username || !password} // Disable button if fields are empty
					>
						Sign In
					</button>
				</div>

				<div>
					Not a user?{" "}
					<Link href="/signup">
						<button className="mt-2 font-semibold"> Signup </button>
					</Link>{" "}
					instead
				</div>
			</div>
		</div>
	);
}
