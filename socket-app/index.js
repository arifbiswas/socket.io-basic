const express = require("express");
const app = express();
const port = 3000;

const http = require("http");

const expressServer = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(expressServer);

const buyNsp = io.of("/buy");
buyNsp.on("connection", (socket) => {
  console.log("connected");
  buyNsp.emit("myBroadcast", "Hello Buy a product");

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

const saleNsp = io.of("/sale");
saleNsp.on("connection", (socket) => {
  saleNsp.emit("myBroadcast", "Hello Sale a product");

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

// io.on("connection", (socket) => {
//   console.log("Connection is stablish");

//   //   setInterval(() => {
//   //     const d = new Date();
//   //     const t = d.toLocaleTimeString();

//   //     socket.emit("myEvent", t);
//   //   }, 1000);

//   //   socket.on("message", (data) => {
//   //     console.log(data);
//   //   });
//   //   socket.on("myPost", (data) => {
//   //     console.log(data);
//   //   });

//   // broadcasting

//   io.sockets.emit("myBroadcast", "Hello EverOne ALl is Good");

//   socket.on("disconnect", () => {
//     console.log("Connection closed");
//   });
// });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
expressServer.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
