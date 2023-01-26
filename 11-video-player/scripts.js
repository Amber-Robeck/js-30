const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelector('[data-skip]');
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
video.addEventListener('click', togglePlay);