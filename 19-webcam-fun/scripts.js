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
        ctx.drawImage(video, 0, 0, width, height)
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
    link.textContent = 'Download Image';
    strip.insertBefore(link, strip.firstChild);

};

getVideo();
video.addEventListener('canplay', paintToCanvas);
// paintToCanvas();  why doesn't this call it but in browser window it works????