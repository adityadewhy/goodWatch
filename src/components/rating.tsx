"use client";

import React, {useState, useEffect} from "react";

interface RatingProps {
	userId: number;
	movieId: string;
	title: string;
	posterUrl: string;
}

export default function Rating({
	userId,
	movieId,
	title,
	posterUrl,
}: RatingProps) {
	const [userMovieRating, setUserMovieRating] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchExistingUserRating = async () => {
			if (!userId || !movieId) {
				setIsLoading(false);
				return;
			}

			setIsLoading(true);
			setError(null);

			try {
				const response = await fetch(
					`/api/ratings?userId=${userId}&movieId=${movieId}`
				);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				setUserMovieRating(data?.userRating ?? null);
			} catch (error) {
				console.error("Fetching rating error:", error); // Logs the error for debugging
				setUserMovieRating(null);
			} finally {
				setIsLoading(false);
			}
		};

		fetchExistingUserRating();
	}, [userId, movieId]);

	const handleRatingSubmit = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch("/api/ratings", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId,
					movieId,
					title,
					posterUrl,
					userRating: userMovieRating,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to save rating");
			}

			const data = await response.json();
			setUserMovieRating(data.userRating);
		} catch (error) {
			console.error("Rating submission error:", error); // Logs the error for debugging
			setError("Failed to save rating. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return <div className="text-gray-400">Loading...</div>;
	}

	if (error) {
		return (
			<div className="text-red-500 text-sm">
				{error}
				<button
					onClick={() => setError(null)}
					className="ml-2 text-blue-500 hover:underline"
				>
					Try Again
				</button>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center space-y-2">
			<div className="flex flex-col items-center space-x-2">
				{userMovieRating && userMovieRating >= 1 && userMovieRating <= 10 && (
					<p className="text-white">Your rating: {userMovieRating}/10</p>
				)}

				<div className="w-32 flex mb-2">
					<input
						type="number"
						min="1"
						max="10"
						placeholder="rate(1-10)"
						value={userMovieRating || ""}
						onChange={(e) => {
							const value = Number(e.target.value);
							if (value >= 1 && value <= 10) {
								setUserMovieRating(value);
							} else {
								setUserMovieRating(null);
							}
						}}
						autoComplete="off"
						className="w-full rounded px-2 py-1 text-gray-900
							 border focus:outline-none focus:ring-2
							  focus:ring-blue-500"
					/>
				</div>
				<button
					onClick={handleRatingSubmit}
					disabled={
						!userMovieRating || userMovieRating < 1 || userMovieRating > 10
					}
					className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
				>
					Update Rating
				</button>
			</div>
		</div>
	);
}
