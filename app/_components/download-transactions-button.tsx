'use client';

import { Button } from "@mui/material";

export default function DownloadTransactionsButton({ transactions }: { transactions: any[] }) {
    const handleDownload = () => {
        // Logic to download the portfolio data as a file
        // This could be implemented using a library like FileSaver.js or similar
        console.log("Download portfolio button clicked");

        const blob = new Blob([JSON.stringify(transactions, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'portfolio.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <Button variant="contained" color="primary" onClick={handleDownload}>
            Download Transactions
        </Button>
    );
}