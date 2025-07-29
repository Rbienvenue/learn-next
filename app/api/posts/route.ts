import { prisma } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.json();
    const { title, description } = data;

    try {
        const post = await prisma.posts.create({
            data: {
                title,
                description,
            }
        })

        return  NextResponse.json(post, { status: 201 });
    }
    catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json({ message: "Failed to create post" }, { status: 500 });
    }
}