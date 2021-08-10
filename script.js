const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const maxVolumeBtn = document.getElementById('max-volume-btn');
const minVolumeBtn = document.getElementById('min-volume-btn');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const timeFull = document.getElementById('time-full');
const timeLeft = document.getElementById('time-left');
const sliderContainer = document.getElementById('slider_container');
const volumeSlider = document.getElementById('volume_slider');
const bgSelect = document.getElementById('bg-select');
const selectBtn = document.getElementById('select-btn');


function setBg(e) {
  const color = e.srcElement.getAttribute('data-color');

  function setBgStyle(gradient) {
    document.body.style.backgroundImage = gradient;
    selectBtn.style.backgroundImage = gradient;
    bgSelect.classList.remove('bg-select-show');
  }

  switch (color) {
    case "pink":
      setBgStyle("linear-gradient(0deg, rgba(247, 247, 247, 1) 23.8%, rgba(252, 221, 221, 1) 92%)");
      break;
    case "blue":
      setBgStyle("linear-gradient(315deg, #36096d 0%, #37d5d6 74%)");
      break;
    case "black":
      setBgStyle("linear-gradient(315deg, #000000 0%, #414141 74%)");
      break;
    case "yellow":
      setBgStyle("linear-gradient(315deg, #f39f86 0%, #f9d976 74%)");
      break;
    case "green":
      setBgStyle("linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(123,253,45,1) 100%)");
      break;
    default:
      bgSelect.classList.remove('bg-select-show');
  }
 
}


bgSelect.addEventListener('click', setBg);

selectBtn.addEventListener('click', () => {
  if(bgSelect.classList.contains('bg-select-show')){
    bgSelect.classList.remove('bg-select-show');
  } else {
    bgSelect.classList.add('bg-select-show');
  }
})

// Song titles
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of song
let songIndex = 0;

//Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

//Play song
function playSong() {
  musicContainer.classList.add('play');
  sliderContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

//Pause song
function pauseSong() {
    musicContainer.classList.remove('play');
    sliderContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
  
    audio.pause();
}

// Next song
function nextSong() {
  songIndex++;
  if(songIndex >= songs.length) {
    songIndex = 0;
  }
  
  loadSong(songs[songIndex]);
  playSong();
}

//Prev song
function prevSong() {
  songIndex--;
  if(songIndex < 0) {
    songIndex = songs.length-1;
  }
  
  loadSong(songs[songIndex]);
  playSong();
}

// Update progress bar
function updateProgress(e) {
  const {duration, currentTime} = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  //total width
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

//set time
function setTime(e) {
  const {duration, currentTime} = e.srcElement;
  if (!isNaN(duration)) {
    const totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    //if sec is less than 10 then add 0 before it
    if(totalSec < 10){ 
      totalSec = `0${totalSec}`;
    }
    timeFull.innerText = `${totalMin}:${totalSec}`;
  }

  const currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if(currentSec < 10){ 
    currentSec = `0${currentSec}`;
  }
  timeLeft.innerText = `${currentMin}:${currentSec}`;
}


//set volume
function setVolume() {
  // Set the volume according to the percentage of the volume slider set
  audio.volume = volumeSlider.value / 100;
  if (audio.volume > 0) {
    minVolumeBtn.querySelector('.fa').classList.remove('fa-volume-mute');
    minVolumeBtn.querySelector('.fa').classList.add('fa-volume-down');
  } else {
    minVolumeBtn.querySelector('.fa').classList.remove('fa-volume-down');
    minVolumeBtn.querySelector('.fa').classList.add('fa-volume-mute');
  }
}


//Event listeners

// Play
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  
  if(isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
nextBtn.addEventListener('click', nextSong);

prevBtn.addEventListener('click', prevSong);

// Progress bar
audio.addEventListener('timeupdate', updateProgress);

//Set time
audio.addEventListener('timeupdate', setTime);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

//Song ends
audio.addEventListener('ended', nextSong);

// Set volume
volumeSlider.addEventListener('change', setVolume);

maxVolumeBtn.addEventListener('click', () => {
  audio.volume = 1;
  volumeSlider.value = 100;
});

minVolumeBtn.addEventListener('click', () => {
  if(minVolumeBtn.querySelector('.fa').classList.contains('fa-volume-down')){
    minVolumeBtn.querySelector('.fa').classList.remove('fa-volume-down');
    minVolumeBtn.querySelector('.fa').classList.add('fa-volume-mute');
    audio.volume = 0;
  } else {
    setVolume()
  }
})
