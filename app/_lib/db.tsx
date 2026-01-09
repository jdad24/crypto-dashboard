import 'server-only'
import { neon } from "@neondatabase/serverless";
import { auth } from "@/auth";

export interface Transaction {
    id?: number;    
    email: string
    coin: string;
    quantity: number;
    price_per_coin: number;
    total: number;
    created_at?: string;
}   

export async function fetchTransactions(): Promise<Transaction[]> {
        const email = (await auth())?.['user']?.['email'];
    try {
        const sql = neon(`${process.env.DATABASE_URL}`)
        const transactions = await sql`SELECT * FROM transactions WHERE email = ${email} ORDER BY created_at DESC` as Transaction[]
        return transactions
    } catch (e) {
        console.error(e)
        return []
    }    
}

export async function addTransaction(transaction: Transaction) {
    const sql = neon(`${process.env.DATABASE_URL}`)
    await sql`INSERT INTO transactions (email, coin, quantity, price_per_coin, total) VALUES (${transaction.email}, ${transaction.coin}, ${transaction.quantity}, ${transaction.price_per_coin}, ${transaction.total})`
}



//SQL CODE TO CREATE AND CALL PROCEDURE FOR CALCULATING PORTFOLIO BALANCE
// CREATE OR REPLACE FUNCTION calculate_portfolio_balance() RETURNS DECIMAL
// LANGUAGE SQL
// AS $$
//   SELECT SUM(total) FROM transactions;
// $$;

// SELECT calculate_portfolio_balance();