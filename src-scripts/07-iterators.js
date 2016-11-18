(() => {
  const elements = document.querySelectorAll("*");

  for (let index in elements){
    const element = elements[index];
    console.log(element.tagName);
  }

  console.log("--------");
  
  for(let element of elements){
    console.log(element.tagName);
  }

  console.log("--------");

  const array = [1, 2, 3, 4, 5, 6];
  // Restituisce i valori
  for(let item of array){
    console.log(item);
  }

  // Restituisce gli indici
  for(let item in array){
    console.log(item);
  }

  console.log("--------");

  const iterable = {
    [Symbol.iterator](){
      let index = 0;

      // iterator:
      return { // ritorno un oggetto con un metodo speciale next()
        next(){
          index++;
          return { // ritorno un oggetto con 2 proprietà
            value: index * 5, // il valore ottenuto dalla for...of
            done: index > 5
          };
        }
      };
    }
  };

  for(let item of iterable){
    console.log(item);
  }

  console.log("--------");

  function generator(array){
    var nextIndex = 0;
    return { 
      next: function() {
        return nextIndex < array.length ? { value: array[nextIndex++], done: false} : {done: true};
      }
    };
  }

  for(let item in array){
    console.log(item);
  }
 
  console.log("--------");


  function objectEntries(obj) {
    let index = 0;
    let keys = Reflect.ownKeys(obj); // This gets both string and symbol keys.
    return { // The object returned is both an iterable and an iterator.
      [Symbol.iterator]() { return this; },
      next() {
        if (index === keys.length) return {done: true};
        let k = keys[index++], v = obj[k];
        return {value: [k, v]};
      }
    };
  }
 
  let obj = {name: "Lorenzo"};
  for (const [k, v] of objectEntries(obj)) {
    console.log(k, 'is', v);
  }

  console.log("--------");

  function* numbers(){
    yield 1;
    yield 2;
  }

  const gen = numbers();
  console.log(gen.next());
  console.log(gen.next());
  console.log(gen.next());

  console.log("--------");

  function* shopping(){
    const stuffFromStore = yield 'cash';
    console.log('heyla');
    return stuffFromStore; // in questo modo ho done a true
  }

  const shop = shopping();
  console.log(shop.next());
  console.log(shop.next('ps2'));

  console.log("--------");

  function* positions(){
    yield 'goalkeeper';
    yield 'defender';
    yield 'midfielder';
    yield 'forward';
  }

  const pos = positions();
  pos.next();
  pos.next();
  pos.next();
  pos.next();

  const playerPosition = [];
  for(let position of positions()){
    playerPosition.push(position);
  }
  console.log(playerPosition);

  console.log("--------");

  const devTeam = {
    teamLeader:'Lorenzo',developer:'Federico', tester:'Emiliano'};

  const scrumTeam = {
    size: 3,
    department: 'Dev',
    city: 'Rome',
    productOwner: 'Giuseppe',
    scumMaster: 'Lorenzo',
    manager: 'Giordano',
    devTeam: devTeam
  }

  function* teamIterator(team){
    yield team.productOwner;
    yield team.scumMaster;
    yield team.manager;
    const devTeamGenerator = devIterator(team.devTeam);
    yield* devTeamGenerator;
  }

  function* devIterator(team){
    yield team.teamLeader;
    yield team.developer;
    yield team.tester;
  }

  const names = [];
  for(let name of teamIterator(scrumTeam)){
    names.push(name);
  }

  console.log(names);


})();


( () => {

  console.log("--------");

  const devTeam = {
    teamLeader:'Lorenzo',developer:'Federico', tester:'Emiliano',
    /*
    [Symbol.iterator](){
      let index = 0;
      const props = Object.keys(this); //const that = this;
      return {
        next: () => {
          if(index < props.length) {
            return {value:this[props[index++]], done: false}
          }
          return { done:true}
        }
      }
      */
    [Symbol.iterator]: function* () {
      yield this.teamLeader;
      yield this.developer;
      yield this.tester;
    }
  };
  
  const scrumTeam = {
    size: 3,
    department: 'Dev',
    city: 'Rome',
    productOwner: 'Giuseppe',
    scumMaster: 'Lorenzo',
    manager: 'Giordano',
    devTeam: devTeam,
    [Symbol.iterator]: function* (){
      yield this.productOwner;
      yield this.scumMaster;
      yield this.manager;
      yield* this.devTeam;
    }
  }

  const names = [];
  for(let name of scrumTeam){
    names.push(name);
  }

  console.log(names);

})();