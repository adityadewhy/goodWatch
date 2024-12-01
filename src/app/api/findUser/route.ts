import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
	try {
		const username = request.headers.get("username");

		if (!username) {
			return NextResponse.json(
				{message: "Username is required"},
				{status: 400}
			);
		}

		const user = await prisma.user.findUnique({
			where: {username: username},
			select: {
				id: true,
				username: true,
			},
		});

		if (!user) {
			return NextResponse.json({message: "User not found"}, {status: 400});
		}

		return NextResponse.json(user, {status: 200});
	} catch (error) {
		console.error(error);
		return NextResponse.json({message: "Error fetching user"}, {status: 500});
	}
}
