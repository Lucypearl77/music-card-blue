const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const time = document.getElementById("time");

/* Play / Pause */
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
});

/* Update progress */
audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.value = percent || 0;

  const mins = Math.floor(audio.currentTime / 60);
  const secs = Math.floor(audio.currentTime % 60)
    .toString()
    .padStart(2, "0");

  time.textContent = `${mins}:${secs}`;
});

/* Seek audio */
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});
