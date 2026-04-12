document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');

  // Theme Toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const root = document.documentElement;
      const currentTheme = root.dataset.theme;
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      root.dataset.theme = newTheme;
      localStorage.setItem('panel_theme', newTheme);
    });
  }

  // Tab Switching
  const navItems = document.querySelectorAll('.nav-item:not(.demo-nav-item)');
  const pages = document.querySelectorAll('.page:not(.demo-page)');
  const pageTitle = document.getElementById('pageTitle');

  // Demo Navigation & Mobile Menu Logic
  const demoMenuToggle = document.getElementById('demo-menuToggle');
  const demoSidebar = document.getElementById('demo-sidebar');
  const demoMenuIconOpen = document.getElementById('demo-menuIconOpen');
  const demoMenuIconClose = document.getElementById('demo-menuIconClose');

  if (demoMenuToggle && demoSidebar) {
    demoMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = demoSidebar.classList.toggle('open');
      if (demoMenuIconOpen) demoMenuIconOpen.style.display = isOpen ? 'none' : 'block';
      if (demoMenuIconClose) demoMenuIconClose.style.display = isOpen ? 'block' : 'none';
    });

    document.addEventListener('click', (e) => {
      if (demoSidebar.classList.contains('open') && !demoSidebar.contains(e.target)) {
        demoSidebar.classList.remove('open');
        if (demoMenuIconOpen) demoMenuIconOpen.style.display = 'block';
        if (demoMenuIconClose) demoMenuIconClose.style.display = 'none';
      }
    });
  }

  const demoNavItems = document.querySelectorAll('.demo-nav-item');
  const demoPages = document.querySelectorAll('.demo-page');
  const demoPageTitle = document.getElementById('demo-pageTitle');

  demoNavItems.forEach(item => {
    item.addEventListener('click', () => {
      demoNavItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');

      if (demoPageTitle) {
        demoPageTitle.textContent = item.querySelector('.nav-label').textContent;
      }

      const pageId = 'demo-page-' + item.dataset.page;
      demoPages.forEach(page => {
        page.classList.toggle('active', page.id === pageId);
      });

      const demoContent = document.getElementById('demo-content');
      if (demoContent) demoContent.scrollTo(0, 0);

      if (demoSidebar && demoSidebar.classList.contains('open')) {
        demoSidebar.classList.remove('open');
        if (demoMenuIconOpen) demoMenuIconOpen.style.display = 'block';
        if (demoMenuIconClose) demoMenuIconClose.style.display = 'none';
      }
    });
  });

  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const menuIconOpen = document.getElementById('menuIconOpen');
  const menuIconClose = document.getElementById('menuIconClose');

  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = sidebar.classList.toggle('open');
      if (menuIconOpen) menuIconOpen.style.display = isOpen ? 'none' : 'block';
      if (menuIconClose) menuIconClose.style.display = isOpen ? 'block' : 'none';
    });

    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('open') && !sidebar.contains(e.target)) {
        sidebar.classList.remove('open');
        if (menuIconOpen) menuIconOpen.style.display = 'block';
        if (menuIconClose) menuIconClose.style.display = 'none';
      }
    });
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      // Set active nav item
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');

      // Update Title
      const label = item.querySelector('.nav-label').textContent;
      if (pageTitle) {
        pageTitle.textContent = label;
      }

      // Show correct page
      const pageId = 'page-' + item.dataset.page;
      pages.forEach(page => {
        if (page.id === pageId) {
          page.classList.add('active');
        } else {
          page.classList.remove('active');
        }
      });

      // Scroll to top
      window.scrollTo(0, 0);
      const content = document.getElementById('content');
      if (content) content.scrollTo(0, 0);

      // Close mobile menu
      if (sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        if (menuIconOpen) menuIconOpen.style.display = 'block';
        if (menuIconClose) menuIconClose.style.display = 'none';
      }
    });
  });

  // Hide loader
  const appLoader = document.getElementById('app-loader');
  const app = document.getElementById('app');
  setTimeout(() => {
    if (appLoader) appLoader.classList.add('hidden');
    if (app) app.style.display = 'block';
  }, 300);
});

