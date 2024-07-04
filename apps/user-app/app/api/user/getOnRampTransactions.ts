import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });

    const transactions = txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }));

    res.status(200).json(transactions);
}
