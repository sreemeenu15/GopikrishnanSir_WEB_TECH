// 1. Data Structure: Store activities
let activityLog = [];
const CLICK_THRESHOLD = 5; // Max clicks allowed in 2 seconds
const logDisplay = document.getElementById('log-display');
const warningBanner = document.getElementById('suspicious-warning');

// 2. Track Activities (Clicks, Keypresses, Focus)
function logActivity(type, target, phase) {
    const entry = {
        timestamp: new Date().toLocaleTimeString(),
        type: type,
        target: target,
        phase: phase
    };
    
    activityLog.push(entry);
    updateDOM(entry);
    checkSuspiciousActivity();
}

// 3. Using Bubbling (false) and Capturing (true)
// Capturing: Monitor focus changes globally
window.addEventListener('focus', (e) => logActivity('Focus', e.target.tagName, 'Capturing'), true);
window.addEventListener('blur', (e) => logActivity('Blur', e.target.tagName, 'Capturing'), true);

// Bubbling: Monitor clicks and key presses
window.addEventListener('click', (e) => logActivity('Click', e.target.id || e.target.tagName, 'Bubbling'), false);
window.addEventListener('keydown', (e) => logActivity('Keydown', e.key, 'Bubbling'), false);

// 4. Dynamically update the DOM
function updateDOM(entry) {
    const div = document.createElement('div');
    div.className = 'log-entry';
    div.innerHTML = `
        <span><strong>${entry.type}</strong> on ${entry.target} (${entry.phase})</span>
        <span style="color: #94a3b8">${entry.timestamp}</span>
    `;
    logDisplay.prepend(div); // Newest on top
}

// 5. Threshold Validation (Suspicious Activity)
function checkSuspiciousActivity() {
    const now = Date.now();
    // Filter clicks that happened in the last 2 seconds
    const recentClicks = activityLog.filter(log => 
        log.type === 'Click' && 
        (new Date().toLocaleTimeString() === log.timestamp)
    );

    if (recentClicks.length > CLICK_THRESHOLD) {
        warningBanner.style.display = 'block';
        setTimeout(() => warningBanner.style.display = 'none', 3000);
    }
}

// 6. Reset and Export
function resetLogs() {
    activityLog = [];
    logDisplay.innerHTML = '';
    warningBanner.style.display = 'none';
}

function exportLogs() {
    if (activityLog.length === 0) return alert("No logs to export!");
    
    const textContent = activityLog
        .map(log => `[${log.timestamp}] ${log.type.toUpperCase()} | Target: ${log.target} | Phase: ${log.phase}`)
        .join('\n');
    
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'activity_log.txt';
    a.click();
}