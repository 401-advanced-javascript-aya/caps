'use strict';
require('dotenv').config();
const faker = require('faker');
const io = require('socket.io-client');
// Connects to the CAPS server as a socket.io client to the caps namespace
const caps = io.connect('http://localhost:4000/caps');

// Continue to declare your store id using .env
const storeName = process.env.STORE_NAME || 'myStore';

// Each vendor will have their own “room” so that they only get their own delivery notifications
// Emit a join event to the caps namespace connection, with the payload being your store code
caps.emit('join', (storeName));


// Every .5 seconds, simulate a new customer order
function createOrder() {
  setInterval(() => {

    let order = {
      storeName: storeName,
      orderId: faker.random.number(),
      customer: faker.name.findName(),
      address: faker.address.streetAddress(),
    };
    caps.emit('pickup', order);


  }, 5000); // this for simulate a new customer order every 5 seconds
}

createOrder();


caps.on('delivered', (payload) => {

  console.log(`VENDOR:  thank you for delivering ${payload.orderId}`);

});