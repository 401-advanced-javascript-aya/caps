// set timeout function o and inside it we call our emmits
'use strict';
const events = require('./events');
require('./vendor');
require('./caps');

events.on('pickUp', (payload) => {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.orderId}`);
    events.emit('inTransit', payload);
  }, 1000);

  setTimeout(() => {
    console.log(` ${payload.orderId} is delivered`);
    events.emit('delivered', payload);
  }, 3000);


});