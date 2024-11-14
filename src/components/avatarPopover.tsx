"use client";
import React, {useState, useEffect} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import axios from "axios"; // Import axios if it's not already imported

export default function AvatarPopover() {
	const [isVisible, setIsVisible] = useState(false);
	const [username, setUsername] = useState("");

	const router = useRouter();

	// Simulate fetching username from localStorage or API (update with actual fetch)
	useEffect(() => {
		const userId = localStorage.getItem("userId");

		if (userId) {
			// Make an API call to fetch username
			// You can use axios here or fetch, as shown in previous examples
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

	// Inline LoginUsername component definition
	const LoginUsername = ({username}: {username: string}) => {
		return <strong>{username}</strong>;
	};

	function signOut() {
		localStorage.removeItem("userId");
		router.push("/signin");
	}

	return (
		<div className="relative">
			<button onClick={togglePopover} className="flex items-center w-[120px] justify-between">
				{/* Use the LoginUsername component */}
				<LoginUsername username={username || "Anon"} /> <span className="text-xs">⬇️</span>
			</button>
			<div
				className={`bg-gray-800 p-2 text-base shadow-sm rounded absolute ${
					isVisible ? "block" : "hidden"
				}`}
			>
				<ul className="m-2 space-y-2">
					<li>Profile</li>
					<li>Settings</li>

					{/* If the user is logged in, allow signout */}
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
