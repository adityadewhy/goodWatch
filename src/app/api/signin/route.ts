import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const {username, password} = body;

		if (!username || !password) {
			return NextResponse.json(
				{
					message: "username and password are required.",
				},
				{status: 400}
			);
		}

		const existingUser = await prisma.user.findUnique({
			where: {username},
		});

		if (!existingUser) {
			return NextResponse.json(
				{message: "this username doesnt exist in our db"},
				{status: 401}
			);
		}

		const isPasswordValid = await bcrypt.compare(
			password,
			existingUser.password
		);

		if (!isPasswordValid) {
			return NextResponse.json(
				{message: "username and password doesnt match"},
				{status: 401}
			);
		}

		return NextResponse.json(
			{message: "User signed in successfully!", userId: existingUser.id},
			{status: 200}
		);
	} catch (error) {
		console.error("error in signin/route.ts", error);
		return NextResponse.json(
			{message: "internal server error. please try again later "},
			{status: 500}
		);
	}
}
