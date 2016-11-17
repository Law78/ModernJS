// Deconstructuring: estrarre valori da oggetti e array in una maniera compatta

( () => {
  
// Definisco una persona
  const person = {
    name : {first: "Lorenzo", last: "Franceschini"},
    roles: ["admin"],
    isActive: true
  }, 
    point = {x:1 , y:24};

// Posso passare anche valori di default nel destructuring
  function printPerson(person){
    const {roles, name: {first, last}, description = "not found"} = person;
    console.log(roles);
    console.log(first);
    console.log(description);
  }

  printPerson(person);

  function printPerson3({roles, name: {first, last}}){
    console.log(roles);
    console.log(first);
  }

  printPerson3(person);

  function translate({x, y}, amount){
    return typeof amount !== 'number' ? undefined : {x: x + amount, y: y + amount};
  }

  console.log(translate(point));

  const array = [1, 1, 1, 2, 2, 2, 1];
  const [firstNum, secondNum, thirdNum] = array;
  const [x, y, ... rest] = array;
  console.log(rest);

  function sum(array){
    if(!array.length)
      return 0;
    const [head, ...tail] = array;
    return head + sum(tail);
  }

  console.log(sum(array));

// Posso fare lo swapping
  let left = 10,
    right = 20;

  [left, right] = [right, left];
  console.log(left, right);


})();




