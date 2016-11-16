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
      this._name = name;
    }

    greet(){
      console.log(`Hi my name is ${this._name}`);
    }
  };

  const lorenzo = new Persona("Lorenzo");
  console.log(lorenzo._name);
  //lorenzo.name = "Pippo";
  //lorenzo.greet();
  
})();