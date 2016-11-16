// Variables
( () => {
  // Mai fare la ridichiarazione delle variabili
  function func1(){
    var hey = 10;
    var hey = 20; // BAD PRACTICE!
    console.log(hey);
  }

  // Per prevenire ciò possiamo utilizzare LET
  function func1_let(){
    let test = 10;
    //let test = 20; // Non posso ridichiarare questa variabile. Ottengo un errore anche in Babel
  }
})();


( () => {

  function func1(){
    var hey = 10;
    // Dimostriamo che LET è una variabile il cui SCOPE è di BLOCCO
    if(true){
      let ok = "sure";
      console.log(ok);
    }

    if(true){
      let ok = "wow";
      console.log(ok);
    }
  }

  func1();

})();

//'*****CLASSICO PROBLEMA*********'
// Vediamo il problema della callback chiamata a fine ciclo e accede ad un valore della closure
( () => {
  for (var i = 0; i < 10; i++){
    setTimeout(function(){
      console.log(i); // Ottengo 10 volte il valore di i a fine ciclo for e cioè...9? NO! 10!
    }, 500);
  }
})();

//'*****SOLUZIONI AL CLASSICO PROBLEMA*********'
// Sistemiamo il codice precedente utilizzando un IIFE per creare uno SCOPE di Funzione:
( () => {
  for (var i = 0; i < 10; i++){
    ( j => {
      setTimeout(function(){
        console.log(j); 
      }, 500);
    })(i);
    
  }
})();

// Oppure creare una variabile func che è una funzione che accetta un valore (i)
( () => {
  for (var i = 0; i < 10; i++){
    var func = function(i) {
      setTimeout(function(){
        console.log(i); 
      }, 500);
    };
    func(i);
  }
})();

// Oppure posso correggere il codice con LET
( () => {
  for (let i = 0; i < 10; i++){
    setTimeout(function(){
      console.log(i); 
    }, 500);   
  }
})();

// Attenzione, anche mettendo a 0 il setTimeout, questa verrà risolta solo alla fine della for.
// Le console.log del setTimeout saranno invocate successivamente a qualsiasi altra istruzione
// che segue.
//-------------------------------------------

// Ricordati di fare attenzione all'HOISTING
console.log(notYetDefined); // undefined
var notYetDefined = 10;
// Se però usassi LET otterrei un warning
console.log(letNotDefined);
let letNotDefined = 10;

const thing = 10;
console.log(thing);
//thing = 20;

// MA POSSO cambiare le proprietà di un OGGETTO
const obj = {name:"Lorenzo"};
obj.name = "Federico";
console.log(obj);
//dd