const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreenButton = document.querySelector('.fullscreen');

function togglePlay() {
    //Version one
    // if (video.paused) {
    //     video.play();
    // } else {
    //     video.pause();
    // }
    //Version two
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    // Version three
    // video[video.paused ? 'play' : 'pause']();
};

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
};

function skip() {
    // console.log('skipped')
    video.currentTime += parseFloat(this.dataset.skip);
};

function handleRangeUpdate() {
    // console.log(this.value)
    video[this.name] = this.value;
};

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`
};

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
};

function fullscreen() {
    // console.log("clicked")
    // console.dir(video)
    // console.log(video.videoHeight, video.videoWidth)
    video.webkitRequestFullScreen();
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
//When clicked down and outside of bar was moving on mouse back in
progress.addEventListener('mouseout', () => mousedown = false);
fullscreenButton.addEventListener('click', fullscreen);

