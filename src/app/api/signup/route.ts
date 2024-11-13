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
					message:
						"username and password are required. this is sent by signup/route.ts",
				},
				{status: 400}
			);
		}

		const existingUser = await prisma.user.findUnique({
			where: {username},
		});

		if (existingUser) {
			return NextResponse.json(
				{message: "username is already taken. this is sent by signup/route.ts"},
				{status: 409}
			);
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await prisma.user.create({
			data: {
				username,
				password: hashedPassword,
			},
		});

		return NextResponse.json(
			{message: "User created successfully!", userId: newUser.id},
			{status: 201}
		);
	} catch (error) {
		console.error("error in signup/route.ts", error);
		return NextResponse.json(
			{message: "Internal Server Error. Please try again later."},
			{status: 500}
		);
	}
}
