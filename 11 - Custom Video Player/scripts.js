//Get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//Build our functions
function togglePlay () {
  video[video.paused ? 'play' : 'pause']();
}

function updateButton () {
  toggle.textContent = this.paused ? '►' : '❚ ❚'; 
}

function skip () {
  console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}

function slide () {
  video[this.name] = this.value;
}

function handleProgress () { 
  progressBar.style.flexBasis = `${(video.currentTime / video.duration * 100)}%`;
}

function scrub (e) {
  console.log("hello");
  video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
}

//Hook up event listeners  
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(slider => slider.addEventListener('input', slide));

video.addEventListener('timeupdate', handleProgress); 

let mousedown = false;
progress.addEventListener('click', scrub); 
progress.addEventListener('mousemove', (e) => (mousedown && scrub(e)));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);