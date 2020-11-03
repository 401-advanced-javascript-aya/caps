'use strict';

// Start a socket.io server on a designated port
const io = require('socket.io')(4000);

// namespace called caps where all of our clients (vendors and drivers) will connect
const caps = io.of('/caps'); // localhost:4000/caps


//Each store will have it’s own “room” within that namespace
caps.on('connection', (socket) => {
  console.log('in time ', new Date().toLocaleTimeString(), socket.id, 'is Connected : ');

  let currentRoom = '';
  // Monitor the ‘join’ event.
  socket.on('join', (room) => {
    socket.join(room);
    currentRoom = room;
    console.log('{ currentRoom } ....', { currentRoom });

  });
  // seen by anyone connected to this app.
  // Monitor the correct general events
  //Broadcast the events and payload back out to the appropriate clients in the caps namespace
  socket.on('pickup', (payload) => {
    caps.emit('pickup', payload);
    broadcast('pickup', payload);

  });


  socket.on('in-transit', (payload) => {
    caps.emit('in-transit', payload);
    broadcast('in-transit', payload);

  });

  socket.on('delivered', (payload) => {
    caps.emit('delivered', payload);
    broadcast('delivered', payload);

  });

});

function broadcast(event, payload) {
  console.log('EVENT',{ event, time: new Date(), payload });
}

module.exports = caps;