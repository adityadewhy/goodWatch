"use client";

import {useState, useEffect} from "react";
import axios from "axios";

interface AddToWatchlistButtonProps {
	userId: number; // Replace this with appropriate user context logic
	movieId: string;
	title: string;
	posterUrl: string;
}

const AddToWatchlistButton: React.FC<AddToWatchlistButtonProps> = ({
	userId,
	movieId,
	title,
	posterUrl,
}) => {
	const [isInWatchlist, setIsInWatchlist] = useState(false);

	// Check if the movie is already in the watchlist
	useEffect(() => {
		const checkWatchlist = async () => {
			try {
				const response = await axios.get(`/api/watchlist?userId=${userId}`);
				const watchlist = response.data;

				// Check if the movie ID exists in the user's watchlist
				setIsInWatchlist(
					watchlist.some((item: unknown) => {
						if (
							typeof item === "object" &&
							item !== null &&
							"movieId" in item
						) {
							return (item as {movieId: string}).movieId === movieId;
						}
						return false;
					})
				);
			} catch (error) {
				console.error("Failed to fetch watchlist", error);
			}
		};

		checkWatchlist();
	}, [userId, movieId]);

	// Handle adding the movie to the watchlist
	const handleAddToWatchlist = async () => {
		try {
			await axios.post("/api/watchlist", {
				userId,
				movieId,
				title,
				posterUrl,
			});

			setIsInWatchlist(true);
			alert("Added to watchlist!");
		} catch (error) {
			console.error("Failed to add to watchlist", error);
			alert("Could not add to watchlist. Please try again.");
		}
	};

	return (
		<button
			className={`px-4 py-2 rounded mt-4 ${
				isInWatchlist
					? "bg-green-500 text-white cursor-default"
					: "bg-blue-500 text-white hover:bg-blue-600"
			}`}
			onClick={!isInWatchlist ? handleAddToWatchlist : undefined} // Disable click if already in watchlist
			disabled={isInWatchlist} // Prevent multiple additions
		>
			{isInWatchlist ? (
				<>
					<span className="mr-2">✔️</span> In Watchlist
				</>
			) : (
				"+ Add to Watchlist"
			)}
		</button>
	);
};

export default AddToWatchlistButton;
