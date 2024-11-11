import React from "react";

export default function Signup() {
	return (
		<div className="flex flex-row min-h-screen justify-center items-center">
			<div className=" bg-gray-900 border-2 p-2 px-6">
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


        </div>
			</div>
		</div>
	);
}
