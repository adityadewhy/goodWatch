// src/app/api/ratings/route.ts
import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
	const {searchParams} = new URL(request.url);
	const userId = searchParams.get("userId");
	const movieId = searchParams.get("movieId");
	console.log(
		"entered api/ratings/route.ts",
		"uid:",userId,
		"mid:",movieId,
	);

	if (!userId) {
		return NextResponse.json({error: "User ID is required"}, {status: 400});
	}

	try {
		if (movieId) {
			// Fetch rating for a specific movie for a specific user
			const rating = await prisma.ratings.findUnique({
				where: {
					userId_movieId: {
						userId: parseInt(userId),
						movieId,
					},
				},
				select: {
					userRating: true,
				},
			});

			// If no rating exists, return null rating instead of empty object
			return NextResponse.json({
				userRating: rating?.userRating ?? null,
			});
		} else {
			// Fetch all ratings for a user
			const userRatings = await prisma.ratings.findMany({
				where: {
					userId: parseInt(userId),
				},
				orderBy: {
					addedAt: "desc",
				},
				select: {
					id: true,
					movieId: true,
					title: true,
					posterUrl: true,
					userRating: true,
					addedAt: true,
				},
			});
			return NextResponse.json(userRatings);
		}
	} catch (error) {
		console.error("Failed to fetch ratings:", error);
		return NextResponse.json(
			{
				error: "Failed to fetch ratings",
				details: error instanceof Error ? error.message : "Unknown error",
			},
			{status: 500}
		);
	}
}

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const {userId, movieId, title, posterUrl, userRating} = body;

		if (
			!userId ||
			!movieId ||
			!title ||
			!posterUrl ||
			userRating === undefined
		) {
			return NextResponse.json(
				{error: "Missing required fields"},
				{status: 400}
			);
		}

		const rating = await prisma.ratings.upsert({
			where: {
				userId_movieId: {
					userId: parseInt(userId),
					movieId,
				},
			},
			update: {
				userRating,
			},
			create: {
				userId: parseInt(userId),
				movieId,
				title,
				posterUrl,
				userRating,
			},
		});

		return NextResponse.json(rating);
	} catch (error) {
		console.error("Failed to upsert rating:", error);
		return NextResponse.json(
			{
				error: "Failed to save rating",
				details: error instanceof Error ? error.message : "Unknown error",
			},
			{status: 500}
		);
	}
}
