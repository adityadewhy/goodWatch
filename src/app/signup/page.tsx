"use client";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha"

export default function Signup() {
	const [captchaVerified, setCaptchaVerified] = useState(false);
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

	// Handle reCAPTCHA verification
	function onCaptchaChange(value: string | null) {
		setCaptchaVerified(!!value); // If value exists, CAPTCHA is verified
	}

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
						className="placeholder-gray-900 placeholder:text-base placeholder:font-light rounded p-1 text-gray-900 text-base font-bold"
					/>
				</div>

				<div className="m-5 flex flex-col justify-center">
					<p className="font-semibold">Enter password</p>
					<input
						type="password"
						placeholder="not-encrypted"
						className="placeholder-gray-900 placeholder:text-base placeholder:font-light rounded p-1 text-gray-900 text-base font-bold"
					/>
				</div>

				<div className="m-5 flex flex-col justify-center">
					<p className="font-semibold">Verify CAPTCHA</p>
					<ReCAPTCHA
						sitekey={recaptchaSiteKey} // Replace with your actual site key
						onChange={onCaptchaChange}
					/>Verify CAPTCHA


					{!captchaVerified && (
						<p className="text-red-500 text-sm mt-2">Please complete the CAPTCHA</p>
					)}
				</div>
				
				<div className="m-5 flex justify-center">
					<button
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