/* ── Toast Notification ─────────────────────────────────────── */
function demoToast(msg, type) {
  const container = document.getElementById('demo-toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'demo-toast' + (type === 'error' ? ' demo-toast-error' : type === 'success' ? ' demo-toast-success' : '');
  toast.textContent = msg;
  container.appendChild(toast);

  setTimeout(() => toast.classList.add('demo-toast-visible'), 10);
  setTimeout(() => {
    toast.classList.remove('demo-toast-visible');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ── Interactive Demo Logic ─────────────────────────────────── */
let demoInterval;
function openDemo() {
  document.getElementById('demo-overlay').style.display = 'flex';

  demoInterval = setInterval(() => {
    const cpu = Math.floor(Math.random() * 30) + 10;
    const ram = Math.floor(Math.random() * 40) + 30;
    const cpuBar = document.getElementById('demo-cpu-bar');
    const ramBar = document.getElementById('demo-ram-bar');
    if (cpuBar) cpuBar.style.width = cpu + '%';
    if (ramBar) ramBar.style.width = ram + '%';

    const cpuVal = document.getElementById('demo-cpu-value');
    const ramVal = document.getElementById('demo-ram-value');
    if (cpuVal) cpuVal.textContent = cpu + '%';
    if (ramVal) ramVal.textContent = Math.floor(ram * 20.48) + ' / 2048 MB';
  }, 2000);
}

function closeDemo() {
  document.getElementById('demo-overlay').style.display = 'none';
  clearInterval(demoInterval);
  if (confirm("Hope you enjoyed the demo! Ready to head to the download page now?")) {
    document.querySelector('.nav-item[data-page="download"]').click();
  }
}

function demoBtnAlert(btnName) {
  demoToast('Action simulated: [' + btnName + '] clicked.');
}

function demoToggleServer() {
  const btn = document.getElementById('demo-server-btn');
  const status = document.getElementById('demo-status-text');
  const orb = document.getElementById('demo-status-orb');

  if (btn.textContent.includes('Stop')) {
    btn.className = 'btn btn-success';
    btn.innerHTML = '<svg class="icon" style="margin-right:6px;"><use href="#icon-refresh"></use></svg>Start Server';
    status.textContent = 'Stopped';
    orb.className = 'status-orb offline';
    demoToast('Action simulated: Server stopping...');
  } else {
    btn.className = 'btn btn-danger';
    btn.innerHTML = '<svg class="icon" style="margin-right:6px;"><use href="#icon-screen"></use></svg>Stop Server';
    status.textContent = 'Running';
    orb.className = 'status-orb running';
    demoToast('Action simulated: Server starting...', 'success');
  }
}

/* ── Farm Page ───────────────────────────────────────────────── */
function demoTogglePause() {
  const btn = document.getElementById('demo-pause-btn');
  if (!btn) return;
  const paused = btn.dataset.state === 'paused';
  btn.dataset.state = paused ? '' : 'paused';
  btn.textContent = paused ? 'Pause' : 'Resume';
  btn.className = paused ? 'btn btn-sm' : 'btn btn-sm btn-warning';
  demoToast(paused ? 'World unpaused.' : 'World paused.');
}

function demoToggleFreeze() {
  const btn = document.getElementById('demo-freeze-btn');
  if (!btn) return;
  const frozen = btn.dataset.state === 'frozen';
  btn.dataset.state = frozen ? '' : 'frozen';
  btn.textContent = frozen ? 'Toggle Freeze' : 'Unfreeze Time';
  btn.className = frozen ? 'btn btn-sm' : 'btn btn-sm btn-warning';
  demoToast(frozen ? 'Time unfrozen.' : 'Time frozen.');
}

function demoToggleCropSaver() {
  const btn = document.getElementById('demo-cropsaver-btn');
  if (!btn) return;
  const enabled = btn.dataset.state !== 'disabled';
  btn.dataset.state = enabled ? 'disabled' : '';
  btn.textContent = enabled ? 'Disabled' : 'Enabled';
  btn.className = enabled ? 'btn btn-sm btn-danger' : 'btn btn-sm btn-success';
  demoToast('Crop Saver ' + (enabled ? 'disabled.' : 'enabled.'));
}

function demoSetMoney() {
  const input = document.getElementById('demo-set-money');
  const display = document.getElementById('demo-farm-money');
  if (!input || !display) return;
  const val = parseInt(input.value, 10);
  if (isNaN(val) || val < 0) { demoToast('Enter a valid amount.', 'error'); return; }
  display.textContent = val.toLocaleString() + 'g';
  demoToast('Shared money set to ' + val.toLocaleString() + 'g.', 'success');
}

/* ── Players Page ────────────────────────────────────────────── */
function demoSecurityMode(mode) {
  const blockSection = document.getElementById('demo-block-section');
  const allowSection = document.getElementById('demo-allow-section');
  const blockBtn = document.getElementById('demo-sec-block-btn');
  const allowBtn = document.getElementById('demo-sec-allow-btn');
  if (blockBtn) blockBtn.classList.toggle('active', mode === 'block');
  if (allowBtn) allowBtn.classList.toggle('active', mode === 'allow');
  if (blockSection) blockSection.style.display = mode === 'block' ? '' : 'none';
  if (allowSection) allowSection.style.display = mode === 'allow' ? '' : 'none';
  demoToast('Switched to ' + (mode === 'block' ? 'Block List' : 'Allow List') + ' mode.');
}

/* ── Chat Page ───────────────────────────────────────────────── */
let demoChatColor = '';

function demoSetChatPlayer(name, btn) {
  document.querySelectorAll('.demo-chat-pill').forEach(p => p.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const target = document.getElementById('demo-chat-target-label');
  if (target) target.textContent = name;
  const feed = document.getElementById('demo-chat-feed');
  if (!feed) return;
  const isWorld = name === 'World Chat';
  feed.querySelectorAll('.chat-msg').forEach(msg => {
    const player = (msg.getAttribute('data-player') || '').trim();
    msg.style.display = (isWorld ? player === 'world' : player === name) ? '' : 'none';
  });
}

function demoSetChatColor(color, btn) {
  document.querySelectorAll('.chat-color-swatch').forEach(s => s.classList.remove('active'));
  if (btn) btn.classList.add('active');
  demoChatColor = color;
}

function demoClearChat() {
  const feed = document.getElementById('demo-chat-feed');
  if (feed) feed.innerHTML = '<div id="demo-chat-empty" class="empty-state" style="padding:2rem 0;">No messages yet.</div>';
  demoToast('Chat cleared.');
}

function demoChatSend() {
  const input = document.getElementById('demo-chat-input');
  const feed = document.getElementById('demo-chat-feed');
  const empty = document.getElementById('demo-chat-empty');

  if (!input || !input.value.trim()) return;
  if (empty) empty.style.display = 'none';

  const text = input.value;
  const msg = document.createElement('div');
  msg.className = 'chat-msg chat-msg-host';
  const colorStyle = demoChatColor ? ` style="color:${demoChatColor}"` : '';
  msg.innerHTML = `<span class="chat-meta">You <span class="chat-time">Just now</span></span><span class="chat-text"${colorStyle}>${text}</span>`;
  feed.appendChild(msg);
  feed.scrollTop = feed.scrollHeight;
  input.value = '';

  setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.className = 'chat-msg';
    botMsg.innerHTML = `<span class="chat-meta">Farmbot <span class="chat-time">Just now</span></span><span class="chat-text">Beep boop! That's a nice simulated message! Try testing the rainbow formatting in the real version!</span>`;
    feed.appendChild(botMsg);
    feed.scrollTop = feed.scrollHeight;
  }, 1000);
}

/* ── Console Page ────────────────────────────────────────────── */
const demoConsoleResponses = {
  'help': 'Available commands: help, list_players, get_farm_info, set_time, set_day, set_season',
  'list_players': 'Connected players: FarmerJohn (host), CoolFarmer, SproutKing',
  'get_farm_info': 'Farm: Stardrop Valley | Day: 12 Spring Y2 | Players: 3/4',
  'set_time': 'Usage: set_time <600-2600>  e.g. set_time 1800',
  'set_day': 'Usage: set_day <1-28>  e.g. set_day 1',
  'set_season': 'Usage: set_season <spring|summer|fall|winter>',
};

function demoConsoleSend() {
  const input = document.getElementById('demo-term-input');
  const output = document.getElementById('demo-term-output');
  if (!input || !output) return;
  const cmd = input.value.trim();
  if (!cmd) return;

  const cmdLine = document.createElement('div');
  cmdLine.className = 'log-line';
  cmdLine.innerHTML = `<span class="log-tag log-tag-game">CMD</span> &gt; ${cmd}`;
  output.appendChild(cmdLine);

  const response = demoConsoleResponses[cmd.toLowerCase()] || 'Command executed. (simulated)';
  const respLine = document.createElement('div');
  respLine.className = 'log-line';
  respLine.innerHTML = `<span class="log-tag log-tag-smapi">SMAPI</span> ${response}`;
  output.appendChild(respLine);

  output.scrollTop = output.scrollHeight;
  input.value = '';
}

function demoConsoleFilter(filter, btn) {
  document.querySelectorAll('.demo-log-filter').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const output = document.getElementById('demo-log-output');
  if (!output) return;
  const f = filter.toLowerCase();
  output.querySelectorAll('.log-line').forEach(line => {
    if (f === 'all') { line.style.display = ''; return; }
    const tag = line.querySelector('.log-tag');
    if (!tag) { line.style.display = 'none'; return; }
    const tagText = tag.textContent.toLowerCase();
    const show = (f === 'game' && tagText === 'game') ||
                 (f === 'errors' && (tagText === 'error' || tagText === 'warn')) ||
                 (f === 'smapi' && tagText === 'smapi');
    line.style.display = show ? '' : 'none';
  });
}

function copyCommand() {
  const cmd = "sudo curl -sSL https://raw.githubusercontent.com/Tomomoto10/StardropHost-website/main/install.sh | bash";
  navigator.clipboard.writeText(cmd).then(() => {
    demoToast('Installation command copied to clipboard!', 'success');
  });
}
