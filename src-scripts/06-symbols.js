( () => {

var foo1 = Symbol('foo');
var foo2 = Symbol('foo');
console.log(foo1); // -> Symbol(foo)
console.log(foo2); // -> Symbol(foo)
console.log(foo1 === foo2); // -> false

var fooSym = Symbol('foo');
var myObj = {};
myObj['foo'] = 'bar';
myObj[fooSym] = 'baz';
for (let prop in myObj) {
  console.log(prop); // -> foo
}
console.log(Object.keys(myObj)); // -> [ 'foo' ]
console.log(Object.getOwnPropertyNames(myObj)); // -> [ 'foo' ]
console.log(Object.getOwnPropertySymbols(myObj)); // -> [ Symbol(foo) ]

const mySymbol = Symbol("mySymbol1");
const person = {
  [mySymbol]: "blegh",
  render() {
    console.log(this[mySymbol]);
  }
};

person.render();
console.log(person.mySymbol);
})();

( () => {
  const _firstName = Symbol("First Name"),
    _lastName = Symbol("Last Name");

  class Person {
    get firstName() { return this[_firstName];}
    get lastName() { return this[_lastName];}

    constructor(firstName, lastName){
      this[_firstName] = firstName;
      this[_lastName] = lastName;
    }
  }

  const p = new Person("Lorenzo", "Franceschini");
  p[_firstName] = "Pippo"; // Come fregare il Symbol :)
  console.log(p.firstName);
})();