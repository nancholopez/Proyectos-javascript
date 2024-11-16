//OBTENER PROMEDIOS
function getAverage(scores) {
    let total = 0;
    for (let score of scores){        
        total += score;
    }
    total = total / scores.length;
    return total;
}

console.log(getAverage([92, 88, 12, 77, 57, 100, 67, 38, 97, 89]));
console.log(getAverage([45, 87, 98, 100, 86, 94, 67, 88, 94, 95]));

//CALIFICACION CON LETRA
function getGrade(score) {
    let resultado = ""
    if (score === 100) {
        resultado = "A++";
    } else if (score >= 90 && score < 100) {
        resultado = "A";
    } else if (score >= 80 && score < 90) {
        resultado = "B";
    } else if (score >= 70 && score < 80) {
        resultado = "C";
    } else if (score >= 60 && score < 70) {
        resultado = "D";
    } else {
        resultado = "F";
    }
    return resultado;
}

console.log(getGrade(96));
console.log(getGrade(82));
console.log(getGrade(56));
console.log(getGrade(100));

//VERIFICAR SI PASA O NO
function hasPassingGrade(score) {
    //Verificación larga
    /*if (getGrade(score) === "F"){
      return false;
    } else {
      return true;
    }*/

    //Verificación corta
    return getGrade(score) != "F";
}

console.log(hasPassingGrade(100));
console.log(hasPassingGrade(53));
console.log(hasPassingGrade(87));

//ENVIO DE MENSAJE A ESTUDIANTES CON RESULTADOS
function studentMsg(totalScores, studentScore) {
    let promedio = getAverage(totalScores);
    let calificacion = getGrade(studentScore);

    if (calificacion != "F"){
        return 'Class average: ' + promedio + '. Your grade: ' + calificacion + '. You passed the course.';
    } else {
        return 'Class average: ' + promedio + '. Your grade: ' + calificacion + '. You failed the course.';
    }
}
console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37));
console.log(studentMsg([56, 23, 89, 42, 75, 11, 68, 34, 91, 19], 100));




//console.log(studentMsg([56, 45, 90, 90, 90, 100, 90, 85, 97, 89], 100));