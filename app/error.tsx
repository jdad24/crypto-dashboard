'use client';
import Link from "next/link";
import { Button } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';

export default function Error() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col justify-center items-center p-8">
            <div className="w-full max-w-md">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl overflow-hidden p-8 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-red-500/20 rounded-full">
                            <ErrorIcon sx={{ fontSize: 48, color: '#ef4444' }} />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-4">Oops! Something went wrong</h1>
                    <p className="text-white/70 mb-8 text-lg">
                        We encountered an error while loading this page. Please try again or return to the homepage.
                    </p>
                    <Link href="/">
                        <Button
                            variant="contained"
                            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Go back to Homepage
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    )
}       