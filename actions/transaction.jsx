'use server';
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serializeAmount = (obj) => ({
    ...obj,
    amount: obj.amount.toNumber(),
})

export async function createTransaction(data) {
    try {
        const { userId } = await auth()
        if (!userId) throw new Error('unauthorized')

        // we will use Arcjet to rate limit 

        const user = await db.user.findUnique({
            where: { clerkUserId: userId }
        })
        if (!user) throw new Error("User not found.")


        const account = await db.account.findUnique({
            where: {
                id: data.accountId,
                userId: user.id,
            }
        })
        if (!account) throw new Error("Account not found.")

        const balanceChange = data.type === 'EXPENSE' ? -data.amount : data.amount;

        const newBalance = account.balance.toNumber() + balanceChange;

        const transaction = await db.$transaction(async (tx) => {
            const newTransaction = await tx.transaction.create({
                data: {
                    ...data,
                    userId: user.id,
                    nextRecurringDate: data.isRecurring && data.recurringInterval ? nextRecurringDate(data.date, data.recurringInterval) : null,
                }
            })

            await tx.account.update({
                where: { id: data.accountId },
                data: { balance: newBalance },
            })

            return newTransaction;
        })
        revalidatePath('/dashboard')
        revalidatePath(`/account/${transaction.accountId}`)

        return { success: true, data: serializeAmount(transaction) }
    } catch (error) {
        throw new Error(error.message)
    }
}

// helper function to caluclate the next recurring date
function nextRecurringDate(startDate, recurringInterval) {
    const date = new Date(startDate);

    switch (recurringInterval) {
        case "DAILY":
            date.setDate(date.getDate() + 1);
            break;
        case "WEEKLY":
            date.setDate(date.getDate() + 7);
            break;
        case "MONTHLY":
            date.setMonth(date.getMonth() + 1);
            break;
        case "YEARLY":
            date.setFullYear(date.getFullYear() + 1);
            break;
    }

    return date;
}