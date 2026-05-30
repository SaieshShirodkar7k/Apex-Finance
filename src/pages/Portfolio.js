// ===== PORTFOLIO PAGE =====

function renderPortfolio() {
  const p = APEX_DATA.portfolio;
  const holdings = APEX_DATA.holdings;

  return `
    <div id="tickerMount"></div>
    <div class="app-shell">
      ${renderSidebar('portfolio')}
      <div class="main-area">
        <div class="page-topbar">
          <div class="page-title-block">
            <div class="page-title">Portfolio</div>
            <div class="page-breadcrumb">14 positions · Updated just now</div>
          </div>
          <div class="topbar-right">
            <button class="btn btn-ghost" onclick="showToast('Report exported','success')">⊞ Export CSV</button>
            <button class="btn btn-primary" onclick="showAddPositionModal()">+ Add Position</button>
          </div>
        </div>
        <div class="page-content">

          <!-- SUMMARY ROW -->
          <div class="kpi-grid" style="margin-bottom:24px">
            <div class="kpi-card animate-fadeup delay-1">
              <div class="kpi-label">TOTAL VALUE</div>
              <div class="kpi-value">$284,921<span class="cents">.48</span></div>
              <div class="kpi-change text-green">↑ All-time high</div>
            </div>
            <div class="kpi-card animate-fadeup delay-2">
              <div class="kpi-label">UNREALISED P&L</div>
              <div class="kpi-value text-green">+$43,921<span class="cents">.48</span></div>
              <div class="kpi-change text-green">↑ +18.24% total return</div>
            </div>
            <div class="kpi-card animate-fadeup delay-3">
              <div class="kpi-label">BEST PERFORMER</div>
              <div class="kpi-value" style="font-size:20px;color:var(--green)">NVDA <span class="cents">+38.2%</span></div>
              <div class="kpi-change text-green">↑ $17,818 gain</div>
            </div>
            <div class="kpi-card animate-fadeup delay-4">
              <div class="kpi-label">WORST PERFORMER</div>
              <div class="kpi-value" style="font-size:20px;color:var(--red)">TSLA <span class="cents">-5.2%</span></div>
              <div class="kpi-change text-red">↓ -$1,230 loss</div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 320px;gap:16px;margin-bottom:24px">

            <!-- HOLDINGS TABLE -->
            <div class="card">
              <div class="card-header">
                <div><div class="card-title">All Holdings</div><div class="card-sub">Sorted by value</div></div>
                <div style="display:flex;gap:8px;align-items:center">
                  <div class="search-wrap" style="padding:6px 12px">
                    <span class="search-icon">⌕</span>
                    <input type="text" placeholder="Filter…" id="holdingSearch" style="width:120px" oninput="filterHoldings(this.value)">
                  </div>
                </div>
              </div>
              <div style="overflow-x:auto">
                <table class="mkt-table" id="holdingsTable">
                  <thead>
                    <tr>
                      <th>ASSET</th>
                      <th>QTY</th>
                      <th>AVG COST</th>
                      <th>CURRENT</th>
                      <th>VALUE</th>
                      <th>P&L</th>
                      <th>WEIGHT</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody id="holdingsBody">
                    ${holdings.map(h => renderHoldingTableRow(h)).join('')}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- ALLOCATION + GOALS -->
            <div style="display:flex;flex-direction:column;gap:16px">
              <div class="card">
                <div class="card-header">
                  <div><div class="card-title">Allocation</div><div class="card-sub">By sector/asset class</div></div>
                </div>
                <div style="padding:16px 20px">
                  <div style="display:flex;justify-content:center;margin-bottom:16px">
                    <svg id="portfolioDonut" viewBox="0 0 120 120" width="120" height="120"></svg>
                  </div>
                  ${APEX_DATA.allocation.map(a => `
                    <div class="alloc-row">
                      <span class="alloc-sym" style="color:${a.color}">${a.sym.slice(0,4)}</span>
                      <div class="alloc-bar-wrap">
                        <div class="alloc-bar" style="width:${a.pct}%;background:${a.color}"></div>
                      </div>
                      <span class="alloc-pct">${a.pct}%</span>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="card">
                <div class="card-header">
                  <div><div class="card-title">Financial Goals</div><div class="card-sub">Progress tracker</div></div>
                  <button class="btn btn-ghost btn-sm" onclick="showToast('Goal added','success')">+ Add</button>
                </div>
                <div style="padding:4px 20px 16px">
                  ${APEX_DATA.goals.map(g => {
                    const pct = Math.min((g.current/g.target)*100, 100).toFixed(0);
                    return `
                      <div class="goal-item">
                        <div class="goal-header">
                          <span class="goal-name">${g.name}</span>
                          <span class="goal-vals">$${g.current.toLocaleString()} / $${g.target.toLocaleString()}</span>
                        </div>
                        <div class="goal-progress-wrap">
                          <div class="goal-progress-fill" style="width:${pct}%;background:${g.color}"></div>
                        </div>
                        <div style="font-size:10px;color:var(--text3);margin-top:4px;font-family:var(--mono)">${pct}% complete</div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            </div>
          </div>

          <!-- TRANSACTIONS -->
          <div class="card">
            <div class="card-header">
              <div><div class="card-title">Transaction History</div><div class="card-sub">Last 30 days</div></div>
              <button class="btn btn-ghost btn-sm" onclick="showToast('Transactions exported','success')">Export</button>
            </div>
            <div style="overflow-x:auto">
              <table class="tx-table">
                <thead><tr><th>DATE</th><th>ASSET</th><th>TYPE</th><th>QUANTITY</th><th>PRICE</th><th>TOTAL</th><th>STATUS</th></tr></thead>
                <tbody>
                  ${APEX_DATA.transactions.map(t => `
                    <tr>
                      <td style="color:var(--text3);font-family:var(--mono)">${t.date}</td>
                      <td style="font-weight:600;font-family:var(--mono)">${t.sym}</td>
                      <td><span class="tx-type tx-${t.type}">${t.type.toUpperCase()}</span></td>
                      <td style="font-family:var(--mono)">${t.qty}</td>
                      <td style="font-family:var(--mono)">$${t.price.toLocaleString()}</td>
                      <td style="font-family:var(--mono);font-weight:500">$${t.total.toLocaleString()}</td>
                      <td><span class="badge badge-green">Settled</span></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;
}

function renderHoldingTableRow(h) {
  const pctColor = h.up ? 'var(--green)' : 'var(--red)';
  const pnl = h.val - h.cost;
  const sign = h.up ? '+' : '';
  return `
    <tr onclick="showAssetModal('${h.sym}')">
      <td>
        <div class="asset-cell">
          <div class="asset-icon" style="background:${h.bg};color:${h.color}">${h.sym.slice(0,2)}</div>
          <div><div class="asset-name">${h.sym}</div><div class="asset-full">${h.name}</div></div>
        </div>
      </td>
      <td style="font-family:var(--mono)">${h.qty}</td>
      <td style="font-family:var(--mono)">$${(h.cost/h.qty).toFixed(2)}</td>
      <td style="font-family:var(--mono)">$${h.price.toLocaleString()}</td>
      <td style="font-family:var(--mono);font-weight:500">$${h.val.toLocaleString()}</td>
      <td style="font-family:var(--mono);color:${pctColor}">${sign}$${Math.abs(pnl).toLocaleString()} (${sign}${h.pct}%)</td>
      <td>
        <div style="display:flex;align-items:center;gap:6px">
          <div style="flex:1;height:3px;background:var(--bg4);border-radius:3px;width:60px">
            <div style="width:${h.weight}%;height:100%;background:${h.color};border-radius:3px"></div>
          </div>
          <span style="font-size:10px;font-family:var(--mono);color:var(--text3)">${h.weight}%</span>
        </div>
      </td>
      <td>
        <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();showToast('${h.sym} removed','error')">✕</button>
      </td>
    </tr>
  `;
}

function filterHoldings(q) {
  const rows = document.querySelectorAll('#holdingsBody tr');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = q && !text.includes(q.toLowerCase()) ? 'none' : '';
  });
}

function initPortfolio() {
  renderTicker('tickerMount', APEX_DATA.tickers);
  setTimeout(() => buildDonutChart('portfolioDonut', APEX_DATA.allocation), 100);
}
