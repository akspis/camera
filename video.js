const PiCamera = require("pi-camera");

const myCameraVid = new PiCamera({
  mode: "video",
  output: `/home/pi/Videos/video1.h264`,
  width: 640,
  height: 480,
  timeout: 5000,
  nopreview: true,
});

const takeVideo = () => {
  console.log("Recording Started");
  var camerInUse = false;
  if (camerInUse == false) {
    camerInUse = true;
    myCameraVid
      .record()
      .then(() => {
        console.log("video recorded");
        camerInUse = true;
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    console.log("camera in use..");
  }
};

takeVideo();
