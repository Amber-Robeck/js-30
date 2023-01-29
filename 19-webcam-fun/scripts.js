const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
            // console.log(localMediaStream);
            // localMediaStream = new MediaStream();
            // video.src = localMediaStream;
            // window.URL.createObjectURL(localMediaStream);
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err => {
            console.error("didn't agree", err);
        });
};

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    // console.dir(video)
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height);
        // pixels = redEffect(pixels);
        // pixels = rgbSplit(pixels);
        pixels = greenScreen(pixels);
        // ctx.globalAlpha = 0.1;
        ctx.putImageData(pixels, 0, 0);
    }, 16);
};

function takePhoto() {
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL('image/jpeg');
    // console.log(data);
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'newPicture');
    link.innerHTML = `<img src="${data}" alt="newPic"/>`
    strip.insertBefore(link, strip.firstChild);

};
function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 200; // red
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // green
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5;   //blue
    };
    return pixels;
};

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0]; // red
        pixels.data[i + 500] = pixels.data[i + 1]; // green
        pixels.data[i - 550] = pixels.data[i + 2]; // blue
    };
    return pixels;
};

function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });
    console.log(levels)

    for (i = 0; i < pixels.data.length; i = i + 4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];

        if (red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) {
            // take it out number 4 is alpha making it trasparent
            pixels.data[i + 3] = 0;
        }
    }

    return pixels;
};

getVideo();
video.addEventListener('canplay', paintToCanvas);
// paintToCanvas();  why doesn't this call it but in browser window it works????