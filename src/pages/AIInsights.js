// ===== AI INSIGHTS PAGE =====

let _chatHistory = [];

function renderAIInsights() {
  return `
    <div id="tickerMount"></div>
    <div class="app-shell">
      ${renderSidebar('insights')}
      <div class="main-area">
        <div class="page-topbar">
          <div class="page-title-block">
            <div class="page-title">AI Insights</div>
            <div class="page-breadcrumb">Powered by GPT-4o · Updated continuously</div>
          </div>
          <div class="topbar-right">
            <span class="badge badge-purple">GPT-4o LIVE</span>
            <button class="btn btn-ghost" onclick="showToast('Report generated','success')">Generate Report</button>
          </div>
        </div>

        <div class="page-content">

          <!-- AI SUMMARY CARDS -->
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px">
            <div class="kpi-card animate-fadeup delay-1" style="border-color:rgba(37,99,255,0.2)">
              <div class="kpi-label">PORTFOLIO SCORE</div>
              <div class="kpi-value text-blue" style="font-size:28px">84<span class="cents">/100</span></div>
              <div class="kpi-change text-blue">↑ +3 vs last week</div>
            </div>
            <div class="kpi-card animate-fadeup delay-2">
              <div class="kpi-label">RISK LEVEL</div>
              <div class="kpi-value" style="font-size:20px;color:var(--amber)">MODERATE<span class="cents"></span></div>
              <div class="kpi-change" style="color:var(--amber)">Beta: 1.24 vs S&P</div>
            </div>
            <div class="kpi-card animate-fadeup delay-3">
              <div class="kpi-label">ACTIVE SIGNALS</div>
              <div class="kpi-value" style="font-size:28px">7</div>
              <div class="kpi-change text-green">3 bullish · 2 bearish · 2 neutral</div>
            </div>
            <div class="kpi-card animate-fadeup delay-4">
              <div class="kpi-label">SENTIMENT</div>
              <div class="kpi-value text-green" style="font-size:20px">BULLISH<span class="cents"></span></div>
              <div class="kpi-change text-green">Market confidence: 72%</div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px">

            <!-- SIGNAL CARDS -->
            <div class="card">
              <div class="card-header">
                <div><div class="card-title">Active Signals</div><div class="card-sub">AI-generated trade ideas</div></div>
                <span class="badge badge-purple">AI</span>
              </div>
              <div>
                ${APEX_DATA.insights.map(i => renderDetailedInsight(i)).join('')}
              </div>
            </div>

            <!-- RISK ANALYSIS -->
            <div class="card">
              <div class="card-header">
                <div><div class="card-title">Risk Analysis</div><div class="card-sub">Portfolio risk breakdown</div></div>
              </div>
              <div class="card-body">
                ${renderRiskMetrics()}
              </div>
            </div>
          </div>

          <!-- AI CHATBOT -->
          <div class="card">
            <div class="ai-header">
              <div class="ai-pulse"></div>
              <div class="ai-title">APEX AI Assistant</div>
              <span class="badge badge-purple">GPT-4o</span>
              <button class="btn btn-ghost btn-sm" style="margin-left:auto" onclick="clearChat()">Clear</button>
            </div>
            <div id="chatMessages" style="height:280px;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px">
              <div class="ai-msg ai-msg-bot">
                <div class="ai-msg-bubble">
                  👋 Hi! I'm your APEX AI financial assistant. Ask me anything about your portfolio, market trends, or investment strategies.
                </div>
                <div style="font-size:10px;color:var(--text3);margin-top:4px;font-family:var(--mono)">APEX AI · just now</div>
              </div>
            </div>
            <div style="padding:14px 16px;border-top:1px solid var(--border);display:flex;gap:10px">
              <input type="text" class="input-field" id="chatInput" placeholder="Ask about your portfolio, markets, risk…"
                style="flex:1" onkeydown="if(event.key==='Enter')sendChat()">
              <button class="btn btn-primary" onclick="sendChat()">Send →</button>
            </div>
            <div style="padding:0 16px 14px;display:flex;gap:8px;flex-wrap:wrap">
              ${['Analyze my portfolio risk','What should I buy?','Bitcoin outlook?','Reduce my tech exposure'].map(q =>
                `<button class="btn btn-ghost btn-sm" onclick="quickChat('${q}')">${q}</button>`
              ).join('')}
            </div>
          </div>

        </div>
      </div>
    </div>
  `;
}

