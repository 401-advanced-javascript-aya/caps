'use strict';

// send fake order each five seconds
// we put our emmits inside the time interval (repeat itself each five seconds)

const events = require('./events');
const faker = require('faker');
require('./caps');

function createOrder() {
  // console.log('lllllllllllllllllllllllllllllllllllllllllllll');
  setInterval(() => {
    let order = {
      storeName: faker.company.companyName(),
      orderId: faker.random.number(),
      customerName: faker.name.findName(),
      address: faker.address.streetAddress(),
    };
    // console.log('mmmmmmmmmmmmmmmmmmmmmmmm',order);
    events.emit('pickUp', order);
  }, 5000);
}
createOrder();

function thanksFuc() {
  console.log('Thank you!');
}

events.on('delivered', (payload) => thanksFuc(payload));