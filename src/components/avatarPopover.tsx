"use client";
import React, {useState, useEffect} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import axios from "axios";

export default function AvatarPopover() {
	const [isVisible, setIsVisible] = useState(false);
	const [username, setUsername] = useState("");

	const router = useRouter();

	useEffect(() => {
		const userId = localStorage.getItem("userId");

		if (userId) {
			axios
				.get(`/api/getUser`, {
					headers: {
						userId: userId,
					},
				})
				.then((response) => {
					setUsername(response.data.username);
				})
				.catch((error) => {
					console.error("Error fetching user data:", error);
				});
		}
	}, []);

	function togglePopover() {
		setIsVisible(!isVisible);
	}

	function signOut() {
		localStorage.removeItem("userId");
		router.push("/signin");
	}

	return (
		<div className="relative">
			<button
				onClick={togglePopover}
				className="flex items-center"
			>
				<strong>{username || "Signin"}</strong>

				{/* Always render the SVG, remove conditional rendering */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="16"
					viewBox="0 0 48 48"
					width="16"
					className="fill-current text-white"
				>
					<path d="M14 20l10 10 10-10z" />
					<path d="M0 0h48v48H0z" fill="none" />
				</svg>
			</button>
			<div
				className={`bg-gray-800 p-2 text-base shadow-sm rounded absolute ${
					isVisible ? "block" : "hidden"
				}`}
			>
				<ul className="m-2 space-y-2">
					<li>Profile</li>
					<li>Settings</li>

					{username ? (
						<button className="mt-2" onClick={signOut}>
							Sign out
						</button>
					) : (
						<Link href="/signup">
							<button className="mt-2">Sign-up</button>
						</Link>
					)}
				</ul>
			</div>
		</div>
	);
}
