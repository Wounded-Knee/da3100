import Entity from './Entity.class';
import {
  ENTITY_TYPE_CLASSIFIER,
} from '../constants';

class Content extends Entity {
  get isTrue() {
    return this.data.isTrue;
  }

  get classifiersVisible() {
    return this.classifiers.filter(
      ({ visible }) => visible
    );
  }

  get classifiers() {
    const {
      getEntitiesByType,
    } = this.accessors;

    return getEntitiesByType(ENTITY_TYPE_CLASSIFIER)
      .map(
        (classifier) => {
          classifier.contextEntity = this;
          return classifier;
        }
      );
  }

  getClassifierById(findId) {
    return this.classifiers.find( ({ id: trialId }) => trialId === findId );
  }
};

export default Content;
