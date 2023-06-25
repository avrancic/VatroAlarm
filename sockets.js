module.exports = server => {
    const db = require("./models");

    var corsOptions = {
        origin: "http://localhost:8080"
    };

    const io = require('socket.io')(server, {
        cors: corsOptions
    });

    io.of("/api/socket").on("connection", (socket) => {
        console.log("socket.io: User connected: ", socket.id);

        socket.on("disconnect", () => {
            console.log("socket.io: User disconnected: ", socket.id);
        });

        sendCanges();

        const stream = db.incident.watch();

        stream.on("change", (change) => {
            sendCanges();
        });
    });

    function sendCanges() {
        db.incident.find().populate('type').populate('vehicles').populate('shifts').populate('status')
            .then((value) => {
                io.of("/api/socket").emit("displayNewData", value);
            }).catch((error) => {
                console.log(error)
            });
    };
};