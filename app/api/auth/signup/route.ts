import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { prisma } from "@/prisma/db";

export async function POST(req: NextRequest){
    try{
        const data= await req.json()
        const {firstName, lastName, email, password} = data
        const hashedPass = await bcrypt.hash(password, 10)
        const names = firstName + " " + lastName

        const user = await prisma.users.create(
            {
                data: {
                    names,
                    email,
                    password: hashedPass,
                }
            }
        )
        return NextResponse.json({data: user})
    }

    catch(e){
        return NextResponse.json({message: e}, {status: 500})
    }
}