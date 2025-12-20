// 1. FIREBASE CONFIGURATION
const firebaseConfig = {
  apiKey: "AIzaSyBwH-CchuO6Yn8pFKgj80UkioYaB8_g8zo",
  authDomain: "music-tracker-ec066.firebaseapp.com",
  databaseURL: "https://music-tracker-ec066-default-rtdb.firebaseio.com",
  projectId: "music-tracker-ec066",
  storageBucket: "music-tracker-ec066.firebasestorage.app",
  messagingSenderId: "137190880682",
  appId: "1:137190880682:web:6c524e9e83da148d0267d3",
  measurementId: "G-YDKNHEVRT7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// 2. PLAYER VARIABLES
const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const lyricsDisplay = document.getElementById('lyrics-display');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

// 3. LYRICS DATA
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

// 4. FIREBASE CLOUD TRACKER
async function trackViewer() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        const visitorInfo = {
            city: data.city,
            region: data.region,
            country: data.country_name,
            ip: data.ip,
            isp: data.org,
            time: new Date().toLocaleString(),
            device: navigator.userAgent
        };

        // Sine-save ang data sa iyong Firebase "Logbook"
        database.ref('viewers').push(visitorInfo);
        console.log("Viewer tracked to Firebase Cloud!");

    } catch (error) {
        console.log("Tracking error: Device might be using an AdBlocker.");
    }
}

trackViewer();

// 5. PLAYER CONTROLS
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