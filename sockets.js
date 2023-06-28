const controller = require("./controllers/display.controller.js");

module.exports = server => {
    const db = require("./models");

    var corsOptions = {
        origin: "http://localhost:8080"
    };

    const io = require('socket.io')(server, {
        cors: corsOptions
    });

    io.of('/api/socket').on("connection", (socket) => {
        console.log("socket.io: User connected: ", socket.id);

        socket.on("disconnect", () => {
            console.log("socket.io: User disconnected: ", socket.id);
        });

        sendData();

        const stream = db.incident.watch();

        stream.on("change", () => {
            sendData();
        });

        const stream1 = db.shift.watch();

        stream1.on("change", () => {
            sendData();
        });
    });

    function sendData() {
        controller.getData().then(data => {
            io.of("/api/socket").emit("displayNewData", data);
        }).catch(error => {
            console.log(error)
        });
    };
};