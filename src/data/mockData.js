// ===== APEX FINANCE — MOCK DATA =====

const APEX_DATA = {
  user: { name: 'James Davidson', initials: 'JD', email: 'james@apex.finance', plan: 'PRO TIER' },

  portfolio: {
    totalValue: 284921.48,
    invested: 241000,
    dailyPnl: 4218.33,
    dailyPct: 1.50,
    allTimeReturn: 18.24,
    allTimeGain: 43921.48,
    sharpe: 1.84,
    maxDrawdown: -6.2,
    alpha: 9.06,
    sp500Return: 9.18
  },

  holdings: [
    { sym:'NVDA', name:'NVIDIA Corp',   val:64418,  cost:46600, qty:58.8,  pct:38.2,  up:true,  color:'#00d97e', bg:'rgba(0,217,126,0.08)',   price:1094.30, weight:22.6 },
    { sym:'AAPL', name:'Apple Inc',     val:42682,  cost:37980, qty:200,   pct:12.4,  up:true,  color:'#2563ff', bg:'rgba(37,99,255,0.08)',   price:213.41,  weight:15.0 },
    { sym:'BTC',  name:'Bitcoin',       val:38145,  cost:30560, qty:0.566, pct:24.8,  up:true,  color:'#f59e0b', bg:'rgba(245,158,11,0.08)', price:67420,   weight:13.4 },
    { sym:'MSFT', name:'Microsoft',     val:31204,  cost:28740, qty:73.9,  pct:8.6,   up:true,  color:'#2563ff', bg:'rgba(37,99,255,0.08)',   price:422.17,  weight:11.0 },
    { sym:'TSLA', name:'Tesla Inc',     val:22450,  cost:23680, qty:125.9, pct:-5.2,  up:false, color:'#ff3b5c', bg:'rgba(255,59,92,0.08)',  price:178.20,  weight:7.9  },
    { sym:'ETH',  name:'Ethereum',      val:18920,  cost:16400, qty:5.39,  pct:15.3,  up:true,  color:'#7c3aed', bg:'rgba(124,58,237,0.08)', price:3512,    weight:6.6  },
    { sym:'AMZN', name:'Amazon',        val:16850,  cost:15440, qty:85,    pct:9.1,   up:true,  color:'#2563ff', bg:'rgba(37,99,255,0.08)',   price:198.45,  weight:5.9  },
    { sym:'GOOGL', name:'Alphabet',     val:14200,  cost:13100, qty:80.4,  pct:8.4,   up:true,  color:'#2563ff', bg:'rgba(37,99,255,0.08)',   price:176.85,  weight:5.0  },
    { sym:'META', name:'Meta',          val:12640,  cost:13200, qty:24.1,  pct:-4.2,  up:false, color:'#ff3b5c', bg:'rgba(255,59,92,0.08)',  price:524.60,  weight:4.4  },
    { sym:'SOL',  name:'Solana',        val:10880,  cost:8200,  qty:64.6,  pct:32.7,  up:true,  color:'#06b6d4', bg:'rgba(6,182,212,0.08)',  price:168.40,  weight:3.8  },
    { sym:'SPY',  name:'S&P 500 ETF',   val:9420,   cost:8800,  qty:17.5,  pct:7.0,   up:true,  color:'#aaa',    bg:'rgba(170,170,170,0.08)', price:537.21,  weight:3.3  },
    { sym:'QQQ',  name:'Nasdaq ETF',    val:8200,   cost:7600,  qty:17.8,  pct:7.9,   up:true,  color:'#aaa',    bg:'rgba(170,170,170,0.08)', price:460.88,  weight:2.9  },
    { sym:'COIN', name:'Coinbase',      val:5912,   cost:5200,  qty:52.8,  pct:13.7,  up:true,  color:'#2563ff', bg:'rgba(37,99,255,0.08)',   price:112.00,  weight:2.1  },
    { sym:'AMD',  name:'AMD',           val:5000,   cost:4800,  qty:44.2,  pct:4.2,   up:true,  color:'#f59e0b', bg:'rgba(245,158,11,0.08)', price:113.20,  weight:1.8  },
  ],

  markets: [
    { sym:'AAPL',  name:'Apple',      full:'Apple Inc',      price:213.41, chg:2.61,  pct:1.24,  up:true,  vol:'68.2M',  mktcap:'$3.29T', color:'#3b82f6', bg:'rgba(59,130,246,0.1)' },
    { sym:'NVDA',  name:'NVIDIA',     full:'NVIDIA Corp',    price:1094.3, chg:40.1,  pct:3.81,  up:true,  vol:'42.5M',  mktcap:'$2.70T', color:'#22c55e', bg:'rgba(34,197,94,0.1)'  },
    { sym:'MSFT',  name:'Microsoft',  full:'Microsoft Corp', price:422.17, chg:3.84,  pct:0.92,  up:true,  vol:'22.1M',  mktcap:'$3.14T', color:'#3b82f6', bg:'rgba(59,130,246,0.1)' },
    { sym:'TSLA',  name:'Tesla',      full:'Tesla Inc',      price:178.20, chg:-3.89, pct:-2.14, up:false, vol:'88.4M',  mktcap:'$568B',  color:'#ef4444', bg:'rgba(239,68,68,0.1)'  },
    { sym:'AMZN',  name:'Amazon',     full:'Amazon.com',     price:198.45, chg:3.05,  pct:1.56,  up:true,  vol:'34.2M',  mktcap:'$2.08T', color:'#f59e0b', bg:'rgba(245,158,11,0.1)' },
    { sym:'GOOGL', name:'Alphabet',   full:'Alphabet Inc',   price:176.85, chg:1.30,  pct:0.74,  up:true,  vol:'28.8M',  mktcap:'$2.21T', color:'#3b82f6', bg:'rgba(59,130,246,0.1)' },
    { sym:'META',  name:'Meta',       full:'Meta Platforms', price:524.60, chg:-2.00, pct:-0.38, up:false, vol:'15.4M',  mktcap:'$1.33T', color:'#3b82f6', bg:'rgba(59,130,246,0.1)' },
    { sym:'BTC',   name:'Bitcoin',    full:'Bitcoin',        price:67420,  chg:1524,  pct:2.31,  up:true,  vol:'$28.4B', mktcap:'$1.32T', color:'#f59e0b', bg:'rgba(245,158,11,0.1)' },
    { sym:'ETH',   name:'Ethereum',   full:'Ethereum',       price:3512,   chg:65.2,  pct:1.89,  up:true,  vol:'$14.2B', mktcap:'$421B',  color:'#8b5cf6', bg:'rgba(139,92,246,0.1)' },
    { sym:'SOL',   name:'Solana',     full:'Solana',         price:168.40, chg:6.81,  pct:4.20,  up:true,  vol:'$4.8B',  mktcap:'$74B',   color:'#06b6d4', bg:'rgba(6,182,212,0.1)'  },
    { sym:'BNB',   name:'BNB',        full:'BNB Chain',      price:620.40, chg:-8.20, pct:-1.31, up:false, vol:'$2.1B',  mktcap:'$91B',   color:'#f59e0b', bg:'rgba(245,158,11,0.1)' },
    { sym:'XRP',   name:'XRP',        full:'Ripple',         price:0.58,   chg:0.02,  pct:3.57,  up:true,  vol:'$3.4B',  mktcap:'$32B',   color:'#06b6d4', bg:'rgba(6,182,212,0.1)'  },
    { sym:'SPY',   name:'S&P ETF',    full:'SPDR S&P 500',   price:537.21, chg:2.41,  pct:0.45,  up:true,  vol:'52.4M',  mktcap:'—',      color:'#6b7280', bg:'rgba(107,114,128,0.1)'},
    { sym:'QQQ',   name:'Nasdaq ETF', full:'Invesco QQQ',    price:460.88, chg:2.84,  pct:0.62,  up:true,  vol:'38.1M',  mktcap:'—',      color:'#6b7280', bg:'rgba(107,114,128,0.1)'},
  ],

  tickers: [
    {sym:'AAPL', price:'213.41', chg:'+1.24%', up:true},
    {sym:'NVDA', price:'1,094', chg:'+3.81%', up:true},
    {sym:'MSFT', price:'422.17', chg:'+0.92%', up:true},
    {sym:'TSLA', price:'178.20', chg:'-2.14%', up:false},
    {sym:'AMZN', price:'198.45', chg:'+1.56%', up:true},
    {sym:'GOOGL', price:'176.85', chg:'+0.74%', up:true},
    {sym:'BTC', price:'67,420', chg:'+2.31%', up:true},
    {sym:'ETH', price:'3,512', chg:'+1.89%', up:true},
    {sym:'SOL', price:'168.40', chg:'+4.20%', up:true},
    {sym:'META', price:'524.60', chg:'-0.38%', up:false},
    {sym:'SPY', price:'537.21', chg:'+0.45%', up:true},
    {sym:'QQQ', price:'460.88', chg:'+0.62%', up:true},
    {sym:'AMD', price:'113.20', chg:'+1.88%', up:true},
    {sym:'COIN', price:'112.00', chg:'+5.20%', up:true},
  ],

  insights: [
    { tag:'BULLISH', text:'NVDA shows strong momentum after earnings beat expectations by 28%. AI chip demand continues to surge — increasing your position could capture further upside.', meta:'Confidence: 87%  ·  Updated 2h ago', type:'bull' },
    { tag:'ALERT', text:'TSLA RSI approaching oversold territory at 32. Historical patterns suggest a mean reversion within 5 trading days — watch for entry signal.', meta:'Confidence: 72%  ·  Updated 4h ago', type:'bear' },
    { tag:'OPPORTUNITY', text:'BTC dominance rising to 54.2%. Altcoin season may be concluding — consider rotating profits from SOL back into BTC for lower volatility exposure.', meta:'Confidence: 81%  ·  Updated 6h ago', type:'neutral' },
    { tag:'RISK', text:'Tech sector concentration at 68% of your portfolio exceeds the recommended 40-50% threshold. Diversification into healthcare or utilities may reduce drawdown risk.', meta:'Confidence: 94%  ·  Updated 1d ago', type:'bear' },
    { tag:'CATALYST', text:'Apple\'s WWDC developer conference this week may serve as a positive catalyst — AI features expected to be announced for next iPhone supercycle.', meta:'Confidence: 76%  ·  Updated 3h ago', type:'bull' },
  ],

  news: [
    { cat:'MACRO',    title:'Fed signals rate cuts ahead as inflation cools to 2.8% in latest CPI print', src:'Reuters',    time:'14m ago', impact:'high' },
    { cat:'CRYPTO',   title:'Bitcoin ETF inflows hit $840M in a single day, setting a new all-time record', src:'Bloomberg',  time:'38m ago', impact:'high' },
    { cat:'EARNINGS', title:'NVIDIA Q1 smashes estimates; data center revenue up 427% year-over-year', src:'WSJ',        time:'2h ago',  impact:'high' },
    { cat:'TECH',     title:'Apple Vision Pro 2 production reportedly set for Q3 launch this year', src:'9to5Mac',    time:'3h ago',  impact:'med'  },
    { cat:'MARKETS',  title:'S&P 500 touches all-time high as AI-driven tech rally enters 6th month', src:'CNBC',       time:'4h ago',  impact:'low'  },
    { cat:'CRYPTO',   title:'Ethereum Denver upgrade reduces gas fees by 40%, boosting DeFi activity', src:'CoinDesk',   time:'5h ago',  impact:'med'  },
    { cat:'MACRO',    title:'US unemployment drops to 3.7%, supporting soft landing narrative', src:'FT',         time:'6h ago',  impact:'med'  },
    { cat:'TECH',     title:'Microsoft announces Copilot+ PC lineup with dedicated AI processors', src:'The Verge',  time:'8h ago',  impact:'low'  },
  ],

  transactions: [
    { date:'May 28', sym:'NVDA', type:'buy',  qty:5,     price:1050.20, total:5251.00  },
    { date:'May 26', sym:'BTC',  type:'buy',  qty:0.05,  price:64800,   total:3240.00  },
    { date:'May 24', sym:'TSLA', type:'sell', qty:10,    price:185.40,  total:1854.00  },
    { date:'May 22', sym:'AAPL', type:'buy',  qty:15,    price:210.80,  total:3162.00  },
    { date:'May 20', sym:'ETH',  type:'buy',  qty:0.5,   price:3450,    total:1725.00  },
    { date:'May 18', sym:'META', type:'sell', qty:5,     price:530.00,  total:2650.00  },
    { date:'May 15', sym:'SOL',  type:'buy',  qty:10,    price:160.20,  total:1602.00  },
    { date:'May 12', sym:'MSFT', type:'buy',  qty:8,     price:415.00,  total:3320.00  },
  ],

  goals: [
    { name:'Emergency Fund',    current:45000,  target:50000,  color:'#2563ff' },
    { name:'Down Payment',      current:82000,  target:150000, color:'#00d97e' },
    { name:'Retirement (2045)', current:284921, target:2000000,color:'#7c3aed' },
    { name:'Vacation Fund',     current:4200,   target:8000,   color:'#f59e0b' },
  ],

  allocation: [
    { sym:'Tech Stocks',  pct:42, val:119666, color:'#2563ff' },
    { sym:'Crypto',       pct:24, val:68306,  color:'#f59e0b' },
    { sym:'ETFs',         pct:16, val:45547,  color:'#aaa'    },
    { sym:'EV/Auto',      pct:8,  val:22754,  color:'#ff3b5c' },
    { sym:'Other',        pct:10, val:28648,  color:'#7c3aed' },
  ],

  currencies: ['USD','EUR','GBP','JPY','CAD','AUD','CHF','INR','BTC','ETH'],
  fxRates: {
    USD:1, EUR:0.920, GBP:0.787, JPY:156.8, CAD:1.368,
    AUD:1.521, CHF:0.895, INR:83.42, BTC:0.0000148, ETH:0.000285
  },

  chartData: {
    '1D':  [100,100.2,99.8,100.5,101.2,100.8,101.5,102.1,101.8,102.5,103.1,102.8,103.4,104.1,103.8,104.5,105.2,104.9,105.5,106.2,105.8,106.4,107.1,107.8],
    '1W':  [100,101.2,100.4,102.1,103.5,102.8,104.2,103.6,105.0,104.4,106.2,105.5,107.1,108.4,107.2,109.0,108.4,110.2,109.6,111.4,110.8,112.2,111.6,113.0],
    '1M':  [100,100.8,101.5,102.2,101.8,103.1,104.2,103.6,105.0,106.4,105.8,107.2,108.5,107.9,109.4,110.8,110.1,111.6,113.0,112.4,114.0,115.5,114.8,116.4],
    '3M':  [100,102.4,104.8,103.2,106.0,108.5,107.0,110.0,112.5,111.0,114.2,116.8,115.4,118.2,120.8,119.5,122.4,125.0,124.2,127.2,129.8,129.0,132.2,134.8],
    '1Y':  [100,103.2,107.8,105.4,110.2,115.8,113.2,118.4,122.8,120.4,126.2,132.0,130.4,137.2,143.8,142.0,149.2,156.2,154.5,162.4,169.8,168.2,176.2,184.2],
    'ALL': [100,105,110,108,115,122,120,128,136,134,142,151,149,158,168,165,175,186,184,195,207,205,218,230],
    'SP':  [100,101.5,103.2,102.4,104.8,106.5,105.8,107.6,109.4,108.8,110.6,112.5,111.8,113.8,115.8,115.2,117.4,119.6,119.0,121.4,123.8,123.2,125.8,128.2],
  },
};

// Freeze so it's not mutated accidentally
window.APEX_DATA = APEX_DATA;
