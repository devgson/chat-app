class User {
  constructor () {
    this.users =[];
  }

  addUser (id, name, room) {
    var user = { id ,name, room };
    this.users.push(user);
    return user;
  }

  removeUser (id) {
    var user = this.getUser(id);
    if( user ){
      this.users = this.users.filter( user => user.id !== id )
    }
    return user;
  }

  getUser (id) {
    return this.users.filter( user => user.id === id )[0];
  }

  getUsername (name, room) {
    var user =  this.getUserList(room);
    return user.filter( user => user === name ).length > 0;
  }

  getActiveRooms () {
    var newObj = [];
    var user = this.users.map( user => {
      if( newObj.includes(user.room) ) return;
      return newObj.push(user.room); 
    });
    return newObj;
  }

  getUserList (room) {
    var users = this.users.filter( user => user.room === room );
    return users.map( user => user.name );
  }
}

//var user = new User();

module.exports = { User };