import React from "react";
import Omdb from "./omdb";

interface ParentSearchTitlesProps {
	searchTerm: string;
}

export default function ParentSearchTitles({
	searchTerm,
}: ParentSearchTitlesProps) {
	return (
		<div>
			<Omdb searchTerm={searchTerm} />
		</div>
	);
}
