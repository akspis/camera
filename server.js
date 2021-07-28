const express = require("express");
const raspividStream = require("raspivid-stream");

const app = express();
const wss = require("express-ws")(app);

// app.get("/", (req, res) => res.json({ message: "Running" }));

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

app.ws("/video", (ws, req) => {
  console.log("Client connected");

  const clientCount = wss.getWss().clients.size;
  console.log("Total clients >>> ", clientCount);

  ws.send(
    JSON.stringify({
      action: "init",
      width: "960",
      height: "540",
    })
  );

  var videoStream = raspividStream({ rotation: 180 });

  videoStream.on("data", (data) => {
    ws.send(data, { binary: true }, (error) => {
      if (error) console.error(error);
    });
  });

  ws.on("close", () => {
    console.log("Client left");

    const clientCount = wss.getWss().clients.size;
    console.log("Total clients >>> ", clientCount);

    videoStream.removeAllListeners("data");
  });
});

app.use(function (err, req, res, next) {
  console.error(err);
  next(err);
});

app.listen(3001, () => console.log("Server started on 3001"));
