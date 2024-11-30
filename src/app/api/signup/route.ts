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
						"Username and password are required. This is sent by signup/route.ts",
				},
				{status: 400}
			);
		}

		// Normalize the username: trim and convert to lowercase
		const normalizedUsername = username.replace(/\s+/g, "").toLowerCase();

		// Check if the username is already taken
		const existingUser = await prisma.user.findUnique({
			where: {username: normalizedUsername},
		});

		if (existingUser) {
			return NextResponse.json(
				{message: "Username is already taken. This is sent by signup/route.ts"},
				{status: 409}
			);
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the new user
		const newUser = await prisma.user.create({
			data: {
				username: normalizedUsername,
				password: hashedPassword,
			},
		});

		return NextResponse.json(
			{message: "User created successfully!", userId: newUser.id},
			{status: 201}
		);
	} catch (error) {
		console.error("Error in signup/route.ts:", error);
		return NextResponse.json(
			{message: "Internal Server Error. Please try again later."},
			{status: 500}
		);
	}
}
