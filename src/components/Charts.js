// ===== CHARTS COMPONENT =====

function buildPortfolioChart(svgId, timeKey) {
  const svg = document.getElementById(svgId);
  if (!svg) return;
  const data = APEX_DATA.chartData[timeKey] || APEX_DATA.chartData['1M'];
  const spData = APEX_DATA.chartData['SP'];
  const W = 600, H = 180;
  const pad = { l: 4, r: 4, t: 10, b: 24 };
  const cW = W - pad.l - pad.r;
  const cH = H - pad.t - pad.b;

  const minV = Math.min(...data, ...spData) * 0.98;
  const maxV = Math.max(...data, ...spData) * 1.02;

  function scaleX(i) { return pad.l + (i / (data.length - 1)) * cW; }
  function scaleY(v) { return pad.t + cH - ((v - minV) / (maxV - minV)) * cH; }

  const portPath = data.map((v, i) => `${i === 0 ? 'M' : 'L'}${scaleX(i).toFixed(1)},${scaleY(v).toFixed(1)}`).join(' ');
  const spPath = spData.map((v, i) => `${i === 0 ? 'M' : 'L'}${scaleX(i).toFixed(1)},${scaleY(v).toFixed(1)}`).join(' ');
  const areaPath = portPath + ` L${scaleX(data.length-1).toFixed(1)},${(pad.t+cH).toFixed(1)} L${pad.l},${(pad.t+cH).toFixed(1)} Z`;

  const labels = {
    '1D': ['9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM'],
    '1W': ['Mon','Tue','Wed','Thu','Fri','Sat','Sun','Mon'],
    '1M': ['Jan','','','Feb','','','Mar',''],
    '3M': ['Jan','','','Feb','','','Mar',''],
    '1Y': ['Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan'],
    'ALL': ['2021','','','2022','','','2023',''],
  };
  const lb = labels[timeKey] || labels['1M'];
  const labelPositions = lb.map((l, i) => ({ l, x: scaleX(Math.round(i * (data.length-1) / 7)) }));

  svg.innerHTML = `
    <defs>
      <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#2563ff" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="#2563ff" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <!-- Grid lines -->
    ${[0.25,0.5,0.75,1].map(f => {
      const y = (pad.t + cH * f).toFixed(1);
      return `<line x1="${pad.l}" y1="${y}" x2="${W-pad.r}" y2="${y}" stroke="var(--border)" stroke-width="0.5"/>`;
    }).join('')}
    <!-- S&P area -->
    <path d="${spData.map((v,i)=>`${i===0?'M':'L'}${scaleX(i).toFixed(1)},${scaleY(v).toFixed(1)}`).join(' ')} L${scaleX(spData.length-1).toFixed(1)},${(pad.t+cH).toFixed(1)} L${pad.l},${(pad.t+cH).toFixed(1)} Z"
          fill="rgba(100,100,100,0.04)"/>
    <!-- S&P line -->
    <path d="${spPath}" fill="none" stroke="#3a3a3a" stroke-width="1.5" stroke-dasharray="4,3"/>
    <!-- Portfolio area fill -->
    <path d="${areaPath}" fill="url(#blueGrad)"/>
    <!-- Portfolio line -->
    <path d="${portPath}" fill="none" stroke="#2563ff" stroke-width="1.5"/>
    <!-- Labels -->
    ${labelPositions.map(({l, x}) => l ? `<text x="${x.toFixed(1)}" y="${H-2}" fill="#555" font-size="9" font-family="DM Mono,monospace" text-anchor="middle">${l}</text>` : '').join('')}
    <!-- Legend -->
    <rect x="460" y="10" width="8" height="8" rx="2" fill="#2563ff" opacity="0.8"/>
    <text x="472" y="18" fill="#888" font-size="9" font-family="DM Mono,monospace">Portfolio</text>
    <line x1="460" y1="30" x2="468" y2="30" stroke="#3a3a3a" stroke-width="1.5" stroke-dasharray="3,2"/>
    <text x="472" y="33" fill="#555" font-size="9" font-family="DM Mono,monospace">S&amp;P 500</text>
  `;
}

function buildMiniSparkline(svgEl, data, color, up) {
  if (!svgEl) return;
  const W = 70, H = 28;
  const min = Math.min(...data), max = Math.max(...data);
  const scX = (i) => (i / (data.length - 1)) * W;
  const scY = (v) => H - 4 - ((v - min) / (max - min || 1)) * (H - 8);
  const path = data.map((v, i) => `${i===0?'M':'L'}${scX(i).toFixed(1)},${scY(v).toFixed(1)}`).join(' ');
  const strokeColor = up ? '#00d97e' : '#ff3b5c';
  svgEl.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svgEl.innerHTML = `<path d="${path}" fill="none" stroke="${strokeColor}" stroke-width="1.5"/>`;
}

function buildDonutChart(svgId, data) {
  const svg = document.getElementById(svgId);
  if (!svg) return;
  const cx = 60, cy = 60, r = 50, innerR = 34;
  let startAngle = -Math.PI / 2;
  let paths = '';
  data.forEach(d => {
    const angle = (d.pct / 100) * Math.PI * 2;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(startAngle + angle);
    const y2 = cy + r * Math.sin(startAngle + angle);
    const xi1 = cx + innerR * Math.cos(startAngle);
    const yi1 = cy + innerR * Math.sin(startAngle);
    const xi2 = cx + innerR * Math.cos(startAngle + angle);
    const yi2 = cy + innerR * Math.sin(startAngle + angle);
    const largeArc = angle > Math.PI ? 1 : 0;
    paths += `<path d="M${x1.toFixed(2)},${y1.toFixed(2)} A${r},${r} 0 ${largeArc},1 ${x2.toFixed(2)},${y2.toFixed(2)} L${xi2.toFixed(2)},${yi2.toFixed(2)} A${innerR},${innerR} 0 ${largeArc},0 ${xi1.toFixed(2)},${yi1.toFixed(2)} Z"
      fill="${d.color}" opacity="0.85"/>`;
    startAngle += angle;
  });
  svg.innerHTML = `
    ${paths}
    <circle cx="${cx}" cy="${cy}" r="${innerR-2}" fill="var(--bg2)"/>
    <text x="${cx}" y="${cy-4}" text-anchor="middle" fill="var(--text)" font-size="13" font-family="DM Mono,monospace" font-weight="500">18.2%</text>
    <text x="${cx}" y="${cy+12}" text-anchor="middle" fill="#555" font-size="8" font-family="DM Mono,monospace">RETURN</text>
  `;
}

// Animate a numeric value counting up
function animateCounter(el, start, end, duration, prefix, suffix, decimals) {
  if (!el) return;
  const startTime = performance.now();
  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = start + (end - start) * eased;
    el.innerHTML = (prefix||'') + value.toFixed(decimals||0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (suffix||'');
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
