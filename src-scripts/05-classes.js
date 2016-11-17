(() =>{
const weakMap = new WeakMap();
const Persona = ( () =>{
    class Persona{
    
    constructor(name){
      
      const privateProps = {
        _name: name
      };
      weakMap.set(this, privateProps);
      //this._name = name;
    }

    get name(){
      // return this._name;
      return weakMap.get(this)._name;
    }

    set name(name){
      const privateProps = weakMap.get(this);
      privateProps._name = name;
      weakMap.set(this, privateProps);
    }

    greet(){
      console.log(`Hi my name is ${this.name}`);
    }
  };
  return Persona;
  })();

  const lorenzo = new Persona("Lorenzo");
  console.log(lorenzo._name);
  //lorenzo.name = "Pippo";
  //lorenzo.greet();
  
})();



(() =>{
  class Persona{
  
    constructor(name){
      this._name = name;
    }

    get name(){
      return this._name;
    }

    set name(name){
      // Eventuali validazioni
      this._name = name;
    }

    greet(){
      console.log(`Hi my name is ${this._name}`);
    }

    static loadPeople(){
      return[
        new Persona("person1"),
        new Persona("person2")
      ];
    }

  };

  const lorenzo = new Persona("Lorenzo");
  console.log('Nome:', lorenzo._name); // Posso accedere ai membri privati
  const [p1, p2] = Persona.loadPeople();
  p1.greet();
  p2.greet();
  //p1.loadPeople(); // ERRORE!

  class Admin extends Persona {
    constructor(name){
      super(name);
    }
    
    doAnAdminThing(){
      console.log("Doing admin thing");
    }
  }

  var admin1 = new Admin("adminnn");
  admin1.doAnAdminThing();
  admin1.greet();

})();

