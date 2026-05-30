// ===== TICKER TAPE COMPONENT =====

function renderTicker(containerId, tickers) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;
  const doubled = [...tickers, ...tickers];
  wrap.innerHTML = `
    <div class="ticker-wrap">
      <div class="ticker-track">
        ${doubled.map(t => `
          <div class="tick-item">
            <span class="tick-sym">${t.sym}</span>
            <span class="tick-price">$${t.price}</span>
            <span class="${t.up ? 'tick-up' : 'tick-down'}">${t.chg}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function startLivePriceUpdates(tableId, data) {
  setInterval(() => {
    const rows = document.querySelectorAll(`#${tableId} .mkt-price-cell`);
    rows.forEach((cell, i) => {
      if (!data[i]) return;
      const flash = Math.random() > 0.5 ? 'var(--green)' : 'var(--red)';
      cell.style.color = flash;
      setTimeout(() => { cell.style.color = ''; }, 500);
    });
  }, 2600);
}
