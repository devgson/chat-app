const expect = require('expect');
const { User } = require('./users.js');
console.log( typeof User );
describe('User test', () => {
  var users;
  beforeEach('create User', () => {
    users = new User();
    users.users = [{
      id : '1',
      name : 'Godson',
      room : 'Node Course'
    },{
      id : '2',
      name : 'John',
      room : 'Vue Course'
    },{
      id : '3',
      name : 'Seyi',
      room : 'Node Course'
    }];
  });

  it('should create a new user', () => {
    var users = new User();
    var user = {
      id : '1',
      name : 'Godson',
      room : 'Node Course'
    };
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  })

  it('should find User', () => {
    var resUser = users.getUser('1');
    expect(resUser.id).toEqual('1');
  });

  it('should not find User', () => {
    var resUser = users.getUser('4');
    expect(resUser).toNotExist();
  });

  it('should check that username exists', () => {
    var resUser = users.getUsername('Godson','Node Course');
    expect(resUser).toExist();
  });

  it('should check that username does not exist', () => {
    var resUser = users.getUsername('Me','Node Course');
    expect(resUser).toNotExist();
  });

  it('should remove user', () => {
    var resUser = users.removeUser('1');
    expect(resUser.id).toEqual('1');
  })

  it('should not remove user', () => {
    var resUser = users.removeUser('5');
    expect(resUser).toNotExist();
  })

  it('should get list of users for Node course', () => {
    var resUsers = users.getUserList('Node Course');
    expect(resUsers).toEqual(['Godson','Seyi']);
  })

  it('should get list of users for React course', () => {
    var resUsers = users.getUserList('Vue Course');
    expect(resUsers).toEqual(['John']);
  })

  it('should get all active rooms', () => {
    var resUsers = users.getActiveRooms();
    expect(resUsers).toEqual(['Node Course','Vue Course'])
  });

});