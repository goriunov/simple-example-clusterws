let socket = new ClusterWS({
  url: 'ws://localhost:3000'
});

socket.on('connect', () => {
  console.log('Socket connected');

  socket.send('hello', 'This is just a test');
});

socket.on('back-hello', (msg) => {
  console.log(msg);
});
