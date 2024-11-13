"use client";
import React, {useState} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import {useRouter} from "next/navigation";

export default function Signup() {
	const [captchaVerified, setCaptchaVerified] = useState(false);
	const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

	const router = useRouter();

	// Handle reCAPTCHA verification
	function onCaptchaChange(value: string | null) {
		setCaptchaVerified(!!value); // If value exists, CAPTCHA is verified
	}

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value);
	};
	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	// on signup button click  will will User.create(username, password)
	const handleSignupClick = async () => {
		if (!captchaVerified) {
			alert("complete the captcha before clicking sign-up button");
			return;
		}

		try {
			const response = await axios.post("api/signup", {username, password});
			alert(response.data.message);
			localStorage.setItem("userId",response.data.userId)

			router.push("/");
		} catch (error: any) {
			if (error.response) {
				alert(
					error.response.data.message || "An error occurred while signing up."
				);
			} else {
				// If there is no response (e.g., network issues)
				console.error("Error during signup:", error);
				alert("Failed to sign up. Please try again later.");
			}
		}
	};

	return (
		<div className="flex flex-row min-h-screen justify-center items-center">
			<div className="bg-gray-900 border-2 p-2 px-6 rounded">
				<div className="m-2 p-2">
					<div className="flex items-center justify-center">
						<img
							src="https://flowbite.com/docs/images/logo.svg"
							className="h-8"
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
						placeholder="not-encrypted"
						onChange={handlePasswordChange}
						className="placeholder-gray-900 placeholder:text-base placeholder:font-light rounded p-1 text-gray-900 text-base font-bold"
					/>
				</div>

				<div className="m-5 flex flex-col justify-center">
					<p className="font-semibold">Verify CAPTCHA</p>
					<ReCAPTCHA sitekey={recaptchaSiteKey} onChange={onCaptchaChange} />

					{!captchaVerified && (
						<p className="text-red-500 text-sm mt-2">
							Please complete the CAPTCHA
						</p>
					)}
				</div>

				<div className="m-5 flex justify-center">
					<button
						onClick={handleSignupClick}
						disabled={!captchaVerified}
						className={`px-4 py-2 rounded ${
							captchaVerified
								? "bg-blue-500 hover:bg-blue-700 text-white"
								: "bg-gray-500 cursor-not-allowed"
						}`}
					>
						Sign Up
					</button>
				</div>
			</div>
		</div>
	);
}
