import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const userId = request.headers.get("userId");  // Get userId from request (e.g., headers, or query)

        if (!userId) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { id: Number(userId) },  // Ensure userId is a number if it's passed as a string
            select: { username: true },
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ username: user.username });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error fetching user" }, { status: 500 });
    }
}
