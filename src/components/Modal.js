// ===== MODAL COMPONENT =====

let _modalOpen = false;

function showModal(html, onClose) {
  let overlay = document.getElementById('globalOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.id = 'globalOverlay';
    document.body.appendChild(overlay);
  }
  overlay.innerHTML = `<div class="modal" onclick="event.stopPropagation()">${html}</div>`;
  overlay.onclick = () => hideModal(onClose);
  requestAnimationFrame(() => overlay.classList.add('show'));
  _modalOpen = true;
}

function hideModal(cb) {
  const overlay = document.getElementById('globalOverlay');
  if (overlay) overlay.classList.remove('show');
  _modalOpen = false;
  if (cb) setTimeout(cb, 250);
}

function showAddPositionModal() {
  showModal(`
    <button class="modal-close" onclick="hideModal()">✕</button>
    <div class="modal-title">Add New Position</div>
    <div class="modal-sub">Add an asset to your portfolio</div>
    <div class="input-group">
      <label class="input-label">TICKER SYMBOL</label>
      <input type="text" class="input-field" id="m_ticker" placeholder="e.g. AAPL, BTC, TSLA">
    </div>
    <div class="input-group">
      <label class="input-label">QUANTITY</label>
      <input type="number" class="input-field" id="m_qty" placeholder="0.00" min="0">
    </div>
    <div class="input-group">
      <label class="input-label">AVERAGE COST (USD)</label>
      <input type="number" class="input-field" id="m_cost" placeholder="0.00" min="0">
    </div>
    <div class="input-group">
      <label class="input-label">NOTES (optional)</label>
      <input type="text" class="input-field" id="m_notes" placeholder="Long-term hold, etc.">
    </div>
    <button class="btn btn-primary" style="width:100%;margin-top:8px;padding:13px;font-size:14px" onclick="submitAddPosition()">
      Add to Portfolio
    </button>
  `);
  setTimeout(() => document.getElementById('m_ticker')?.focus(), 300);
}

function submitAddPosition() {
  const ticker = document.getElementById('m_ticker')?.value?.trim().toUpperCase();
  if (!ticker) { showToast('Please enter a ticker symbol', 'error'); return; }
  hideModal();
  showToast(`${ticker} added to portfolio`, 'success');
}

function showAssetModal(assetSym) {
  const asset = APEX_DATA.markets.find(m => m.sym === assetSym) || { sym: assetSym, name: assetSym, full: assetSym, price: 0, pct: 0, up: true, color: '#2563ff', bg: 'rgba(37,99,255,0.1)' };
  const pctColor = asset.up ? 'var(--green)' : 'var(--red)';
  const sparkData = [100,102,101,104,103,106,105,108,107,110];

  showModal(`
    <button class="modal-close" onclick="hideModal()">✕</button>
    <div class="asset-modal-header">
      <div class="asset-modal-icon" style="background:${asset.bg};color:${asset.color}">${asset.sym.slice(0,2)}</div>
      <div>
        <div class="asset-modal-sym">${asset.sym}</div>
        <div class="asset-modal-name">${asset.full}</div>
      </div>
      <div style="margin-left:auto;text-align:right">
        <div class="asset-modal-price" style="color:${pctColor}">$${asset.price.toLocaleString()}</div>
        <div style="font-size:13px;color:${pctColor};font-family:var(--mono)">${asset.up?'+':''}${asset.pct}%</div>
      </div>
    </div>
    <div class="asset-stats-grid">
      <div class="asset-stat-box"><div class="asb-label">VOLUME</div><div class="asb-val">${asset.vol||'—'}</div></div>
      <div class="asset-stat-box"><div class="asb-label">MKT CAP</div><div class="asb-val">${asset.mktcap||'—'}</div></div>
      <div class="asset-stat-box"><div class="asb-label">24H CHG</div><div class="asb-val" style="color:${pctColor}">${asset.up?'+':''}${asset.pct}%</div></div>
    </div>
    <div style="display:flex;gap:10px;margin-top:20px">
      <button class="btn btn-primary" style="flex:1" onclick="hideModal();showAddPositionModal()">+ Add to Portfolio</button>
      <button class="btn btn-ghost" style="flex:1" onclick="showToast('${asset.sym} added to watchlist','success');hideModal()">☆ Watch</button>
    </div>
  `);
}

// ===== TOAST NOTIFICATIONS =====
let _toastContainer = null;
function ensureToastContainer() {
  if (!_toastContainer) {
    _toastContainer = document.createElement('div');
    _toastContainer.id = 'toastContainer';
    document.body.appendChild(_toastContainer);
  }
  return _toastContainer;
}

function showToast(msg, type = 'success') {
  const c = ensureToastContainer();
  const icons = { success: '✓', error: '✕', info: 'i' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${icons[type]||'i'}</div>
    <span>${msg}</span>
  `;
  c.appendChild(toast);
  requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}
