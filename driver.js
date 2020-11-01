// set timeout function o and inside it we call our emmits
'use strict';
const events = require('./events')
const vendor = require('./vendor')

events.on('pickup', (payload) => {
    setTimeout(() => {
        console.log(`DRIVER: picked up ${payload.orderId}`);
        events.emit('in-transit', payload);
      }, 1000);
    
      setTimeout(() => {
        console.log(` ${payload.orderId} is delivered`);
        events.emit('delivered', payload);
      }, 3000);
    

});