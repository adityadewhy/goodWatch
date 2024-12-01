import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
	try {
		const {searchParams} = new URL(request.url);
		const username = searchParams.get("username");
		const type = searchParams.get("type");

		if (!username || !type) {
			return NextResponse.json(
				{message: "Username and type are required"},
				{status: 400}
			);
		}

		// Validate the user
		const user = await prisma.user.findUnique({
			where: {username},
			select: {
				id: true,
				username: true,
			},
		});

		if (!user) {
			return NextResponse.json({message: "User not found"}, {status: 404});
		}

		if (type === "watchlist") {
			const watchlist = await prisma.watchlist.findMany({
				where: {user: {username}},
				select: {title: true, posterUrl: true},
			});
			return NextResponse.json(watchlist);
		}

		if (type === "ratings") {
			const ratings = await prisma.ratings.findMany({
				where: {user: {username}},
				select: {title: true, posterUrl: true, userRating: true},
			});
			return NextResponse.json(ratings);
		}

		return NextResponse.json({message: "Invalid type"}, {status: 400});
	} catch (error) {
		console.error("Error fetching stalk data:", error);
		return NextResponse.json({message: "Error fetching data"}, {status: 500});
	}
}
