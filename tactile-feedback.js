/**
 * KAIROS - Multi-Sensory Tactile Feedback Utilities
 * Low-latency synthesized Web Audio & Device Haptics
 */

// Synthesize a high-end luxury mechanical click (0ms latency, zero assets loaded)
function playTactileClick() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        
        const audioCtx = new AudioContext();
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        // Mechanical keyboard-like soft tone
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1000, audioCtx.currentTime); // High impact click
        osc.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + 0.05); // Rapid physical drop

        // Gain Envelope
        gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime); // Subtle volume to be polite
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05); // Decays instantly

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
    } catch (e) {
        console.warn("Web Audio Context not permitted or blocked by autoplay browser restrictions:", e);
    }
}

// Trigger subtle physical tap vibration on mobile screens
function triggerMobileHaptic() {
    if ('vibrate' in navigator) {
        navigator.vibrate(10); // Ultra-brief 10ms click impulse
    }
}

// Bind automatically to all interactive buttons, links, and summaries
document.addEventListener('DOMContentLoaded', () => {
    const interactives = document.querySelectorAll('button, a, summary, input[type="range"], input[type="checkbox"]');
    
    interactives.forEach(el => {
        el.addEventListener('click', () => {
            playTactileClick();
            triggerMobileHaptic();
        });
    });
});
