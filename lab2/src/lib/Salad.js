import { v4 as uuidv4 } from 'uuid';

class Salad{
  uuid;

  constructor(args){
    this.uuid = uuidv4();
    this.ingredients = {};

    if (args instanceof Salad) {
      this.ingredients = args.ingredients
    }
    else if (typeof args === "string") {
      this.ingredients = JSON.parse(args).ingredients;
      this.uuid = JSON.parse(args).uuid;
    }
  }

  add(name, properties) {
    this.ingredients[name] = properties;
    return this;
  }

  remove(name) {
    delete this.ingredients[name];
    return this;
  }

}

Salad.prototype.getPrice = function() {
  return Object.values(this.ingredients).reduce((tot,curr) => tot + curr.price, 0);
};
Salad.prototype.count = function(property) {
  return Object.values(this.ingredients).filter(i => i[property]).length;
};

/*
class GourmetSalad extends Salad {
  constructor(args){
    super(args);
  }

  add(name, properties, size = 1) {

    let newSize = this.ingredients[name] ? this.ingredients[name].size + size : size;

    let propsWithSize = {
      ...properties,
      size: newSize
    }

    return super.add(name, propsWithSize);
  }

  remove(name) {
    return super.remove(name)
  }
}

GourmetSalad.prototype.getPrice = function() {
  return Object.values(this.ingredients).map(i => i['price'] * i['size']).reduce((tot,curr) => tot + curr);
};

GourmetSalad.prototype.count = function(property) {
  //Should this react to amounts??
  //return Object.values(this.ingredients).filter(i => i[property]).length;
  return Object.values(this.ingredients).map(i => i['size']).reduce((tot,curr) => tot + curr);
};*/

export default Salad;