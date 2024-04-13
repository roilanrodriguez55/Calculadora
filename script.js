const resultado = document.querySelector(".show-result")
let num1 = "",
  num2 = "",
  operacion = ""
let numeros = []
let operaciones = []
let banderaNum = 0
let cantSymbols = 0
const error = document.querySelector(".error")
const reset = document.querySelector("#reset")
const igual = document.querySelector("#igual")
const punto = document.querySelector("#punto")
const borrar = document.querySelector("#borrar")
let calculos = []
const resetBtn = document.querySelector("#reset-historial")

// Cargar los botones con los numeros
for (let i = 0; i < 10; i++) {
  numeros.push(document.querySelector(`#num-${i}`))
}
// Cargar los componentes de las operaciones
for (let i = 0; i < 4; i++) {
  operaciones.push(document.querySelector(`#op-${i}`))
}

// Agregando el evento a cada numero
numeros.forEach(n => {
  n.addEventListener("click", e => {
    resultado.textContent = ""
    if ((banderaNum === 0 && cantSymbols === 0) || (banderaNum === 0 && cantSymbols === 1)) {
      if (num1.length < 8) {
        num1 += e.target.textContent
        resultado.textContent += num1
        console.log("simb-", cantSymbols);
        console.log("bandera-", banderaNum);
        return
      } else {
        resultado.textContent = num1
        mensajeError()
      }
    }

    if ((banderaNum === 1 && cantSymbols === 0) || (banderaNum === 1 && cantSymbols === 1)) {
      if (num2.length < 8) {
        num2 += e.target.textContent
        resultado.textContent += num2
        console.log("simb-", cantSymbols);
        console.log("bandera-", banderaNum);
        return
      } else {
        resultado.textContent = num2
        mensajeError()
      }
    }
  })
})

// Agregando el evento a las operaciones
operaciones.forEach(op => {
  op.addEventListener("click", e => {
    if ((banderaNum === 0 && cantSymbols === 0) || (banderaNum === 0 && cantSymbols === 1)) {
      // console.log("Entró aquí");
      operacion = e.target.textContent
      banderaNum = 1
      cantSymbols = 0
      console.log("simb-", cantSymbols);
      console.log("bandera-", banderaNum);
      return
    }
    if ((banderaNum === 1 && cantSymbols === 0) || (banderaNum === 1 && cantSymbols === 1)) {
      operacion = e.target.textContent
      console.log("simb-", cantSymbols);
      console.log("bandera-", banderaNum);
      return
    }
  })
})

// Evento del boton borrar
borrar.addEventListener("click", () => {
  if (banderaNum === 0) {
    if (num1.length <= 1) {
      num1 = ""
      resultado.textContent = "0.00"
    } else {
      let arr = num1.split("")
      num1 = arr.filter((n, i) => (i !== num1.length - 1 ? n : "")).join("")
      resultado.textContent = num1
    }
  } else {
    if (num2.length <= 1) {
      num2 = ""
      resultado.textContent = "0.00"
    } else {
      let arr = num2.split("")
      num2 = arr.filter((n, i) => (i !== num2.length - 1 ? n : "")).join("")
      resultado.textContent = num2
    }
  }
})

// Evento del boton punto
punto.addEventListener("click", e => {
  if (cantSymbols === 0) {
    if (banderaNum === 0) {
      if (num1.length < 8) {
        if (num1 === "") {
          num1 += "0"
        }
        num1 += e.target.textContent
        resultado.textContent = num1
        cantSymbols = 1
        console.log("simb-", cantSymbols);
        console.log("bandera-", banderaNum);
        return
      } else {
        mensajeError()
      }
    }

    if (banderaNum === 1) {
      if (num2.length < 8) {
        if (num2 === "") {
          num2 += "0"
        }
        num2 += e.target.textContent
        resultado.textContent = num2
        cantSymbols = 1
        console.log("simb-", cantSymbols);
        console.log("bandera-", banderaNum);
        return
      } else {
        mensajeError()
      }
    }
  }
})

// Evento del boton resetear
reset.addEventListener("click", () => {
  num1 = ""
  num2 = ""
  banderaNum = 0
  cantSymbols = 0
  resultado.textContent = "0.00"
})

// Evento del boton de igual
igual.addEventListener("click", () => {
  if (banderaNum === 1) {
    let numeroRedondeado
    switch (operacion) {
      case "+":
        numeroRedondeado = redondearNumero(parseFloat(num1) + parseFloat(num2))
        break
      case "-":
        numeroRedondeado = redondearNumero(parseFloat(num1) - parseFloat(num2))
        break
      case "x":
        numeroRedondeado = redondearNumero(parseFloat(num1) * parseFloat(num2))
        break
      case "/":
        if (parseFloat(num2) !== 0) {
          numeroRedondeado = redondearNumero(parseFloat(num1) / parseFloat(num2))
        } else {
          mensajeError("No se puede dividir por cero")
        }
        break
      default:
        break
    }
    if (!isNaN(numeroRedondeado)) {
      resultado.textContent = numeroRedondeado
      addHistorial(num1, num2, operacion, numeroRedondeado)
      num1 = `${numeroRedondeado}`
      num2 = ""
      cantSymbols = 0
      banderaNum = 1
    }
    console.log("simb-", cantSymbols);
    console.log("bandera-", banderaNum);
  } else {
    mensajeError()
  }
})

resetBtn.addEventListener('click', () => {
  calculos = []
  limpiarHistorial()
})

// Funcion que lanza un error en pantalla
function mensajeError(mensaje = "Error en estructura") {
  error.textContent = mensaje
  error.classList.add("show")
  setTimeout(() => {
    error.classList.remove("show")
  }, 3000)
}

// Funcion para redondear 1 numero a 2 sifras significativas
function redondearNumero(numero) {
  const factor = 10 ** 2
  return Math.round(numero * factor) / factor
}

// Funcion para adicionar la operacion al historial
function addHistorial(num1, num2, op, result) {
  const calculo = `${num1} ${op} ${num2} = ${result}`
  calculos.push(calculo)
  // Limpiar el historial para que no hayan repetidos
  limpiarHistorial()
  // Cargar todas las operaciones
  calculos.forEach(operacion => {
    const li = document.createElement("li")
    li.classList.add("item-historial")
    li.innerHTML = `${operacion}`
    historial.appendChild(li)
  })
}

// Funcion para limpiar el historial
function limpiarHistorial() {
  while (historial.firstChild) {
    historial.removeChild(historial.firstChild)
  }
}
