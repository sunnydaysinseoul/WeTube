const video = document.querySelector("video");
const videoController = document.getElementById("videoController");
const psBtn = videoController.querySelector("#playPauseBtn");
const volumeBtn = videoController.querySelector("#volume");
const volumeRange = videoController.querySelector("#volumeRange");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreen = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayAndStop = () => {
  if (video.paused) {
    video.play();
    psBtn.className = "fas fa-pause";
  } else {
    video.pause();
    psBtn.className = "fas fa-play";
  }
};

const handleMute = () => {
  if (video.muted) {
    video.muted = false;
    volumeRange.value = volumeValue;
    volumeBtn.className = "fas fa-volume-up";
  } else {
    video.muted = true;
    volumeRange.value = 0;
    volumeBtn.className = "fas fa-volume-mute";
  }
};
const formatTIme = (sec) => new Date(sec * 1000).toISOString().substr(11, 8);
const handleVolume = (event) => {
  const {
    target: { value }
  } = event;

  if (value == '0') {
    video.muted = true;
    volumeBtn.className = "fas fa-volume-mute";
    volumeValue = 0.5; //드래그로 mute했으면 unmute할 때 0.5로 세팅
  } else {
    volumeBtn.className = "fas fa-volume-up";
    video.volume = volumeValue = value;
  }
};

const handleLoadedMetadata = () => {
  var dur = Math.floor(video.duration);
  totalTime.innerText = formatTIme(dur);
  timeline.max = dur;
};
const handleTimeupdate = () => {
  var cur = Math.floor(video.currentTime);
  currentTime.innerText = formatTIme(cur);
  timeline.value = cur;
};
const handleTimelineChange = (event) => {
  const {
    target: { value }
  } = event;
  video.currentTime = value;
};
const handleFullscreen = () => {
  const full = document.fullscreenElement;
  if (full) {
    document.exitFullscreen();
    fullScreen.innerText = "Fullscreen";
  }
  videoContainer.requestFullscreen();
  fullScreen.innerText = "Exit Fullscreen";
};
const handleKeydown = (event) => {
  if (event.code === "Space") {
    if (video.paused) {
      video.play();
      psBtn.className = "fas fa-pause";
    } else {
      video.pause();
      psBtn.className = "fas fa-play";
    }
  } else if (event.keyCode === 70) {
    //F
    videoContainer.requestFullscreen();
  } else if (event.keyCode === 27) {
    //esc
    document.exitFullscreen();
  }
};
psBtn.addEventListener("click", handlePlayAndStop);
volumeBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolume);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeupdate);

timeline.addEventListener("input", handleTimelineChange);
fullScreen.addEventListener("click", handleFullscreen);

window.addEventListener("keydown", handleKeydown);
