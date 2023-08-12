const express = require("express");
const app = express();
const port = 3000;

const http = require("http");

const { Server } = require("socket.io");

const expressServer = http.createServer(app);

const io = new Server(expressServer);

io.on("connection", (socket) => {
  console.log("connected to socket");

  socket.join("kitchen-room");
  const kitchenSize = io.sockets.adapter.rooms.get("kitchen-room").size;
  io.sockets
    .in("kitchen-room")
    .emit(
      "cooking",
      `Chicken rice is cooking for lunch and total ${kitchenSize}`
    );
  io.sockets.in("kitchen-room").emit("boiling", "water is boiling");

  socket.join("bed-room");
  io.sockets.in("bed-room").emit("sleep", "I am sleeping");
  io.sockets.in("bed-room").emit("rest", "I am taking rest");

  // socket.join("dining-room");

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
