// ===== DASHBOARD PAGE =====

let _currentTimeFilter = '1M';
let _currentTab = 'performance';

function renderDashboard() {
  const p = APEX_DATA.portfolio;
  const holdings = APEX_DATA.holdings.slice(0, 7);

  return `
    <div id="tickerMount"></div>
    <div class="app-shell">
      ${renderSidebar('dashboard')}
      <div class="main-area">
        <div class="page-topbar">
          <div class="page-title-block">
            <div class="page-title">Overview</div>
            <div class="page-breadcrumb" id="clockDisplay"></div>
          </div>
          <div class="topbar-right">
            <div class="search-wrap">
              <span class="search-icon">⌕</span>
              <input type="text" placeholder="Search assets…" id="globalSearch" oninput="handleSearch(this.value)">
            </div>
            <div class="badge-live"><span class="live-dot"></span>LIVE</div>
            <button class="btn btn-ghost" onclick="showToast('Report exported','success')">⊞ Export</button>
            <button class="btn btn-primary" onclick="showAddPositionModal()">+ Add Position</button>
          </div>
        </div>

        <div class="page-content">

          <!-- KPI ROW -->
          <div class="kpi-grid">
            <div class="kpi-card animate-fadeup delay-1">
              <div class="kpi-label">TOTAL PORTFOLIO VALUE</div>
              <div class="kpi-value" id="kpiTotal">$0<span class="cents">.00</span></div>
              <div class="kpi-change text-green">↑ +$4,218 <span style="color:var(--text3)">(+1.50% today)</span></div>
              <svg class="kpi-spark" width="80" height="40" viewBox="0 0 80 40"><polyline points="0,35 12,28 24,32 36,18 48,22 60,10 72,14 80,8" fill="none" stroke="rgba(0,217,126,0.4)" stroke-width="1.5"/></svg>
            </div>
            <div class="kpi-card animate-fadeup delay-2">
              <div class="kpi-label">TODAY'S P&L</div>
              <div class="kpi-value text-green">+$4,218<span class="cents">.33</span></div>
              <div class="kpi-change text-green">↑ Best day this week</div>
              <svg class="kpi-spark" width="80" height="40" viewBox="0 0 80 40"><polyline points="0,30 15,25 30,28 45,15 60,18 80,8" fill="none" stroke="rgba(0,217,126,0.4)" stroke-width="1.5"/></svg>
            </div>
            <div class="kpi-card animate-fadeup delay-3">
              <div class="kpi-label">TOTAL INVESTED</div>
              <div class="kpi-value">$241,000<span class="cents">.00</span></div>
              <div class="kpi-change" style="color:var(--text3)">Across 14 positions</div>
              <svg class="kpi-spark" width="80" height="40" viewBox="0 0 80 40"><polyline points="0,32 16,30 32,26 48,20 64,16 80,12" fill="none" stroke="rgba(37,99,255,0.4)" stroke-width="1.5"/></svg>
            </div>
            <div class="kpi-card animate-fadeup delay-4">
              <div class="kpi-label">ALL-TIME RETURN</div>
              <div class="kpi-value text-green">+18.2<span class="cents">%</span></div>
              <div class="kpi-change text-green">↑ +$43,921 total gain</div>
              <svg class="kpi-spark" width="80" height="40" viewBox="0 0 80 40"><polyline points="0,36 10,34 20,30 30,26 40,22 50,15 60,12 70,9 80,6" fill="none" stroke="rgba(0,217,126,0.4)" stroke-width="1.5"/></svg>
            </div>
          </div>

          <!-- MAIN GRID -->
          <div class="dash-grid-main">
            <!-- CHART CARD -->
            <div class="card animate-fadeup delay-3">
              <div class="card-header">
                <div>
                  <div class="card-title">Portfolio Performance</div>
                  <div class="card-sub">Cumulative return vs S&P 500</div>
                </div>
                <div class="time-pills">
                  ${['1D','1W','1M','3M','1Y','ALL'].map(t =>
                    `<div class="time-pill ${t===_currentTimeFilter?'active':''}" onclick="setTimeFilter('${t}')">${t}</div>`
                  ).join('')}
                </div>
              </div>
              <div class="tab-bar">
                <div class="tab ${_currentTab==='performance'?'active':''}" onclick="setDashTab('performance')">Performance</div>
                <div class="tab ${_currentTab==='allocation'?'active':''}" onclick="setDashTab('allocation')">Allocation</div>
                <div class="tab ${_currentTab==='transactions'?'active':''}" onclick="setDashTab('transactions')">Transactions</div>
              </div>
              <div class="card-body" id="dashTabContent">
                ${renderPerformanceTab()}
              </div>
            </div>

            <!-- HOLDINGS -->
            <div class="card animate-fadeup delay-4">
              <div class="card-header">
                <div>
                  <div class="card-title">Holdings</div>
                  <div class="card-sub">14 active positions</div>
                </div>
                <button class="btn btn-ghost btn-sm" onclick="showAddPositionModal()">+ Add</button>
              </div>
              <div id="holdingsList">
                ${holdings.map(h => renderHoldingRow(h)).join('')}
                <div style="text-align:center;padding:10px">
                  <button class="btn btn-ghost btn-sm" onclick="navigateTo('portfolio')">View all 14 positions →</button>
                </div>
              </div>
            </div>
          </div>

          <!-- BOTTOM GRID -->
          <div class="dash-grid-bottom">
            <!-- MARKETS TABLE -->
            <div class="card">
              <div class="card-header">
                <div><div class="card-title">Live Markets</div><div class="card-sub">Top movers</div></div>
                <div class="badge-live"><span class="live-dot"></span>LIVE</div>
              </div>
              <div style="padding:0 0 8px">
                <table class="mkt-table">
                  <thead><tr><th>ASSET</th><th>PRICE</th><th>24H %</th></tr></thead>
                  <tbody id="dashMarketTable">
                    ${APEX_DATA.markets.slice(0,8).map(m => renderMarketRow(m)).join('')}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- AI INSIGHTS -->
            <div class="card">
              <div class="ai-header">
                <div class="ai-pulse"></div>
                <div class="ai-title">AI Insights</div>
                <span class="badge badge-purple ai-model">GPT-4o</span>
              </div>
              ${APEX_DATA.insights.map(i => renderInsightCard(i)).join('')}
            </div>

            <!-- NEWS -->
            <div class="card">
              <div class="card-header">
                <div><div class="card-title">Market News</div><div class="card-sub">AI-curated</div></div>
              </div>
              ${APEX_DATA.news.slice(0,5).map(n => renderNewsItem(n)).join('')}
            </div>
          </div>

        </div>
      </div>
    </div>
  `;
}

