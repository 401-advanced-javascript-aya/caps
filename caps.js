'use strict';

const events = require('./events');
require('./vendor');
require('./driver');


events.on('pickUp', (payload) => log('pickUp', payload));
events.on('inTransit', (payload) => log('inTransit', payload));
events.on('delivered', (payload) => log('delivered', payload));
function log(event, payload) {
  console.log({ event, time: new Date(), payload });
  console.log('proof of life');
}
