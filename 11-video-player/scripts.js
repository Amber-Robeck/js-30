const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

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
}


video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
