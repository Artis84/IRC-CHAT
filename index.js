const express = require("express");
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", function (socket) {
    console.log("a user connected");
    socket.on("chat message info codeco", function (msgInfoCoDeco) {
        io.emit("chat message info codeco", "A user connected");
    });
    socket.on("disconnect", function () {
        console.log("user disconnected");
        socket.on("chat message info codeco", function (msgInfoCoDeco) {
            io.emit("chat message info codeco", "A user disconnected");
        });
    });
});

io.on("connection", function (socket) {
    socket.on("chat message", function (msg) {
        console.log("message: " + msg);
        io.emit("chat message", msg);
    });
});

http.listen(3000, function () {
    console.log("listening on *:3000");
});
