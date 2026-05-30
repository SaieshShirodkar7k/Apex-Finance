// ===== SETTINGS PAGE =====

let _settingsTab = 'general';

function renderSettings() {
  const tabs = [
    { id:'general',  icon:'⊙', label:'General'        },
    { id:'profile',  icon:'◎', label:'Profile'         },
    { id:'security', icon:'◻', label:'Security'        },
    { id:'notif',    icon:'◈', label:'Notifications'   },
    { id:'api',      icon:'∿', label:'API & Integrations' },
    { id:'billing',  icon:'⇄', label:'Billing'         },
  ];

  return `
    <div id="tickerMount"></div>
    <div class="app-shell">
      ${renderSidebar('settings')}
      <div class="main-area">
        <div class="page-topbar">
          <div class="page-title-block">
            <div class="page-title">Settings</div>
            <div class="page-breadcrumb">Account & preferences</div>
          </div>
          <div class="topbar-right">
            <button class="btn btn-primary" onclick="showToast('Settings saved','success')">Save changes</button>
          </div>
        </div>

        <div class="page-content">
          <div class="settings-grid">

            <!-- SETTINGS NAV -->
            <div class="settings-nav">
              ${tabs.map(t => `
                <div class="settings-nav-item ${t.id===_settingsTab?'active':''}" onclick="setSettingsTab('${t.id}')">
                  <span>${t.icon}</span>${t.label}
                </div>
              `).join('')}
              <div style="height:1px;background:var(--border);margin:8px 0"></div>
              <div class="settings-nav-item" style="color:var(--red)" onclick="showToast('Signed out','info');setTimeout(()=>navigateTo('login'),800)">
                <span>↩</span>Sign out
              </div>
            </div>

            <!-- SETTINGS CONTENT -->
            <div id="settingsContent">
              ${renderSettingsTab(_settingsTab)}
            </div>

          </div>
        </div>
      </div>
    </div>
  `;
}

function renderSettingsTab(tab) {
  switch(tab) {
    case 'general':   return renderGeneralSettings();
    case 'profile':   return renderProfileSettings();
    case 'security':  return renderSecuritySettings();
    case 'notif':     return renderNotifSettings();
    case 'api':       return renderAPISettings();
    case 'billing':   return renderBillingSettings();
    default:          return renderGeneralSettings();
  }
}

function renderGeneralSettings() {
  const rows = [
    { label:'Dark Mode', sub:'Use dark theme across the platform', on:true },
    { label:'Compact View', sub:'Reduce spacing for more information density', on:false },
    { label:'Animations', sub:'Enable smooth transitions and micro-interactions', on:true },
    { label:'Real-time Updates', sub:'Auto-refresh market data every 3 seconds', on:true },
    { label:'Sound Alerts', sub:'Play audio when price alerts trigger', on:false },
    { label:'Beta Features', sub:'Access experimental features before release', on:false },
  ];
  return `
    <div class="settings-section">
      <h3 style="margin-bottom:4px">General Preferences</h3>
      <p style="font-size:13px;color:var(--text3);margin-bottom:20px">Customize your APEX experience.</p>
      ${rows.map(r => `
        <div class="settings-row">
          <div class="settings-row-info">
            <div class="sr-label">${r.label}</div>
            <div class="sr-sub">${r.sub}</div>
          </div>
          <div class="toggle ${r.on?'on':''}" onclick="this.classList.toggle('on');showToast('Preference updated','success')"></div>
        </div>
      `).join('')}
      <div style="margin-top:20px">
        <div class="input-label">DEFAULT CURRENCY</div>
        <select class="input-field" style="max-width:200px" onchange="showToast('Currency updated','success')">
          <option selected>USD — US Dollar</option>
          <option>EUR — Euro</option>
          <option>GBP — British Pound</option>
          <option>JPY — Japanese Yen</option>
          <option>INR — Indian Rupee</option>
        </select>
      </div>
      <div style="margin-top:14px">
        <div class="input-label">DEFAULT CHART TYPE</div>
        <select class="input-field" style="max-width:200px">
          <option selected>Area Chart</option>
          <option>Candlestick</option>
          <option>Line Chart</option>
          <option>Bar Chart</option>
        </select>
      </div>
    </div>
  `;
}

