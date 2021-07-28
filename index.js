const PiCamera = require("pi-camera");

const myCameraPic = new PiCamera({
  mode: "photo",
  output: `/home/pi/image2.jpg`,
  width: 640,
  height: 480,
  nopreview: true,
});

const takePicture = () => {
  let camerInUse = false;
  if (camerInUse == false) {
    camerInUse = true;
    myCameraPic
      .snap()
      .then(() => {
        console.log("photo clicked");
        camerInUse = false;
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    console.log("camera in use..");
  }
};
4
takePicture();
