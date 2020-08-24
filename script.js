const player = document.querySelector('.player');
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');
const speed = document.querySelector('.player-speed');
// Play & Pause ----------------------------------- //
function pauseIcon(){
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','pause');
}


function togglePlay(){
    if(video.paused){
        video.play();
        playBtn.classList.replace('fa-play','fa-pause');
        playBtn.setAttribute('title','play');
    }else{
        video.pause();
        pauseIcon();
    }
}

// Progress Bar ---------------------------------- //
function displayTime(time){
    const minutes = Math.floor(time/60);
    let seconds = Math.floor(time%60);
    seconds = seconds>9?seconds:`0${seconds}`;
    return `${minutes}:${seconds}`;
}

function upgradeProgress(){
    progressBar.style.width =  `${video.currentTime/video.duration * 100}%`;
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    duration.textContent = `${displayTime(video.duration)}`;
    console.log(video.duration);
}

function setProgress(e){
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
}
// Volume Controls --------------------------- //
let lastVolume = 1;

function setVolume(e){
    let volume = e.offsetX / volumeRange.offsetWidth;
    volumeBar.style.width = `${volume * 100}%`;
    if(volume<0.1){
        volume=0;
    }
    if(volume>0.9){
        volume=1
    }
    video.volume = volume;
    volumeIcon.className = '';
    if(volume<0.1){
        volumeIcon.classList.add('fas','fa-volume-off');
    }else if(volume<0.7&&volume>0.1){
        volumeIcon.classList.add('fas','fa-volume-down');
    }else if(volume>0.7){
        volumeIcon.classList.add('fas','fa-volume-up');
    }
    lastVolume = video.volume;
}

function toggleMute(){
    volumeIcon.className = '';
    if(video.volume){
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.add('fas','fa-volume-mute');
        volumeIcon.setAttribute('title','unmute');

    }else{
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;
        lastVolume>=0.7?volumeIcon.classList.add('fas','fa-volume-up'):volumeIcon.classList.add('fas','fa-volume-down');
        volumeIcon.setAttribute('title','mute');
    }
}

// Change Playback Speed -------------------- //

function changeSpeed(){
    video.playbackRate = speed.value;
}


// Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }
  
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
  }

  let fullscreen = false;

  function toggleFullscreen(){
      if(!fullscreen){
          openFullscreen(player);
          video.classList.add('video-fullscreen');
      }else{
          closeFullscreen();
          video.classList.remove('video-fullscreen');
      }
      fullscreen = !fullscreen;
  }


playBtn.addEventListener('click',togglePlay);
video.addEventListener('click',togglePlay);
video.addEventListener('ended',pauseIcon);
video.addEventListener('timeupdate',upgradeProgress);
video.addEventListener('canplay',upgradeProgress);
progressRange.addEventListener('click',setProgress);
volumeRange.addEventListener('click',setVolume);
volumeIcon.addEventListener('click',toggleMute);
speed.addEventListener('change',changeSpeed);
fullscreenBtn.addEventListener('click',toggleFullscreen);