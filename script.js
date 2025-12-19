const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const lyricsDisplay = document.getElementById('lyrics-display');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

// FULL SYNCED LYRICS FOR "BLUE" - STARTING AT 19s
const lyrics = [
    { time: 0, text: "♪ (Guitar Intro) ♪" },
    { time: 19, text: "Your morning eyes, I could stare like watching stars" },
    { time: 26, text: "I could walk you by, and I'll tell without a thought" },
    { time: 33, text: "You'd be mine, would you mind if I took your hand tonight?" },
    { time: 41, text: "Know you're all that I want this life" },
    { time: 46, text: "I'll imagine we fell in love" },
    { time: 51, text: "I'll nap under moonlight skies with you" },
    { time: 56, text: "I think I'll picture us, you with the waves" },
    { time: 61, text: "The ocean's colors on your face" },
    { time: 66, text: "I'll leave my heart with your air" },
    { time: 71, text: "So let me fly with you" },
    { time: 76, text: "Will you be forever with me?" }
];

// Play/Pause Toggle
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = "⏸";
    } else {
        audio.pause();
        playBtn.innerHTML = "▶";
    }
});

// Update everything as song plays
audio.addEventListener('timeupdate', () => {
    // 1. Progress Bar
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.value = percent || 0;

    // 2. Timestamps (0:00)
    currentTimeEl.innerText = formatTime(audio.currentTime);
    if (audio.duration) durationEl.innerText = formatTime(audio.duration);

    // 3. Lyric Sync Logic with Glow Effect
    const currentLyric = lyrics.findLast(l => audio.currentTime >= l.time);
    
    if (currentLyric && lyricsDisplay.innerText !== `> ${currentLyric.text}`) {
        // Update Text
        lyricsDisplay.innerText = `> ${currentLyric.text}`;
        
        // Trigger Glow Effect
        lyricsDisplay.classList.add('lyric-glow');

        // Remove glow after 500ms to create a pulse
        setTimeout(() => {
            lyricsDisplay.classList.remove('lyric-glow');
        }, 500);
    }
});

// Seek functionality (Manual skipping)
progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// Helper: Seconds to 0:00 format
function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}