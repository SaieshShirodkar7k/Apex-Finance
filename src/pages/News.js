// ===== NEWS PAGE =====

let _newsFilter = 'all';

function renderNews() {
  const cats = ['all','macro','crypto','earnings','tech','markets'];
  const allNews = [
    ...APEX_DATA.news,
    { cat:'EARNINGS', title:'Tesla misses Q1 deliveries estimate; shares fall 4% after-hours', src:'Bloomberg', time:'9h ago', impact:'high' },
    { cat:'MACRO',    title:'China stimulus package worth $280B to boost domestic consumption', src:'Reuters', time:'10h ago', impact:'med' },
    { cat:'CRYPTO',   title:'Solana surges 12% as network upgrades reduce transaction fees by 90%', src:'CoinDesk', time:'11h ago', impact:'med' },
    { cat:'TECH',     title:'Google announces Gemini Ultra 2 with breakthrough multimodal reasoning', src:'TechCrunch', time:'12h ago', impact:'med' },
    { cat:'MARKETS',  title:'VIX drops to 12.4, lowest level in 18 months as markets calm', src:'CNBC', time:'13h ago', impact:'low' },
    { cat:'MACRO',    title:'ECB holds rates steady; signals first cut in June 2026', src:'FT', time:'14h ago', impact:'med' },
    { cat:'EARNINGS', title:'Amazon Web Services revenue grows 21% YoY in Q1 earnings beat', src:'WSJ', time:'15h ago', impact:'high' },
    { cat:'CRYPTO',   title:'Ethereum staking yield drops to 3.8% as more validators join network', src:'CoinDesk', time:'16h ago', impact:'low' },
  ];

  return `
    <div id="tickerMount"></div>
    <div class="app-shell">
      ${renderSidebar('news')}
      <div class="main-area">
        <div class="page-topbar">
          <div class="page-title-block">
            <div class="page-title">Market News</div>
            <div class="page-breadcrumb">AI-curated · ${allNews.length} articles today</div>
          </div>
          <div class="topbar-right">
            <div class="badge-live"><span class="live-dot"></span>LIVE FEED</div>
          </div>
        </div>

        <div class="page-content">

          <!-- CATEGORY TABS -->
          <div style="display:flex;gap:6px;margin-bottom:20px;flex-wrap:wrap">
            ${cats.map(c => `
              <button class="btn ${c===_newsFilter?'btn-primary':'btn-ghost'} btn-sm"
                style="font-size:11px;letter-spacing:0.5px"
                onclick="setNewsFilter('${c}')">${c.toUpperCase()}</button>
            `).join('')}
          </div>

          <div style="display:grid;grid-template-columns:1fr 320px;gap:20px">

            <!-- NEWS FEED -->
            <div>
              <div id="newsFeedList" style="display:flex;flex-direction:column;gap:12px">
                ${allNews.map(n => renderNewsCard(n)).join('')}
              </div>
            </div>

            <!-- SIDEBAR -->
            <div style="display:flex;flex-direction:column;gap:16px">

              <!-- TRENDING -->
              <div class="card">
                <div class="card-header">
                  <div class="card-title">Trending Topics</div>
                </div>
                <div style="padding:4px 0">
                  ${['AI Chips','Bitcoin ETF','Fed Rate Cuts','Tesla Earnings','Apple WWDC','China Economy','Ethereum Upgrade','S&P 500 ATH'].map((t,i) => `
                    <div style="display:flex;align-items:center;gap:10px;padding:10px 18px;border-bottom:1px solid var(--border);cursor:pointer;transition:background 0.15s"
                         onmouseover="this.style.background='var(--bg3)'" onmouseout="this.style.background=''"
                         onclick="setNewsFilter('all')">
                      <span style="font-size:12px;color:var(--text3);font-family:var(--mono);width:16px">${i+1}</span>
                      <span style="font-size:13px">${t}</span>
                      <span style="margin-left:auto;font-size:10px;color:var(--blue);font-family:var(--mono)">↑${Math.floor(Math.random()*900+100)}</span>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- SENTIMENT METER -->
              <div class="card">
                <div class="card-header">
                  <div class="card-title">Market Sentiment</div>
                  <span class="badge badge-green">BULLISH</span>
                </div>
                <div class="card-body">
                  <div style="margin-bottom:16px">
                    <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                      <span style="font-size:11px;color:var(--text3)">Fear</span>
                      <span style="font-size:11px;color:var(--text3)">Greed</span>
                    </div>
                    <div style="height:8px;background:linear-gradient(90deg,var(--red),var(--amber),var(--green));border-radius:4px;position:relative">
                      <div style="position:absolute;top:-3px;left:72%;width:14px;height:14px;background:#fff;border-radius:50%;border:2px solid var(--bg);box-shadow:0 0 8px rgba(0,217,126,0.5)"></div>
                    </div>
                    <div style="text-align:center;margin-top:12px">
                      <span style="font-size:28px;font-family:var(--mono);font-weight:300;color:var(--green)">72</span>
                      <span style="font-size:12px;color:var(--text3);display:block;margin-top:2px">GREED</span>
                    </div>
                  </div>
                  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
                    ${[['Positive','68%','green'],['Negative','20%','red'],['Neutral','12%','text3'],['Trending','↑18%','blue']].map(([l,v,c]) => `
                      <div style="background:var(--bg3);border-radius:var(--radius-sm);padding:10px;text-align:center">
                        <div style="font-size:14px;font-family:var(--mono);font-weight:500;color:var(--${c})">${v}</div>
                        <div style="font-size:10px;color:var(--text3);margin-top:2px">${l}</div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderNewsCard(n) {
  const impactMap = { high:'impact-high', med:'impact-med', low:'impact-low' };
  return `
    <div class="card" style="cursor:pointer;transition:border-color 0.15s"
         onmouseover="this.style.borderColor='var(--border3)'" onmouseout="this.style.borderColor=''"
         data-cat="${n.cat.toLowerCase()}"
         onclick="showToast('Opening ${n.src} article…','info')">
      <div style="padding:18px 20px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
          <span class="badge badge-blue">${n.cat}</span>
          <span class="news-impact ${impactMap[n.impact]}">${n.impact.toUpperCase()} IMPACT</span>
          <span style="margin-left:auto;font-size:11px;color:var(--text3)">${n.src} · ${n.time}</span>
        </div>
        <div style="font-size:14px;font-weight:500;line-height:1.55;margin-bottom:10px">${n.title}</div>
        <div style="font-size:12px;color:var(--text3);line-height:1.6">
          AI Summary: ${generateSummary(n.title)}
        </div>
        <div style="display:flex;gap:8px;margin-top:12px">
          <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation()">Read full article →</button>
          <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();showToast('Saved to reading list','success')">☆ Save</button>
        </div>
      </div>
    </div>
  `;
}

function generateSummary(title) {
  const summaries = [
    'This development could have significant implications for portfolio holders in the affected sector. Monitor price action closely for entry/exit signals.',
    'Analysts are divided on the long-term impact. Short-term volatility expected while markets digest the news and reassess valuations.',
    'Historically bullish catalyst. Similar events have preceded 5-15% moves in related assets over the following 30 days.',
    'Key risk factor to watch. Consider hedging exposure if you hold positions in directly affected companies.',
  ];
  return summaries[title.length % summaries.length];
}

function setNewsFilter(cat) {
  _newsFilter = cat;
  document.querySelectorAll('#newsFeedList .card').forEach(el => {
    const elCat = el.getAttribute('data-cat');
    el.style.display = cat === 'all' || elCat === cat ? '' : 'none';
  });
}

function initNews() {
  renderTicker('tickerMount', APEX_DATA.tickers);
}