function renderPerformanceTab() {
  return `
    <div class="chart-area" style="height:200px">
      <svg id="perfChart" width="100%" height="100%" viewBox="0 0 600 180" preserveAspectRatio="none"></svg>
    </div>
    <div class="chart-stats-row">
      <div class="chart-stat"><div class="cs-label">PORTFOLIO</div><div class="cs-val text-green">+18.24%</div></div>
      <div class="chart-stat"><div class="cs-label">S&P 500</div><div class="cs-val" style="color:var(--text2)">+9.18%</div></div>
      <div class="chart-stat"><div class="cs-label">ALPHA</div><div class="cs-val text-blue">+9.06%</div></div>
      <div class="chart-stat"><div class="cs-label">SHARPE</div><div class="cs-val">1.84</div></div>
      <div class="chart-stat"><div class="cs-label">MAX DD</div><div class="cs-val text-red">-6.2%</div></div>
    </div>
  `;
}

function renderAllocationTab() {
  const alloc = APEX_DATA.allocation;
  return `
    <div class="donut-row">
      <svg id="donutSvg" viewBox="0 0 120 120" width="120" height="120" style="flex-shrink:0"></svg>
      <div class="donut-legend" style="flex:1">
        ${alloc.map(a => `
          <div class="donut-legend-item">
            <div class="donut-dot" style="background:${a.color}"></div>
            <span>${a.sym}</span>
            <span class="donut-pct">${a.pct}% — $${a.val.toLocaleString()}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderTransactionsTab() {
  return `
    <div style="overflow-x:auto">
      <table class="tx-table">
        <thead><tr><th>DATE</th><th>ASSET</th><th>TYPE</th><th>QTY</th><th>PRICE</th><th>TOTAL</th></tr></thead>
        <tbody>
          ${APEX_DATA.transactions.map(t => `
            <tr>
              <td style="color:var(--text3);font-family:var(--mono)">${t.date}</td>
              <td style="font-weight:600;font-family:var(--mono)">${t.sym}</td>
              <td><span class="tx-type tx-${t.type}">${t.type.toUpperCase()}</span></td>
              <td style="font-family:var(--mono)">${t.qty}</td>
              <td style="font-family:var(--mono)">$${t.price.toLocaleString()}</td>
              <td style="font-family:var(--mono);font-weight:500">$${t.total.toLocaleString()}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderHoldingRow(h) {
  const pctColor = h.up ? 'var(--green)' : 'var(--red)';
  return `
    <div class="holding-row" onclick="showAssetModal('${h.sym}')">
      <div class="holding-av" style="background:${h.bg};color:${h.color}">${h.sym.slice(0,2)}</div>
      <div class="holding-info">
        <div class="h-sym">${h.sym}</div>
        <div class="h-name">${h.name}</div>
      </div>
      <div class="holding-right">
        <div class="h-val">$${h.val.toLocaleString()}</div>
        <div class="h-pct" style="color:${pctColor}">${h.up?'+':''}${h.pct}%</div>
      </div>
    </div>
  `;
}

function renderMarketRow(m) {
  const c = m.up ? 'var(--green)' : 'var(--red)';
  const sign = m.up ? '+' : '';
  return `
    <tr onclick="showAssetModal('${m.sym}')">
      <td>
        <div class="asset-cell">
          <div class="asset-icon" style="background:${m.bg};color:${m.color}">${m.sym.slice(0,2)}</div>
          <div>
            <div class="asset-name">${m.sym}</div>
            <div class="asset-full">${m.name}</div>
          </div>
        </div>
      </td>
      <td class="mkt-price-cell" style="font-family:var(--mono);font-size:12px;font-weight:500">$${m.price.toLocaleString()}</td>
      <td style="font-family:var(--mono);font-size:12px;color:${c}">${sign}${m.pct}%</td>
    </tr>
  `;
}

function renderInsightCard(i) {
  const typeColors = { bull:'var(--green)', bear:'var(--red)', neutral:'var(--amber)', info:'var(--blue)' };
  const color = typeColors[i.type] || 'var(--blue)';
  return `
    <div class="ai-insight-item">
      <div class="ai-tag" style="color:${color}">${i.tag}</div>
      <div class="ai-text">${i.text}</div>
      <div class="ai-meta">${i.meta}</div>
    </div>
  `;
}

function renderNewsItem(n) {
  const impactColors = { high:'impact-high', med:'impact-med', low:'impact-low' };
  return `
    <div class="news-item">
      <div class="news-cat">${n.cat}</div>
      <div class="news-title">${n.title}</div>
      <div class="news-footer">
        <span class="news-source">${n.src}  ·  ${n.time}</span>
        <span class="news-impact ${impactColors[n.impact]}">${n.impact.toUpperCase()}</span>
      </div>
    </div>
  `;
}

function initDashboard() {
  renderTicker('tickerMount', APEX_DATA.tickers);
  updateClock();
  setInterval(updateClock, 60000);

  // Animate KPI
  setTimeout(() => {
    animateCounter(document.getElementById('kpiTotal'), 0, 284921, 1200, '$', '', 0);
  }, 300);

  // Build chart
  setTimeout(() => buildPortfolioChart('perfChart', _currentTimeFilter), 100);

  // Live updates
  startLivePriceUpdates('dashMarketTable', APEX_DATA.markets);
}

function updateClock() {
  const el = document.getElementById('clockDisplay');
  if (el) {
    const d = new Date();
    el.textContent = d.toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'}) + '  ·  ' + d.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});
  }
}

function setTimeFilter(t) {
  _currentTimeFilter = t;
  document.querySelectorAll('.time-pill').forEach(el => {
    el.classList.toggle('active', el.textContent === t);
  });
  if (_currentTab === 'performance') buildPortfolioChart('perfChart', t);
}

function setDashTab(tab) {
  _currentTab = tab;
  document.querySelectorAll('.tab').forEach(el => {
    el.classList.toggle('active', el.textContent.toLowerCase().trim().startsWith(tab));
  });
  const content = document.getElementById('dashTabContent');
  if (!content) return;
  content.style.opacity = '0';
  setTimeout(() => {
    if (tab === 'performance') content.innerHTML = renderPerformanceTab();
    else if (tab === 'allocation') content.innerHTML = renderAllocationTab();
    else if (tab === 'transactions') content.innerHTML = renderTransactionsTab();
    content.style.transition = 'opacity 0.2s';
    content.style.opacity = '1';
    if (tab === 'performance') buildPortfolioChart('perfChart', _currentTimeFilter);
    if (tab === 'allocation') buildDonutChart('donutSvg', APEX_DATA.allocation);
  }, 150);
}

function handleSearch(q) {
  if (!q) return;
  const matches = APEX_DATA.markets.filter(m =>
    m.sym.toLowerCase().includes(q.toLowerCase()) ||
    m.name.toLowerCase().includes(q.toLowerCase())
  );
  if (matches.length === 1) {
    setTimeout(() => { showAssetModal(matches[0].sym); document.getElementById('globalSearch').value = ''; }, 200);
  }
}
