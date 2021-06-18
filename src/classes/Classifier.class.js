import Entity from './Entity.class';
import { ENTITY_TYPE_RATIFICATION } from '../constants';

class Classifier extends Entity {
  set contextEntity(entity) {
    this._contextEntity = entity;
  }

  get contextEntity() {
    return this._contextEntity;
  }

  get visible() {
    return this.visibility > 0;
  }

  get visibility() {
    return this.ratifications.reduce(
      (visibility, { multiplier }, index) => visibility + multiplier,
      0
    );
  }

  getRatificationsByContent({ id }) {
    return this.ratifications.filter(
      ({ contentID }) => contentID === id
    );
  }

  get ratifications() {
    const { getEntities } = this.accessors;

    return getEntities().filter(
      ({ classifierID, type }) => (
        type === ENTITY_TYPE_RATIFICATION &&
        classifierID === this.id
      )
    );
  }

};

export default Classifier;
