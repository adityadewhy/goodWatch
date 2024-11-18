import React from "react";

export default function SearchUsers() {
	return (
		<input
			type="text"
			placeholder="Search-Users..."
			enterKeyHint="search"
			autoComplete="off"
			className="placeholder-gray-900 placeholder:text-base placeholder:font-light rounded p-1 text-gray-900 text-base font-bold"
		/>
	);
}
