import Entity from './Entity.class';
import Content from './Content.class';
import Ratification from './Ratification.class';
import {
  ENTITY_TYPE_CONTENT,
  ENTITY_TYPE_RATIFICATION,
} from '../constants';

const getEntityObject = (entityData, accessors) => {
  const { type } = entityData;

  switch(type) {
    case ENTITY_TYPE_CONTENT:
      return new Content(entityData, accessors);

    case ENTITY_TYPE_RATIFICATION:
      return new Ratification(entityData, accessors);

    default:
      return new Entity(entityData, accessors);
  }
}

export default getEntityObject;
