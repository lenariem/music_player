const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const timeFull = document.getElementById('time-full');
const timeLeft = document.getElementById('time-left');

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
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

//Pause song
function pauseSong() {
    musicContainer.classList.remove('play');
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
  
  //time
  //setTime(e);
}

// Set progress bar
function setProgress(e) {
  //total width
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
  
  //time
  //setTime(e);
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
