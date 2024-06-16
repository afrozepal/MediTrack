// websocketServer.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let clients = {};

wss.on('connection', (ws, req) => {
    const userId = req.url.split('/')[1]; // Assuming the userId is passed in the URL
    clients[userId] = ws;

    ws.on('close', () => {
        delete clients[userId];
    });
});

const notifyClient = (userId, message) => {
    if (clients[userId]) {
        clients[userId].send(JSON.stringify(message));
    }
};

// Call this function when homework is assigned
const onHomeworkAssigned = (userId, homeworkDetails) => {
    notifyClient(userId, { type: 'homeworkAssigned', message: 'New homework assigned!', details: homeworkDetails });
};

module.exports = { onHomeworkAssigned };
