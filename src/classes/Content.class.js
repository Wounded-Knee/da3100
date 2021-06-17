import Entity from './Entity.class';
import {
  ENTITY_TYPE_CLASSIFIER,
  ENTITY_TYPE_RATIFICATION,
} from '../constants';

class Content extends Entity {
  get classifiers() {
    const {
      getEntities,
      getEntitiesByType,
    } = this.accessors;

    const classifiers = getEntitiesByType(ENTITY_TYPE_CLASSIFIER)
      .map(
        (classifier) => {
          const ratifications = getEntities().filter(
            ({ contentID, classifierID, type }) => (
              type === ENTITY_TYPE_RATIFICATION &&
              contentID === this.id &&
              classifierID === classifier.id
            )
          );
          const visible = ratifications.reduce(
            (visibility, { multiplier }, index) => visibility + multiplier,
            0
          );
          return {
            ...classifier.data,
            visible,
            ratifications,
          };
        }
      );
    return classifiers;
  }
};

export default Content;
