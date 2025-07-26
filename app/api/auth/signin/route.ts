import { prisma } from "@/prisma/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

export async function POST(req: NextRequest){
    try{
        const data = await req.formData()
    const {email, password} = Object.fromEntries(data.entries())
    const authSecret = process.env.AUTH_SECRET
    const cookiesStore = await cookies()
    const user = await prisma.users.findFirst({where:{email: email as string}})
    if(!user){
        return NextResponse.json({message: "user not found"})
    }

    const matcher = await bcrypt.compare(password as string, user.password)

    if (!matcher) {
        return NextResponse.json({message: "incorrect password"})
    }
    const payLoad = {
        username: user.names,
        email: user.email,
        id : user.id
    }
    const token =  jwt.sign(payLoad,authSecret!, {
        expiresIn: '1d'
    })

    cookiesStore.set("auth-token", token, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'lax'
    })
    
    return NextResponse.json({message: "login sucessful"})
    }
    catch(e){
        return NextResponse.json({message: "internal server error"})

    }
}