import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Connection to our fake server succesful!');

  wss.on('message', (data) => {
    console.log('Received audio buffer of: ', data.byteLength);
    setTimeout(() => {
      ws.send('hello');
    }, 500);
  });
});
