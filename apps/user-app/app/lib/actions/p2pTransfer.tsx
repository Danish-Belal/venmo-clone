"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;

  if (!from) {
    return {
      message: "Error while sending"
    };
  }

  const toUser = await prisma.user.findFirst({
    where: {
      number: to
    }
  });

  if (!toUser) {
    return {
      message: "User not found"
    };
  }

  try {
    await prisma.$transaction(async (tx) => {
      // Ensure the sender has a balance record
      // await tx.balance.upsert({
      //   where: { userId: Number(from) },
      //   update: {}, // No update needed, just ensure the record exists
      //   create: {
      //     userId: Number(from),
      //     amount: 0,
      //     locked: 0 // or your default value
      //   },
      // });

      // Ensure the receiver has a balance record
      await tx.balance.upsert({
        where: { userId: toUser.id },
        update: {}, // No update needed, just ensure the record exists
        create: {
          userId: toUser.id,
          amount: 0,
          locked: 0 // or your default value
        },
      });

      // Lock the sender's balance row for update
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;

      const fromBalance = await tx.balance.findUnique({
        where: { userId: Number(from) },
      });

      if (!fromBalance || fromBalance.amount < amount) {
        throw new Error('Insufficient funds');
      }

      // Lock the receiver's balance row for update
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${toUser.id} FOR UPDATE`;

      // Update the sender's balance
      await tx.balance.update({
        where: { userId: Number(from) },
        data: { amount: { decrement: amount } },
      });

      // Update the receiver's balance
      await tx.balance.update({
        where: { userId: toUser.id },
        data: { amount: { increment: amount } },
      });

      // Log the transfer
      await tx.p2pTransfer.create({
        data: {
          fromUserId: Number(from),
          toUserId: toUser.id,
          amount,
          timestamp: new Date()
        }
      });
    });

    return {
      message: "Transfer successful"
    };
  } catch (error) {
    // Type assertion
    const errorMessage = (error as Error).message || "An error occurred during the transfer";
    console.error("Transfer failed:", error);
    return {
      message: errorMessage
    };
  }
}
