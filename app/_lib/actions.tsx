'use server'
import { addTransaction as addTransactionService } from "../_lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { deleteTransaction } from "../_lib/db";
import { headers } from "next/headers";

export async function addTransactionAction(formData: FormData) {
    const email = (await auth())?.['user']?.['email'] || '';
    if (!email) {
        throw Error("User not authenticated")
    }

    const coin = formData.get('coin') as string;
    const quantity = formData.get('quantity') as string;
    const price_per_coin = formData.get('price_per_coin') as string;
    const total = formData.get('total') as string;

    if (!coin || !price_per_coin || !quantity) {        
        throw Error("Missing values")
    }

    try {
        await addTransactionService({            
            email: email,
            coin: coin,
            quantity: parseFloat(quantity),
            price_per_coin: parseFloat(price_per_coin),
            total: parseFloat(total)
        })

        revalidatePath('/portfolio')
    } catch (e) {
        console.error(e)        
    }
}

export async function deleteTransactionAction(id:number) {
    const path = (await headers()).get('referer') || '/portfolio';
    await deleteTransaction(id);
    revalidatePath(path)
}