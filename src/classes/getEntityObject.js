import Entity from './Entity.class';
import Content from './Content.class';
import Ratification from './Ratification.class';
import Classifier from './Classifier.class';
import User from './User.class';
import {
  ENTITY_TYPE_CONTENT,
  ENTITY_TYPE_RATIFICATION,
  ENTITY_TYPE_CLASSIFIER,
  ENTITY_TYPE_USER,
} from '../constants';

const getEntityObject = (entityData, accessors) => {
  const { type } = entityData;

  switch(type) {
    case ENTITY_TYPE_USER:
      return new User(entityData, accessors);

    case ENTITY_TYPE_CLASSIFIER:
      return new Classifier(entityData, accessors);

    case ENTITY_TYPE_CONTENT:
      return new Content(entityData, accessors);

    case ENTITY_TYPE_RATIFICATION:
      return new Ratification(entityData, accessors);

    default:
      return new Entity(entityData, accessors);
  }
}

export default getEntityObject;