function renderProfileSettings() {
  const u = APEX_DATA.user;
  return `
    <div class="settings-section">
      <h3 style="margin-bottom:4px">Profile</h3>
      <p style="font-size:13px;color:var(--text3);margin-bottom:20px">Manage your personal information.</p>
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:24px;padding:20px;background:var(--bg3);border-radius:var(--radius-lg);border:1px solid var(--border)">
        <div style="width:64px;height:64px;border-radius:16px;background:linear-gradient(135deg,#2563ff,#7c3aed);display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:600;color:#fff">${u.initials}</div>
        <div>
          <div style="font-size:16px;font-weight:600">${u.name}</div>
          <div style="font-size:12px;color:var(--text3)">${u.email}</div>
          <span class="badge badge-blue" style="margin-top:6px">PRO TIER</span>
        </div>
        <button class="btn btn-ghost btn-sm" style="margin-left:auto" onclick="showToast('Upload feature coming soon','info')">Change photo</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        <div class="input-group">
          <label class="input-label">FIRST NAME</label>
          <input type="text" class="input-field" value="James">
        </div>
        <div class="input-group">
          <label class="input-label">LAST NAME</label>
          <input type="text" class="input-field" value="Davidson">
        </div>
        <div class="input-group">
          <label class="input-label">EMAIL</label>
          <input type="email" class="input-field" value="${u.email}">
        </div>
        <div class="input-group">
          <label class="input-label">TIMEZONE</label>
          <select class="input-field">
            <option selected>UTC-5 (Eastern Time)</option>
            <option>UTC+0 (London)</option>
            <option>UTC+5:30 (India)</option>
            <option>UTC+8 (Singapore)</option>
          </select>
        </div>
      </div>
      <button class="btn btn-primary" onclick="showToast('Profile saved','success')">Save Profile</button>
    </div>
  `;
}

function renderSecuritySettings() {
  return `
    <div class="settings-section">
      <h3 style="margin-bottom:4px">Security</h3>
      <p style="font-size:13px;color:var(--text3);margin-bottom:20px">Keep your account safe.</p>
      <div class="settings-row">
        <div class="settings-row-info">
          <div class="sr-label">Two-Factor Authentication</div>
          <div class="sr-sub">Add an extra layer of security to your account</div>
        </div>
        <div class="toggle on" onclick="this.classList.toggle('on')"></div>
      </div>
      <div class="settings-row">
        <div class="settings-row-info">
          <div class="sr-label">Login Notifications</div>
          <div class="sr-sub">Email me when a new device logs in</div>
        </div>
        <div class="toggle on" onclick="this.classList.toggle('on')"></div>
      </div>
      <div style="margin-top:20px">
        <div class="input-label">CHANGE PASSWORD</div>
        <input type="password" class="input-field" placeholder="Current password" style="margin-bottom:10px">
        <input type="password" class="input-field" placeholder="New password" style="margin-bottom:10px">
        <input type="password" class="input-field" placeholder="Confirm new password" style="margin-bottom:14px">
        <button class="btn btn-primary" onclick="showToast('Password updated','success')">Update Password</button>
      </div>
      <div style="margin-top:20px;padding:16px;border:1px solid rgba(255,59,92,0.2);border-radius:var(--radius);background:var(--red2)">
        <div style="font-size:13px;font-weight:500;color:var(--red);margin-bottom:8px">Danger Zone</div>
        <button class="btn btn-danger" onclick="showToast('Account deletion requires email confirmation','error')">Delete Account</button>
      </div>
    </div>
  `;
}

