import express from "express";
import db from "@repo/db/client";
const app = express();

app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here?
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
    // TODO: check if the onramp is processing or not
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string;
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount,
    };

    try {
        const existingBalance = await db.balance.findFirst({
            where: {
                userId: Number(paymentInformation.userId),
            },
        });

        if (!existingBalance) {
            throw new Error("Balance not found for user");
        }

        const currentBalance = existingBalance.amount;
        const updatedBalance = currentBalance + Number(paymentInformation.amount);

        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId),
                },
                data: {
                    amount: updatedBalance,
                },
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token,
                },
                data: {
                    status: "Success",
                },
            }),
        ]);

        res.json({
            message: "Captured",
        });
    } catch (e) {
        console.error(e);
        res.status(411).json({
            message: `Error while processing webhook`,e,
        });
    }
});

app.listen(3003);
