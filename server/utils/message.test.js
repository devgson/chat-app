const expect = require('expect');
const utils = require('./generateMessage');
const isString = require('./realString');

describe('generateMessage', () => {
  
  it('should generate message', () => {
    const message = utils.generateMessage('Admin','User joined');
    expect(message).toInclude({
      from : 'Admin',
      text : 'User joined',
    });
    expect(message.createdAt).toBeA('number');
  });

});

/*describe('generate Location Message', () => {

  it('should generate location message', () => {
    const location = utils.generateLocationMessage('Admin', 12, 13);
    expect(location.createdAt).toBeA('number');
    expect(location).toInclude({ from : 'Admin', url : `https://www.google.com/maps?q=12,13` })
  });

})*/

describe('String check', () => {

  it('should be a reject string with numbers', () => {
    const string = isString.realString(98);
    expect(string).toBe(false);
  });

  it('should reject string with only spaces', () => {
    const string = isString.realString('   ');
    expect(string).toBe(false);
  });

  it('should be a real string', () => {
    const string = isString.realString('node ');
    expect(string).toBeTruthy;
  });

})