function renderDetailedInsight(i) {
  const typeColors = { bull:'var(--green)', bear:'var(--red)', neutral:'var(--amber)', info:'var(--blue)' };
  const color = typeColors[i.type] || 'var(--blue)';
  const actions = { bull:'Consider buying', bear:'Review position', neutral:'Monitor closely', info:'Stay informed' };
  return `
    <div class="ai-insight-item" style="padding:16px 20px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
        <div class="ai-tag" style="color:${color};font-size:10px">${i.tag}</div>
        <span style="font-size:10px;color:var(--text3);font-family:var(--mono)">${i.meta.split('·')[0]}</span>
      </div>
      <div class="ai-text" style="margin-bottom:10px">${i.text}</div>
      <button class="btn btn-ghost btn-sm" style="font-size:11px" onclick="quickChat('Tell me more about: ${i.tag.toLowerCase()} signal')">
        ${actions[i.type] || 'Learn more'} →
      </button>
    </div>
  `;
}

function renderRiskMetrics() {
  const metrics = [
    { label:'Beta', val:'1.24', sub:'vs S&P 500', color:'var(--amber)' },
    { label:'Sharpe Ratio', val:'1.84', sub:'Risk-adj return', color:'var(--green)' },
    { label:'Max Drawdown', val:'-6.2%', sub:'Last 12 months', color:'var(--red)' },
    { label:'VaR (95%)', val:'-2.8%', sub:'Daily value at risk', color:'var(--amber)' },
    { label:'Sortino Ratio', val:'2.31', sub:'Downside deviation', color:'var(--green)' },
    { label:'Correlation', val:'0.72', sub:'vs S&P 500', color:'var(--text2)' },
  ];
  return `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      ${metrics.map(m => `
        <div style="background:var(--bg3);border-radius:var(--radius);padding:14px;border:1px solid var(--border)">
          <div style="font-size:10px;color:var(--text3);margin-bottom:6px;letter-spacing:0.5px">${m.label}</div>
          <div style="font-size:20px;font-family:var(--mono);font-weight:300;color:${m.color}">${m.val}</div>
          <div style="font-size:10px;color:var(--text3);margin-top:4px">${m.sub}</div>
        </div>
      `).join('')}
    </div>
    <div style="margin-top:16px;padding:14px;background:var(--amber2);border:1px solid rgba(245,158,11,0.2);border-radius:var(--radius)">
      <div style="font-size:11px;color:var(--amber);font-weight:600;margin-bottom:4px">⚠ CONCENTRATION RISK</div>
      <div style="font-size:12px;color:var(--text2)">Tech sector is 68% of your portfolio. Consider diversifying to reduce sector-specific risk.</div>
    </div>
  `;
}

const AI_RESPONSES = {
  default: [
    "Based on your current portfolio composition, I see strong momentum in your tech positions, particularly NVDA (+38.2%). Your Sharpe ratio of 1.84 indicates excellent risk-adjusted returns. Consider rebalancing tech to below 50% to reduce concentration risk.",
    "Your portfolio has outperformed the S&P 500 by 9.06% this year — excellent alpha generation. The main risk I identify is TSLA at -5.2%, which is approaching a key support level at $175. Watch for a potential bounce or stop-loss trigger.",
    "Market sentiment is currently leaning bullish with the Fear & Greed Index at 72. BTC dominance rising to 54.2% suggests the crypto cycle may be shifting toward large-caps. Your BTC position is well-sized at 13.4% of portfolio.",
    "For portfolio optimization, I'd suggest: 1) Trim NVDA position by 5-10% to lock in gains, 2) Add more SPY/QQQ for stability, 3) Consider adding gold or bonds as a hedge against potential market correction.",
  ],
  risk: ["Your portfolio risk profile is MODERATE with a beta of 1.24. Key risk factors: 68% tech concentration, TSLA position at -5.2%, and relatively high crypto exposure at ~24%. To reduce risk: diversify into defensive sectors like healthcare and utilities."],
  buy: ["Top buy opportunities I'm tracking: 1) NVDA dips below $1,050 (AI demand secular trend), 2) BTC accumulation below $65,000 (ETF inflow momentum), 3) AMZN (AWS growth acceleration), 4) AMD (gaining data center share from NVDA). Always size positions according to your risk tolerance."],
  bitcoin: ["Bitcoin outlook is bullish medium-term. ETF inflows remain strong at $800M+/day. The halving effect typically drives prices higher 6-12 months post-event. Key resistance at $72,000 — a breakout could target $85,000-$100,000. Your current BTC position at 13.4% is well-calibrated."],
  tech: ["To reduce tech exposure from 68% to a safer 45-50%: Consider trimming NVDA (take partial profits after +38%), META (near fair value), and GOOGL (modest trim). Rotate proceeds into SPY, healthcare ETFs (XLV), or dividend stocks. This improves diversification without sacrificing the AI/tech growth thesis."],
};

