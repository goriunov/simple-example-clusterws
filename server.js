const ClusterWS = require('clusterws');
const express = require('express');
const os = require('os');

const clusterws = new ClusterWS({
  // this line will run CPU number of child processes minus one process for broker you can put any number you want
  workers: os.cpus().length - 1,
  worker: Worker,
  port: 3000
});

function Worker() {
  const wss = this.wss;
  const server = this.server;

  // Use your library/framework as you usually do
  const app = express();
  app.use(express.static('public'));

  // Connect ClusterWS and your library/framework
  server.on('request', app);

  // Listen on WebSocket connection
  wss.on('connection', (socket) => {
    console.log('Socket connected');

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      socket = null;
    });

    socket.on('hello', (msg) => {
      console.log(msg);

      socket.send('back-hello', 'This is test from server');
    });
  });
}
