// ===== MARKETS PAGE =====

let _marketFilter = 'all';

function renderMarkets() {
  const categories = ['all','stocks','crypto','etf'];

  return `
    <div id="tickerMount"></div>
    <div class="app-shell">
      ${renderSidebar('markets')}
      <div class="main-area">
        <div class="page-topbar">
          <div class="page-title-block">
            <div class="page-title">Markets</div>
            <div class="page-breadcrumb">Live market data · 14 tracked assets</div>
          </div>
          <div class="topbar-right">
            <div class="badge-live"><span class="live-dot"></span>LIVE</div>
            <div class="search-wrap">
              <span class="search-icon">⌕</span>
              <input type="text" placeholder="Search markets…" id="marketSearch" oninput="filterMarketTable(this.value)">
            </div>
          </div>
        </div>

        <div class="page-content">

          <!-- MARKET SUMMARY CARDS -->
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px">
            <div class="kpi-card animate-fadeup delay-1">
              <div class="kpi-label">S&P 500</div>
              <div class="kpi-value" style="font-size:20px">5,372<span class="cents">.21</span></div>
              <div class="kpi-change text-green">↑ +0.45% today</div>
            </div>
            <div class="kpi-card animate-fadeup delay-2">
              <div class="kpi-label">NASDAQ 100</div>
              <div class="kpi-value" style="font-size:20px">18,840<span class="cents">.54</span></div>
              <div class="kpi-change text-green">↑ +0.62% today</div>
            </div>
            <div class="kpi-card animate-fadeup delay-3">
              <div class="kpi-label">CRYPTO MARKET CAP</div>
              <div class="kpi-value" style="font-size:20px">$2.48<span class="cents">T</span></div>
              <div class="kpi-change text-green">↑ +2.18% today</div>
            </div>
            <div class="kpi-card animate-fadeup delay-4">
              <div class="kpi-label">FEAR & GREED INDEX</div>
              <div class="kpi-value" style="font-size:20px;color:var(--green)">72 <span class="cents">GREED</span></div>
              <div class="kpi-change text-green">↑ Up from 68 yesterday</div>
            </div>
          </div>

          <!-- HEATMAP -->
          <div class="card" style="margin-bottom:24px">
            <div class="card-header">
              <div><div class="card-title">Market Heatmap</div><div class="card-sub">24h performance</div></div>
              <div class="badge badge-blue">S&P 500 SECTORS</div>
            </div>
            <div class="heatmap-grid" style="grid-template-columns:repeat(7,1fr);padding:20px;gap:6px">
              ${renderHeatmap()}
            </div>
          </div>

          <!-- FULL MARKET TABLE -->
          <div class="card">
            <div class="card-header">
              <div><div class="card-title">All Assets</div><div class="card-sub">Stocks, crypto, and ETFs</div></div>
              <div style="display:flex;gap:4px">
                ${categories.map(c => `
                  <div class="time-pill ${c===_marketFilter?'active':''}" onclick="setMarketFilter('${c}')">${c.toUpperCase()}</div>
                `).join('')}
              </div>
            </div>
            <div style="overflow-x:auto">
              <table class="mkt-table" id="fullMarketTable">
                <thead>
                  <tr>
                    <th>ASSET</th>
                    <th>PRICE</th>
                    <th>24H CHG</th>
                    <th>24H %</th>
                    <th>VOLUME</th>
                    <th>MKT CAP</th>
                    <th>TREND</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody id="marketTableBody">
                  ${APEX_DATA.markets.map(m => renderFullMarketRow(m)).join('')}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;
}

const HEATMAP_DATA = [
  {name:'Tech',pct:+2.8,color:'#1e4d2b'},{name:'AI',pct:+4.1,color:'#1a5c2a'},
  {name:'Semi',pct:+3.6,color:'#1c5429'},{name:'Cloud',pct:+1.9,color:'#1a4225'},
  {name:'EV',pct:-1.8,color:'#5c1a1a'},{name:'Fintech',pct:+0.9,color:'#1e3620'},
  {name:'Health',pct:-0.4,color:'#3a1f1f'},{name:'Energy',pct:+1.2,color:'#1e3820'},
  {name:'Crypto',pct:+2.3,color:'#1c4a28'},{name:'Retail',pct:-0.7,color:'#3d2020'},
  {name:'Media',pct:+0.5,color:'#1e3320'},{name:'Auto',pct:-2.1,color:'#601a1a'},
  {name:'Banks',pct:+0.3,color:'#1e2e20'},{name:'RE',pct:-1.1,color:'#4a2020'},
];

function renderHeatmap() {
  return HEATMAP_DATA.map(h => {
    const color = h.pct > 0 ? `hsl(142,${Math.min(h.pct*20,80)}%,${18+h.pct*3}%)` : `hsl(0,${Math.min(Math.abs(h.pct)*20,80)}%,${18+Math.abs(h.pct)*3}%)`;
    const textColor = Math.abs(h.pct) > 1.5 ? '#fff' : '#888';
    return `
      <div class="heatmap-cell" style="background:${color};color:${textColor};padding:14px 8px;flex-direction:column;gap:4px;border-radius:6px"
           onclick="showToast('${h.name}: ${h.pct>0?'+':''}${h.pct}%','info')">
        <div style="font-size:10px;font-weight:600">${h.name}</div>
        <div style="font-size:11px">${h.pct>0?'+':''}${h.pct}%</div>
      </div>
    `;
  }).join('');
}

function renderFullMarketRow(m) {
  const c = m.up ? 'var(--green)' : 'var(--red)';
  const sign = m.up ? '+' : '';
  const sparkPoints = generateSparkPoints(m.up);
  return `
    <tr onclick="showAssetModal('${m.sym}')">
      <td>
        <div class="asset-cell">
          <div class="asset-icon" style="background:${m.bg};color:${m.color}">${m.sym.slice(0,2)}</div>
          <div><div class="asset-name">${m.sym}</div><div class="asset-full">${m.full}</div></div>
        </div>
      </td>
      <td class="mkt-price-cell" style="font-family:var(--mono);font-weight:500">$${m.price.toLocaleString()}</td>
      <td style="font-family:var(--mono);color:${c}">${sign}$${Math.abs(m.chg).toLocaleString()}</td>
      <td style="font-family:var(--mono);color:${c}">${sign}${m.pct}%</td>
      <td style="font-family:var(--mono);color:var(--text3)">${m.vol}</td>
      <td style="font-family:var(--mono);color:var(--text3)">${m.mktcap}</td>
      <td>
        <svg viewBox="0 0 70 28" width="70" height="28">
          <polyline points="${sparkPoints}" fill="none" stroke="${m.up?'var(--green)':'var(--red)'}" stroke-width="1.5"/>
        </svg>
      </td>
      <td>
        <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();showToast('${m.sym} added to watchlist','success')">☆</button>
      </td>
    </tr>
  `;
}

function generateSparkPoints(up) {
  const points = [];
  let v = 14;
  for (let i = 0; i < 10; i++) {
    v += (Math.random() - (up ? 0.4 : 0.6)) * 4;
    v = Math.max(4, Math.min(24, v));
    points.push(`${i*7},${v.toFixed(1)}`);
  }
  return points.join(' ');
}

function setMarketFilter(f) {
  _marketFilter = f;
  document.querySelectorAll('#fullMarketTable .time-pill, .page-content .time-pill').forEach(el => {
    el.classList.toggle('active', el.textContent.toLowerCase() === f.toUpperCase().toLowerCase());
  });
  const filterMap = { stocks:['AAPL','NVDA','MSFT','TSLA','AMZN','GOOGL','META','AMD','COIN'], crypto:['BTC','ETH','SOL','BNB','XRP'], etf:['SPY','QQQ'] };
  const allowed = filterMap[f] || null;
  document.querySelectorAll('#marketTableBody tr').forEach(row => {
    const sym = row.querySelector('.asset-name')?.textContent;
    row.style.display = allowed && !allowed.includes(sym) ? 'none' : '';
  });
}

function filterMarketTable(q) {
  document.querySelectorAll('#marketTableBody tr').forEach(row => {
    row.style.display = q && !row.textContent.toLowerCase().includes(q.toLowerCase()) ? 'none' : '';
  });
}

function initMarkets() {
  renderTicker('tickerMount', APEX_DATA.tickers);
  startLivePriceUpdates('fullMarketTable', APEX_DATA.markets);
}
