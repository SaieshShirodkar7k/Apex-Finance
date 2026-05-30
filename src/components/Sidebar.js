// ===== SIDEBAR COMPONENT =====

const NAV_ITEMS = [
  { section: 'MAIN', items: [
    { id: 'dashboard', icon: '◈', label: 'Dashboard' },
    { id: 'portfolio', icon: '◎', label: 'Portfolio' },
    { id: 'markets',   icon: '≋', label: 'Markets' },
    { id: 'watchlist', icon: '☆', label: 'Watchlist', badge: '12', badgeClass: 'nav-badge-blue' },
  ]},
  { section: 'ANALYSIS', items: [
    { id: 'insights',  icon: '✦', label: 'AI Insights', badge: 'AI', badgeClass: 'nav-badge-purple' },
    { id: 'news',      icon: '⊞', label: 'Market News' },
    { id: 'analytics', icon: '∿', label: 'Analytics' },
  ]},
  { section: 'TOOLS', items: [
    { id: 'converter', icon: '⇄', label: 'FX Converter' },
    { id: 'alerts',    icon: '◻', label: 'Alerts', badge: '3', badgeClass: 'nav-badge-amber' },
    { id: 'settings',  icon: '⊙', label: 'Settings' },
  ]},
];

function renderSidebar(activeId) {
  const u = APEX_DATA.user;
  return `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-logo">
        <div class="logo-mark">
          <div class="logo-icon">A</div>
          <div>
            <div class="logo-name">APEX</div>
            <div class="logo-version">TERMINAL v2.4</div>
          </div>
        </div>
      </div>

      ${NAV_ITEMS.map(section => `
        <div class="nav-section">
          <span class="nav-section-label">${section.section}</span>
          ${section.items.map(item => `
            <div class="nav-item ${item.id === activeId ? 'active' : ''}" onclick="navigateTo('${item.id}')">
              <span class="nav-icon">${item.icon}</span>
              ${item.label}
              ${item.badge ? `<span class="nav-badge ${item.badgeClass}">${item.badge}</span>` : ''}
            </div>
          `).join('')}
        </div>
      `).join('')}

      <div class="sidebar-bottom">
        <div class="user-row" onclick="navigateTo('settings')">
          <div class="user-av">${u.initials}</div>
          <div>
            <div class="user-name">${u.name}</div>
            <div class="user-plan">${u.plan}</div>
          </div>
          <span class="user-menu-icon">⋯</span>
        </div>
      </div>
    </aside>
  `;
}
