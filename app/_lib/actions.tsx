'use server'
import { addTransaction as addTransactionService } from "../_lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function addTransactionAction(formData: FormData) {
    const email = (await auth())?.['user']?.['email'] || '';
    if (!email) {
        throw Error("User not authenticated")
    }

    const coin = formData.get('coin') as string;
    const quantity = formData.get('quantity') as string;
    const price_per_coin = formData.get('price_per_coin') as string;

    if (!coin || !price_per_coin || !quantity) {        
        throw Error("Missing values")
    }

    try {
        await addTransactionService({            
            email: email,
            coin: coin,
            quantity: parseFloat(quantity),
            price_per_coin: parseFloat(price_per_coin)
        })

        revalidatePath('/portfolio')
    } catch (e) {
        console.error(e)        
    }
}