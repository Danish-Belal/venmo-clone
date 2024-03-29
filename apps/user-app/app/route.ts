import { NextResponse } from "next/server"
import { PrismaClient } from "@repo/db/client";

const client = new PrismaClient();

export const GET = async () => {
    await client.user.create({
        data: {
            email: "aa@gmail.com",
            name: "adsads",
            number: "989160d53",
            password: "danish12a"
            
        }
    })
    return NextResponse.json({
        message: "Data Insertion Done"
    })
}