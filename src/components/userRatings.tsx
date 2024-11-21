"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface RatingItem {
    id: string;
    movieId: string;
    title: string;
    posterUrl: string;
    userRating: number;
    addedAt: string;
}

export default function UserRatings() {
    const [ratings, setRatings] = useState<RatingItem[]>([]);
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [editedRating, setEditedRating] = useState<number | null>(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            console.error("No user ID found. Please log in.");
            return;
        }

        // Fetch ratings data
        fetch(`/api/ratings?userId=${userId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch ratings");
                }
                return response.json();
            })
            .then((data) => setRatings(data))
            .catch((error) => console.error(error));
    }, []);

    const handleUpdateRating = async (movieId: string) => {
        const userId = localStorage.getItem("userId");

        if (!userId || !editedRating) {
            console.error("No user ID found or invalid rating. Please log in.");
            return;
        }

        try {
            const movie = ratings.find(r => r.movieId === movieId);
            if (!movie) return;

            const response = await fetch(`/api/ratings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: parseInt(userId),
                    movieId,
                    title: movie.title,
                    posterUrl: movie.posterUrl,
                    userRating: editedRating
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update rating");
            }

            // const updatedRating = await response.json();
            setRatings(ratings.map(r => 
                r.movieId === movieId ? { ...r, userRating: editedRating } : r
            ));
            setIsEditing(null);
            setEditedRating(null);
        } catch (error) {
            console.error("Error updating rating:", error);
        }
    };

    const handleRemoveRating = async (movieId: string) => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            console.error("No user ID found. Please log in.");
            return;
        }

        try {
            const response = await fetch(`/api/ratings`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: parseInt(userId), movieId }),
            });

            if (!response.ok) {
                throw new Error("Failed to remove rating");
            }

            setRatings(ratings.filter((item) => item.movieId !== movieId));
        } catch (error) {
            console.error("Error removing rating:", error);
        }
    };

    if (ratings.length === 0) {
        return (
            <div className="text-center text-gray-700">You haven't rated any movies yet.</div>
        );
    }

    return (
        <div className="m-2 p-5 flex flex-col bg-gray-900">
            <h2 className="text-2xl font-bold text-white mb-4">Your Movie Ratings</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {ratings.map((item) => (
                    <div key={item.id} className="p-4 border rounded shadow bg-gray-800">
                        <Image
                            src={item.posterUrl}
                            alt={item.title}
                            className="rounded"
                            width={200}
                            height={300}
                        />
                        <p className="text-white mt-2">{item.title}</p>
                        
                        {isEditing === item.movieId ? (
                            <div className="mt-2">
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={editedRating || ''}
                                    onChange={(e) => setEditedRating(Number(e.target.value))}
                                    className="w-20 px-2 py-1 text-gray-900 rounded"
                                />
                                <button
                                    onClick={() => handleUpdateRating(item.movieId)}
                                    className="ml-2 px-3 py-1 bg-blue-500 text-white rounded"
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div className="mt-2">
                                <p className="text-white">Rating: {item.userRating}/10</p>
                                <button
                                    onClick={() => {
                                        setIsEditing(item.movieId);
                                        setEditedRating(item.userRating);
                                    }}
                                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded mr-2"
                                >
                                    Edit Rating
                                </button>
                                <button
                                    onClick={() => handleRemoveRating(item.movieId)}
                                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                                >
                                    Remove Rating
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}