/**
 * Form 26AS Tax Credit Portal - Application Logic (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const state = {
    theme: 'dark', // 'dark' | 'light' | 'system'
    palette: 'blue', // 'blue' | 'emerald' | 'amethyst' | 'orange'
    activeTab: 'single', // 'single' | 'bulk'
    activeModalSource: null, // null | 'single' | rowIndex (number)
    
    // Single verification state
    singleData: null,
    singleLogs: [],
    singleStatus: 'idle', // 'idle' | 'running' | 'success' | 'failed'
    
    // Bulk queue state
    bulkQueue: [],
    bulkStatus: 'idle', // 'idle' | 'running' | 'paused' | 'completed'
    bulkActiveWorkers: 0,
    bulkCurrentIndex: 0,
    bulkLogsMap: {}, // index -> array of log objects
    bulkSelectionMode: false,
    selectedBulkViewIndex: null,
    activeBulkSession: null, // { pan, password, tracesBase, assesseeName, panStatus, address1, address2 }

    // Global Downloader Stats
    stats: {
      total: 0,
      success: 0,
      failed: 0,
      latencies: []
    },

    extensionInstalled: false
  };

  // Concurrency setting
  const CONCURRENCY_LIMIT = 1;

  // Endpoint base path
  const API_BASE = window.location.protocol.startsWith('http') ? '' : 'http://localhost:8000';

  // Helper to update bottom stats bar in real time
  function updateGlobalStats(success, latency) {
    state.stats.total++;
    if (success) {
      state.stats.success++;
    } else {
      state.stats.failed++;
    }
    if (latency) {
      state.stats.latencies.push(latency);
    }
    
    // Calculate average latency
    const avg = state.stats.latencies.length > 0 
      ? Math.round(state.stats.latencies.reduce((a, b) => a + b, 0) / state.stats.latencies.length) 
      : 0;
      
    // Update elements in DOM
    const totalEl = document.getElementById('stats-total');
    const successEl = document.getElementById('stats-success');
    const failedEl = document.getElementById('stats-failed');
    const latencyEl = document.getElementById('stats-latency');
    
    if (totalEl) totalEl.textContent = state.stats.total;
    if (successEl) successEl.textContent = state.stats.success;
    if (failedEl) failedEl.textContent = state.stats.failed;
    if (latencyEl) latencyEl.textContent = `${avg} MS`;
  }

  // ==========================================
  // DOM ELEMENT SELECTIONS
  // ==========================================
  // Theme Toggle Element
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  
  // Extension Header Controls & Status
  const extensionStatusBadge = document.getElementById('extension-status-badge');
  const extensionStatusText = document.getElementById('extension-status-text');
  const btnCheckExtension = document.getElementById('btn-check-extension');
  const iconCheckExtension = document.getElementById('icon-check-extension');
  const extensionHelperGroup = document.getElementById('extension-helper-group');
  
  // Navigation
  const tabSingle = document.getElementById('tab-single');
  const tabBulk = document.getElementById('tab-bulk');
  const panelSingle = document.getElementById('panel-single');
  const panelBulk = document.getElementById('panel-bulk');

  // Single tab controls & forms
  const credentialsForm = document.getElementById('credentials-form');
  const panInput = document.getElementById('pan-input');
  const passwordInput = document.getElementById('password-input');
  const passwordToggle = document.getElementById('password-toggle');
  const eyeIcon = document.getElementById('eye-icon');
  const aySelect = document.getElementById('ay-select');
  const retrieveBtn = document.getElementById('retrieve-btn');


  // Single tab view states
  const resultsCard = document.getElementById('results-card');
  const resultsEmptyState = document.getElementById('results-empty-state');
  const resultsShimmerState = document.getElementById('results-shimmer-state');
  const resultsDataState = document.getElementById('results-data-state');
  
  // Single results titles & tabs
  const resultPanTitle = document.getElementById('result-pan-title');
  const resultMetaTitle = document.getElementById('result-meta-title');
  const downloadJsonSingle = document.getElementById('download-json-single');
  const downloadPdfSingle = document.getElementById('download-pdf-single');
  const extensionWarning = document.getElementById('extension-warning');
  
  // Stats
  const sumTds = document.getElementById('sum-tds');
  const sumTcs = document.getElementById('sum-tcs');
  const sumPaid = document.getElementById('sum-paid');
  const sumRefund = document.getElementById('sum-refund');

  // Subtabs & tables
  const subTabButtons = document.querySelectorAll('.sub-tabs-container .sub-tab-btn');
  const subPanels = document.querySelectorAll('.sub-viewport .sub-panel');
  const tablePartABody = document.getElementById('table-part-a-body');
  const tablePartBBody = document.getElementById('table-part-b-body');
  const tablePartCBody = document.getElementById('table-part-c-body');
  const tablePartDBody = document.getElementById('table-part-d-body');
  const emptyPartA = document.getElementById('empty-part-a');
  const emptyPartB = document.getElementById('empty-part-b');
  const emptyPartC = document.getElementById('empty-part-c');
  const emptyPartD = document.getElementById('empty-part-d');

  // Bulk tab controls & uploader
  const bulkDropZone = document.getElementById('bulk-drop-zone');
  const bulkFileInput = document.getElementById('bulk-file-input');
  const fileInfoLabel = document.getElementById('file-info-label');
  const bulkTextInput = document.getElementById('bulk-text-input');

  const parseBulkBtn = document.getElementById('parse-bulk-btn');

  // Bulk status panel
  const bulkProgressPanel = document.getElementById('bulk-progress-panel');
  const queueStatusText = document.getElementById('queue-status-text');
  const countPending = document.getElementById('count-pending');
  const countRunning = document.getElementById('count-running');
  const countSuccess = document.getElementById('count-success');
  const countFailed = document.getElementById('count-failed');
  const globalProgressBar = document.getElementById('global-progress-bar');
  const startBulkBtn = document.getElementById('start-bulk-btn');
  const pauseBulkBtn = document.getElementById('pause-bulk-btn');
  const resetBulkBtn = document.getElementById('reset-bulk-btn');

  // Bulk table panel
  const bulkTablePanel = document.getElementById('bulk-table-panel');
  const bulkQueueTable = document.getElementById('bulk-queue-table');
  const bulkQueueBody = document.getElementById('bulk-queue-body');

  // Bulk Dedicated Result Section Elements
  const bulkResultCard = document.getElementById('bulk-result-card');
  const bulkResultDataState = document.getElementById('bulk-result-data-state');
  const bulkResultPanTitle = document.getElementById('bulk-result-pan-title');
  const bulkResultMetaTitle = document.getElementById('bulk-result-meta-title');
  const bulkSumTds = document.getElementById('bulk-sum-tds');
  const bulkSumTcs = document.getElementById('bulk-sum-tcs');
  const bulkSumPaid = document.getElementById('bulk-sum-paid');
  const bulkSumRefund = document.getElementById('bulk-sum-refund');
  const bulkTablePartABody = document.getElementById('bulk-table-part-a-body');
  const bulkTablePartBBody = document.getElementById('bulk-table-part-b-body');
  const bulkTablePartCBody = document.getElementById('bulk-table-part-c-body');
  const bulkTablePartDBody = document.getElementById('bulk-table-part-d-body');
  const bulkEmptyPartA = document.getElementById('bulk-empty-part-a');
  const bulkEmptyPartB = document.getElementById('bulk-empty-part-b');
  const bulkEmptyPartC = document.getElementById('bulk-empty-part-c');
  const bulkEmptyPartD = document.getElementById('bulk-empty-part-d');
  const bulkDownloadJsonBtn = document.getElementById('bulk-download-json');
  const bulkDownloadPdfBtn = document.getElementById('bulk-download-pdf');
  const bulkResultCloseBtn = document.getElementById('bulk-result-close-btn');

  // Modal Terminal elements
  const logModal = document.getElementById('log-modal');
  const modalTerminalTitle = document.getElementById('modal-terminal-title');
  const terminalLogsStream = document.getElementById('terminal-logs-stream');
  const terminalStatusLight = document.getElementById('terminal-status-light');
  const terminalStatusText = document.getElementById('terminal-status-text');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalBgBtn = document.getElementById('modal-bg-btn');
  const modalCloseActionBtn = document.getElementById('modal-close-action-btn');
  const modalCancelBtn = document.getElementById('modal-cancel-btn');

  // ==========================================
  // TOAST NOTIFICATIONS
  // ==========================================
  function showToast(title, description) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    
    toast.innerHTML = `
      <div class="toast-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="20" height="20">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      </div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-description">
          ${description}
          <br>
          <a href="https://drive.google.com/drive/folders/10cir9lXk3I1W7rQluqE8gBYDXbNeTKY_?usp=sharing" target="_blank" class="toast-action-link" style="display: inline-flex; align-items: center; gap: 4px; margin-top: 8px; color: var(--color-warning); font-weight: 700; text-decoration: none; font-size: 0.75rem;">
            Download Helper ZIP ➔
          </a>
        </div>
      </div>
      <button class="toast-close-btn" aria-label="Close message">&times;</button>
    `;
    
    container.appendChild(toast);
    
    // Bind close button click
    const closeBtn = toast.querySelector('.toast-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        toast.classList.add('toast-exit');
        toast.addEventListener('animationend', () => {
          toast.remove();
        });
      });
    }
  }

  // ==========================================
  // PREFERENCE LOADING (THEME)
  // ==========================================
  
  function initTheme() {
    // Load from localStorage (default to dark)
    const savedTheme = localStorage.getItem('traces-theme') || 'dark';
    setThemeMode(savedTheme);
    checkExtension();
  }

  function setThemeMode(mode) {
    state.theme = mode;
    localStorage.setItem('traces-theme', mode);
    
    const sunIcon = themeToggleBtn.querySelector('.sun-icon');
    const moonIcon = themeToggleBtn.querySelector('.moon-icon');
    
    if (mode === 'light') {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
      
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = 'block';
    } else {
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
      
      if (sunIcon) sunIcon.style.display = 'block';
      if (moonIcon) moonIcon.style.display = 'none';
    }
  }

  // Set default accent palette style to electric blue natively
  document.body.classList.add('palette-blue');

  // Chrome Extension Identification for Local Exporter
  const EXTENSION_ID = 'bdbfbimncembaafobijknhndklpidkki';

  function updateDownloadStatus() {
    // Verify the companion extension is active
    if (state.extensionInstalled) {
      downloadPdfSingle.disabled = false;
      if (extensionWarning) extensionWarning.classList.add('hidden');
      if (extensionStatusBadge) {
        extensionStatusBadge.className = 'connection-badge online';
      }
      if (extensionStatusText) {
        extensionStatusText.textContent = 'Extension: Connected';
      }
      if (btnCheckExtension) {
        btnCheckExtension.style.display = 'none';
      }
      if (extensionHelperGroup) {
        extensionHelperGroup.style.display = 'none';
      }
    } else {
      downloadPdfSingle.disabled = true;
      if (extensionWarning) extensionWarning.classList.remove('hidden');
      if (extensionStatusBadge) {
        extensionStatusBadge.className = 'connection-badge offline';
      }
      if (extensionStatusText) {
        extensionStatusText.textContent = 'Extension: Offline';
      }
      if (btnCheckExtension) {
        btnCheckExtension.style.display = 'inline-flex';
      }
      if (extensionHelperGroup) {
        extensionHelperGroup.style.display = 'inline-flex';
      }
    }
    updateBulkActionsUI();
  }

  function checkExtension(callback) {
    if (!window.chrome || !chrome.runtime || !chrome.runtime.sendMessage) {
      state.extensionInstalled = false;
      updateDownloadStatus();
      if (typeof callback === 'function') callback(false);
      return;
    }

    chrome.runtime.sendMessage(EXTENSION_ID, { action: "PING" }, (response) => {
      if (chrome.runtime.lastError || !response || response.status !== "PONG") {
        state.extensionInstalled = false;
      } else {
        state.extensionInstalled = true;
      }
      updateDownloadStatus();
      if (typeof callback === 'function') callback(state.extensionInstalled);
    });
  }

  // Bind Manual Check Connection Button
  if (btnCheckExtension) {
    btnCheckExtension.addEventListener('click', () => {
      if (iconCheckExtension) iconCheckExtension.classList.add('spinning');
      btnCheckExtension.disabled = true;

      checkExtension((isConnected) => {
        setTimeout(() => {
          if (iconCheckExtension) iconCheckExtension.classList.remove('spinning');
          btnCheckExtension.disabled = false;

          if (isConnected) {
            showToast(
              "Extension Connected",
              "PDF Downloader Helper connected successfully. You can now generate and export Form 26AS PDFs."
            );
          } else {
            showToast(
              "Extension Not Detected",
              "Please make sure Developer Mode is enabled in your browser extensions and the folder is loaded unpacked."
            );
          }
        }, 400);
      });
    });
  }

  // Bind theme toggle button
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const targetTheme = state.theme === 'dark' ? 'light' : 'dark';
      setThemeMode(targetTheme);
    });
  }

  // ==========================================
  // TAB NAVIGATION
  // ==========================================

  // Badge on the Bulk tab that pulses whenever bulk is actively running.
  // It stays visible even when the user switches to the Single tab,
  // giving a persistent signal that background work is in progress.
  const bulkRunningBadge = document.getElementById('bulk-running-badge');
  function updateBulkBadge() {
    if (!bulkRunningBadge) return;
    bulkRunningBadge.style.display = state.bulkStatus === 'running' ? 'inline' : 'none';
  }

  function switchTab(targetTab) {
    state.activeTab = targetTab;
    updateBulkBadge(); // always sync badge on tab switch
    
    if (targetTab === 'single') {
      tabSingle.classList.add('active');
      tabBulk.classList.remove('active');
      panelSingle.classList.add('active');
      panelBulk.classList.remove('active');
    } else {
      tabBulk.classList.add('active');
      tabSingle.classList.remove('active');
      panelBulk.classList.add('active');
      panelSingle.classList.remove('active');
    }
  }

  tabSingle.addEventListener('click', () => switchTab('single'));
  tabBulk.addEventListener('click', () => switchTab('bulk'));

  // ==========================================
  // FORM INPUT VALIDATION (PAN)
  // ==========================================
  function validatePAN(pan) {
    return pan.length > 0 && pan.length <= 16;
  }

  panInput.addEventListener('input', (e) => {
    let val = e.target.value.toUpperCase();
    e.target.value = val;
  });

  passwordToggle.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Toggle icon
    if (type === 'text') {
      eyeIcon.innerHTML = `
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
      `;
    } else {
      eyeIcon.innerHTML = `
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      `;
    }
  });



  // ==========================================
  // TERMINAL LOG STREAMING ENGINE
  // ==========================================
  function showTerminalModal(title) {
    modalTerminalTitle.textContent = title;
    terminalLogsStream.innerHTML = '';
    
    // Reset buttons display and state in Modal to default
    closeModalBtn.style.display = 'flex';
    modalBgBtn.style.display = 'inline-flex';
    modalCloseActionBtn.style.display = 'inline-flex';
    modalCancelBtn.classList.add('hidden');
    
    closeModalBtn.disabled = true;
    modalBgBtn.disabled = false;
    modalCloseActionBtn.disabled = true;
    modalCancelBtn.disabled = false;
    
    // Status text
    terminalStatusLight.className = 'status-indicator-light pulse';
    terminalStatusText.textContent = 'Establishing connection...';
    
    logModal.classList.remove('hidden');
  }

  function appendLogLine(prefixChar, prefixClass, text, isSpecial = false) {
    const line = document.createElement('div');
    line.className = 'log-line';
    if (prefixClass === 'error') line.classList.add('err-line');
    if (prefixClass === 'retry') line.classList.add('warn-line');
    
    line.innerHTML = `
      <span class="log-prefix ${prefixClass}">${prefixChar}</span>
      <span class="log-message">${text}</span>
    `;
    
    terminalLogsStream.appendChild(line);
    
    // Auto-scroll
    const termBody = document.getElementById('terminal-body');
    termBody.scrollTop = termBody.scrollHeight;
  }

  function appendLogStep(text) {
    const line = document.createElement('div');
    line.className = 'log-line';
    
    line.innerHTML = `
      <span class="log-prefix info"><span class="log-spinner"></span></span>
      <span class="log-message">${text}</span>
    `;
    
    terminalLogsStream.appendChild(line);
    
    // Auto-scroll
    const termBody = document.getElementById('terminal-body');
    termBody.scrollTop = termBody.scrollHeight;
    
    return line;
  }

  function markLogStepSuccess(line) {
    if (!line) return;
    const prefix = line.querySelector('.log-prefix');
    if (prefix) {
      prefix.className = 'log-prefix success';
      prefix.innerHTML = '✔';
    }
  }

  function markLogStepFailure(line, customMsg) {
    if (!line) return;
    const prefix = line.querySelector('.log-prefix');
    if (prefix) {
      prefix.className = 'log-prefix error';
      prefix.innerHTML = '✖';
    }
    line.classList.add('err-line');
    if (customMsg) {
      const msgEl = line.querySelector('.log-message');
      if (msgEl) {
        msgEl.textContent = customMsg;
      }
    }
  }

  // ==========================================
  // SINGLE RETRIEVAL ENGINE
  // ==========================================
  credentialsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const pan = panInput.value.toUpperCase();
    const pass = passwordInput.value;
    const ay = aySelect.value;
    
    if (!validatePAN(pan)) {
      alert("Please fill in all fields.");
      return;
    }
    
    state.activeModalSource = 'single';
    showTerminalModal(`Secure Link Terminal - ${pan} (AY ${ay})`);
    
    // Configure buttons for Single Retrieval (disable/hide backgrounding & closing, show cancel)
    closeModalBtn.style.display = 'none';
    modalBgBtn.style.display = 'none';
    modalCloseActionBtn.style.display = 'none';
    modalCancelBtn.classList.remove('hidden');
    modalCancelBtn.disabled = false;
    
    runSingleVerificationSimulation(pan, pass, ay);
  });

  async function runSingleVerificationSimulation(pan, pass, ay) {
    state.singleStatus = 'running';
    state.singleLogs = [];
    state.isSingleCancelled = false; // Reset cancel flag
    const startTime = performance.now();
    const delay = (ms) => new Promise(res => setTimeout(res, ms));
    
    // Maintain state.singleLogs cache for exports
    const trackLog = (char, style, msg) => {
      state.singleLogs.push({ char, style, msg });
    };
    
    const stepConn = appendLogStep(`Establishing connection`);
    trackLog('➜', 'info', `Establishing connection`);

    // 1. Establish session connection
    let data;
    try {
      const response = await fetch(`${API_BASE}/api/connect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pan: pan })
      });
      
      if (state.isSingleCancelled) return;

      if (!response.ok) {
        throw new Error(`Backend returned HTTP ${response.status}`);
      }
      
      data = await response.json();
    } catch (err) {
      if (state.isSingleCancelled) return;
      markLogStepFailure(stepConn, `Establishing connection: Connection to backend failed.`);
      trackLog('✖', 'error', `Connection to backend failed.`);
      appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
      trackLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
      completeSingleVerification(false, 'failed', 'Backend server unreachable', startTime);
      return;
    }

    if (data.status === 'failed') {
      markLogStepFailure(stepConn, `Establishing connection: ${data.error}`);
      trackLog('✖', 'error', `Establishing connection: ${data.error}`);
      appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
      trackLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
      completeSingleVerification(false, 'failed', 'Connection Failed', startTime);
      return;
    }

    // Connection succeeded
    markLogStepSuccess(stepConn);
    trackLog('✔', 'success', `Establishing connection`);

    // 2. Perform User ID verification
    const stepUser = appendLogStep(`User ID verification`);
    trackLog('➜', 'info', `User ID verification`);

    try {
      const response = await fetch(`${API_BASE}/api/verify-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pan: pan })
      });
      
      if (state.isSingleCancelled) return;

      if (!response.ok) {
        throw new Error(`Backend returned HTTP ${response.status}`);
      }
      
      data = await response.json();
    } catch (err) {
      if (state.isSingleCancelled) return;
      markLogStepFailure(stepUser, `User ID verification: Verification request failed.`);
      trackLog('✖', 'error', `Verification request failed.`);
      appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
      trackLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
      completeSingleVerification(false, 'failed', 'Verification Request Failed', startTime);
      return;
    }

    if (data.status === 'failed') {
      markLogStepFailure(stepUser, `User ID verification: ${data.error}`);
      trackLog('✖', 'error', `User ID verification: ${data.error}`);
      appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
      trackLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
      completeSingleVerification(false, 'failed', 'User ID Verification Failed', startTime);
      return;
    }

    // User ID verification succeeded
    markLogStepSuccess(stepUser);
    trackLog('✔', 'success', `User ID verification`);
    
    const reqId = data.reqId;
    const secAccssMsg = data.secAccssMsg;
    const entityType = data.entityType || 'PAN';

    // 3. Perform Password Login
    const stepLogin = appendLogStep(`Logging in`);
    trackLog('➜', 'info', `Logging in`);

    try {
      const response = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pan: pan, password: pass, reqId: reqId, secAccssMsg: secAccssMsg, entityType: entityType })
      });
      
      if (state.isSingleCancelled) return;

      if (!response.ok) {
        throw new Error(`Backend returned HTTP ${response.status}`);
      }
      
      data = await response.json();
    } catch (err) {
      if (state.isSingleCancelled) return;
      markLogStepFailure(stepLogin, `Logging in: Login request failed.`);
      trackLog('✖', 'error', `Login request failed.`);
      appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
      trackLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
      completeSingleVerification(false, 'failed', 'Login Request Failed', startTime);
      return;
    }

    if (data.status === 'success') {
      markLogStepSuccess(stepLogin);
      trackLog('✔', 'success', `Logging in`);
      
      state.liveReqId = data.reqId;
      state.liveSecAccssMsg = data.secAccssMsg;
      
      // Phase 5: Redirecting to Traces Portal
      const stepRedirect = appendLogStep(`Redirecting to Traces Portal`);
      trackLog('➜', 'info', `Redirecting to Traces Portal`);
      
      try {
        const response = await fetch(`${API_BASE}/api/redirect-to-traces`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pan: pan, ay: ay })
        });
        
        if (state.isSingleCancelled) return;
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        data = await response.json();
      } catch (err) {
        if (state.isSingleCancelled) return;
        markLogStepFailure(stepRedirect, `Redirecting to Traces Portal: Redirect request failed.`);
        trackLog('✖', 'error', `Redirecting to Traces Portal failed.`);
        appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
        trackLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
        completeSingleVerification(false, 'failed', 'Redirect Request Failed', startTime);
        return;
      }
      
      if (data.status === 'success') {
        markLogStepSuccess(stepRedirect);
        trackLog('✔', 'success', `Redirecting to Traces Portal`);
        
        state.liveTracesBase = data.tracesBase;
        
        // Phase 6: Downloading 26AS Data
        const stepDownload = appendLogStep(`Downloading 26AS data`);
        trackLog('➜', 'info', `Downloading 26AS data`);
        
        try {
          const response = await fetch(`${API_BASE}/api/download-26as`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pan: pan, ay: ay, tracesBase: state.liveTracesBase })
          });
          
          if (state.isSingleCancelled) return;
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          data = await response.json();
        } catch (err) {
          if (state.isSingleCancelled) return;
          markLogStepFailure(stepDownload, `Downloading 26AS data: Download request failed.`);
          trackLog('✖', 'error', `Downloading 26AS data failed.`);
          appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
          trackLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
          completeSingleVerification(false, 'failed', 'Download Request Failed', startTime);
          return;
        }
        
        if (data.status === 'success') {
          markLogStepSuccess(stepDownload);
          trackLog('✔', 'success', `Downloading 26AS data`);
          
          // Save data
          state.singleData = translateTracesData(data.taxData, pan, ay);
          state.singleData.assesseeName = data.assesseeName;
          state.singleData.panStatus = data.panStatus;
          state.singleData.address1 = data.address1;
          state.singleData.address2 = data.address2;
          state.singleData.ay = data.ay;
          state.singleData.fy = data.fy;
          state.pdfBase64 = data.pdfBase64;
          state.rawTaxData = data.taxData; // kept raw for TAN drill-down modal
          
          // Next phase is Phase 7: Logging out
          const stepLogout = appendLogStep(`Logging out`);
          trackLog('➜', 'info', `Logging out`);
          
          try {
            const response = await fetch(`${API_BASE}/api/logout`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ pan: pan })
            });
            if (state.isSingleCancelled) return;
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            data = await response.json();
          } catch (err) {
            if (state.isSingleCancelled) return;
            markLogStepFailure(stepLogout, `Logging out: Logout request failed.`);
            trackLog('✖', 'error', `Logging out failed.`);
            appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
            trackLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
            completeSingleVerification(false, 'failed', 'Logout Request Failed', startTime);
            return;
          }
          
          if (data.status === 'success') {
            markLogStepSuccess(stepLogout);
            trackLog('✔', 'success', `Logging out`);
            completeSingleVerification(true, 'success', 'Retrieved successfully', startTime);
          } else {
            markLogStepFailure(stepLogout, `Logging out: ${data.error}`);
            trackLog('✖', 'error', `Logging out: ${data.error}`);
            appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
            trackLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
            completeSingleVerification(false, 'failed', 'Logging Out Failed', startTime);
          }
        } else {
          markLogStepFailure(stepDownload, `Downloading 26AS data: ${data.error}`);
          trackLog('✖', 'error', `Downloading 26AS data: ${data.error}`);
          
          appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
          trackLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
          
          completeSingleVerification(false, 'failed', 'Downloading 26AS Data Failed', startTime);
        }
      } else {
        markLogStepFailure(stepRedirect, `Redirecting to Traces Portal: ${data.error}`);
        trackLog('✖', 'error', `Redirecting to Traces Portal: ${data.error}`);
        
        appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
        trackLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
        
        completeSingleVerification(false, 'failed', 'Redirect to Traces Failed', startTime);
      }
    } else if (data.status === 'dual_login') {
      markLogStepSuccess(stepLogin);
      trackLog('✔', 'success', `Logging in`);
      
      const originalResponse = data.originalResponse;
      
      // Phase 4: Handling Dual Login
      const stepDual = appendLogStep(`Handling dual login`);
      trackLog('➜', 'info', `Handling dual login`);
      
      try {
        const response = await fetch(`${API_BASE}/api/handle-dual-login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pan: pan, originalResponse: originalResponse })
        });
        
        if (state.isSingleCancelled) return;
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        data = await response.json();
      } catch (err) {
        if (state.isSingleCancelled) return;
        markLogStepFailure(stepDual, `Handling dual login: Override request failed.`);
        trackLog('✖', 'error', `Handling dual login failed.`);
        appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
        trackLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
        completeSingleVerification(false, 'failed', 'Dual Login Request Failed', startTime);
        return;
      }
      
      if (data.status === 'success') {
        markLogStepSuccess(stepDual);
        trackLog('✔', 'success', `Handling dual login`);
        
        // Phase 5: Redirecting to Traces Portal
        const stepRedirect = appendLogStep(`Redirecting to Traces Portal`);
        trackLog('➜', 'info', `Redirecting to Traces Portal`);
        
        try {
          const response = await fetch(`${API_BASE}/api/redirect-to-traces`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pan: pan, ay: ay })
          });
          
          if (state.isSingleCancelled) return;
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          data = await response.json();
        } catch (err) {
          if (state.isSingleCancelled) return;
          markLogStepFailure(stepRedirect, `Redirecting to Traces Portal: Redirect request failed.`);
          trackLog('✖', 'error', `Redirecting to Traces Portal failed.`);
          appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
          trackLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
          completeSingleVerification(false, 'failed', 'Redirect Request Failed', startTime);
          return;
        }
        
        if (data.status === 'success') {
          markLogStepSuccess(stepRedirect);
          trackLog('✔', 'success', `Redirecting to Traces Portal`);
          
          state.liveTracesBase = data.tracesBase;
          
          // Phase 6: Downloading 26AS Data
          const stepDownload = appendLogStep(`Downloading 26AS data`);
          trackLog('➜', 'info', `Downloading 26AS data`);
          
          try {
            const response = await fetch(`${API_BASE}/api/download-26as`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ pan: pan, ay: ay, tracesBase: state.liveTracesBase })
            });
            
            if (state.isSingleCancelled) return;
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            data = await response.json();
          } catch (err) {
            if (state.isSingleCancelled) return;
            markLogStepFailure(stepDownload, `Downloading 26AS data: Download request failed.`);
            trackLog('✖', 'error', `Downloading 26AS data failed.`);
            appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
            trackLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
            completeSingleVerification(false, 'failed', 'Download Request Failed', startTime);
            return;
          }
          
          if (data.status === 'success') {
            markLogStepSuccess(stepDownload);
            trackLog('✔', 'success', `Downloading 26AS data`);
            
            // Save data
            state.singleData = translateTracesData(data.taxData, pan, ay);
            state.singleData.assesseeName = data.assesseeName;
            state.singleData.panStatus = data.panStatus;
            state.singleData.address1 = data.address1;
            state.singleData.address2 = data.address2;
            state.singleData.ay = data.ay;
            state.singleData.fy = data.fy;
            state.pdfBase64 = data.pdfBase64;
            state.rawTaxData = data.taxData; // kept raw for TAN drill-down modal
            
            // Next phase is Phase 7: Logging out
            const stepLogout = appendLogStep(`Logging out`);
            trackLog('➜', 'info', `Logging out`);
            
            try {
              const response = await fetch(`${API_BASE}/api/logout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pan: pan })
              });
              if (state.isSingleCancelled) return;
              if (!response.ok) throw new Error(`HTTP ${response.status}`);
              data = await response.json();
            } catch (err) {
              if (state.isSingleCancelled) return;
              markLogStepFailure(stepLogout, `Logging out: Logout request failed.`);
              trackLog('✖', 'error', `Logging out failed.`);
              appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
              trackLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
              completeSingleVerification(false, 'failed', 'Logout Request Failed', startTime);
              return;
            }
            
            if (data.status === 'success') {
              markLogStepSuccess(stepLogout);
              trackLog('✔', 'success', `Logging out`);
              completeSingleVerification(true, 'success', 'Retrieved successfully', startTime);
            } else {
              markLogStepFailure(stepLogout, `Logging out: ${data.error}`);
              trackLog('✖', 'error', `Logging out: ${data.error}`);
              appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
              trackLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
              completeSingleVerification(false, 'failed', 'Logging Out Failed', startTime);
            }
          } else {
            markLogStepFailure(stepDownload, `Downloading 26AS data: ${data.error}`);
            trackLog('✖', 'error', `Downloading 26AS data: ${data.error}`);
            
            appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
            trackLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
            
            completeSingleVerification(false, 'failed', 'Downloading 26AS Data Failed', startTime);
          }
        } else {
          markLogStepFailure(stepRedirect, `Redirecting to Traces Portal: ${data.error}`);
          trackLog('✖', 'error', `Redirecting to Traces Portal: ${data.error}`);
          
          appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
          trackLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
          
          completeSingleVerification(false, 'failed', 'Redirect to Traces Failed', startTime);
        }
      } else {
        markLogStepFailure(stepDual, `Handling dual login: ${data.error}`);
        trackLog('✖', 'error', `Handling dual login: ${data.error}`);
        
        appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
        trackLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
        
        completeSingleVerification(false, 'failed', 'Dual Login Override Failed', startTime);
      }
    } else {
      markLogStepFailure(stepLogin, `Logging in: ${data.error}`);
      trackLog('✖', 'error', `Logging in: ${data.error}`);
      
      appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
      trackLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
      
      completeSingleVerification(false, 'failed', 'Logging In Failed', startTime);
    }
  }

  function completeSingleVerification(success, finalStatus, statusMessage, startTime) {
    state.singleStatus = finalStatus;
    
    // Calculate latency
    const latency = startTime ? Math.round(performance.now() - startTime) : 0;
    updateGlobalStats(success, latency);
    
    // Restore buttons display and allow closing
    closeModalBtn.style.display = 'flex';
    modalCloseActionBtn.style.display = 'inline-flex';
    modalCancelBtn.classList.add('hidden');
    
    closeModalBtn.disabled = false;
    modalCloseActionBtn.disabled = false;
    
    if (success) {
      terminalStatusLight.className = 'status-indicator-light success';
      terminalStatusText.textContent = `Completed: ${statusMessage}`;
      
      // Auto switch view states after a short moment, or let them click
      setTimeout(() => {
        // Only trigger if we are still active modal for single
        if (state.activeModalSource === 'single') {
          hideModal();
          renderSingleResults();
        }
      }, 800);
    } else {
      terminalStatusLight.className = 'status-indicator-light error';
      terminalStatusText.textContent = `Failed: ${statusMessage}`;
    }
  }

  function  renderSingleResults() {
    if (!state.singleData) return;
    
    // Hide empty state, show shimmer state first to simulate premium UI loading!
    resultsEmptyState.classList.add('hidden');
    resultsDataState.classList.add('hidden');
    resultsShimmerState.classList.remove('hidden');
    
    setTimeout(() => {
      resultsShimmerState.classList.add('hidden');
      resultsDataState.classList.remove('hidden');
      
      const data = state.singleData;
      
      // Set titles
      resultPanTitle.textContent = `PAN: ${data.pan}`;
      resultMetaTitle.textContent = `Assessment Year: AY ${data.assessmentYear} | Financial Year: FY ${data.financialYear}`;
      
      // Stats summary cards
      sumTds.textContent = formatCurrency(data.summary.tds);
      sumTcs.textContent = formatCurrency(data.summary.tcs);
      sumPaid.textContent = formatCurrency(data.summary.taxPaid);
      sumRefund.textContent = formatCurrency(data.summary.refund);
      
      // Populate Details Tables
      // Part A (TDS)
      tablePartABody.innerHTML = '';
      if (data.partA.length > 0) {
        emptyPartA.classList.add('hidden');
        data.partA.forEach(row => {
          const tr = document.createElement('tr');
          tr.classList.add('detail-row');
          tr.title = 'Click to view individual transactions';
          tr.innerHTML = `
            <td>${row.srNo}</td>
            <td><code>${row.tan}</code></td>
            <td>${row.name}</td>
            <td class="num">${formatCurrency(row.credited)}</td>
            <td class="num">${formatCurrency(row.deducted)}</td>
            <td class="num">${formatCurrency(row.deposited)}</td>
            <td class="num detail-expand-cell"><span class="detail-expand-icon">&#8677;</span></td>
          `;
          tr.addEventListener('click', () => openTanDetailModal(row.tan, 'A', row.name));
          tablePartABody.appendChild(tr);
        });
      } else {
        emptyPartA.classList.remove('hidden');
      }

      // Part B (TCS)
      tablePartBBody.innerHTML = '';
      if (data.partB.length > 0) {
        emptyPartB.classList.add('hidden');
        data.partB.forEach(row => {
          const tr = document.createElement('tr');
          tr.classList.add('detail-row');
          tr.title = 'Click to view individual transactions';
          tr.innerHTML = `
            <td>${row.srNo}</td>
            <td><code>${row.tan}</code></td>
            <td>${row.name}</td>
            <td class="num">${formatCurrency(row.debited)}</td>
            <td class="num">${formatCurrency(row.collected)}</td>
            <td class="num">${formatCurrency(row.deposited)}</td>
            <td class="num detail-expand-cell"><span class="detail-expand-icon">&#8677;</span></td>
          `;
          tr.addEventListener('click', () => openTanDetailModal(row.tan, 'B', row.name));
          tablePartBBody.appendChild(tr);
        });
      } else {
        emptyPartB.classList.remove('hidden');
      }

      // Part C (Tax Paid)
      tablePartCBody.innerHTML = '';
      if (data.partC.length > 0) {
        emptyPartC.classList.add('hidden');
        data.partC.forEach(row => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${row.srNo}</td>
            <td><code>${row.bsr}</code></td>
            <td>${row.date}</td>
            <td><code>${row.challan}</code></td>
            <td class="num">${formatCurrency(row.taxPaid)}</td>
          `;
          tablePartCBody.appendChild(tr);
        });
      } else {
        emptyPartC.classList.remove('hidden');
      }

      // Part D (Refunds)
      tablePartDBody.innerHTML = '';
      if (data.partD.length > 0) {
        emptyPartD.classList.add('hidden');
        data.partD.forEach(row => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${row.srNo}</td>
            <td>${row.ay}</td>
            <td>${row.mode}</td>
            <td class="num">${formatCurrency(row.refund)}</td>
            <td class="num">${formatCurrency(row.interest)}</td>
            <td>${row.date}</td>
          `;
          tablePartDBody.appendChild(tr);
        });
      } else {
        emptyPartD.classList.remove('hidden');
      }

    }, 700); // Shimmer animation delay
  }

  // Formatting helper
  function formatCurrency(val) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(val);
  }

  // ============================================================
  // TAN DRILL-DOWN DETAIL MODAL
  // ============================================================
  // Column definitions for TDS (Part A) and TCS (Part B) sub-entries
  const TAN_DETAIL_COLS = {
    A: [
      { key: 'A1', label: 'Sr. No.' },
      { key: 'A2', label: 'Section' },
      { key: 'A3', label: 'Date of Deduction' },
      { key: 'A4', label: 'Status' },
      { key: 'A5', label: 'Date of Credit to Govt' },
      { key: 'A6', label: 'Remarks' },
      { key: 'A7', label: 'Amount Credited (₹)' },
      { key: 'A8', label: 'TDS Deducted (₹)' },
      { key: 'A9', label: 'TDS Deposited (₹)' },
    ],
    B: [
      { key: 'B1', label: 'Sr. No.' },
      { key: 'B2', label: 'Section' },
      { key: 'B3', label: 'Date of Collection' },
      { key: 'B4', label: 'Status' },
      { key: 'B5', label: 'Date of Credit to Govt' },
      { key: 'B6', label: 'Remarks' },
      { key: 'B7', label: 'Amount Debited (₹)' },
      { key: 'B8', label: 'TCS Collected (₹)' },
      { key: 'B9', label: 'TCS Deposited (₹)' },
    ]
  };

  function openTanDetailModal(tan, type, name, customRawData = null) {
    const raw = customRawData || state.rawTaxData;
    const partKey = `tan${type}${tan}`;
    const entries = raw && raw.partabtxt ? raw.partabtxt[partKey] : null;

    const modal = document.getElementById('tan-detail-modal');
    const titleEl = document.getElementById('tan-detail-title');
    const subtitleEl = document.getElementById('tan-detail-subtitle');
    const bodyEl = document.getElementById('tan-detail-body');
    if (!modal) return;

    const typeLabel = type === 'A' ? 'TDS' : 'TCS';
    titleEl.textContent = `${typeLabel} Transactions — ${tan}`;
    subtitleEl.textContent = name || '';

    if (!entries || entries.length === 0) {
      bodyEl.innerHTML = `<p class="tan-detail-empty">No individual transaction entries found for this TAN.</p>`;
    } else {
      const cols = TAN_DETAIL_COLS[type];
      // Amount columns (last 3) get right-align
      const amtKeys = type === 'A' ? ['A7','A8','A9'] : ['B7','B8','B9'];
      let html = `<div class="tan-detail-scroll"><table class="tan-detail-table"><thead><tr>`;
      cols.forEach(c => { html += `<th>${c.label}</th>`; });
      html += `</tr></thead><tbody>`;
      entries.forEach(entry => {
        html += '<tr>';
        cols.forEach(c => {
          const isAmt = amtKeys.includes(c.key);
          const val = entry[c.key] ?? '—';
          html += `<td${isAmt ? ' class="num"' : ''}>${val}</td>`;
        });
        html += '</tr>';
      });
      html += `</tbody></table></div>`;
      bodyEl.innerHTML = html;
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  document.getElementById('tan-detail-close')?.addEventListener('click', () => {
    document.getElementById('tan-detail-modal')?.classList.add('hidden');
    document.body.style.overflow = '';
  });
  document.getElementById('tan-detail-modal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      e.currentTarget.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });


  // Subsection Tab switching within results (Single Verification)
  subTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all subtabs
      subTabButtons.forEach(t => t.classList.remove('active'));
      subPanels.forEach(p => p.classList.remove('active'));
      
      btn.classList.add('active');
      const targetPanel = document.getElementById(`sub-panel-${btn.getAttribute('data-subtab')}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // Subsection Tab switching within Bulk Result Section
  const bulkSubTabButtons = document.querySelectorAll('.bulk-sub-tab-btn');
  bulkSubTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      bulkSubTabButtons.forEach(t => t.classList.remove('active'));
      const allBulkPanels = bulkResultCard.querySelectorAll('.sub-viewport .sub-panel');
      allBulkPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(`sub-panel-${btn.getAttribute('data-subtab')}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // Bulk Result View Controls & Rendering
  function hideBulkItemResult() {
    state.selectedBulkViewIndex = null;
    if (bulkResultCard) {
      bulkResultCard.classList.add('hidden');
    }
    const allRows = bulkQueueBody.querySelectorAll('tr');
    allRows.forEach(r => r.classList.remove('selected-row'));
  }

  function renderBulkItemResult(index) {
    const item = state.bulkQueue[index];
    if (!item || !item.resultData) return;

    state.selectedBulkViewIndex = index;

    // Highlight active row in table
    const allRows = bulkQueueBody.querySelectorAll('tr');
    allRows.forEach(r => r.classList.remove('selected-row'));
    const targetRow = document.getElementById(`bulk-row-${index}`);
    if (targetRow) targetRow.classList.add('selected-row');

    // Show bulk result card
    bulkResultCard.classList.remove('hidden');

    const data = item.resultData;
    bulkResultPanTitle.textContent = `PAN: ${data.pan || item.pan}`;
    bulkResultMetaTitle.textContent = `Assessment Year: AY ${data.ay || item.ay} | Financial Year: FY ${data.fy || '-'}`;

    // Summary cards
    bulkSumTds.textContent = formatCurrency(data.summary?.tds || 0);
    bulkSumTcs.textContent = formatCurrency(data.summary?.tcs || 0);
    bulkSumPaid.textContent = formatCurrency(data.summary?.taxPaid || 0);
    bulkSumRefund.textContent = formatCurrency(data.summary?.refund || 0);

    // Part A (TDS)
    bulkTablePartABody.innerHTML = '';
    if (data.partA && data.partA.length > 0) {
      bulkEmptyPartA.classList.add('hidden');
      data.partA.forEach(row => {
        const tr = document.createElement('tr');
        tr.classList.add('detail-row');
        tr.title = 'Click to view individual transactions';
        tr.innerHTML = `
          <td>${row.srNo}</td>
          <td><code>${row.tan}</code></td>
          <td>${row.name}</td>
          <td class="num">${formatCurrency(row.credited)}</td>
          <td class="num">${formatCurrency(row.deducted)}</td>
          <td class="num">${formatCurrency(row.deposited)}</td>
          <td class="num detail-expand-cell"><span class="detail-expand-icon">&#8677;</span></td>
        `;
        tr.addEventListener('click', () => openTanDetailModal(row.tan, 'A', row.name, item.rawTaxData));
        bulkTablePartABody.appendChild(tr);
      });
    } else {
      bulkEmptyPartA.classList.remove('hidden');
    }

    // Part B (TCS)
    bulkTablePartBBody.innerHTML = '';
    if (data.partB && data.partB.length > 0) {
      bulkEmptyPartB.classList.add('hidden');
      data.partB.forEach(row => {
        const tr = document.createElement('tr');
        tr.classList.add('detail-row');
        tr.title = 'Click to view individual transactions';
        tr.innerHTML = `
          <td>${row.srNo}</td>
          <td><code>${row.tan}</code></td>
          <td>${row.name}</td>
          <td class="num">${formatCurrency(row.debited)}</td>
          <td class="num">${formatCurrency(row.collected)}</td>
          <td class="num">${formatCurrency(row.deposited)}</td>
          <td class="num detail-expand-cell"><span class="detail-expand-icon">&#8677;</span></td>
        `;
        tr.addEventListener('click', () => openTanDetailModal(row.tan, 'B', row.name, item.rawTaxData));
        bulkTablePartBBody.appendChild(tr);
      });
    } else {
      bulkEmptyPartB.classList.remove('hidden');
    }

    // Part C (Tax Paid)
    bulkTablePartCBody.innerHTML = '';
    if (data.partC && data.partC.length > 0) {
      bulkEmptyPartC.classList.add('hidden');
      data.partC.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row.srNo}</td>
          <td><code>${row.bsr}</code></td>
          <td>${row.date}</td>
          <td><code>${row.challan}</code></td>
          <td class="num">${formatCurrency(row.taxPaid)}</td>
        `;
        bulkTablePartCBody.appendChild(tr);
      });
    } else {
      bulkEmptyPartC.classList.remove('hidden');
    }

    // Part D (Refunds)
    bulkTablePartDBody.innerHTML = '';
    if (data.partD && data.partD.length > 0) {
      bulkEmptyPartD.classList.add('hidden');
      data.partD.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row.srNo}</td>
          <td>${row.ay}</td>
          <td>${row.mode}</td>
          <td class="num">${formatCurrency(row.refund)}</td>
          <td class="num">${formatCurrency(row.interest)}</td>
          <td>${row.date}</td>
        `;
        bulkTablePartDBody.appendChild(tr);
      });
    } else {
      bulkEmptyPartD.classList.remove('hidden');
    }

    // Smoothly scroll to the bulk result card
    bulkResultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Bind Bulk Result Close Button
  if (bulkResultCloseBtn) {
    bulkResultCloseBtn.addEventListener('click', hideBulkItemResult);
  }

  // Bind Bulk Result JSON & PDF Download Buttons
  if (bulkDownloadJsonBtn) {
    bulkDownloadJsonBtn.addEventListener('click', () => {
      if (state.selectedBulkViewIndex === null) return;
      const item = state.bulkQueue[state.selectedBulkViewIndex];
      if (item && item.resultData) {
        downloadDatasetJSON(item.resultData);
      }
    });
  }

  if (bulkDownloadPdfBtn) {
    bulkDownloadPdfBtn.addEventListener('click', () => {
      if (state.selectedBulkViewIndex === null) return;
      const item = state.bulkQueue[state.selectedBulkViewIndex];
      if (!item || !item.resultData || !item.rawTaxData) {
        alert("No tax data available for PDF export.");
        return;
      }

      checkExtension((isLive) => {
        if (!isLive) {
          showToast(
            "PDF Downloader Helper Offline",
            "Please load the helper extension in Developer Mode to download your Form 26AS as a PDF."
          );
          return;
        }

        bulkDownloadPdfBtn.disabled = true;
        bulkDownloadPdfBtn.textContent = "Generating...";

        chrome.runtime.sendMessage(
          EXTENSION_ID,
          {
            action: "GENERATE_PDF",
            payload: {
              taxData: item.rawTaxData,
              pan: item.pan,
              ay: item.ay,
              assesseeName: item.resultData.assesseeName,
              address1: item.resultData.address1,
              address2: item.resultData.address2,
              panStatus: item.resultData.panStatus
            }
          },
          (response) => {
            bulkDownloadPdfBtn.disabled = false;
            bulkDownloadPdfBtn.innerHTML = `
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Print PDF
            `;
            if (chrome.runtime.lastError || !response || (response.status !== "started" && response.status !== "success" && response.status !== "SUCCESS")) {
              console.error("PDF Extension rendering error:", chrome.runtime.lastError || response?.error);
              showToast(
                "PDF Generation Interrupted",
                "Failed to communicate with the helper extension. Please ensure it is active and reload if needed."
              );
            }
          }
        );
      });
    });
  }

  // Modal helper bindings
  function hideModal() {
    logModal.classList.add('hidden');
    state.activeModalSource = null;
  }
  closeModalBtn.addEventListener('click', hideModal);
  modalCloseActionBtn.addEventListener('click', hideModal);
  modalBgBtn.addEventListener('click', hideModal); // Run in background

  modalCancelBtn.addEventListener('click', () => {
    state.isSingleCancelled = true;
    state.singleStatus = 'idle';
    hideModal();
  });

  // Print & JSON file exports for single search
  downloadJsonSingle.addEventListener('click', () => {
    if (!state.singleData) return;
    downloadDatasetJSON(state.singleData);
  });
  downloadPdfSingle.addEventListener('click', () => {
    if (!state.singleData) return;

    checkExtension((isLive) => {
      if (!isLive) {
        showToast(
          "PDF Downloader Helper Offline",
          "Please load the helper extension in Developer Mode to download your Form 26AS as a PDF."
        );
        return;
      }

      if (!state.rawTaxData) {
        alert("No raw tax data available to generate PDF. Run the retrieval first.");
        return;
      }

      // Disable button temporarily to prevent double submission
      downloadPdfSingle.disabled = true;
      downloadPdfSingle.textContent = "Generating...";

      chrome.runtime.sendMessage(
        EXTENSION_ID,
        {
          action: "GENERATE_PDF",
          payload: {
            taxData: state.rawTaxData,
            pan: state.singleData.pan,
            ay: state.singleData.assessmentYear,
            assesseeName: state.singleData.assesseeName,
            address1: state.singleData.address1,
            address2: state.singleData.address2,
            panStatus: state.singleData.panStatus
          }
        },
        (response) => {
          downloadPdfSingle.disabled = false;
          downloadPdfSingle.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Print PDF
          `;

          if (chrome.runtime.lastError || !response || response.status !== "started") {
            console.error("Extension generation failed:", chrome.runtime.lastError);
            showToast(
              "PDF Generation Interrupted",
              "Failed to communicate with the helper extension. Please ensure it is active and reload if needed."
            );
          }
        }
      );
    });
  });


  // ==========================================
  // BULK VERIFICATION MODULE
  // ==========================================
  
  // Drag & Drop event bindings
  ['dragenter', 'dragover'].forEach(eventName => {
    bulkDropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      bulkDropZone.classList.add('dragover');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    bulkDropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      bulkDropZone.classList.remove('dragover');
    }, false);
  });

  bulkDropZone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files.length > 0) {
      handleBulkFile(files[0]);
    }
  });

  bulkDropZone.addEventListener('click', () => {
    bulkFileInput.click();
  });

  bulkFileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleBulkFile(e.target.files[0]);
    }
  });

  function handleBulkFile(file) {
    fileInfoLabel.textContent = `${file.name} (${Math.round(file.size / 1024 * 10) / 10} KB)`;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      bulkTextInput.value = text;
    };
    reader.readAsText(file);
  }



  // Parse Text Input
  parseBulkBtn.addEventListener('click', () => {
    const rawText = bulkTextInput.value.trim();
    if (!rawText) {
      alert("Please paste data or upload a file first.");
      return;
    }
    
    const lines = rawText.split('\n');
    const parsedQueue = [];
    
    const MIN_AY_START = 2009; // 2009-10 is the earliest allowed AY
    const ayFormatRegex = /^(\d{4})-(\d{2})$/;
    const skipped = [];
    const duplicates = [];
    const seenPanAy = new Set();

    lines.forEach((line, lineIdx) => {
      if (!line.trim()) return;
      const parts = line.split(',');
      if (parts.length >= 2) {
        const pan = parts[0].trim().toUpperCase();
        const pass = parts[1].trim();
        const ay = parts[2] ? parts[2].trim() : '2026-27';

        // Validate: PAN must be 1–16 chars
        if (pan.length === 0 || pan.length > 16) {
          skipped.push(`Row ${lineIdx + 1}: PAN '${pan}' exceeds 16 characters or is empty.`);
          return;
        }

        // Validate: AY must match YYYY-YY format
        const ayMatch = ay.match(ayFormatRegex);
        if (!ayMatch) {
          skipped.push(`Row ${lineIdx + 1}: Assessment Year '${ay}' is not in YYYY-YY format.`);
          return;
        }
        const ayStartYear = parseInt(ayMatch[1]);
        const ayEndSuffix = parseInt(ayMatch[2]);
        // Check year is consecutive (e.g. 2026-27 means end = start+1)
        if (ayEndSuffix !== (ayStartYear + 1) % 100) {
          skipped.push(`Row ${lineIdx + 1}: AY '${ay}' years are not consecutive.`);
          return;
        }
        // Must be >= 2009-10
        if (ayStartYear < MIN_AY_START) {
          skipped.push(`Row ${lineIdx + 1}: AY '${ay}' is before the minimum 2009-10.`);
          return;
        }

        // Deduplication: Check if exact same PAN and same Assessment Year already exists
        const panAyKey = `${pan}__${ay}`;
        if (seenPanAy.has(panAyKey)) {
          duplicates.push(`Row ${lineIdx + 1}: Duplicate entry for PAN '${pan}' (${ay}) skipped.`);
          return;
        }
        seenPanAy.add(panAyKey);

        parsedQueue.push({
          pan,
          password: pass,
          ay,
          status: 'pending',
          progress: 0,
          resultData: null
        });
      }
    });

    if (skipped.length > 0) {
      console.warn('Bulk parse skipped invalid rows:', skipped);
    }

    if (duplicates.length > 0) {
      console.info('Bulk parse removed duplicate rows:', duplicates);
      showToast(
        "Duplicate Entries Removed",
        `${duplicates.length} duplicate row(s) with identical PAN and Assessment Year were automatically filtered out.`
      );
    }

    if (parsedQueue.length === 0) {
      alert("No valid rows could be parsed. Check formatting (PAN, password, assessmentYear).");
      return;
    }

    // Stable grouping by PAN so all multi-year records for the same PAN are adjacent in the queue
    const groupedQueue = [];
    const panMap = new Map();

    parsedQueue.forEach(item => {
      if (!panMap.has(item.pan)) {
        panMap.set(item.pan, []);
      }
      panMap.get(item.pan).push(item);
    });

    panMap.forEach((itemsForPan) => {
      // Sort assessment years descending (e.g. 2024-25, 2023-24, 2022-23)
      itemsForPan.sort((a, b) => b.ay.localeCompare(a.ay));
      groupedQueue.push(...itemsForPan);
    });

    // Load into state
    state.bulkQueue = groupedQueue;
    state.bulkCurrentIndex = 0;
    state.bulkStatus = 'idle';
    state.bulkActiveWorkers = 0;
    state.bulkLogsMap = {};
    
    // Update progress panel UI
    bulkProgressPanel.classList.remove('hidden');
    bulkTablePanel.classList.remove('hidden');
    
    // Enable control buttons
    startBulkBtn.disabled = false;
    pauseBulkBtn.disabled = true;
    
    updateBulkProgressUI();
    renderBulkQueueTable();
  });

  function updateBulkProgressUI() {
    const total = state.bulkQueue.length;
    const pending = state.bulkQueue.filter(item => item.status === 'pending').length;
    const running = state.bulkQueue.filter(item => item.status === 'running').length;
    const success = state.bulkQueue.filter(item => item.status === 'success').length;
    const failed = state.bulkQueue.filter(item => item.status === 'failed').length;
    
    countPending.textContent = pending;
    countRunning.textContent = running;
    countSuccess.textContent = success;
    countFailed.textContent = failed;
    
    // Global progress percent
    const completed = success + failed;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    globalProgressBar.style.width = `${percent}%`;
    
    if (state.bulkStatus === 'running') {
      queueStatusText.textContent = `Processing records: ${completed} / ${total} complete (${percent}%)`;
    } else if (state.bulkStatus === 'completed') {
      queueStatusText.textContent = `Retrieval Completed. Success: ${success}, Failed: ${failed}`;
    } else if (state.bulkStatus === 'paused') {
      queueStatusText.textContent = `Queue paused. ${completed} / ${total} processed.`;
    } else {
      queueStatusText.textContent = `Ready to run (Total loaded: ${total} records)`;
    }
  }

  function renderBulkQueueTable() {
    bulkQueueBody.innerHTML = '';
    
    state.bulkQueue.forEach((item, index) => {
      const tr = document.createElement('tr');
      tr.id = `bulk-row-${index}`;
      
      if (state.selectedBulkViewIndex === index) {
        tr.classList.add('selected-row');
      }
      
      // Checkbox is enabled only if retrieval was successful
      const isCheckboxDisabled = item.status !== 'success';
      if (isCheckboxDisabled) {
        item.checked = false; // Reset selection state if it is not successful
      }
      const isChecked = item.checked === true;
      const checkboxStyle = state.bulkSelectionMode ? 'inline-block' : 'none';
      const checkboxHtml = `<input type="checkbox" class="bulk-row-checkbox" data-index="${index}" ${isChecked ? 'checked' : ''} ${isCheckboxDisabled ? 'disabled' : ''} style="display: ${checkboxStyle}; margin-right: 8px;" />`;
      
      const statusPill = `<span class="status-pill ${item.status}" id="row-status-pill-${index}">${item.status}</span>`;
      
      const progressIndicator = `
        <div class="row-progress-container">
          <div class="row-progress-bg">
            <div class="row-progress-fill" id="row-progress-fill-${index}" style="width: ${item.progress}%"></div>
          </div>
          <span class="row-progress-percent" id="row-progress-percent-${index}">${item.progress}%</span>
        </div>
      `;

      const viewBtnHtml = `
        <button class="secondary-button size-xs btn-view-bulk-row" data-index="${index}" id="btn-view-bulk-row-${index}" ${item.status === 'success' ? '' : 'disabled'} title="View Form 26AS Statement" style="display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; font-size: 0.72rem;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          View
        </button>
      `;

      tr.innerHTML = `
        <td>${checkboxHtml}<span class="sr-num">${index + 1}</span></td>
        <td><code>${item.pan}</code></td>
        <td>${item.ay}</td>
        <td>${statusPill}</td>
        <td>${progressIndicator}</td>
        <td style="text-align: center;">${viewBtnHtml}</td>
      `;
      
      bulkQueueBody.appendChild(tr);
    });

    const checkboxes = document.querySelectorAll('.bulk-row-checkbox');
    checkboxes.forEach(cb => {
      cb.addEventListener('change', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        state.bulkQueue[idx].checked = e.target.checked;
        updateBulkActionsUI();
      });
    });

    const viewButtons = document.querySelectorAll('.btn-view-bulk-row');
    viewButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'));
        renderBulkItemResult(idx);
      });
    });

    const selectAllCheckbox = document.getElementById('bulk-select-all');
    if (selectAllCheckbox) {
      selectAllCheckbox.style.display = state.bulkSelectionMode ? 'inline-block' : 'none';
    }

    updateBulkActionsUI();
  }

  function updateBulkActionsUI() {
    const total = state.bulkQueue.length;
    const checkedItems = state.bulkQueue.filter(item => item.checked === true);
    const checkedCount = checkedItems.length;

    const selectAllCheckbox = document.getElementById('bulk-select-all');
    if (selectAllCheckbox) {
      const successItems = state.bulkQueue.filter(item => item.status === 'success');
      const successChecked = successItems.filter(item => item.checked === true);
      selectAllCheckbox.checked = successItems.length > 0 && successChecked.length === successItems.length;
      selectAllCheckbox.indeterminate = successChecked.length > 0 && successChecked.length < successItems.length;
    }

    const dlPdfBtn = document.getElementById('btn-bulk-dl-pdf');
    const dlJsonBtn = document.getElementById('btn-bulk-dl-json');

    // Do not hide the download PDF button - it should always remain visible
    if (dlPdfBtn) dlPdfBtn.style.display = 'inline-flex';
    if (dlJsonBtn) dlJsonBtn.style.display = 'inline-flex';

    if (state.bulkSelectionMode) {
      if (checkedCount === 0) {
        if (dlPdfBtn) dlPdfBtn.disabled = true;
        if (dlJsonBtn) dlJsonBtn.disabled = true;
      } else {
        if (dlPdfBtn) {
          const hasFinishedPdf = checkedItems.some(item => item.status === 'success' && item.rawTaxData);
          dlPdfBtn.disabled = !state.extensionInstalled || !hasFinishedPdf;
        }
        if (dlJsonBtn) {
          const hasFinishedJson = checkedItems.some(item => item.status === 'success' && item.resultData);
          dlJsonBtn.disabled = !hasFinishedJson;
        }
      }
    } else {
      if (dlPdfBtn) {
        const hasFinishedPdf = state.bulkQueue.some(item => item.status === 'success' && item.rawTaxData);
        dlPdfBtn.disabled = !state.extensionInstalled || !hasFinishedPdf;
      }
      if (dlJsonBtn) {
        const hasFinishedJson = state.bulkQueue.some(item => item.status === 'success' && item.resultData);
        dlJsonBtn.disabled = !hasFinishedJson;
      }
    }
  }

  function openBulkConsoleModal(index) {
    const item = state.bulkQueue[index];
    state.activeModalSource = index;
    
    showTerminalModal(`TRACES Console Stream - Row ${index + 1}: ${item.pan}`);
    
    // Dump existing logs
    const existingLogs = state.bulkLogsMap[index] || [];
    existingLogs.forEach(log => {
      if (log.char === '✔' || log.char === '✖') {
        const line = appendLogStep(log.msg);
        if (log.char === '✔') {
          markLogStepSuccess(line);
        } else {
          markLogStepFailure(line);
        }
      }
    });

    // Check completion status to enable modal closing controls
    if (item.status === 'success') {
      terminalStatusLight.className = 'status-indicator-light success';
      terminalStatusText.textContent = 'Verification Completed.';
      closeModalBtn.disabled = false;
      modalCloseActionBtn.disabled = false;
    } else if (item.status === 'failed') {
      terminalStatusLight.className = 'status-indicator-light error';
      terminalStatusText.textContent = 'Verification Failed.';
      closeModalBtn.disabled = false;
      modalCloseActionBtn.disabled = false;
    } else if (item.status === 'running') {
      terminalStatusLight.className = 'status-indicator-light pulse';
      terminalStatusText.textContent = 'Executing retrieval...';
      closeModalBtn.disabled = true;
      modalCloseActionBtn.disabled = true;
    } else {
      terminalStatusLight.className = 'status-indicator-light';
      terminalStatusText.textContent = 'Awaiting execution...';
      closeModalBtn.disabled = false;
      modalCloseActionBtn.disabled = false;
    }
  }

  // ==========================================
  // BULK CONCURRENT PROCESSING LOOP (IIFE Wrapper)
  // ==========================================
  
  startBulkBtn.addEventListener('click', () => {
    if (state.bulkStatus === 'running') return;
    
    state.bulkStatus = 'running';
    startBulkBtn.disabled = true;
    pauseBulkBtn.disabled = false;
    
    updateBulkProgressUI();
    updateBulkBadge(); // show LIVE badge
    
    // Start workers
    processBulkQueue();
  });

  pauseBulkBtn.addEventListener('click', () => {
    state.bulkStatus = 'paused';
    startBulkBtn.disabled = false;
    pauseBulkBtn.disabled = true;
    updateBulkProgressUI();
    updateBulkBadge(); // hide LIVE badge when paused
  });

  resetBulkBtn.addEventListener('click', () => {
    state.bulkStatus = 'idle';
    state.bulkQueue = [];
    state.bulkLogsMap = {};
    state.bulkSelectionMode = false;
    state.activeBulkSession = null;
    hideBulkItemResult();
    
    const btnSelect = document.getElementById('btn-bulk-select');
    if (btnSelect) btnSelect.textContent = "Select Entries";

    bulkProgressPanel.classList.add('hidden');
    bulkTablePanel.classList.add('hidden');
    
    bulkTextInput.value = '';
    fileInfoLabel.textContent = 'No file selected';
    bulkFileInput.value = '';
    updateBulkBadge(); // clear badge on reset
  });

  // Bulk selection and download actions event handlers
  const btnBulkSelect = document.getElementById('btn-bulk-select');
  if (btnBulkSelect) {
    btnBulkSelect.addEventListener('click', () => {
      if (!state.bulkSelectionMode) {
        // Activate selection mode
        state.bulkSelectionMode = true;
        // Uncheck all by default
        state.bulkQueue.forEach(item => item.checked = false);
        btnBulkSelect.textContent = "Cancel Selection";
      } else {
        // Cancel selection (deactivate selection mode)
        state.bulkSelectionMode = false;
        // Reset selection state
        state.bulkQueue.forEach(item => item.checked = false);
        btnBulkSelect.textContent = "Select Entries";
      }
      renderBulkQueueTable();
    });
  }

  // Handle clicking failed status pills to view specific error messages
  if (bulkQueueTable) {
    bulkQueueTable.addEventListener('click', (e) => {
      const pill = e.target.closest('.status-pill.failed');
      if (!pill) return;
      
      const match = pill.id.match(/row-status-pill-(\d+)/);
      if (!match) return;
      
      const index = parseInt(match[1]);
      const item = state.bulkQueue[index];
      if (item && item.status === 'failed') {
        const errMsg = item.errorMessage || "Unknown error occurred during retrieval.";
        alert(`PAN: ${item.pan}\nAssessment Year: ${item.ay}\n\nError Reason: ${errMsg}`);
      }
    });
  }

  document.getElementById('btn-bulk-dl-json').addEventListener('click', () => {
    const itemsToDownload = state.bulkSelectionMode
      ? state.bulkQueue.filter(item => item.checked === true && item.status === 'success' && item.resultData)
      : state.bulkQueue.filter(item => item.status === 'success' && item.resultData);

    if (itemsToDownload.length === 0) return;
    
    const dataToDownload = itemsToDownload.map(item => item.resultData);
    const blob = new Blob([JSON.stringify(dataToDownload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Form26AS_Bulk_Export_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById('btn-bulk-dl-pdf').addEventListener('click', async () => {
    const itemsToDownload = state.bulkSelectionMode
      ? state.bulkQueue.filter(item => item.checked === true && item.status === 'success' && item.rawTaxData)
      : state.bulkQueue.filter(item => item.status === 'success' && item.rawTaxData);

    if (itemsToDownload.length === 0) return;

    checkExtension(async (isLive) => {
      if (!isLive) {
        showToast(
          "PDF Downloader Helper Offline",
          "Please load the helper extension in Developer Mode to download your Form 26AS PDFs."
        );
        return;
      }

      const dlPdfBtn = document.getElementById('btn-bulk-dl-pdf');
      const originalText = dlPdfBtn.innerHTML;
      dlPdfBtn.disabled = true;
      dlPdfBtn.textContent = "Generating PDFs...";

      const generatePdfBase64 = (item) => {
        return new Promise((resolve, reject) => {
          chrome.runtime.sendMessage(
            EXTENSION_ID,
            {
              action: "GENERATE_PDF",
              payload: {
                taxData: item.rawTaxData,
                pan: item.pan,
                ay: item.ay,
                assesseeName: item.resultData.assesseeName,
                address1: item.resultData.address1,
                address2: item.resultData.address2,
                panStatus: item.resultData.panStatus,
                shouldReturnData: true
              }
            },
            (response) => {
              if (chrome.runtime.lastError || !response || response.status !== "success") {
                console.error("Failed to generate PDF for PAN:", item.pan, chrome.runtime.lastError);
                reject(new Error(`Failed to generate PDF for ${item.pan}`));
              } else {
                resolve({
                  filename: response.filename || `26_${item.pan}_${item.ay}.pdf`,
                  base64: response.data
                });
              }
            }
          );
        });
      };

      try {
        if (itemsToDownload.length === 1) {
          chrome.runtime.sendMessage(
            EXTENSION_ID,
            {
              action: "GENERATE_PDF",
              payload: {
                taxData: itemsToDownload[0].rawTaxData,
                pan: itemsToDownload[0].pan,
                ay: itemsToDownload[0].ay,
                assesseeName: itemsToDownload[0].resultData.assesseeName,
                address1: itemsToDownload[0].resultData.address1,
                address2: itemsToDownload[0].resultData.address2,
                panStatus: itemsToDownload[0].resultData.panStatus,
                shouldReturnData: false
              }
            }
          );
        } else {
          const zip = new JSZip();
          for (const item of itemsToDownload) {
            dlPdfBtn.textContent = `Rendering ${item.pan}...`;
            try {
              const pdfResult = await generatePdfBase64(item);
              if (pdfResult && pdfResult.base64) {
                zip.file(pdfResult.filename, pdfResult.base64, { base64: true });
              }
            } catch (err) {
              console.error("Failed to include PDF in ZIP:", err.message);
            }
          }

          dlPdfBtn.textContent = "Creating ZIP file...";
          const content = await zip.generateAsync({ type: "blob" });
          const url = URL.createObjectURL(content);
          const link = document.createElement("a");
          link.href = url;
          link.download = `Form26AS_Export_${new Date().toISOString().slice(0, 10)}.zip`;
          link.click();
          URL.revokeObjectURL(url);
        }
      } catch (error) {
        console.error("Bulk PDF download failed:", error);
        showToast(
          "PDF Generation Interrupted",
          "An error occurred during bulk PDF generation. Please check the helper extension."
        );
      } finally {
        dlPdfBtn.innerHTML = originalText;
        dlPdfBtn.disabled = false;
        updateBulkActionsUI();
      }
    });
  });

  const selectAllEl = document.getElementById('bulk-select-all');
  if (selectAllEl) {
    selectAllEl.addEventListener('change', (e) => {
      const isChecked = e.target.checked;
      state.bulkQueue.forEach(item => {
        if (item.status === 'success') {
          item.checked = isChecked;
        } else {
          item.checked = false;
        }
      });
      document.querySelectorAll('.bulk-row-checkbox').forEach(cb => {
        if (!cb.disabled) {
          cb.checked = isChecked;
        } else {
          cb.checked = false;
        }
      });
      updateBulkActionsUI();
    });
  }

  async function processBulkQueue() {
    // If paused or completed, do nothing
    if (state.bulkStatus !== 'running') return;
    
    // Check if we reached the end of queue and no active workers
    const pendingItems = state.bulkQueue.filter(item => item.status === 'pending');
    if (pendingItems.length === 0 && state.bulkActiveWorkers === 0) {
      state.bulkStatus = 'completed';
      startBulkBtn.disabled = true;
      pauseBulkBtn.disabled = true;
      updateBulkProgressUI();
      updateBulkBadge(); // hide LIVE badge once all done
      return;
    }

    // Launch workers up to limits
    while (state.bulkActiveWorkers < CONCURRENCY_LIMIT && state.bulkStatus === 'running') {
      // Get list of PANs currently being processed by active running workers
      const currentlyRunningPans = new Set(
        state.bulkQueue.filter(item => item.status === 'running').map(item => item.pan)
      );

      // Find next pending item whose PAN is NOT currently being processed
      // (This guarantees multiple AYs for the SAME PAN run sequentially one-by-one, while DIFFERENT PANs run in parallel)
      const nextIndex = state.bulkQueue.findIndex(item => item.status === 'pending' && !currentlyRunningPans.has(item.pan));
      if (nextIndex === -1) break; // All pending items are either running or waiting for their PAN's turn
      
      // Claim item and start worker
      state.bulkQueue[nextIndex].status = 'running';
      state.bulkActiveWorkers++;
      updateBulkProgressUI();
      
      // Run async worker thread
      simulateRowWorker(nextIndex);
    }
  }

  async function simulateRowWorker(index) {
    const item = state.bulkQueue[index];
    const delay = (ms) => new Promise(res => setTimeout(res, ms));
    const startTime = performance.now();
    
    // Initialize trace logs array
    state.bulkLogsMap[index] = [];
    
    const rowLog = (char, style, msg) => {
      const logObj = { char, style, msg };
      state.bulkLogsMap[index].push(logObj);
    };

    const stepStart = (text) => {
      rowLog('➜', 'info', text);
      if (state.activeModalSource === index) {
        return appendLogStep(text);
      }
      return null;
    };

    const stepSuccess = (el, text) => {
      rowLog('✔', 'success', text);
      if (el && state.activeModalSource === index) {
        markLogStepSuccess(el);
      }
    };

    const stepFailure = (el, text) => {
      rowLog('✖', 'error', text);
      item.errorMessage = text; // Capture specific step error message
      if (el && state.activeModalSource === index) {
        markLogStepFailure(el);
      }
    };

    const updateRowProgress = (percent) => {
      item.progress = percent;
      
      // Update inline UI elements
      const fillEl = document.getElementById(`row-progress-fill-${index}`);
      const percentEl = document.getElementById(`row-progress-percent-${index}`);
      if (fillEl) fillEl.style.width = `${percent}%`;
      if (percentEl) percentEl.textContent = `${percent}%`;
    };

    // Update row status
    const pillEl = document.getElementById(`row-status-pill-${index}`);
    if (pillEl) {
      pillEl.className = 'status-pill running';
      pillEl.textContent = 'running';
    }

    try {
      let tracesBase = null;
      let assesseeName = '';
      let panStatus = '';
      let address1 = '';
      let address2 = '';

      // Check if we can reuse the active authenticated TRACES session for the SAME PAN
      const canReuseSession = (
        state.activeBulkSession &&
        state.activeBulkSession.pan === item.pan &&
        state.activeBulkSession.password === item.password &&
        state.activeBulkSession.tracesBase
      );

      if (canReuseSession) {
        // Reuse session
        tracesBase = state.activeBulkSession.tracesBase;
        assesseeName = state.activeBulkSession.assesseeName || '';
        panStatus = state.activeBulkSession.panStatus || '';
        address1 = state.activeBulkSession.address1 || '';
        address2 = state.activeBulkSession.address2 || '';

        const reuseLine = stepStart(`Reusing active TRACES session for AY ${item.ay}`);
        updateRowProgress(65);
        stepSuccess(reuseLine, `Reusing active TRACES session for AY ${item.ay}`);
      } else {
        // If there was an active session from a previous different PAN, logout first
        if (state.activeBulkSession && state.activeBulkSession.pan !== item.pan) {
          try {
            await fetch(`${API_BASE}/api/logout`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ pan: state.activeBulkSession.pan })
            });
          } catch (_) {}
          state.activeBulkSession = null;
        }

        const connLine = stepStart(`Establishing connection`);
        updateRowProgress(15);
        
        // 1. Establish session connection
        let data;
        try {
          const response = await fetch(`${API_BASE}/api/connect`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pan: item.pan })
          });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          data = await response.json();
        } catch (err) {
          stepFailure(connLine, `Establishing connection: Connection to backend failed.`);
          rowLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
          if (state.activeModalSource === index) {
            appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
          }
          item.status = 'failed';
          if (pillEl) {
            pillEl.className = 'status-pill failed';
            pillEl.textContent = 'failed';
          }
          return;
        }

        if (data.status === 'failed') {
          stepFailure(connLine, `Establishing connection: ${data.error}`);
          rowLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
          if (state.activeModalSource === index) {
            appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
          }
          item.status = 'failed';
          if (pillEl) {
            pillEl.className = 'status-pill failed';
            pillEl.textContent = 'failed';
          }
          return;
        }

        // Connection succeeded
        updateRowProgress(30);
        stepSuccess(connLine, `Establishing connection`);

        // 2. Perform User ID verification
        const userLine = stepStart(`User ID verification`);
        updateRowProgress(45);

        try {
          const response = await fetch(`${API_BASE}/api/verify-user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pan: item.pan })
          });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          data = await response.json();
        } catch (err) {
          stepFailure(userLine, `User ID verification: Verification request failed.`);
          rowLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
          if (state.activeModalSource === index) {
            appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
          }
          item.status = 'failed';
          if (pillEl) {
            pillEl.className = 'status-pill failed';
            pillEl.textContent = 'failed';
          }
          return;
        }

        if (data.status === 'failed') {
          stepFailure(userLine, `User ID verification: ${data.error}`);
          rowLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
          if (state.activeModalSource === index) {
            appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
          }
          item.status = 'failed';
          if (pillEl) {
            pillEl.className = 'status-pill failed';
            pillEl.textContent = 'failed';
          }
          return;
        }

        // User verification succeeded
        updateRowProgress(60);
        stepSuccess(userLine, `User ID verification`);
        
        const reqId = data.reqId;
        const secAccssMsg = data.secAccssMsg;
        const entityType = data.entityType;
        
        // 3. User Authentication (Login)
        const loginLine = stepStart(`User authentication`);
        updateRowProgress(70);

        try {
          const response = await fetch(`${API_BASE}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              pan: item.pan,
              password: item.password,
              reqId: reqId,
              secAccssMsg: secAccssMsg,
              entityType: entityType
            })
          });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          data = await response.json();
        } catch (err) {
          stepFailure(loginLine, `User authentication: Login request failed.`);
          rowLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
          if (state.activeModalSource === index) {
            appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
          }
          item.status = 'failed';
          if (pillEl) {
            pillEl.className = 'status-pill failed';
            pillEl.textContent = 'failed';
          }
          return;
        }

        if (data.status === 'failed') {
          stepFailure(loginLine, `User authentication: ${data.error}`);
          rowLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
          if (state.activeModalSource === index) {
            appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
          }
          item.status = 'failed';
          if (pillEl) {
            pillEl.className = 'status-pill failed';
            pillEl.textContent = 'failed';
          }
          return;
        }

        // Login succeeded
        updateRowProgress(75);
        stepSuccess(loginLine, `User authentication`);

        // 4. Handle Dual Login (if required)
        if (data.status === 'dual_login') {
          const dualLine = stepStart(`Handling dual login`);
          updateRowProgress(80);

          try {
            const response = await fetch(`${API_BASE}/api/handle-dual-login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                pan: item.pan,
                originalResponse: data.originalResponse
              })
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            data = await response.json();
          } catch (err) {
            stepFailure(dualLine, `Handling dual login: Override request failed.`);
            rowLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
            if (state.activeModalSource === index) {
              appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
            }
            item.status = 'failed';
            if (pillEl) {
              pillEl.className = 'status-pill failed';
              pillEl.textContent = 'failed';
            }
            return;
          }

          if (data.status === 'failed') {
            stepFailure(dualLine, `Handling dual login: ${data.error}`);
            rowLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
            if (state.activeModalSource === index) {
              appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
            }
            item.status = 'failed';
            if (pillEl) {
              pillEl.className = 'status-pill failed';
              pillEl.textContent = 'failed';
            }
            return;
          }

          updateRowProgress(85);
          stepSuccess(dualLine, `Handling dual login`);
        }
        
        // 5. Redirecting to Traces Portal
        const redirectLine = stepStart(`Redirecting to Traces Portal`);
        updateRowProgress(90);
        
        try {
          const response = await fetch(`${API_BASE}/api/redirect-to-traces`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pan: item.pan, ay: item.ay })
          });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          data = await response.json();
        } catch (err) {
          stepFailure(redirectLine, `Redirecting to Traces Portal: Redirect request failed.`);
          rowLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
          if (state.activeModalSource === index) {
            appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
          }
          item.status = 'failed';
          if (pillEl) {
            pillEl.className = 'status-pill failed';
            pillEl.textContent = 'failed';
          }
          return;
        }

        if (data.status === 'failed') {
          stepFailure(redirectLine, `Redirecting to Traces Portal: ${data.error}`);
          rowLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
          if (state.activeModalSource === index) {
            appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
          }
          item.status = 'failed';
          if (pillEl) {
            pillEl.className = 'status-pill failed';
            pillEl.textContent = 'failed';
          }
          return;
        }

        updateRowProgress(92);
        stepSuccess(redirectLine, `Redirecting to Traces Portal`);

        tracesBase = data.tracesBase;
        assesseeName = data.assesseeName || '';
        panStatus = data.panStatus || '';
        address1 = data.address1 || '';
        address2 = data.address2 || '';

        // Save session state for multi-year reuse
        state.activeBulkSession = {
          pan: item.pan,
          password: item.password,
          tracesBase: tracesBase,
          assesseeName: assesseeName,
          panStatus: panStatus,
          address1: address1,
          address2: address2
        };
      }

      item.liveTracesBase = tracesBase;
      
      // Phase 6: Downloading 26AS Data
      const downloadLine = stepStart(`Downloading 26AS data (${item.ay})`);
      updateRowProgress(94);
      
      let downloadData;
      try {
        const response = await fetch(`${API_BASE}/api/download-26as`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pan: item.pan, ay: item.ay, tracesBase: item.liveTracesBase })
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        downloadData = await response.json();
      } catch (err) {
        stepFailure(downloadLine, `Downloading 26AS data: Download request failed.`);
        rowLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
        if (state.activeModalSource === index) {
          appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
        }
        item.status = 'failed';
        if (pillEl) {
          pillEl.className = 'status-pill failed';
          pillEl.textContent = 'failed';
        }
        return;
      }
      
      if (downloadData.status === 'failed') {
        stepFailure(downloadLine, `Downloading 26AS data: ${downloadData.error}`);
        rowLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
        if (state.activeModalSource === index) {
          appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
        }
        item.status = 'failed';
        if (pillEl) {
          pillEl.className = 'status-pill failed';
          pillEl.textContent = 'failed';
        }
        return;
      }

      updateRowProgress(96);
      stepSuccess(downloadLine, `Downloading 26AS data (${item.ay})`);
      
      // Store results
      item.resultData = translateTracesData(downloadData.taxData, item.pan, item.ay);
      item.resultData.assesseeName = downloadData.assesseeName || assesseeName;
      item.resultData.panStatus = downloadData.panStatus || panStatus;
      item.resultData.address1 = downloadData.address1 || address1;
      item.resultData.address2 = downloadData.address2 || address2;
      item.resultData.fy = downloadData.fy;
      item.resultData.ay = item.ay;
      item.rawTaxData = downloadData.taxData;

      // Check if next pending item in queue is for the SAME PAN
      const nextPendingItem = state.bulkQueue.find((it, idx) => idx > index && it.status === 'pending');
      const shouldKeepSession = nextPendingItem && nextPendingItem.pan === item.pan && nextPendingItem.password === item.password;

      if (shouldKeepSession) {
        // Multi-year flow: Keep session active for the next year
        item.status = 'success';
        if (pillEl) {
          pillEl.className = 'status-pill success';
          pillEl.textContent = 'success';
        }
        const viewBtnEl = document.getElementById(`btn-view-bulk-row-${index}`);
        if (viewBtnEl) {
          viewBtnEl.disabled = false;
        }
        if (state.selectedBulkViewIndex === index) {
          renderBulkItemResult(index);
        }
        updateRowProgress(100);
        updateBulkActionsUI();
        rowLog('✔', 'success', `AY ${item.ay} completed. Session kept active for next year.`);
      } else {
        // Last year or only year for this PAN: Perform Phase 7 Logout
        const logoutLine = stepStart(`Logging out`);
        updateRowProgress(98);
        try {
          const logoutResp = await fetch(`${API_BASE}/api/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pan: item.pan })
          });
          const logoutData = logoutResp.ok ? await logoutResp.json() : { status: 'failed' };
          if (logoutData.status === 'success') {
            stepSuccess(logoutLine, `Logging out`);
            rowLog('✔', 'success', `Logging out`);
            item.status = 'success';
            if (pillEl) {
              pillEl.className = 'status-pill success';
              pillEl.textContent = 'success';
            }
            const viewBtnEl = document.getElementById(`btn-view-bulk-row-${index}`);
            if (viewBtnEl) {
              viewBtnEl.disabled = false;
            }
            if (state.selectedBulkViewIndex === index) {
              renderBulkItemResult(index);
            }
            updateRowProgress(100);
            updateBulkActionsUI();
          } else {
            throw new Error(logoutData.error || 'Logout failed');
          }
        } catch (logoutErr) {
          stepFailure(logoutLine, `Logging out: ${logoutErr.message}`);
          rowLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
          if (state.activeModalSource === index) {
            appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers.');
          }
          item.status = 'failed';
          if (pillEl) {
            pillEl.className = 'status-pill failed';
            pillEl.textContent = 'failed';
          }
        } finally {
          state.activeBulkSession = null;
        }
      }

    } catch (err) {
      item.status = 'failed';
      item.errorMessage = err.message || 'Suspended unexpectedly.';
      if (pillEl) {
        pillEl.className = 'status-pill failed';
        pillEl.textContent = 'failed';
      }
      rowLog('✖', 'error', `[Thread-${index}] Suspended: ${err.message}`);
      rowLog('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers from the settings menu.');
      if (state.activeModalSource === index) {
        appendLogLine('✖', 'error', 'If you think this is a unusual error, please report this issue to the developers from the settings menu.');
      }
    } finally {
      state.bulkActiveWorkers--;
      updateBulkProgressUI();
      
      // Calculate latency and update bottom stats bar
      const latency = Math.round(performance.now() - startTime);
      updateGlobalStats(item.status === 'success', latency);
      
      // Check modal state to update close action buttons
      if (state.activeModalSource === index) {
        closeModalBtn.disabled = false;
        modalCloseActionBtn.disabled = false;
        terminalStatusLight.className = item.status === 'success' ? 'status-indicator-light success' : 'status-indicator-light error';
        terminalStatusText.textContent = item.status === 'success' ? 'Verification Completed.' : 'Verification Failed.';
      }
      
      // Trigger queue process next iteration
      processBulkQueue();
    }
  }

  function translateTracesData(tracesJson, pan, ay) {
    const result = {
      pan: pan,
      assessmentYear: ay,
      financialYear: `${parseInt(ay.split('-')[0]) - 1}-${ay.split('-')[0].substring(2)}`,
      summary: { tds: 0, tcs: 0, taxPaid: 0, refund: 0 },
      partA: [],
      partB: [],
      partC: [],
      partD: []
    };

    if (!tracesJson) return result;

    // 1. Map Part A (TDS) -> partabtxt.detA
    if (tracesJson.partabtxt && Array.isArray(tracesJson.partabtxt.detA)) {
      tracesJson.partabtxt.detA.forEach((item, index) => {
        const name = item['3A'] || item.deductorName || item.dedName || 'Unknown Deductor';
        const tan = item.TA || item.tanOfDeductor || item.tanDeductor || '';
        const credited = parseFloat(item['5A'] || item.amtTdsCredit || item.amtCredited || 0);
        const deducted = parseFloat(item['6A'] || item.totalTdsDeducted || item.tdsDeducted || 0);
        const deposited = parseFloat(item['7A'] || item.amtTdsDepo || item.tdsDeposited || 0);
        result.partA.push({
          srNo: index + 1,
          tan: tan,
          name: name,
          credited: credited,
          deducted: deducted,
          deposited: deposited
        });
        result.summary.tds += deposited;
      });
    }

    // 2. Map Part B (TCS) -> partabtxt.detB
    if (tracesJson.partabtxt && Array.isArray(tracesJson.partabtxt.detB)) {
      tracesJson.partabtxt.detB.forEach((item, index) => {
        const name = item['2B'] || item.collectorName || item.collName || 'Unknown Collector';
        const tan = item.TB || item.tanOfCollector || item.tanCollector || '';
        const debited = parseFloat(item['4B'] || item.totalTcs || item.tcsAmt || 0);
        const collected = parseFloat(item['5B'] || item.amtTcsDepo || item.tcsDeposited || 0);
        const deposited = parseFloat(item['6B'] || item.tcsDeposited || 0);
        result.partB.push({
          srNo: index + 1,
          tan: tan,
          name: name,
          debited: debited,
          collected: collected,
          deposited: deposited
        });
        result.summary.tcs += deposited;
      });
    }

    // 3. Map Part C (Tax Paid - Advance Tax / SAT) -> partctxt.detC
    if (tracesJson.partctxt && Array.isArray(tracesJson.partctxt.detC)) {
      tracesJson.partctxt.detC.forEach((item, index) => {
        const bsr = item.C11 || item.bsrCode || '';
        const date = item.C12 || item.depositDate || '';
        const challan = item.C13 || item.challanNo || '';
        const taxPaid = parseFloat(item.C10 || item.taxAmt || 0);
        result.partC.push({
          srNo: index + 1,
          bsr: bsr,
          date: date,
          challan: challan,
          taxPaid: taxPaid
        });
        result.summary.taxPaid += taxPaid;
      });
    }

    // 4. Map Part D (Refund / Demand) -> partdtxt.detD
    if (tracesJson.partdtxt && Array.isArray(tracesJson.partdtxt.detD)) {
      tracesJson.partdtxt.detD.forEach((item, index) => {
        const ayValue = item.D2 || item.assessmentYear || ay;
        const mode = item.D3 || item.modeOfRefund || 'Direct Deposit';
        const refund = parseFloat(item.D6 || item.refundAmt || 0);
        const interest = parseFloat(item.D7 || item.interest || 0);
        const date = item.D8 || item.date || '';
        result.partD.push({
          srNo: index + 1,
          ay: ayValue,
          mode: mode,
          refund: refund,
          interest: interest,
          date: date
        });
        result.summary.refund += refund;
      });
    }

    return result;
  }

  // ==========================================
  // REPORT EXPORTERS (JSON / PRINTABLE PDF)
  // ==========================================
  function downloadDatasetJSON(data) {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Form_26AS_${data.pan}_AY_${data.assessmentYear}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function printReportWindow(data) {
    const printWindow = window.open('', '_blank', 'width=900,height=800');
    
    // Style variables for report window based on light or dark modes
    const themeStyles = `
      body {
        font-family: 'Inter', sans-serif;
        color: #0f172a;
        background: #ffffff;
        padding: 40px;
        line-height: 1.5;
      }
      .header-report {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid #0f172a;
        padding-bottom: 20px;
        margin-bottom: 30px;
      }
      .title-report h1 {
        margin: 0;
        font-size: 24px;
        font-weight: 700;
        text-transform: uppercase;
      }
      .title-report p {
        margin: 4px 0 0 0;
        font-size: 14px;
        color: #64748b;
      }
      .meta-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 30px;
      }
      .meta-item {
        font-size: 14px;
      }
      .meta-item strong {
        color: #334155;
      }
      .summary-boxes {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 15px;
        margin-bottom: 40px;
      }
      .summary-box {
        border: 1px solid #cbd5e1;
        padding: 15px;
        border-radius: 6px;
        text-align: center;
      }
      .summary-box span {
        font-size: 11px;
        text-transform: uppercase;
        color: #64748b;
        font-weight: 600;
      }
      .summary-box div {
        font-size: 18px;
        font-weight: 700;
        margin-top: 6px;
        color: #0f172a;
      }
      h2.section-title {
        font-size: 16px;
        border-bottom: 1.5px solid #cbd5e1;
        padding-bottom: 8px;
        margin-bottom: 15px;
        margin-top: 30px;
      }
      table.data-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 25px;
        font-size: 12px;
      }
      table.data-table th {
        background: #f1f5f9;
        border-bottom: 1.5px solid #cbd5e1;
        padding: 10px;
        text-align: left;
        font-weight: 600;
      }
      table.data-table td {
        padding: 10px;
        border-bottom: 1px solid #e2e8f0;
      }
      table.data-table .num {
        text-align: right;
      }
      .footer-note {
        text-align: center;
        font-size: 11px;
        color: #94a3b8;
        margin-top: 60px;
        border-top: 1px solid #e2e8f0;
        padding-top: 15px;
      }
    `;

    // Part A table rows
    let partARows = '<tr><td colspan="6" style="text-align:center; color:#64748b;">No records</td></tr>';
    if (data.partA && data.partA.length > 0) {
      partARows = data.partA.map(r => `
        <tr>
          <td>${r.srNo}</td>
          <td><code>${r.tan}</code></td>
          <td>${r.name}</td>
          <td class="num">${formatCurrency(r.credited)}</td>
          <td class="num">${formatCurrency(r.deducted)}</td>
          <td class="num">${formatCurrency(r.deposited)}</td>
        </tr>
      `).join('');
    }

    // Part B table rows
    let partBRows = '<tr><td colspan="6" style="text-align:center; color:#64748b;">No records</td></tr>';
    if (data.partB && data.partB.length > 0) {
      partBRows = data.partB.map(r => `
        <tr>
          <td>${r.srNo}</td>
          <td><code>${r.tan}</code></td>
          <td>${r.name}</td>
          <td class="num">${formatCurrency(r.debited)}</td>
          <td class="num">${formatCurrency(r.collected)}</td>
          <td class="num">${formatCurrency(r.deposited)}</td>
        </tr>
      `).join('');
    }

    // Part C table rows
    let partCRows = '<tr><td colspan="5" style="text-align:center; color:#64748b;">No records</td></tr>';
    if (data.partC && data.partC.length > 0) {
      partCRows = data.partC.map(r => `
        <tr>
          <td>${r.srNo}</td>
          <td><code>${r.bsr}</code></td>
          <td>${r.date}</td>
          <td><code>${r.challan}</code></td>
          <td class="num">${formatCurrency(r.taxPaid)}</td>
        </tr>
      `).join('');
    }

    // Part D table rows
    let partDRows = '<tr><td colspan="6" style="text-align:center; color:#64748b;">No records</td></tr>';
    if (data.partD && data.partD.length > 0) {
      partDRows = data.partD.map(r => `
        <tr>
          <td>${r.srNo}</td>
          <td>${r.ay}</td>
          <td>${r.mode}</td>
          <td class="num">${formatCurrency(r.refund)}</td>
          <td class="num">${formatCurrency(r.interest)}</td>
          <td>${r.date}</td>
        </tr>
      `).join('');
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Form 26AS Tax Credit Statement - ${data.pan}</title>
        <style>${themeStyles}</style>
      </head>
      <body>
        <div class="header-report">
          <div class="title-report">
            <h1>Annual Tax Statement</h1>
            <p>Form 26AS (Section 203AA of the Income Tax Act, 1961)</p>
          </div>
          <div>
            <strong style="font-size: 18px; color: #1e3a8a;">TRACES Verification Portal</strong>
          </div>
        </div>

        <div class="meta-grid">
          <div class="meta-item"><strong>PAN of Assessee:</strong> ${data.pan}</div>
          <div class="meta-item"><strong>Assessment Year:</strong> ${data.assessmentYear}</div>
          <div class="meta-item"><strong>Financial Year:</strong> ${data.financialYear}</div>
          <div class="meta-item"><strong>Verification Date:</strong> ${new Date().toLocaleDateString('en-IN')}</div>
        </div>

        <div class="summary-boxes">
          <div class="summary-box">
            <span>Part A - Total TDS</span>
            <div>${formatCurrency(data.summary.tds)}</div>
          </div>
          <div class="summary-box">
            <span>Part B - Total TCS</span>
            <div>${formatCurrency(data.summary.tcs)}</div>
          </div>
          <div class="summary-box">
            <span>Part C - Tax Paid</span>
            <div>${formatCurrency(data.summary.taxPaid)}</div>
          </div>
          <div class="summary-box">
            <span>Part D - Refund</span>
            <div>${formatCurrency(data.summary.refund)}</div>
          </div>
        </div>

        <h2 class="section-title">Part A: Details of Tax Deducted at Source (TDS)</h2>
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 5%">Sr.</th>
              <th style="width: 15%">Deductor TAN</th>
              <th style="width: 40%">Name of Deductor</th>
              <th class="num" style="width: 13%">Amount Credited</th>
              <th class="num" style="width: 13%">Tax Deducted</th>
              <th class="num" style="width: 14%">Tax Deposited</th>
            </tr>
          </thead>
          <tbody>
            ${partARows}
          </tbody>
        </table>

        <h2 class="section-title">Part B: Details of Tax Collected at Source (TCS)</h2>
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 5%">Sr.</th>
              <th style="width: 15%">Collector TAN</th>
              <th style="width: 40%">Name of Collector</th>
              <th class="num" style="width: 13%">Amount Debited</th>
              <th class="num" style="width: 13%">Tax Collected</th>
              <th class="num" style="width: 14%">Tax Deposited</th>
            </tr>
          </thead>
          <tbody>
            ${partBRows}
          </tbody>
        </table>

        <h2 class="section-title">Part C: Details of Tax Paid (Advance Tax / Self-Assessment Tax)</h2>
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 5%">Sr.</th>
              <th style="width: 20%">BSR Code</th>
              <th style="width: 25%">Date of Deposit</th>
              <th style="width: 25%">Challan Serial No.</th>
              <th class="num" style="width: 25%">Tax Paid (₹)</th>
            </tr>
          </thead>
          <tbody>
            ${partCRows}
          </tbody>
        </table>

        <h2 class="section-title">Part D: Details of Tax Refunds (Refund Issued / Details)</h2>
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 5%">Sr.</th>
              <th style="width: 15%">AY</th>
              <th style="width: 20%">Mode</th>
              <th class="num" style="width: 20%">Refund Issued (₹)</th>
              <th class="num" style="width: 20%">Interest (₹)</th>
              <th style="width: 20%">Date of Payment</th>
            </tr>
          </thead>
          <tbody>
            ${partDRows}
          </tbody>
        </table>

        <div class="footer-note">
          This document is generated client-side from verified digital records retrieved from the e-Filing / TRACES central server.
          <br>Generated using the TRACES Gateway Automated Verification Tool on ${new Date().toLocaleString('en-IN')}.
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 500);
          }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  }


  // ==========================================
  // INITIALIZATION COMMAND
  // ==========================================
  initTheme();
  
  // Initialize pan input
  panInput.value = '';

  // Startup check on load / refresh: Show toast notification if extension is offline
  setTimeout(() => {
    checkExtension((isConnected) => {
      if (!isConnected) {
        showToast(
          "PDF Downloader Helper Offline",
          "Please load the helper extension in Developer Mode to download your Form 26AS as a PDF. Without it, PDF downloads will not work."
        );
      }
    });
  }, 600);

});
