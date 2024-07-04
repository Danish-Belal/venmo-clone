import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
     
     const session = await getServerSession(authOptions);
     const balance = await prisma.balance.findFirst({
         where: {
             userId: Number(session?.user?.id)
         }
     });
     return {
         amount: balance?.amount || 0,
         locked: balance?.locked || 0
     }
}
