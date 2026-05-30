// ===== WATCHLIST PAGE =====

function renderWatchlist() {
  const watchItems = APEX_DATA.markets.slice(0, 12);
  return `
    <div id="tickerMount"></div>
    <div class="app-shell">
      ${renderSidebar('watchlist')}
      <div class="main-area">
        <div class="page-topbar">
          <div class="page-title-block">
            <div class="page-title">Watchlist</div>
            <div class="page-breadcrumb">12 assets · Click any to view details</div>
          </div>
          <div class="topbar-right">
            <div class="badge-live"><span class="live-dot"></span>LIVE</div>
            <button class="btn btn-primary" onclick="showAddWatchModal()">+ Add Asset</button>
          </div>
        </div>
        <div class="page-content">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
            <div class="card">
              <div class="card-header">
                <div class="card-title">My Watchlist</div>
                <div class="search-wrap" style="padding:6px 12px">
                  <span class="search-icon">⌕</span>
                  <input type="text" placeholder="Filter…" style="width:120px" oninput="filterWatchlist(this.value)">
                </div>
              </div>
              <div id="watchlistBody">
                ${watchItems.map(m => `
                  <div class="watchlist-item" onclick="showAssetModal('${m.sym}')">
                    <div class="asset-icon" style="background:${m.bg};color:${m.color};width:34px;height:34px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700">${m.sym.slice(0,2)}</div>
                    <div style="flex:1">
                      <div style="font-size:13px;font-weight:600">${m.sym}</div>
                      <div style="font-size:10px;color:var(--text3)">${m.full}</div>
                    </div>
                    <svg class="wl-spark" viewBox="0 0 70 28" width="70" height="28">
                      <polyline points="${generateSparkPoints(m.up)}" fill="none" stroke="${m.up?'var(--green)':'var(--red)'}" stroke-width="1.5"/>
                    </svg>
                    <div style="text-align:right;min-width:80px">
                      <div style="font-family:var(--mono);font-size:13px;font-weight:500">$${m.price.toLocaleString()}</div>
                      <div style="font-family:var(--mono);font-size:11px;color:${m.up?'var(--green)':'var(--red)'}">${m.up?'+':''}${m.pct}%</div>
                    </div>
                    <button class="btn btn-ghost btn-sm" style="margin-left:8px" onclick="event.stopPropagation();this.parentElement.remove();showToast('${m.sym} removed','error')">✕</button>
                  </div>
                `).join('')}
              </div>
            </div>
            <div style="display:flex;flex-direction:column;gap:16px">
              <!-- TOP GAINERS -->
              <div class="card">
                <div class="card-header"><div class="card-title">Top Gainers</div><span class="badge badge-green">TODAY</span></div>
                <div>
                  ${APEX_DATA.markets.filter(m=>m.up).sort((a,b)=>b.pct-a.pct).slice(0,5).map(m=>`
                    <div class="holding-row" onclick="showAssetModal('${m.sym}')">
                      <div class="asset-icon" style="background:${m.bg};color:${m.color};width:30px;height:30px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700">${m.sym.slice(0,2)}</div>
                      <div><div style="font-size:12px;font-weight:600">${m.sym}</div><div style="font-size:10px;color:var(--text3)">${m.name}</div></div>
                      <div style="margin-left:auto;text-align:right">
                        <div style="font-family:var(--mono);font-size:12px;font-weight:500">$${m.price.toLocaleString()}</div>
                        <div style="font-family:var(--mono);font-size:11px;color:var(--green)">+${m.pct}%</div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
              <!-- TOP LOSERS -->
              <div class="card">
                <div class="card-header"><div class="card-title">Top Losers</div><span class="badge badge-red">TODAY</span></div>
                <div>
                  ${APEX_DATA.markets.filter(m=>!m.up).sort((a,b)=>a.pct-b.pct).map(m=>`
                    <div class="holding-row" onclick="showAssetModal('${m.sym}')">
                      <div class="asset-icon" style="background:${m.bg};color:${m.color};width:30px;height:30px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700">${m.sym.slice(0,2)}</div>
                      <div><div style="font-size:12px;font-weight:600">${m.sym}</div><div style="font-size:10px;color:var(--text3)">${m.name}</div></div>
                      <div style="margin-left:auto;text-align:right">
                        <div style="font-family:var(--mono);font-size:12px;font-weight:500">$${m.price.toLocaleString()}</div>
                        <div style="font-family:var(--mono);font-size:11px;color:var(--red)">${m.pct}%</div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
function filterWatchlist(q) {
  document.querySelectorAll('.watchlist-item').forEach(el => {
    el.style.display = q && !el.textContent.toLowerCase().includes(q.toLowerCase()) ? 'none' : '';
  });
}
function showAddWatchModal() {
  showModal(`
    <button class="modal-close" onclick="hideModal()">✕</button>
    <div class="modal-title">Add to Watchlist</div>
    <div class="modal-sub">Search for any stock, crypto, or ETF</div>
    <div class="input-group">
      <label class="input-label">TICKER OR NAME</label>
      <input type="text" class="input-field" id="watchInput" placeholder="e.g. AAPL, Bitcoin, SPY">
    </div>
    <button class="btn btn-primary" style="width:100%;padding:13px" onclick="hideModal();showToast((document.getElementById('watchInput')?.value||'Asset')+' added to watchlist','success')">Add to Watchlist</button>
  `);
}
function initWatchlist() { renderTicker('tickerMount', APEX_DATA.tickers); }

// ===== ANALYTICS PAGE =====
function renderAnalytics() {
  return `
    <div id="tickerMount"></div>
    <div class="app-shell">
      ${renderSidebar('analytics')}
      <div class="main-area">
        <div class="page-topbar">
          <div class="page-title-block">
            <div class="page-title">Analytics</div>
            <div class="page-breadcrumb">Deep portfolio analysis</div>
          </div>
          <div class="topbar-right">
            <div class="time-pills">
              ${['1M','3M','6M','1Y','ALL'].map(t=>`<div class="time-pill ${t==='1Y'?'active':''}" onclick="setTime(this,'${t}')">${t}</div>`).join('')}
            </div>
          </div>
        </div>
        <div class="page-content">
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px">
            ${[['SHARPE RATIO','1.84','Risk-adj return','blue'],['SORTINO','2.31','Downside risk','green'],['BETA','1.24','vs S&P 500','amber'],['ALPHA','+9.06%','Annual excess','green']].map(([l,v,s,c])=>`
              <div class="kpi-card animate-fadeup">
                <div class="kpi-label">${l}</div>
                <div class="kpi-value" style="font-size:22px;color:var(--${c})">${v}</div>
                <div class="kpi-change" style="color:var(--text3)">${s}</div>
              </div>
            `).join('')}
          </div>
          <div style="display:grid;grid-template-columns:2fr 1fr;gap:16px;margin-bottom:24px">
            <div class="card">
              <div class="card-header">
                <div class="card-title">Cumulative Performance</div>
                <div class="time-pills">
                  ${['1M','3M','1Y','ALL'].map(t=>`<div class="time-pill ${t==='1Y'?'active':''}">${t}</div>`).join('')}
                </div>
              </div>
              <div class="card-body">
                <div style="height:220px">
                  <svg id="analyticsChart" width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="none"></svg>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-header"><div class="card-title">Asset Allocation</div></div>
              <div class="donut-row" style="flex-direction:column;align-items:center;padding:20px">
                <svg id="analyticsDonut" viewBox="0 0 120 120" width="120" height="120"></svg>
                <div style="width:100%;margin-top:16px">
                  ${APEX_DATA.allocation.map(a=>`
                    <div class="alloc-row">
                      <div class="donut-dot" style="background:${a.color};width:8px;height:8px;border-radius:2px;flex-shrink:0"></div>
                      <span style="font-size:12px;flex:1">${a.sym}</span>
                      <span style="font-size:11px;font-family:var(--mono);color:var(--text3)">${a.pct}%</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
            <div class="card">
              <div class="card-header"><div class="card-title">Monthly Returns</div><div class="card-sub">2026</div></div>
              <div class="card-body">
                <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:6px">
                  ${['Jan','Feb','Mar','Apr','May','Jun'].map((m,i)=>{const v=(Math.random()*10-3).toFixed(1);const pos=parseFloat(v)>0;return`
                    <div style="text-align:center;padding:12px 6px;background:${pos?'rgba(0,217,126,0.08)':'rgba(255,59,92,0.08)'};border:1px solid ${pos?'rgba(0,217,126,0.15)':'rgba(255,59,92,0.15)'};border-radius:var(--radius-sm)">
                      <div style="font-size:9px;color:var(--text3);margin-bottom:4px">${m}</div>
                      <div style="font-size:13px;font-family:var(--mono);font-weight:500;color:${pos?'var(--green)':'var(--red)'}">${pos?'+':''}${v}%</div>
                    </div>
                  `;}).join('')}
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-header"><div class="card-title">Drawdown Analysis</div></div>
              <div class="card-body">
                <div style="height:140px">
                  <svg width="100%" height="100%" viewBox="0 0 400 120" preserveAspectRatio="none">
                    <defs><linearGradient id="ddGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ff3b5c" stop-opacity="0.15"/><stop offset="100%" stop-color="#ff3b5c" stop-opacity="0"/></linearGradient></defs>
                    <path d="M0,10 L40,15 L80,20 L120,40 L160,55 L200,45 L240,25 L280,15 L320,20 L360,12 L400,10 L400,10 L0,10Z" fill="url(#ddGrad)"/>
                    <path d="M0,10 L40,15 L80,20 L120,40 L160,55 L200,45 L240,25 L280,15 L320,20 L360,12 L400,10" fill="none" stroke="#ff3b5c" stroke-width="1.5"/>
                    <line x1="0" y1="10" x2="400" y2="10" stroke="var(--border)" stroke-width="0.5" stroke-dasharray="4,3"/>
                    <text x="4" y="110" fill="#555" font-size="9" font-family="DM Mono,monospace">Jan</text>
                    <text x="124" y="110" fill="#555" font-size="9" font-family="DM Mono,monospace">Mar</text>
                    <text x="244" y="110" fill="#555" font-size="9" font-family="DM Mono,monospace">May</text>
                  </svg>
                </div>
                <div style="display:flex;gap:16px;margin-top:8px">
                  <div><div style="font-size:10px;color:var(--text3);margin-bottom:3px">MAX DD</div><div style="font-family:var(--mono);font-size:14px;color:var(--red)">-6.2%</div></div>
                  <div><div style="font-size:10px;color:var(--text3);margin-bottom:3px">AVG DD</div><div style="font-family:var(--mono);font-size:14px;color:var(--amber)">-2.8%</div></div>
                  <div><div style="font-size:10px;color:var(--text3);margin-bottom:3px">RECOVERY</div><div style="font-family:var(--mono);font-size:14px;color:var(--green)">18 days</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
function initAnalytics() {
  renderTicker('tickerMount', APEX_DATA.tickers);
  setTimeout(() => {
    buildPortfolioChart('analyticsChart', '1Y');
    buildDonutChart('analyticsDonut', APEX_DATA.allocation);
  }, 100);
}

// ===== FX CONVERTER PAGE =====
function renderConverter() {
  return `
    <div id="tickerMount"></div>
    <div class="app-shell">
      ${renderSidebar('converter')}
      <div class="main-area">
        <div class="page-topbar">
          <div class="page-title-block">
            <div class="page-title">FX Converter</div>
            <div class="page-breadcrumb">Live exchange rates</div>
          </div>
          <div class="topbar-right"><div class="badge-live"><span class="live-dot"></span>LIVE RATES</div></div>
        </div>
        <div class="page-content">
          <div style="max-width:560px">
            <div class="card">
              <div class="card-header"><div class="card-title">Currency Converter</div><div class="card-sub">Powered by live FX rates</div></div>
              <div class="card-body">
                <div class="converter-row">
                  <div style="flex:1">
                    <div class="input-label">AMOUNT</div>
                    <input type="number" class="input-field" id="fxAmount" value="1000" oninput="updateFX()">
                  </div>
                  <div style="flex:1">
                    <div class="input-label">FROM</div>
                    <select class="input-field" id="fxFrom" onchange="updateFX()">
                      ${APEX_DATA.currencies.map(c=>`<option ${c==='USD'?'selected':''}>${c}</option>`).join('')}
                    </select>
                  </div>
                </div>
                <div style="text-align:center;padding:8px 0;color:var(--text3);font-size:20px">⇅</div>
                <div class="converter-row">
                  <div style="flex:1;opacity:0.5">
                    <div class="input-label">RESULT</div>
                    <input type="number" class="input-field" id="fxResult" readonly>
                  </div>
                  <div style="flex:1">
                    <div class="input-label">TO</div>
                    <select class="input-field" id="fxTo" onchange="updateFX()">
                      ${APEX_DATA.currencies.map(c=>`<option ${c==='EUR'?'selected':''}>${c}</option>`).join('')}
                    </select>
                  </div>
                </div>
                <div class="converter-result" style="margin-top:20px">
                  <div id="fxRateDisplay" class="cr-rate">Loading…</div>
                </div>
              </div>
            </div>
            <div class="card" style="margin-top:16px">
              <div class="card-header"><div class="card-title">USD Exchange Rates</div></div>
              <div>
                ${Object.entries(APEX_DATA.fxRates).filter(([k])=>k!=='USD').map(([k,v])=>`
                  <div style="display:flex;align-items:center;justify-content:space-between;padding:11px 20px;border-bottom:1px solid var(--border)">
                    <div style="font-size:13px;font-weight:600;font-family:var(--mono)">USD/${k}</div>
                    <div style="font-family:var(--mono);font-size:13px">${v.toFixed(k==='BTC'||k==='ETH'?8:4)}</div>
                    <div style="font-size:11px;color:${Math.random()>0.4?'var(--green)':'var(--red)'};font-family:var(--mono)">${Math.random()>0.4?'+':'-'}${(Math.random()*0.5).toFixed(2)}%</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function updateFX() {
  const amt = parseFloat(document.getElementById('fxAmount')?.value) || 0;
  const from = document.getElementById('fxFrom')?.value;
  const to = document.getElementById('fxTo')?.value;
  const rates = APEX_DATA.fxRates;
  if (!rates[from] || !rates[to]) return;
  const result = amt * (rates[to] / rates[from]);
  const rateEl = document.getElementById('fxResult');
  const displayEl = document.getElementById('fxRateDisplay');
  if (rateEl) rateEl.value = result.toFixed(to==='BTC'||to==='ETH'?8:2);
  if (displayEl) displayEl.textContent = `1 ${from} = ${(rates[to]/rates[from]).toFixed(to==='BTC'||to==='ETH'?8:4)} ${to}`;
}

function initConverter() {
  renderTicker('tickerMount', APEX_DATA.tickers);
  setTimeout(updateFX, 100);
}

// ===== ALERTS PAGE =====
function renderAlerts() {
  const alerts = [
    { sym:'BTC', cond:'Price above', target:'$70,000', status:'active', color:'var(--blue)' },
    { sym:'NVDA', cond:'Price below', target:'$1,000', status:'active', color:'var(--amber)' },
    { sym:'TSLA', cond:'RSI below', target:'30', status:'triggered', color:'var(--red)' },
  ];
  return `
    <div id="tickerMount"></div>
    <div class="app-shell">
      ${renderSidebar('alerts')}
      <div class="main-area">
        <div class="page-topbar">
          <div class="page-title-block">
            <div class="page-title">Alerts</div>
            <div class="page-breadcrumb">3 active alerts</div>
          </div>
          <div class="topbar-right">
            <button class="btn btn-primary" onclick="showModal(\`
              <button class=\\'modal-close\\' onclick=\\'hideModal()\\'>✕</button>
              <div class=\\'modal-title\\'>Create Alert</div>
              <div class=\\'input-group\\'><label class=\\'input-label\\'>ASSET</label><input type=\\'text\\' class=\\'input-field\\' placeholder=\\'e.g. AAPL\\'></div>
              <div class=\\'input-group\\'><label class=\\'input-label\\'>CONDITION</label><select class=\\'input-field\\'><option>Price above</option><option>Price below</option><option>RSI above</option><option>RSI below</option></select></div>
              <div class=\\'input-group\\'><label class=\\'input-label\\'>TARGET</label><input type=\\'number\\' class=\\'input-field\\' placeholder=\\'0.00\\'></div>
              <button class=\\'btn btn-primary\\' style=\\'width:100%;padding:13px\\' onclick=\\'hideModal();showToast(\\\\\\"Alert created\\\\\\",\\\\\\"success\\\\\\")\\'>Create Alert</button>
            \`)">+ New Alert</button>
          </div>
        </div>
        <div class="page-content" style="max-width:700px">
          ${alerts.map(a=>`
            <div class="card" style="margin-bottom:12px">
              <div style="padding:18px 20px;display:flex;align-items:center;gap:14px">
                <div style="width:36px;height:36px;border-radius:9px;background:rgba(37,99,255,0.1);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--blue)">${a.sym.slice(0,2)}</div>
                <div style="flex:1">
                  <div style="font-size:13px;font-weight:600">${a.sym} — ${a.cond} ${a.target}</div>
                  <div style="font-size:11px;color:var(--text3);margin-top:2px">Email + push notification</div>
                </div>
                <span class="badge ${a.status==='triggered'?'badge-red':'badge-green'}">${a.status.toUpperCase()}</span>
                <button class="btn btn-ghost btn-sm" onclick="this.closest('.card').remove();showToast('Alert deleted','error')">✕</button>
              </div>
            </div>
          `).join('')}
          <div class="empty-state" style="padding:40px">
            <div class="empty-icon">◻</div>
            <div class="empty-title">Create price alerts</div>
            <div class="empty-sub">Get notified when your assets hit target prices or technical levels.</div>
          </div>
        </div>
      </div>
    </div>
  `;
}
function initAlerts() { renderTicker('tickerMount', APEX_DATA.tickers); }
