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
        <Button
            variant="contained"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={handleDownload}
        >
            Download Transactions
        </Button>
    );
}