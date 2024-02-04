const resultado = document.querySelector(".show-result");
const punto = document.querySelector("#punto");
let calculo = "";
let numeros = [];
let cantSymbols = 1;

for (let i = 0; i < 10; i++) {
  numeros.push(document.querySelector(`#num-${i}`));
}

punto.addEventListener("click", (e) => {
  if (calculo.length < 15 && !(cantSymbols > 0)) {
    calculo += e.target.textContent;
    resultado.textContent = calculo;
    cantSymbols++;
  } else {
    error.classList.add("show");
    setTimeout(() => {
      error.classList.remove("show");
    }, 3000);
  }
});

numeros.forEach((n) => {
  n.addEventListener("click", (e) => {
    if (calculo.length < 15) {
      calculo += e.target.textContent;
      resultado.textContent = calculo;
      cantSymbols = 0;
    }
  });
});

const suma = document.querySelector("#suma");
const resta = document.querySelector("#resta");
const multi = document.querySelector("#multi");
const divi = document.querySelector("#divi");
const igual = document.querySelector("#igual");
igual.addEventListener("click", calcular);

const error = document.querySelector(".error");
const operaciones = [suma, resta, multi, divi];

operaciones.forEach((op) => {
  op.addEventListener("click", (e) => {
    if (calculo.length < 15 && !(cantSymbols > 0)) {
      calculo += e.target.textContent;
      resultado.textContent = calculo;
      cantSymbols++;
    } else {
      error.classList.add("show");
      setTimeout(() => {
        error.classList.remove("show");
      }, 3000);
    }
  });
});

const resetC = document.querySelector("#reset-c");
const resetCE = document.querySelector("#reset-ce");
resetC.addEventListener("click", resetResult);
resetCE.addEventListener("click", resetResult);

//Resetear el resultado
function resetResult() {
  resultado.textContent = "Resultado";
  calculo = "";
}

//Función que procesa todas las operaciones
function calcular() {
  let res = "";
  if (!(cantSymbols > 0)) {
    let numbers = [];
    let symbols = [];
    //Si existe alguna operacion
    if (isOperation()) {
      let cal = calculo.split("");
      let num = "";
      cal.forEach((c, i) => {
        if (Number.isInteger(parseInt(c))) {
          num += c;
        } else if (c === ".") {
          num += c;
        } else {
          numbers.push(num);
          num = "";
          symbols.push(c);
        }
        if (i === cal.length - 1) {
          numbers.push(num);
        }
      });

      while (numbers.length !== 1) {
        if (numbers.length > symbols.length) {
          switch (symbols[0]) {
            case "+":
              res = parseFloat(numbers[0]) + parseFloat(numbers[1]);
              numbers.shift();
              numbers.shift();
              symbols.shift();
              numbers.unshift(parseFloat(res));
              break;
            case "-":
              res = parseFloat(numbers[0]) - parseFloat(numbers[1]);
              numbers.shift();
              numbers.shift();
              symbols.shift();
              numbers.unshift(parseFloat(res));
              break;
            case "x":
              res = parseFloat(numbers[0]) * parseFloat(numbers[1]);
              numbers.shift();
              numbers.shift();
              symbols.shift();
              numbers.unshift(parseFloat(res));
              break;
            case "/":
              res = parseFloat(numbers[0]) / parseFloat(numbers[1]);
              numbers.shift();
              numbers.shift();
              symbols.shift();
              numbers.unshift(parseFloat(res));
              break;
            default:
              break;
          }
        } else {
          error.classList.add("show");
          setTimeout(() => {
            error.classList.remove("show");
          }, 3000);
        }
      }
      resultado.textContent = res;
      calculo = `${res}`;
    }
  }
}

function isOperation() {
  return calculo
    .split("")
    .some(
      (element) =>
        element === "+" || element === "-" || element === "x" || element === "/"
    );
}

const borrar = document.querySelector("#borrar");

borrar.addEventListener("click", () => {
  const end = calculo.length - 1;
  let arr = calculo.split("");
  calculo = arr.filter((e, i) => (i !== end ? e : "")).join("");
  if (calculo.length !== 0) {
    resultado.textContent = calculo;
  } else {
    resultado.textContent = "Resultado";
  }
});
