const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const lyricsDisplay = document.getElementById('lyrics-display');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

// 1. FINAL CALIBRATED LYRICS (Perfect Sync)
const lyrics = [
    { time: 0, text: "♪ (Guitar Intro) ♪" },
    { time: 19.2, text: "Your morning eyes, I could stare like watching stars" },
    { time: 26.5, text: "I could walk you by, and I'll tell without a thought" },
    { time: 32.8, text: "You'd be mine, would you mind if I took your hand tonight?" },
    { time: 40.2, text: "Know you're all that I want this life" },
    { time: 48.2, text: "I'll imagine we fell in love" },
    { time: 51.2, text: "I'll nap under moonlight skies with you" },
    { time: 54.4, text: "I think I'll picture us, you with the waves" },
    { time: 58.1, text: "The ocean's colors on your face" }, 
    { time: 62.0, text: "I'll leave my heart with your air" }, 
    { time: 65.3, text: "So let me fly with you" },
    { time: 67.5, text: "Will you be forever with me?" },
    { time: 106.5, text: "My love will always stay by you" },
    { time: 113.0, text: "I'll keep it safe, so don't you worry a thing" },
    { time: 118.2, text: "I'll tell you I love you more" },
    { time: 121.5, text: "It's stuck with you forever, so promise you won't let it go" },
    { time: 128.5, text: "I'll trust the universe will always bring me to you" },
    { time: 137.1, text: "I'll imagine we fell in love" },
    { time: 139.0, text: "I'll nap under moonlight skies with you" },
    { time: 143.2, text: "I think I'll picture us, you with the waves" },
    { time: 147.0, text: "The ocean's colors on your face" },
    { time: 151.0, text: "I'll leave my heart with your air" },
    { time: 155.0, text: "So let me fly with you" },
    { time: 158.5, text: "Will you be forever with me?" },
    { time: 169.0, text: "♪ (Outro) ♪" }
];

// 2. AUTOMATIC LOCATION TRACKER
async function trackViewer() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        // Ito ang lalabas sa Console mo (F12)
        console.log("New Viewer Detected:", {
            City: data.city,
            Region: data.region,
            Country: data.country_name,
            IP: data.ip,
            ISP: data.org, // Pakita rin ang gamit nilang internet (e.g. PLDT, Globe)
            Time: new Date().toLocaleString()
        });
    } catch (error) {
        console.log("Tracking error: Device might be using an AdBlocker.");
    }
}

trackViewer();

// 3. PLAYER CONTROLS
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = "⏸";
    } else {
        audio.pause();
        playBtn.innerHTML = "▶";
    }
});

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        progress.value = (audio.currentTime / audio.duration) * 100;
        durationEl.innerText = formatTime(audio.duration);
    }
    currentTimeEl.innerText = formatTime(audio.currentTime);

    const currentPos = audio.currentTime;
    let activeLyric = null;

    for (let i = 0; i < lyrics.length; i++) {
        if (currentPos >= lyrics[i].time) {
            activeLyric = lyrics[i];
        } else {
            break; 
        }
    }

    if (activeLyric && lyricsDisplay.getAttribute('data-time') !== activeLyric.time.toString()) {
        lyricsDisplay.innerText = `> ${activeLyric.text}`;
        lyricsDisplay.setAttribute('data-time', activeLyric.time);
        
        lyricsDisplay.classList.remove('lyric-glow');
        void lyricsDisplay.offsetWidth; 
        lyricsDisplay.classList.add('lyric-glow');
    }
});

progress.addEventListener('input', () => {
    if (audio.duration) {
        audio.currentTime = (progress.value / 100) * audio.duration;
    }
});

function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}