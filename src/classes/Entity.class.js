class Entity {
  constructor(data, accessors) {
    this.data = data;
    this.accessors = accessors;
  }

  get id() {
    return this.data.id;
  }

  get type() {
    return this.data.type;
  }

  get date() {
    return this.data.date;
  }

  get text() {
    return this.data.text;
  }
};

export default Entity;
