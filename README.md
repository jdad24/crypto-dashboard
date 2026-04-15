# Crypto Dashboard

A comprehensive cryptocurrency market and portfolio tracking application built with Next.js 16, TypeScript, and modern web technologies.

## Production Deployment UI
- `https://crypto-dashboard-six-lyart.vercel.app/`

## 🚀 Features

- **Real-time Market Data**: Track cryptocurrency prices, market caps, and trends
- **Portfolio Management**: Monitor your crypto investments and transactions
- **Interactive Charts**: Visualize price history with lightweight-charts
- **Top 100 Cryptocurrencies**: Browse and analyze the most popular coins
- **Authentication**: Secure user accounts with NextAuth
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS and Material-UI

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Material-UI
- **Authentication**: NextAuth.js
- **Database**: Neon (PostgreSQL)
- **Charts**: Lightweight Charts
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crypto-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file with the following variables:
   ```env
   # Database
   DATABASE_URL=your_neon_database_url

   # NextAuth
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000

   # API Keys (if needed for external crypto APIs)
   COINGECKO_API_KEY=your_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
crypto-dashboard/
├── app/                    # Next.js app directory
│   ├── _components/        # Reusable UI components
│   ├── _lib/              # Utility functions and database
│   ├── _types/            # TypeScript type definitions
│   ├── account/           # Authentication pages
│   ├── api/               # API routes
│   ├── coins/             # Coin detail pages
│   ├── news/              # News page
│   └── portfolio/         # Portfolio management
├── public/                # Static assets
└── ...config files
```

## 📡 API Endpoints

- `GET /api/v1/coins` - Get cryptocurrency data
- `GET /api/v1/coins/history` - Get price history
- `GET /api/v1/marketcap` - Get market capitalization data
- `GET /api/v1/trending` - Get trending cryptocurrencies
- `GET/POST /api/auth/[...nextauth]` - Authentication

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Key Components

- **MarketcapCard**: Displays total market capitalization
- **TrendingCard**: Shows trending cryptocurrencies
- **TopGainersCard**: Lists top performing coins
- **BluechipTable**: Table of top 100 cryptocurrencies
- **PortfolioTable**: User portfolio management
- **TransactionModal**: Add/edit transactions
- **AreaChart**: Price history visualization

## 🔐 Authentication

The app uses NextAuth.js for authentication with support for:
- Email/password login
- Secure session management
- Protected routes

## 📊 Charts & Visualization

- Interactive price charts using Lightweight Charts
- Real-time data updates
- Historical price analysis
- Portfolio performance tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 📞 Support

For support or questions, please contact the development team.