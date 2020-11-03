// // set timeout function o and inside it we call our emmits
// 'use strict';
// require('dotenv').config();
// const net = require('net');
// const client = new net.Socket();
// const HOST = process.env.HOST || 'localhost';
// const PORT = process.env.PORT || 3000;

// client.connect(PORT, HOST, () => {
//   console.log('Driver Connected');
//   client.on('data', (bufferData) => {

//     const dataObj = JSON.parse(bufferData);
//     if (dataObj.event === 'pickup') {

//       setTimeout(function () {
//         console.log(`picked up ${dataObj.payload.orderID}`);
//         const message = JSON.stringify({ event: 'in-transit', payload:dataObj.payload});
//         client.write(message);

//         setTimeout(function () {
//           console.log(`delivered up ${dataObj.payload.orderID}`);
//           const message = JSON.stringify({ event: 'delivered', payload:dataObj.payload});
//           client.write(message);
//         }, 3000);
//       }, 1000);
//     }
//   });
//   client.on('close', () => console.log('Connection closed!'));
//   client.on('error', (err) => console.log('Logger Error', err.message));
// });


'use strict';

const io = require('socket.io-client');

// Connects to the CAPS server as a socket.io client to the caps namespace
const caps = io.connect('http://localhost:4000/caps');

//Listen for the pickup event coming in from the CAPS server
caps.on('pickup', (payload) => {

  setTimeout(() => {
    console.log(`DRIVER : picked up ${payload.orderId}`);

    caps.emit('in-transit', payload);

  }, 1500);

  
  setTimeout(() => {
    console.log(`DRIVER : delivered ${payload.orderId}`);
    caps.emit('delivered', payload);
  }, 3000);

});
