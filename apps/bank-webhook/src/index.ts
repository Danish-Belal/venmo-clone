import express from "express";
import db from "@repo/db/client";
const app = express();

app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
    //TODO: check if the onramp is processing or not
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
        let existingBalance = await db.balance.findFirst({
            where: {
                userId: Number(paymentInformation.userId),
            },
        });

        if (!existingBalance) {
            existingBalance = await db.balance.create({
                data: {
                    userId: Number(paymentInformation.userId),
                    amount: 0,
                    locked: 0
                    
                },
            });
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
        res.status(500).json({
            message: `Error while processing webhook"`,e,
            
        });
    }
});

app.listen(3003, () => {
    console.log("Server is running on port 3003");
});
