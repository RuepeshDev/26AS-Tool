import { TracesApiClient } from './api-client.js';
import { download26ASPdf } from './pdf-generator.js';
import { recordExecutionStats } from './supabase.js';

document.addEventListener('DOMContentLoaded', () => {
    const btnStart = document.getElementById('btnStart');
    const btnClear = document.getElementById('btnClear');
    const btnClearLogs = document.getElementById('btnClearLogs');
    const panListInput = document.getElementById('panList');
    const assessmentYearInput = document.getElementById('assessmentYear');
    const logConsole = document.getElementById('logConsole');
    const progressBar = document.getElementById('progressBar');
    
    const statSuccess = document.getElementById('statSuccess');
    const statFailed = document.getElementById('statFailed');
    const statDisposed = document.getElementById('statDisposed');

    let successCount = 0;
    let failedCount = 0;
    let totalDisposedTime = 0;

    function appendLog(message) {
        const timestamp = new Date().toLocaleTimeString();
        logConsole.textContent += `\n[${timestamp}] ${message}`;
        logConsole.scrollTop = logConsole.scrollHeight;
    }

    async function checkForAppUpdates() {
        try {
            const { check } = await import('@tauri-apps/plugin-updater');
            const { relaunch } = await import('@tauri-apps/plugin-process');

            appendLog('Checking for application updates...');
            const update = await check();

            if (update?.available) {
                appendLog(`🚀 Update found: v${update.version}. Downloading update...`);
                await update.downloadAndInstall();
                appendLog('Update installed successfully. Relaunching application...');
                await relaunch();
            } else {
                appendLog('Application is up to date.');
            }
        } catch (err) {
            // Log fallback when running outside full Tauri environment or if updater URL is unconfigured
            appendLog(`[Auto-Updater Info] Check completed / deferred (${err?.message || err})`);
        }
    }

    checkForAppUpdates();

    function resetStats() {
        successCount = 0;
        failedCount = 0;
        totalDisposedTime = 0;
        statSuccess.textContent = '0';
        statFailed.textContent = '0';
        statDisposed.textContent = '0.0s';
        progressBar.style.width = '0%';
    }

    btnClearLogs.addEventListener('click', () => {
        logConsole.textContent = 'Console cleared.';
    });

    btnClear.addEventListener('click', () => {
        panListInput.value = '';
        resetStats();
        appendLog('Inputs reset.');
    });

    btnStart.addEventListener('click', async () => {
        const rawLines = panListInput.value.trim().split('\n').filter(line => line.trim() !== '');
        if (rawLines.length === 0) {
            alert('Please enter at least one PAN and Password entry.');
            return;
        }

        const entries = [];
        for (const line of rawLines) {
            const parts = line.split(',');
            if (parts.length >= 2) {
                entries.push({
                    pan: parts[0].trim(),
                    password: parts[1].trim()
                });
            }
        }

        if (entries.length === 0) {
            alert('Invalid format. Please provide lines in "PAN, Password" format.');
            return;
        }

        resetStats();
        btnStart.disabled = true;
        btnStart.textContent = '⏳ Processing...';
        appendLog(`Starting batch execution for ${entries.length} account(s)...`);

        const ay = assessmentYearInput.value;
        const sessionId = 'SESSION_' + Date.now();

        for (let i = 0; i < entries.length; i++) {
            const entry = entries[i];
            appendLog(`--- [${i + 1}/${entries.length}] Processing PAN: ${entry.pan} ---`);

            const client = new TracesApiClient(entry.pan, entry.password, ay, (msg) => appendLog(msg));
            const result = await client.runFullPipeline();

            totalDisposedTime += result.durationSeconds;

            if (result.status === 'success') {
                successCount++;
                statSuccess.textContent = successCount;
                appendLog(`[${entry.pan}] Downloading Form 26AS PDF...`);
                download26ASPdf(result.pan, result.ay, result.htmlContent);
            } else {
                failedCount++;
                statFailed.textContent = failedCount;
            }

            statDisposed.textContent = `${totalDisposedTime.toFixed(1)}s`;
            const progressPercent = Math.round(((i + 1) / entries.length) * 100);
            progressBar.style.width = `${progressPercent}%`;
        }

        appendLog('==============================================');
        appendLog(`Batch Completed: ${successCount} Successful, ${failedCount} Failed in ${totalDisposedTime.toFixed(1)}s.`);

        // Record metrics to Supabase setup module
        await recordExecutionStats({
            sessionId,
            totalSuccessful: successCount,
            totalFailed: failedCount,
            disposedTimeSeconds: parseFloat(totalDisposedTime.toFixed(2))
        });

        btnStart.disabled = false;
        btnStart.textContent = '▶ Start Bulk Retrieval';
    });
});
