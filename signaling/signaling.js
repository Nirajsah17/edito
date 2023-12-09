const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { v4: uuid } = require('uuid');

const users = {};

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Connected');
  // Send a unique user ID to the connected client
  const id = uuid()
  ws.send(JSON.stringify({ key: 'user', user: id }));
  users[id] = ws;
  // Handle incoming messages
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    // Handle WebRTC signaling
    // switch (data.type) {
    //   case 'offer':
    //     wss.clients.forEach((client) => {
    //       if (client !== ws && client.readyState === WebSocket.OPEN) {
    //         client.send(JSON.stringify({ type: 'offer', offer: data.offer }));
    //       }
    //     });
    //     break;
    //   case 'answer':
    //     wss.clients.forEach((client) => {
    //       if (client !== ws && client.readyState === WebSocket.OPEN) {
    //         client.send(JSON.stringify({ type: 'answer', answer: data.answer }));
    //       }
    //     });
    //     break;
    //   case 'ice-candidate':
    //     wss.clients.forEach((client) => {
    //       if (client !== ws && client.readyState === WebSocket.OPEN) {
    //         client.send(JSON.stringify({ type: 'ice-candidate', candidate: data.candidate }));
    //       }
    //     });
    //     break;
    //   default:
    //     break;
    // }  
    const type = data.type;
    var remotePeer,localPeer,sdp = null;
    switch (type) {
      case 'offer':
        remotePeer = data.remotePeer;
        localPeer = data.localPeer;
        sdp = data.sdp;
        users[remotePeer].send(JSON.stringify({ key: 'offer', localPeer: localPeer, remotePeer: remotePeer, sdp: sdp }));
      case 'answer':
        remotePeer = data.remotePeer
        localPeer = data.localPeer
        sdp = data.sdp
        users[remotePeer].send(JSON.stringify({key:'answer', remotePeer,localPeer,sdp}));
    }
  });
  ws
});

server.listen(7000, () => {
  console.log('Server listening on *:7000');
});
