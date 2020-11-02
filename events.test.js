'use stritc';
const events = require('./events');
let log = require('./caps');
let pickup = require('./driver');
let thanksFuc = require('./vendor');
let consoleSpy = jest.spyOn(console, 'log').mockImplementation();

describe('testing the events handlers', () => {
  let payload = {
    storeNamestoreName: 'stooore',
    orderIdorderId: 1254,
    addresscustomerName: 'khelda',
    phoneNumberaddress: '0795555555',
  };

  it('pickup: ', () => {
    events.emit('pickup', payload);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('inTransit:', () => {
    events.emit('in-transit', payload);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('log function', () => {
    let event = 'pickup';
    log(event, payload);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it(' thanks function in vendor', () => {
    thanksFuc(payload);
    expect(consoleSpy).toHaveBeenCalled();
  });
  it(' pickup function in driver', () => {
    pickup(payload);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it(' delivered', () => {
    events.emit('delivered', payload);
    expect(consoleSpy).toHaveBeenCalled();
  });



});