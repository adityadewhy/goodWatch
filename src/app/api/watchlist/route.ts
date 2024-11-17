import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
	const {searchParams} = new URL(request.url);
	const userId = searchParams.get("userId");

	if (!userId) {
		return NextResponse.json({error: "User ID is required"}, {status: 400});
	}

	try {
		const watchlist = await prisma.watchlist.findMany({
			where: {userId: parseInt(userId)},
		});

		return NextResponse.json(watchlist, {status: 200});
	} catch (error) {
		console.error("Failed to fetch watchlist:", error);
		return NextResponse.json(
			{error: "Failed to fetch watchlist"},
			{status: 500}
		);
	}
}

export async function POST(request: Request) {
	const body = await request.json();
	const {userId, movieId, title, posterUrl} = body;

	if (!userId || !movieId || !title || !posterUrl) {
		return NextResponse.json({error: "Missing required fields"}, {status: 400});
	}

	try {
		const watchlistItem = await prisma.watchlist.create({
			data: {
				userId: parseInt(userId),
				movieId,
				title,
				posterUrl,
			},
		});

		return NextResponse.json(watchlistItem, {status: 201});
	} catch (error) {
		console.error("Failed to add to watchlist:", error);
		return NextResponse.json(
			{error: "Failed to add to watchlist"},
			{status: 500}
		);
	}
}

// DELETE route to handle movie removal from watchlist
export async function DELETE(request: Request) {
	try {
		const body = await request.json(); // Parse the body
		const {userId, movieId} = body;

		if (!userId || !movieId) {
			console.error("User ID or Movie ID is missing");
			return NextResponse.json(
				{error: "User ID and Movie ID are required"},
				{status: 400}
			);
		}

		const deletedItem = await prisma.watchlist.deleteMany({
			where: {
				userId: parseInt(userId),
				movieId,
			},
		});

		if (deletedItem.count === 0) {
			return NextResponse.json(
				{error: "Watchlist item not found"},
				{status: 404}
			);
		}

		return NextResponse.json(
			{message: "Item removed from watchlist"},
			{status: 200}
		);
	} catch (error) {
		console.error("Failed to delete watchlist item:", error);
		return NextResponse.json(
			{error: "Failed to delete watchlist item"},
			{status: 500}
		);
	}
}
