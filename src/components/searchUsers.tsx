"use client";

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";

export default function SearchUsers() {
	const [inputValue, setInputValue] = useState("");
	const router = useRouter();

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const handleKeyDown = async (
		event: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (event.key === "Enter") {
			event.preventDefault();

			const userId = localStorage.getItem("userId");

			if (!userId) {
				alert("Sign in to search");
				return;
			}

			try {
				const response = await axios.get("/api/findUser", {
					headers: {
						username: inputValue,
					},
				});

				if (response.data) {
					router.push(`/stalk?username=${encodeURIComponent(inputValue)}`);
				}
			} catch (error: unknown) {
				if (axios.isAxiosError(error)) {
					if (error.response && error.response.status === 400) {
						alert("Username does not exist in the database.");
					} else {
						console.error("Error searching user:", error.message);
					}
				} else {
					console.error("Unexpected error:", error);
				}
			}
		}
	};

	return (
		<input
			type="text"
			placeholder="Search-Users..."
			enterKeyHint="search"
			autoComplete="off"
			onChange={handleInputChange}
			onKeyDown={handleKeyDown}
			value={inputValue}
			className="placeholder-gray-900 placeholder:text-base placeholder:font-light rounded p-1 text-gray-900 text-base font-bold"
		/>
	);
}
