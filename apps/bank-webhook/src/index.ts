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
        const userId = Number(paymentInformation.userId);
        const amount = Number(paymentInformation.amount);

        let existingBalance = await db.balance.findFirst({
            where: {
                userId: userId,
            },
        });

        if (!existingBalance) {
            // Create a new balance record if it doesn't exist
            existingBalance = await db.balance.create({
                data: {
                    userId: userId,
                    amount: 0,
                    locked: 0,
                },
            });
        }

        const currentBalance = existingBalance.amount;
        const updatedBalance = currentBalance + amount;

        await db.$transaction([
            db.balance.update({
                where: {
                    userId: userId,
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
        res.status(500).json({
            message: `Error while processing webhook`,
            error: e.message,
        });
    }
});

app.listen(3003, () => {
    console.log("Server is running on port 3003");
});
