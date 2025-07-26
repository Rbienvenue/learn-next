import { prisma } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { toast } from "sonner";


export async function POST(req: NextRequest) {
    try{
        const body = await req.json();
        const { name, description } = body;

        const item = prisma.items.create({
            data: {
                name,
                description
            }
        })

        return NextResponse.json(item)
    } catch (error) {
        console.error("Error creating item:", error);
        return NextResponse.json({message: "Failed to create item"}, { status: 500 });
    }
}