function renderNotifSettings() {
  const notifs = [
    { label:'Price Alerts', sub:'When an asset hits your target price', on:true },
    { label:'Portfolio Milestones', sub:'When you hit a new all-time high', on:true },
    { label:'AI Insights', sub:'New high-confidence AI signals', on:true },
    { label:'News Alerts', sub:'Breaking market news affecting your holdings', on:false },
    { label:'Earnings Reports', sub:'Before companies you hold report earnings', on:true },
    { label:'Weekly Summary', sub:'Email digest of portfolio performance', on:false },
  ];
  return `
    <div class="settings-section">
      <h3 style="margin-bottom:4px">Notifications</h3>
      <p style="font-size:13px;color:var(--text3);margin-bottom:20px">Control what alerts you receive.</p>
      ${notifs.map(n => `
        <div class="settings-row">
          <div class="settings-row-info">
            <div class="sr-label">${n.label}</div>
            <div class="sr-sub">${n.sub}</div>
          </div>
          <div class="toggle ${n.on?'on':''}" onclick="this.classList.toggle('on')"></div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderAPISettings() {
  return `
    <div class="settings-section">
      <h3 style="margin-bottom:4px">API & Integrations</h3>
      <p style="font-size:13px;color:var(--text3);margin-bottom:20px">Connect external data sources and brokers.</p>
      <div style="margin-bottom:20px">
        <div class="input-label">YOUR API KEY</div>
        <div style="display:flex;gap:8px">
          <input type="text" class="input-field" value="apx_live_xxxxxxxxxxxxxxxxxxxx" readonly style="font-family:var(--mono)">
          <button class="btn btn-ghost" onclick="showToast('API key copied','success')">Copy</button>
          <button class="btn btn-ghost" onclick="showToast('API key regenerated','success')">Regen</button>
        </div>
      </div>
      <div>
        <div class="input-label" style="margin-bottom:12px">CONNECTED BROKERS</div>
        ${[{name:'Alpaca Trading', status:'Connected', color:'green'},{name:'Interactive Brokers', status:'Not connected', color:'text3'},{name:'Robinhood', status:'Not connected', color:'text3'}].map(b => `
          <div style="display:flex;align-items:center;justify-content:space-between;padding:14px;background:var(--bg3);border:1px solid var(--border);border-radius:var(--radius);margin-bottom:8px">
            <div style="font-size:13px;font-weight:500">${b.name}</div>
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:12px;color:var(--${b.color})">${b.status}</span>
              <button class="btn btn-ghost btn-sm" onclick="showToast('Broker integration coming soon','info')">${b.status==='Connected'?'Disconnect':'Connect'}</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderBillingSettings() {
  return `
    <div class="settings-section">
      <h3 style="margin-bottom:4px">Billing & Plan</h3>
      <p style="font-size:13px;color:var(--text3);margin-bottom:20px">Manage your subscription.</p>
      <div style="padding:20px;background:linear-gradient(135deg,rgba(37,99,255,0.1),rgba(124,58,237,0.1));border:1px solid rgba(37,99,255,0.2);border-radius:var(--radius-lg);margin-bottom:20px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="font-size:16px;font-weight:600">PRO PLAN</div>
            <div style="font-size:12px;color:var(--text3);margin-top:4px">$29/month · Billed monthly</div>
          </div>
          <span class="badge badge-blue">ACTIVE</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:16px">
          ${['Unlimited assets','AI Insights','Priority support'].map(f => `
            <div style="font-size:12px;color:var(--green)">✓ ${f}</div>
          `).join('')}
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        ${[['Pro','$29/mo','Current plan','blue'],['Enterprise','$99/mo','For teams','purple']].map(([n,p,s,c]) => `
          <div style="padding:18px;background:var(--bg3);border:1px solid var(--${c==='blue'?'blue':'purple'}3, var(--border));border-radius:var(--radius-lg)">
            <div style="font-size:14px;font-weight:600;margin-bottom:4px">${n}</div>
            <div style="font-size:20px;font-family:var(--mono);color:var(--${c})">${p}</div>
            <div style="font-size:11px;color:var(--text3);margin-top:4px">${s}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function setSettingsTab(tab) {
  _settingsTab = tab;
  document.querySelectorAll('.settings-nav-item').forEach(el => {
    el.classList.toggle('active', el.textContent.trim().toLowerCase().startsWith(tab));
  });
  const content = document.getElementById('settingsContent');
  if (content) {
    content.style.opacity = '0';
    setTimeout(() => {
      content.innerHTML = renderSettingsTab(tab);
      content.style.transition = 'opacity 0.2s';
      content.style.opacity = '1';
    }, 150);
  }
}

function initSettings() {}
