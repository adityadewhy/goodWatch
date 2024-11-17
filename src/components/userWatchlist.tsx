"use client";

import React, {useEffect, useState} from "react";
import Image from "next/image";

interface WatchlistItem {
	id: string;
	title: string;
	posterUrl: string;
}

export default function UserWatchlist() {
	const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);

	useEffect(() => {
		const userId = localStorage.getItem("userId");

		if (!userId) {
			console.error("No user ID found. Please log in.");
			return;
		}

		// Fetch watchlist data (replace with your API endpoint)
		fetch(`/api/watchlist?userId=${userId}`)
			.then((response) => response.json())
			.then((data) => setWatchlist(data))
			.catch((error) => console.error("Error fetching watchlist:", error));
	}, []);

	if (watchlist.length === 0) {
		return (
			<div className="text-center text-gray-700">Your watchlist is empty.</div>
		);
	}

	return (
		<div className="m-2 p-5 flex bg-gray-900">
			<h2 className="text-2xl font-bold text-gray-900">Your Watchlist</h2>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
				{watchlist.map((item) => (
					<div key={item.id} className="p-2 border rounded shadow bg-gray-800">
						<Image src={item.posterUrl} alt={item.title} className="rounded" width={200} height={0}/>
						<p className="text-white mt-2">{item.title}</p>
					</div>
				))}
			</div>
		</div>
	);
}
