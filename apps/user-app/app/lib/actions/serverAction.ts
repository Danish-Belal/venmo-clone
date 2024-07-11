import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function getBalance() {
    const session = await getServerSession(authOptions);
    if (!session) {
        if (typeof window !== 'undefined') {
            window.location.href = '/api/auth/signin';
        }
        throw new Error("Unauthorized");
    }

    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session.user.id)
        }
    });

    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    };
}

export async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    if (!session) {
        if (typeof window !== 'undefined') {
            window.location.href = '/api/signin';
        }
        throw new Error("Unauthorized");
    }

    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session.user.id)
        }
    });

    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        token: t.token,
        status: t.status,
        provider: t.provider
    }));
}
