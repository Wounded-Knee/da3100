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
    const rating = this.getRatificationsByContent(this.contextEntity).reduce(
      (visibility, { multiplier }) => visibility + multiplier,
      0
    );
    //console.log(`The crowd ${rating > 0 ? 'believes' : 'doubts'} it is ${this.data.text} that ${this.contextEntity.data.text} (${rating})`);
    return rating;
  }

  getRatificationsByContent({ id }) {
    const { getEntityById } = this.accessors;
    return this.ratifications.filter(
      ({ contentID }) => contentID === id
    ).map(({ id }) => getEntityById(id));
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
