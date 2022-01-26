'use strict';
/**
 * Reflection question 1

 Hmmm. They go undefined if iterating over it, that is interpreted as false?
 This might be the prototype chain?
 If no property exists, it will evaluate until undefined
 */

const imported = require("./inventory.js");
//console.log(imported.inventory['Sallad']);

/*
console.log('Object.keys():')
let names = Object.keys(imported.inventory);
names
  .sort((a, b) => a.localeCompare(b, "sv", {sensitivity: 'case'}))
  .forEach(name => console.log(name));

console.log("-------------------------");

for (const name in imported.inventory) {
  console.log(name);
  console.log(imported.inventory[name]);
}
*/

/**
 * Reflection question 2

 Slide 60?

 Object keys only gets enumerable properties, but for looping seems to do the same?
 the for...in executes in a arbitrary order

 iteration order is insertion order for string keys and ascending for number-like keys

 Array indexes are just enumerable properties with integer names and are otherwise identical to general object properties.
 There is no guarantee that for...in will return the indexes in any particular order.
 The for...in loop statement will return all enumerable properties, including those with non–integer names and those that are inherited.

 You will not print inherited (prototype)

 */

console.log('\n--- Assignment 1 ---------------------------------------')

let makeOptions = (inv, part) => {
  return Object.keys(inv).filter(i => inv[i][part])
    .map(i => `<option value="${i}"> ${i}, ${inv[i]['price']} kr </option>`)
    .reduce((tot,curr) => tot + "\n" + curr);
}

console.log(makeOptions(imported.inventory, 'foundation'));

console.log('\n--- Assignment 2 ---------------------------------------')

class Salad{
  uuid;
  constructor(args){
    this.uuid = 'salad_' + Salad.instanceCounter++;
    this.ingredients = {};

    if (args instanceof Salad) {
      this.ingredients = args.ingredients
    }
    else if (typeof args === "string") {
      this.ingredients = JSON.parse(args).ingredients;
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

  static instanceCounter = 0;
}

Salad.prototype.getPrice = function() {
  return Object.values(this.ingredients).map(i => i['price']).reduce((tot,curr) => tot + curr);
};
Salad.prototype.count = function(property) {
  return Object.values(this.ingredients).filter(i => i[property]).length;
};
//Salad.prototype.instanceCounter = 0;



let myCaesarSalad = new Salad()
.add('Sallad', imported.inventory['Sallad'])
.add('Kycklingfilé', imported.inventory['Kycklingfilé'])
.add('Bacon', imported.inventory['Bacon'])
.add('Krutonger', imported.inventory['Krutonger'])
.add('Parmesan', imported.inventory['Parmesan'])
.add('Ceasardressing', imported.inventory['Ceasardressing'])
.add('Gurka', imported.inventory['Gurka']);
console.log(JSON.stringify(myCaesarSalad) + '\n');
myCaesarSalad.remove('Gurka');
console.log(JSON.stringify(myCaesarSalad) + '\n');

//let myNewSalad = new Salad(JSON.stringify(myCaesarSalad));
//console.log(JSON.stringify(myNewSalad) + '\n');

console.log('\n--- Assignment 3 ---------------------------------------')


console.log('En ceasarsallad kostar ' + myCaesarSalad.getPrice() + 'kr');
// En ceasarsallad kostar 45kr
console.log('En ceasarsallad har ' + myCaesarSalad.count('extra') + ' tillbehör');
// En ceasarsallad har 3 tillbehör

// reflection question 3

console.log('typeof Salad: ' + typeof Salad);
console.log('typeof Salad.prototype: ' + typeof Salad.prototype);
console.log('typeof Salad.prototype.prototype: ' + typeof Salad.prototype.prototype);
console.log('typeof myCaesarSalad: ' + typeof myCaesarSalad);
console.log('typeof myCaesarSalad.prototype: ' + typeof myCaesarSalad.prototype);
console.log('check 1: ' + (Salad.prototype === Object.getPrototypeOf(myCaesarSalad)));
console.log('check 2: ' + (Object.prototype === Object.getPrototypeOf(Salad.prototype)));


console.log('\n--- Assignment 4 ---------------------------------------')

class GourmetSalad extends Salad {
  constructor(args){
    super(args);
  }

  add(name, properties, size) {

    let oldSize = this.ingredients[name] ? this.ingredients[name].size : 0;
    let newSize = size ? oldSize + size : oldSize + 1;

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
/*
GourmetSalad.prototype.count = function(property) {
  //Should this react to amounts??
  return Object.values(this.ingredients).filter(i => i[property]).length;
};*/

let myGourmetSalad = new GourmetSalad()
.add('Sallad', imported.inventory['Sallad'], 0.5)
.add('Kycklingfilé', imported.inventory['Kycklingfilé'], 2)
.add('Bacon', imported.inventory['Bacon'], 0.5)
.add('Krutonger', imported.inventory['Krutonger'])
.add('Parmesan', imported.inventory['Parmesan'], 2)
.add('Ceasardressing', imported.inventory['Ceasardressing']);
console.log('Min gourmetsallad med lite bacon kostar ' + myGourmetSalad.getPrice() + ' kr');
myGourmetSalad.add('Bacon', imported.inventory['Bacon'], 1)
console.log('Med extra bacon kostar den ' + myGourmetSalad.getPrice() + ' kr');
console.log()

console.log('\n--- Assignment 5 ---------------------------------------')
console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);

/**
 * Reflection question 4
 The Salad class has the property
 */
/**
 * Reflection question 5
  Object.defineProperty() to set writable=false, or Object.freeze().
 */
/**
 * Reflection question 6
  hashtag makes variable private
 */