function getAIResponse(msg) {
  const lower = msg.toLowerCase();
  if (lower.includes('risk')) return AI_RESPONSES.risk[0];
  if (lower.includes('buy') || lower.includes('invest')) return AI_RESPONSES.buy[0];
  if (lower.includes('bitcoin') || lower.includes('btc') || lower.includes('crypto')) return AI_RESPONSES.bitcoin[0];
  if (lower.includes('tech') || lower.includes('concentration') || lower.includes('reduce')) return AI_RESPONSES.tech[0];
  return AI_RESPONSES.default[Math.floor(Math.random() * AI_RESPONSES.default.length)];
}

function sendChat() {
  const input = document.getElementById('chatInput');
  if (!input || !input.value.trim()) return;
  appendChatMsg(input.value.trim(), 'user');
  const userMsg = input.value.trim();
  input.value = '';
  setTimeout(() => {
    appendTypingIndicator();
    setTimeout(() => {
      removeTypingIndicator();
      appendChatMsg(getAIResponse(userMsg), 'bot');
    }, 1200 + Math.random() * 800);
  }, 200);
}

function quickChat(msg) {
  const input = document.getElementById('chatInput');
  if (input) { input.value = msg; sendChat(); }
}

function appendChatMsg(text, from) {
  const container = document.getElementById('chatMessages');
  if (!container) return;
  const isBot = from === 'bot';
  const div = document.createElement('div');
  div.className = `ai-msg ai-msg-${from}`;
  div.style.cssText = `display:flex;flex-direction:column;align-items:${isBot?'flex-start':'flex-end'};animation:fadeUp 0.3s ease`;
  div.innerHTML = `
    <div class="ai-msg-bubble" style="
      max-width:80%;padding:10px 14px;border-radius:${isBot?'4px 12px 12px 12px':'12px 4px 12px 12px'};
      background:${isBot?'var(--bg3)':'var(--blue3)'};
      border:1px solid ${isBot?'var(--border)':'rgba(37,99,255,0.2)'};
      font-size:13px;line-height:1.6;color:var(--text)
    ">${text}</div>
    <div style="font-size:10px;color:var(--text3);margin-top:4px;font-family:var(--mono)">${isBot?'APEX AI':'You'} · just now</div>
  `;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function appendTypingIndicator() {
  const container = document.getElementById('chatMessages');
  if (!container) return;
  const div = document.createElement('div');
  div.id = 'typingIndicator';
  div.innerHTML = `
    <div style="display:flex;align-items:center;gap:4px;padding:10px 14px;background:var(--bg3);border:1px solid var(--border);border-radius:4px 12px 12px 12px;width:fit-content">
      <span style="width:6px;height:6px;background:var(--blue);border-radius:50%;animation:pulse-dot 0.8s 0s infinite"></span>
      <span style="width:6px;height:6px;background:var(--blue);border-radius:50%;animation:pulse-dot 0.8s 0.2s infinite"></span>
      <span style="width:6px;height:6px;background:var(--blue);border-radius:50%;animation:pulse-dot 0.8s 0.4s infinite"></span>
    </div>
  `;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator() {
  document.getElementById('typingIndicator')?.remove();
}

function clearChat() {
  const container = document.getElementById('chatMessages');
  if (container) container.innerHTML = '';
  appendChatMsg("Chat cleared. How can I help with your portfolio today?", 'bot');
}

function initAIInsights() {
  renderTicker('tickerMount', APEX_DATA.tickers);
}
