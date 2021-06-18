import Entity from './Entity.class';

class User extends Entity {
  get name() {
    return this.data.name;
  }

  get honesty() {
    return this.data.honesty;
  }
};

export default User;
