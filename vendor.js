'use strict';

// send fake order each five seconds
// we put our emmits inside the time interval (repeat itself each five seconds)

const events = require('./events')
const faker = require('faker');


function createOrder() {
    setInterval(()=> {
        let order = {
            storeName: faker.company.companyName(),
            orderId: faker.random.number(),
            customerName: faker.name.findName(),
            address: faker.address.streetAddress()
        };
        events.emit('pickup', order);
    }, 5000);
}
createOrder();

function thanksFuc() {
    console.log('Thank you!');
}

events.on('delivered', (payload) => thanksFuc(payload));