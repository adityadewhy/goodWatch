"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {useSearchParams} from "next/navigation";
import React, {Suspense, useState} from "react";
import axios from "axios";
import Image from "next/image";

interface WatchlistItem {
	title: string;
	posterUrl: string;
}

interface RatingItem {
	title: string;
	posterUrl: string;
	userRating: number;
}

function StalkContent() {
	const searchParams = useSearchParams();
	const username = searchParams.get("username");

	const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
	const [ratings, setRatings] = useState<RatingItem[]>([]);
	const [loadingWatchlist, setLoadingWatchlist] = useState(false);
	const [loadingRatings, setLoadingRatings] = useState(false);

	const fetchWatchlist = async () => {
		setLoadingWatchlist(true);
		try {
			const response = await axios.get("/api/stalk", {
				params: {username, type: "watchlist"},
			});
			setWatchlist(response.data);
		} catch (error) {
			console.error("Error fetching watchlist:", error);
		} finally {
			setLoadingWatchlist(false);
		}
	};

	const fetchRatings = async () => {
		setLoadingRatings(true);
		try {
			const response = await axios.get("/api/stalk", {
				params: {username, type: "ratings"},
			});
			setRatings(response.data);
		} catch (error) {
			console.error("Error fetching ratings:", error);
		} finally {
			setLoadingRatings(false);
		}
	};

	return (
		<div className="m-2 p-5 flex flex-col items-center bg-gray-900">
			<div className="username text-2xl px-2 font-extrabold">
				{username ? (
					<p>{username}</p>
				) : (
					<p className="text-lg text-red-500">No username provided.</p>
				)}
			</div>

			<div className="mt-4">
				<details className="mb-4">
					<summary
						onClick={fetchWatchlist}
						className="cursor-pointer text-blue-500 font-bold"
					>
						Watchlist
					</summary>
					{loadingWatchlist ? (
						<p>Loading watchlist...</p>
					) : watchlist.length > 0 ? (
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mt-4">
							{watchlist.map((item, index) => (
								<div
									key={index}
									className="p-2 border rounded shadow bg-gray-800"
								>
									<Image
										src={item.posterUrl}
										alt={item.title}
										className="rounded"
										width={200}
										height={300}
									/>
									<p className="font-bold">{item.title}</p>
								</div>
							))}
						</div>
					) : (
						<p className="text-gray-500 mt-2">No items in the watchlist.</p>
					)}
				</details>

				<details>
					<summary
						onClick={fetchRatings}
						className="cursor-pointer text-blue-500 font-bold"
					>
						Ratings
					</summary>
					{loadingRatings ? (
						<p>Loading ratings...</p>
					) : ratings.length > 0 ? (
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mt-4">
							{ratings.map((item, index) => (
								<div
									key={index}
									className="p-2 border rounded shadow bg-gray-800"
								>
									<Image
										src={item.posterUrl}
										alt={item.title}
										className="rounded"
										width={200}
										height={300}
									/>
									<p className="font-bold">{item.title}</p>
									<p className="font-bold">Rating: {item.userRating}/10</p>
								</div>
							))}
						</div>
					) : (
						<p className="text-gray-500 mt-2">No ratings available.</p>
					)}
				</details>
			</div>
		</div>
	);
}

export default function Stalk() {
	return (
		<div>
			<Navbar />
			<Suspense fallback={<p>Loading...</p>}>
				<StalkContent />
			</Suspense>
			<Footer />
		</div>
	);
}
