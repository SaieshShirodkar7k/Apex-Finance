// ===== LANDING PAGE =====

function renderLanding() {
  const features = [
    { icon:'◈', bg:'rgba(37,99,255,0.08)', color:'#2563ff', title:'Real-Time Intelligence', desc:'Live market data across stocks, crypto, forex, and commodities — updated every millisecond.' },
    { icon:'✦', bg:'rgba(124,58,237,0.08)', color:'#7c3aed', title:'AI-Powered Insights', desc:'GPT-4o analyzes your portfolio 24/7, flagging risks and surfacing high-conviction opportunities.' },
    { icon:'◎', bg:'rgba(0,217,126,0.08)', color:'#00d97e', title:'Portfolio Analytics', desc:'Deep performance attribution, risk-adjusted returns, and benchmark comparisons in one view.' },
    { icon:'∿', bg:'rgba(245,158,11,0.08)', color:'#f59e0b', title:'Advanced Charting', desc:'Professional-grade candlestick, area, and line charts with 50+ technical indicators.' },
    { icon:'⊞', bg:'rgba(6,182,212,0.08)', color:'#06b6d4', title:'Curated News Feed', desc:'AI summarizes and filters market-moving news, ranked by relevance to your holdings.' },
    { icon:'⇄', bg:'rgba(255,59,92,0.08)', color:'#ff3b5c', title:'Multi-Asset Coverage', desc:'Track anything — US stocks, crypto, international equities, ETFs, bonds, and FX pairs.' },
  ];

  return `
    <div id="tickerMount"></div>

    <nav class="landing-nav" id="landingNav">
      <a class="nav-logo" href="#" onclick="return false;">
        <div class="nav-logo-icon">A</div>
        <div class="nav-logo-text">APEX</div>
      </a>
      <div class="nav-links hide-md">
        <a class="nav-link" href="#features">Features</a>
        <a class="nav-link" href="#dashboard">Dashboard</a>
        <a class="nav-link" href="#pricing">Pricing</a>
        <a class="nav-link" href="#about">About</a>
      </div>
      <div class="nav-actions">
        <button class="btn btn-ghost" onclick="navigateTo('login')">Sign in</button>
        <button class="btn btn-primary" onclick="navigateTo('register')">Get started →</button>
      </div>
    </nav>

    <section class="hero">
      <div class="hero-bg">
        <div class="hero-grid"></div>
        <div class="hero-glow"></div>
        <div class="hero-glow-2"></div>
      </div>

      <!-- Floating cards -->
      <div class="hero-cards hide-md">
        <div class="float-card fc-1">
          <div class="fc-label">NVDA — PORTFOLIO</div>
          <div class="fc-val text-green">+38.2%</div>
          <div class="fc-change text-green">↑ $17,818 gain</div>
        </div>
        <div class="float-card fc-2">
          <div class="fc-label">BTC/USD — LIVE</div>
          <div class="fc-val">$67,420</div>
          <div class="fc-change text-green">↑ +2.31% today</div>
        </div>
        <div class="float-card fc-3">
          <div class="fc-label">AI INSIGHT</div>
          <div style="font-size:12px;color:var(--text2);margin-top:4px;max-width:160px;line-height:1.5">AAPL approaching key resistance at $220</div>
        </div>
        <div class="float-card fc-4">
          <div class="fc-label">PORTFOLIO VALUE</div>
          <div class="fc-val">$284,921</div>
          <div class="fc-change text-green">↑ +1.50% today</div>
        </div>
      </div>

      <div class="hero-eyebrow">
        <span class="live-dot"></span>
        NEXT GENERATION FINANCIAL INTELLIGENCE
      </div>

      <h1 class="hero-title">
        The platform<br>
        <span class="accent">serious investors</span><br>
        <span class="thin">trust with their edge.</span>
      </h1>

      <p class="hero-subtitle">
        Real-time data, AI-powered analytics, and institutional-grade portfolio management —
        beautifully unified in one terminal.
      </p>

      <div class="hero-tagline">TRACK. ANALYZE. PREDICT. INVEST.</div>

      <div class="hero-actions">
        <button class="btn btn-primary btn-lg" onclick="navigateTo('register')">
          Get started free →
        </button>
        <button class="btn btn-ghost btn-lg" onclick="navigateTo('dashboard')">
          Explore dashboard
        </button>
      </div>

      <div class="hero-stats">
        <div class="hero-stat">
          <div class="hero-stat-val text-green">$2.4B+</div>
          <div class="hero-stat-label">ASSETS TRACKED</div>
        </div>
        <div class="hero-stat-divider"></div>
        <div class="hero-stat">
          <div class="hero-stat-val">84K+</div>
          <div class="hero-stat-label">ACTIVE TRADERS</div>
        </div>
        <div class="hero-stat-divider"></div>
        <div class="hero-stat">
          <div class="hero-stat-val">14K+</div>
          <div class="hero-stat-label">ASSETS COVERED</div>
        </div>
        <div class="hero-stat-divider"></div>
        <div class="hero-stat">
          <div class="hero-stat-val text-blue">99.9%</div>
          <div class="hero-stat-label">UPTIME SLA</div>
        </div>
      </div>
    </section>

    <section class="features-section" id="features">
      <div class="section-eyebrow">BUILT FOR PROFESSIONALS</div>
      <h2 class="section-title">Everything you need to trade smarter.</h2>
      <p class="section-sub">A complete financial intelligence platform — from live data to AI insights to portfolio management.</p>
      <div class="features-grid">
        ${features.map(f => `
          <div class="feature-card">
            <div class="feature-icon" style="background:${f.bg};color:${f.color}">${f.icon}</div>
            <div class="feature-title">${f.title}</div>
            <p class="feature-desc">${f.desc}</p>
          </div>
        `).join('')}
      </div>
    </section>

    <section class="preview-section" id="dashboard">
      <div class="section-eyebrow">LIVE PREVIEW</div>
      <h2 class="section-title">Your command center.</h2>
      <p class="section-sub">A terminal built for the speed and complexity of modern markets.</p>
      <div class="preview-wrap">
        <div class="preview-bar">
          <div class="preview-dot" style="background:#ff5f56"></div>
          <div class="preview-dot" style="background:#febc2e"></div>
          <div class="preview-dot" style="background:#27c93f"></div>
          <span style="font-size:11px;color:var(--text3);margin-left:8px;font-family:var(--mono)">apex.finance — Dashboard</span>
        </div>
        <div class="preview-img-placeholder">
          <span>[ Embedded Dashboard Preview ]</span>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="cta-box">
        <h2 class="cta-title">Start trading smarter today.</h2>
        <p class="cta-sub">Join 84,000+ investors who use APEX to track, analyze, and grow their portfolios with confidence.</p>
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
          <button class="btn btn-primary btn-lg" onclick="navigateTo('register')">Create free account →</button>
          <button class="btn btn-ghost btn-lg" onclick="navigateTo('login')">Sign in</button>
        </div>
        <p style="font-size:11px;color:var(--text4);margin-top:18px;font-family:var(--mono)">No credit card required. Free plan available.</p>
      </div>
    </section>

    <footer class="landing-footer">
      <div class="logo-mark">
        <div class="logo-icon" style="width:22px;height:22px;font-size:10px">A</div>
        <div style="font-size:13px;font-weight:600">APEX Finance</div>
      </div>
      <div class="footer-links">
        <a class="footer-link" href="#">Privacy</a>
        <a class="footer-link" href="#">Terms</a>
        <a class="footer-link" href="#">Security</a>
        <a class="footer-link" href="#">API</a>
        <a class="footer-link" href="#">Support</a>
      </div>
      <div class="footer-copy">© 2026 APEX Finance, Inc.</div>
    </footer>
  `;
}

function initLanding() {
  renderTicker('tickerMount', APEX_DATA.tickers);

  // Sticky nav
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('landingNav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}
