import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 }); // 8080 is just for the sake of example. Needs to be replaced with backend wala URL

let clients = [];

wss.on('connection', (ws) => {
  console.log('Client connected');
  clients.push(ws);

  ws.on('message', (message) => {
    console.log('Received:', message);
    // Broadcast the message to all other connected clients except the one who sent it
    for (let client of clients) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  });

  ws.on('close', () => {
    clients.pop(ws);
    console.log('Client disconnected');
  });
});
