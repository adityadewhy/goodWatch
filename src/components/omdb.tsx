"use client";

import React, {useEffect, useState} from "react";
import Image from "next/image";
import AddToWatchlistButton from "./addToWatchlistButton";
import Rating from "./rating";

interface Movie {
	Title: string;
	Year: string;
	Released: string;
	Genre: string;
	Director: string;
	Writer: string;
	Actors: string;
	Language: string;
	Country: string;
	Plot: string;
	Poster: string;
	imdbRating: string;
	imdbID: string;
}

interface omdbProps {
	searchTerm: string;
	defaultMovie?: string;
}

export default function Omdb({
	searchTerm,
	defaultMovie = "interstellar",
}: omdbProps) {
	const [movie, setMovie] = useState<Movie | null>(null);
	const omdbApiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;

	const [userId, setUserId] = useState<number | null>(null);
	useEffect(() => {
		const storedUserId = localStorage.getItem("userId");
		setUserId(storedUserId ? parseInt(storedUserId) : null);
	}, []);

	useEffect(() => {
		const termToUse = searchTerm || defaultMovie;

		if (!termToUse) {
			return;
		}

		const isID = termToUse.startsWith("tt");
		const fetchUrl = isID
			? `https://www.omdbapi.com/?apikey=${omdbApiKey}&i=${encodeURIComponent(
					termToUse
			  )}&plot=full`
			: `https://www.omdbapi.com/?apikey=${omdbApiKey}&t=${encodeURIComponent(
					termToUse
			  )}&plot=full`;

		// Replace '[yourkey]' with your actual API key
		fetch(fetchUrl)
			.then((response) => response.json())
			.then((data) => setMovie(data))
			.catch((error) => console.error("Error fetching movie data:", error));
	}, [omdbApiKey, searchTerm, defaultMovie]);

	if (!movie) {
		return <div className="text-center text-gray-700">Loading...</div>;
	}

	return (
		<div className="m-2 p-5 flex bg-gray-900">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
				<div className="poster m-5 p-5 ">
					<Image
						src={movie.Poster}
						alt={`${movie.Title} Poster`}
						className="rounded border-2"
						// layout="intrinsic" // Ensures the image preserves its original aspect ratio
						width={330} // You can specify either width or height (Next.js calculates the other)
						height={0} // Height can be omitted; Next.js will auto-calculate it
					/>
				</div>

				<div className="details m-5 p-5">
					<h1 className="text-2xl font-bold ">
						{movie.Title}{" "}
						<span className="year font-thin text-gray-400">({movie.Year})</span>
					</h1>
					<p className="text-gray-200">
						<strong>Released:</strong> {movie.Released}
					</p>

					<p className="text-gray-200">
						<strong>Genre:</strong> {movie.Genre}
					</p>

					<br />

					<p className="text-gray-200">
						<strong>Director:</strong> {movie.Director}
					</p>
					<p className="text-gray-200">
						<strong>Writer:</strong> {movie.Writer}
					</p>
					<p className="text-gray-200">
						<strong>Actors:</strong> {movie.Actors}
					</p>

					<br />

					<p className="text-gray-200">
						<strong>Language:</strong> {movie.Language}
					</p>
					<p className="text-gray-200">
						<strong>Country:</strong> {movie.Country}
					</p>

					<br />

					{/* 3. Plot */}
					<p className="text-gray-200">
						<strong>Plot:</strong> {movie.Plot}
					</p>

					<br />

					{/* 4. IMDb Rating */}
					<p className="text-gray-200 font-semibold mt-4">
						<strong>IMDb Rating:</strong> {movie.imdbRating}/10
					</p>
				</div>

				<div className="custom-side flex flex-col items-center">
					{/* Ensure the AddToWatchlistButton is only rendered if userId is not null */}
					{userId !== null ? (
						<AddToWatchlistButton
							userId={userId}
							movieId={movie.imdbID}
							title={movie.Title}
							posterUrl={movie.Poster}
						/>
					) : (
						<p className="text-gray-200 mt-4">
							Please sign in to add this movie to your watchlist.
						</p>
					)}

					<div>
						{userId !== null ? (
							<div className="mt-4">
								<Rating
									userId={userId}
									movieId={movie.imdbID}
									title={movie.Title}
									posterUrl={movie.Poster}
								/>
							</div>
						) : (
							<p className="text-gray-200 mt-4">
								Please sign in to rate this movie.
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
