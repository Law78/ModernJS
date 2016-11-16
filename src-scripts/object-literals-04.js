(() => {
  function getPoint(){
    const x = 0,
      y = 0;

    // calcolo di x e y. Quando ho lo stesso nome è inutile scrivere così:
    // return {x: x, y: y};
    return {x, y};
  }

  console.log(getPoint());
  const firstName = "Lorenzo",
    person = {
      firstName,
      lastName: "Franceschini",

// Anzichè scrivere sayHello: function(){...}
      sayHello(){
        console.log(`${this.firstName} ${this.lastName}`);
      },

      get fullName(){
        return `${this.firstName} ${this.lastName}`;
      },

      set name(firstName){
        this.firstName = firstName;
      }
    };
  
  console.log(person.fullName);
  person.name = "Giordano";
  console.log(person.fullName);

  const thing = {
    prop1: "WHOA",
    // Posso scrivere delle proprietà computate inline, babel le traduce creando una funzione _defineProperty
    ["thing-" + "other"] : "blegh"
  };


})();

console.log('*********OBJECT PROPERTY NO PRIVATE**********');

// NO PRIVATE PROPERTY
( () => {

  const Persona = function Persona(name){
      this.name = name;
  };
  
  Persona.prototype.getName = function(){
    return this.name;
  };


  const obj = new Persona("Jhon");
  console.log(obj);
  console.log(obj.getName());
  console.log(obj.name);
  delete obj.name; // Cancello la proprietà
  console.log(obj);
  console.log(obj.getName());
  console.log(obj.name);
  const obj2 = new Persona("Jhonx");
  console.log(obj2.getName === obj.getName);

})();

console.log('*********HIDING PROPERTY WITH CLOSURE 1**********');

// HIDING PROPERTY WITH CLOSURE: lo svantaggio è che ogni istanza di Persona ho una istanza
// della funzione this.getName
( () => {

  const Persona = (function(){
    function Persona(name){
      this.getName = function(){
        return name;
      };
    }

    return Persona;
  })();

  const obj = new Persona("Jhon");
  console.log(obj);
  console.log(obj.getName());
  console.log(obj.name);
  delete obj.name;
  console.log(obj);
  console.log(obj.getName());
  console.log(obj.name); // undefined, name è privata
  const obj2 = new Persona("Jhonx");
  console.log(obj2.getName === obj.getName);
})();

console.log('*********HIDING PROPERTY WITH CLOSURE 2**********');
( () => {

  const Persona = (function(){
    function Persona(name){
      Persona.prototype.getName = () => {
        return name;
      };
    }

    return Persona;
  })();

  const obj = new Persona("Jhon");
  console.log(obj);
  console.log(obj.getName());
  console.log(obj.name);
  delete obj.name;
  console.log(obj);
  console.log(obj.getName());
  console.log(obj.name); // undefined, name è privata

  const obj2 = new Persona("Jhonx");
  console.log(obj2.getName === obj.getName);
})();

console.log('*********HIDING PROPERTY WITH SYMBOLS**********');
// HIDING PROPERTY WITH SYMBOLS: Ha lo svantaggio di non essere un vero e proprio sistema "privato",
// non sono molto supportati, aumenta la complessita.
( () => {

  const Persona = ( function(){
    const firstNameSymbol = Symbol(),
      lastNameSymbol = Symbol();
    function Persona(firstName, lastName){
      this[firstNameSymbol] = firstName;
      this[lastNameSymbol] = lastName;
    }

    Persona.prototype.greet = function(name){
      return `Hi ${name}`;
    };
  
    Object.defineProperty(Persona.prototype, "firstName", {
      get: function(){
        return this[firstNameSymbol];
      },
      set: function(name){
        this[firstNameSymbol] = name;
      }
    });

    Object.defineProperty(Persona.prototype, "lastName", {
      get: function(){
        return this[lastNameSymbol];
      }
    });

    return Persona;

  })();
  
  //obj = new Persona("Lorenzo", "Franceschini");
  
  //obj.firstName = "Pippo";
  //obj.lastName = "Baudo";
  //console.log(`${obj.firstName} ${obj.lastName}`);

  const obj = new Persona("Jhon", "Malcom");
  delete obj.name;
  console.log(obj);
  console.log(obj.firstName);
  console.log(obj.name); // undefined, name è privata

  const obj2 = new Persona("Jhonx");
  console.log(obj2.getName === obj.getName);
  

})();

// Una istanza di WEAKMAP è nascosta all'interno di una closure e indicizzata da una istanza
// di una Persona. Nella mappa ho oggetti che mantengono i dati privati. 
// myWeakMap.set(key, value);
// E' possibile farlo con la MAP ma con la WEAKMAP ho un riferimento alle mie istanze di tipo
// WEAK e pertanto possono essere prese dal GARBAGE COLLECTOR, cosa che non avviene con la MAP:
// const map = new Map();
console.log('*********HIDING PROPERTY WITH WEAKMAP**********');

( () => {

  const Persona = (function(){
    const weakmap = new WeakMap();
    function Persona(name){
      const privateProperties = {
        name
      };
      // definisco la chiave con this e il valore sarà un oggetto che rappresenta la property privata
      weakmap.set(this, privateProperties);
    }

    Persona.prototype.getName = function(){
      // recupero il valore con la chiave che è l'oggetto di invocazione
      return weakmap.get(this).name;
    };

    return Persona;

  })();

  const obj = new Persona("Jhon");
  console.log(obj);
  console.log(obj.getName());
  console.log(obj.name);
  delete obj.name;
  console.log(obj);
  console.log(obj.getName());
  console.log(obj.name); // undefined, name è privata

  const obj2 = new Persona("Jhonx");
  console.log(obj2.getName === obj.getName);

})();