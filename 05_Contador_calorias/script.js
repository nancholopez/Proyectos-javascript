const calorieCounter = document.getElementById("calorie-counter"); //Id del formulario <form>
const budgetNumberInput = document.getElementById("budget"); //Id del primer imput text
const entryDropdown = document.getElementById("entry-dropdown"); //Id del elemento de lista <select>
const addEntryButton = document.getElementById("add-entry"); //Id del botón Add Entry
const clearButton = document.getElementById("clear"); //Id del botón Clear
const output = document.getElementById("output"); //Id del DIV output
let isError = false;

function cleanInputString(str) {
    /*const regex = /\+-\s/; //esto buscará en una cadena literalmente el símbolo +, seguido de un símbolo - y seguido de un espacio, tabulador o salto de línea, resultado: "+- ". La barra invertida antes del + es para escaparlo debido a que tiene significado especial*/
    /*const regex = /[+-\s]/; //El + ya no necesita ser escapado debido al uso de la "clase de caracteres" [], con esto puede buscar individualmente uno de los caracteres. */
    /*const regex = /[+-\s]/g; o const helloRegex = /hello/g; //La g es un indicador que significa global, así continuará buscando el patrón después de encontrar una coincidencia */
    console.log("original string: ", str);

    const regex = /[+-\s]/g;
    return str.replace(regex, ""); //Aquí reemplazo los caracteres definidos en regex por un string vacío
}

console.log(cleanInputString("+-99")); //Resultado "99"

function isInvalidInput(str) {
    /*const regex = /e/i; //es para filtrar las notaciones exponenciales en la entrada numérica, ejemplo 1e10. Y la letra i es para que no distinga entre mayúsculas y minúsculas*/
    /*const regex = /[0-9]e[0-9]/i; //esto busca los números del 0 al 9 antes y después de la e*/
    /*const regex = /[0-9]+e[0-9]+/i; //esto buscara varios numeros del 0 al 9 que estén antes o después de la e*/
    const regex = /\d+e\d+/i; // lo que hace \d es practicamente la misma funcioón de la linea anterior, busca cualquier dígito del 0 al 9
    return str.match(regex); //retorna el resultado de la expresión regular en el string que se ponga en str
}

console.log("1e3");
console.log(isInvalidInput("1e3"));

function addEntry() {
    //const targetId = '#' + entryDropdown.value;
    //const targetInputContainer = document.querySelector(targetId + " .input-container");
    /*const targetInputContainer = document.querySelector(`${targetId} .input-container`); //esto genera el  mismo resultado de la línea anterior, se llama "template literals" con cmilla invertida (Alt+96) */
    const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`); //gracias a los literales de plantilla ya no es necesaria la variable targetId. Aquí selecciona el valor del valor escogido en la lista desplegable y el class del DIV repectivo.
    const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1; //esta linea selecciona todos los elementos tipo text de targetInputContainer, y devuelve una lista de esos elementos (NodeList). Y.length nos dice cuántos campos de entrada de texto hay
    const HTMLString = `<label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
    <input type="text" placeholder="Name" id="${entryDropdown.value}-${entryNumber}-name"></input>
    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input type="number" min="0" placeholder="Calories" id="${entryDropdown.value}-${entryNumber}-calories" />`;
    //targetInputContainer.innerHTML += HTMLString; //Así no puedo guardar ningún dato si vuelvo a presionar el botón Add Entry, con la siguiente línea sí se puede
    targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
    return HTMLString;
}

function getCaloriesFromInputs(list) {
    let calories = 0;
  
    for (const item of list) {
      const currVal = cleanInputString(item.value); //funcion
      const invalidInputMatch = isInvalidInput(currVal); //funcion
  
      if (invalidInputMatch) {
        alert(`Invalid Input: ${invalidInputMatch[0]}`);
        isError = true;
        return null;
      }

      calories += Number(currVal);
    }
    return calories;
  }

  function calculateCalories (e) {
    e.preventDefault(); //esta linea evita que la página se recargue, lo que permite manejar el envio del formulario con Javascript en lugar del comportamiento predeterminado del navegador
    isError = false;

    const breakfastNumberInputs = document.querySelectorAll('#breakfast input[type="number"]');
    const lunchNumberInputs = document.querySelectorAll('#lunch input[type="number"]');
    const dinnerNumberInputs = document.querySelectorAll('#dinner input[type="number"]');
    const snacksNumberInputs = document.querySelectorAll('#snacks input[type="number"]');
    const exerciseNumberInputs = document.querySelectorAll('#exercise input[type="number"]');

    const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs); //funcion
    const lunchCalories = getCaloriesFromInputs(lunchNumberInputs); //funcion
    const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs); //funcion
    const snacksCalories = getCaloriesFromInputs(snacksNumberInputs); //funcion
    const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs); //funcion

    const budgetCalories = getCaloriesFromInputs([budgetNumberInput]); //funcion

    if (isError){
        return;
    }

    const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;

    const remainingCalories = (budgetCalories - consumedCalories) +  exerciseCalories;

    const surplusOrDeficit = (remainingCalories < 0)? "Surplus" : "Deficit";

    output.innerHTML = `<span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
    <hr>
    <p>${budgetCalories} Calories Budgeted</p>
    <p>${consumedCalories} Calories Consumed</p>
    <p>${exerciseCalories} Calories Burned</p>`; //toLowerCase() convierte el texto a minúsculas. Math.abs() convierte un numero negativo a positivo o obtiene el valor absoluto.

    output.classList.remove("hide"); //Remueve la clase que se le indique
  }

  function clearForm(){
    const inputContainers = Array.from(document.querySelectorAll('.input-container')); //como querySelectorAll devuelve una NodeList similar a una matriz, utilizo el objeto Array.from que acepta la NodeList y devuelve una matriz.

    for (const container of inputContainers){
        container.innerHTML = "";
    }

    budgetNumberInput.value = "";

    output.innerText = ""; //Ajusta o devuelve el texto visible dentro de un elemento. En cambio innerHTML ajusta o devuelve el contenido HTML dentro de un elemento.

    output.classList.add("hide"); //Add hace lo contrario de remove, añade la clase hide que ya está definida en el css
  }

  //EJECUCION DE BOTONES
  addEntryButton.addEventListener("click", addEntry); //Ejecuta botón Add Entry

  calorieCounter.addEventListener("submit", calculateCalories); //aquí agregué el detector de eventos aprovechando que el botón que calcula calorías tiene el submit. Así que al presionar ese botón se ejecuta el código de la función calculateCalories()

  clearButton.addEventListener("click", clearForm);





