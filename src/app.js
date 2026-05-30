// ===== APEX FINANCE — MAIN APP ROUTER =====

const ROUTES = {
  landing:   { render: renderLanding,   init: initLanding,    title: 'APEX Finance' },
  login:     { render: renderLogin,     init: null,           title: 'Sign In — APEX' },
  register:  { render: renderRegister,  init: null,           title: 'Create Account — APEX' },
  dashboard: { render: renderDashboard, init: initDashboard,  title: 'Dashboard — APEX' },
  portfolio: { render: renderPortfolio, init: initPortfolio,  title: 'Portfolio — APEX' },
  markets:   { render: renderMarkets,   init: initMarkets,    title: 'Markets — APEX' },
  watchlist: { render: renderWatchlist, init: initWatchlist,  title: 'Watchlist — APEX' },
  insights:  { render: renderAIInsights,init: initAIInsights, title: 'AI Insights — APEX' },
  news:      { render: renderNews,      init: initNews,       title: 'Market News — APEX' },
  analytics: { render: renderAnalytics, init: initAnalytics,  title: 'Analytics — APEX' },
  converter: { render: renderConverter, init: initConverter,  title: 'FX Converter — APEX' },
  alerts:    { render: renderAlerts,    init: initAlerts,     title: 'Alerts — APEX' },
  settings:  { render: renderSettings,  init: initSettings,   title: 'Settings — APEX' },
};

let _currentRoute = 'landing';

function navigateTo(page) {
  const route = ROUTES[page];
  if (!route) { console.warn('Unknown route:', page); return; }

  _currentRoute = page;
  document.title = route.title;

  // Scroll to top
  window.scrollTo(0, 0);

  const app = document.getElementById('app');
  if (!app) return;

  // Fade out
  app.style.opacity = '0';
  app.style.transition = 'opacity 0.15s ease';

  setTimeout(() => {
    app.innerHTML = route.render();
    app.style.opacity = '0';
    requestAnimationFrame(() => {
      app.style.transition = 'opacity 0.25s ease';
      app.style.opacity = '1';
    });
    if (route.init) setTimeout(route.init, 50);
  }, 150);
}

// Handle browser back/forward
window.addEventListener('popstate', (e) => {
  if (e.state?.page) navigateTo(e.state.page);
});

// Keyboard shortcut: Escape closes modal
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') hideModal();
  // Cmd/Ctrl + K — focus search
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    document.getElementById('globalSearch')?.focus();
  }
});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
  navigateTo('landing');
});
