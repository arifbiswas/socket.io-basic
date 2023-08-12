const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

const http = require("http");

const expressServer = http.createServer(app);

const io = require("socket.io")(expressServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connection is stablish");

  socket.on("message", (data) => {
    console.log(data);
    io.sockets.emit("showMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("Connection closed");
  });
});

app.get("/", (req, res) => {
  res.send("Hello world");
});
expressServer.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
