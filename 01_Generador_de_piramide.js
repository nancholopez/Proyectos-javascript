const character = "#";
const count = 8;
const rows = [];

function padRow(rowNumber, rowCount) {
  return "-".repeat(rowCount - rowNumber) + character.repeat(2 * rowNumber - 1) + "-".repeat(rowCount - rowNumber);
}

//Bucles para pirámide normal
/*for (let i = 1; i < count; i++) {
    rows.push(padRow(i, count));
  }*/

//let done = 0;
/*while (rows.length !== count) {
  //done++;
  rows.push(padRow(rows.length + 1, count)); //El + 1 en rows.length hace de incrementador en vez de utilizar variable done
}*/

//Bucle para pirámide invertida
/*for (let i = count; i > 0; i--){
  rows.push(padRow(i, count));
}*/

for (let i = 1; i < count; i++) {
  rows.unshift(padRow(i, count)); //forma rápida para hacerla invertida, se reemplaza push
}

//Impresión de pirámide
let result = ""
for (const row of rows) {
  result = result + "\n" + row;
}

console.log(result);


//OTROS EJERCICIOS CON MATRICES
const numbers = [1, 2, 3, 4];
const anadoPush = numbers.push(8);
console.log(numbers);
console.log(anadoPush);

const quitoPop = numbers.pop();
console.log(numbers);
console.log(quitoPop);

const anadoUnShift = numbers.unshift(9);
console.log(numbers);
console.log(anadoUnShift);

const quitoShift = numbers.shift();
console.log(numbers);
console.log(quitoShift);