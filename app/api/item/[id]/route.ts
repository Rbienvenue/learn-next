import { prisma } from "@/prisma/db";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest, ctx: any) {
    const { id } = await ctx.params;

    try {
        const item = await prisma.items.delete({
            where: { id },
        });

        return new Response(JSON.stringify(item), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error('Error deleting item:', error);
        return new Response('Failed to delete item', { status: 500 });
    }
}

export async function PATCH(request: NextRequest, ctx: any) {
    const {id} = await ctx.params;

    try {
        const data = await request.json();
        const item = await prisma.items.update({
            where: { id },
            data: {
                ...data
            },
        });

    }
}