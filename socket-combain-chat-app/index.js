const express = require("express");
const app = express();
const port = 3000;

const http = require("http");

const { Server } = require("socket.io");

const expressServer = http.createServer(app);

const io = new Server(expressServer);

io.on("connection", (socket) => {
  console.log("connected to socket");

  socket.on("message", (message) => {
    // console.log(message);

    io.emit("message_transferrer", message);
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

expressServer.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
