# APEX Finance — Advanced Financial Intelligence Platform

A world-class fintech dashboard with premium Apple-inspired UI/UX.

## ✨ Features

- **Landing Page** — Cinematic hero, floating cards, animated stats, feature grid
- **Authentication** — Login/Register with Google auth, animated forms
- **Dashboard** — Portfolio overview, live charts, KPI cards, AI insights, news feed
- **Portfolio** — Full holdings table, allocation donut, goals tracker, transactions
- **Markets** — Market heatmap, full asset table, live price updates, sparklines
- **Watchlist** — Custom watchlist, top gainers/losers
- **AI Insights** — Signals, risk analysis, interactive AI chatbot
- **Market News** — AI-curated feed, sentiment meter, trending topics
- **Analytics** — Performance chart, drawdown analysis, monthly returns
- **FX Converter** — Live exchange rates for 10 currencies + crypto
- **Alerts** — Price and technical level alert management
- **Settings** — Full settings with profile, security, notifications, billing

## 🚀 Quick Start

No build step required — pure HTML/CSS/JS.

```bash
# Option 1: Open directly in browser
open index.html

# Option 2: Serve with any static server
npx serve .
# or
python3 -m http.server 3000
# then visit http://localhost:3000
```

## 🗂 Project Structure

```
apex-finance/
├── index.html                 # App entry point
├── src/
│   ├── styles/
│   │   ├── global.css         # Design system, variables, utilities
│   │   ├── landing.css        # Landing page styles
│   │   ├── dashboard.css      # Dashboard & sidebar layout
│   │   ├── auth.css           # Auth forms + component overrides
│   │   └── components.css     # Shared UI components
│   ├── data/
│   │   └── mockData.js        # All financial mock data
│   ├── components/
│   │   ├── Charts.js          # SVG chart renderers
│   │   ├── Ticker.js          # Live ticker tape
│   │   ├── Sidebar.js         # Navigation sidebar
│   │   └── Modal.js           # Modal & toast system
│   └── pages/
│       ├── Landing.js         # Landing / marketing page
│       ├── Auth.js            # Login & Register pages
│       ├── Dashboard.js       # Main dashboard
│       ├── Portfolio.js       # Portfolio management
│       ├── Markets.js         # Markets browser
│       ├── AIInsights.js      # AI analysis + chatbot
│       ├── News.js            # Market news feed
│       ├── Analytics.js       # Deep analytics + converter + alerts + watchlist
│       └── Settings.js        # Settings pages
└── app.js                     # Router & app init
```

## 🎨 Design System

- **Colors:** Pure black (#000) background, white text, blue (#2563ff) accents
- **Typography:** DM Sans (UI) + DM Mono (numbers/code)
- **Components:** Glassmorphism cards, live badges, animated charts
- **Animations:** Fade-up reveals, counter animations, live price flashes

## 🔌 To Connect Real Data

Replace mock data in `src/data/mockData.js` with API calls:

```js
// Example: Polygon.io for stocks
const res = await fetch(`https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2024-01-01/2025-01-01?apiKey=YOUR_KEY`);
```

Recommended APIs:
- **Stocks:** Polygon.io, Alpha Vantage, Finnhub
- **Crypto:** CoinGecko, CoinMarketCap
- **News:** NewsAPI, Benzinga
- **AI:** OpenAI GPT-4o for the chatbot

## 📄 License

MIT — Free to use for personal and commercial projects.

---
Built with ❤️ — Pure HTML/CSS/JS, zero dependencies, zero build step.
