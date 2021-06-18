import Entity from './Entity.class';

class Ratification extends Entity {
  get contentID() {
    return this.data.contentID;
  }

  get classifierID() {
    return this.data.classifierID;
  }

  get userID() {
    return this.data.userID;
  }

  get classifier() {
    const { getEntityById } = this.accessors;
    return getEntityById(this.classifierID);
  }

  get user() {
    const { getEntityById } = this.accessors;
    return getEntityById(this.userID);
  }

  get multiplier() {
    return this.data.multiplier;
  }
};

export default Ratification;
