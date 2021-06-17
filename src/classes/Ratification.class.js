import Entity from './Entity.class';

class Ratification extends Entity {
  get contentID() {
    return this.data.contentID;
  }

  get classifierID() {
    return this.data.classifierID;
  }

  get multiplier() {
    return this.data.multiplier;
  }
};

export default Ratification;
