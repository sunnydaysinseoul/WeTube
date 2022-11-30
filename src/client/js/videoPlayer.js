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

let controlsTimeout = null;
let controlsMovementTimeout = null;
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
    fullScreen.className = "fa-solid fa-compress";
  }
  videoContainer.requestFullscreen();
  fullScreen.className = "fa-solid fa-expand";
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

const handleEnded = async() =>{
  psBtn.className = "fas fa-play";
  const {id} = videoContainer.dataset;
  //views api로 요청보내기
  await fetch(`/api/videos/${id}/view`,{method:"POST"});
  //apiRouter.js에 있는 post url형태 ->필요한 video id는 template(watchVideo.pug)에서 data attribute(dataset)를 사용해 HTML에 저장해줌.
}

const hideControls = () => videoController.classList.remove("showing");
const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoController.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 1000);
};
psBtn.addEventListener("click", handlePlayAndStop);
volumeBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolume);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeupdate);
timeline.addEventListener("input", handleTimelineChange);
fullScreen.addEventListener("click", handleFullscreen);
window.addEventListener("keydown", handleKeydown);
video.addEventListener("ended",handleEnded); //ended는 video(HTMLMediaElement)에서만 쓸 수 있는 event
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);