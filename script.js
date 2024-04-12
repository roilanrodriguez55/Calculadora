// Aqui va la nueva solucion que le voy a hacer en la logica
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
    if (
      (banderaNum === 0 && cantSymbols === 0) ||
      (banderaNum === 0 && cantSymbols === 1)
    ) {
      if (num1.length < 8) {
        num1 += e.target.textContent
        resultado.textContent += num1
      } else {
        resultado.textContent = num1
        mensajeError()
      }
    }

    if (
      (banderaNum === 1 && cantSymbols === 1) ||
      (banderaNum === 1 && cantSymbols === 0)
    ) {
      if (num2.length < 8) {
        num2 += e.target.textContent
        resultado.textContent += num2
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
    if (
      (cantSymbols === 0 && banderaNum === 0) ||
      (cantSymbols === 1 && banderaNum === 0)
    ) {
      operacion = e.target.textContent
      banderaNum = 1
    }

    if (
      (cantSymbols === 0 && banderaNum === 1) ||
      (cantSymbols === 1 && banderaNum === 1)
    ) {
      operacion = e.target.textContent
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
  if (cantSymbols === 0 && banderaNum === 0) {
    if (num1.length < 8) {
      if (num1 === "") {
        num1 += "0"
      }
      num1 += e.target.textContent
      resultado.textContent = num1
      cantSymbols = 1
    } else {
      mensajeError()
    }
  }

  if (cantSymbols === 1 && banderaNum === 1) {
    if (num2.length < 8) {
      if (num2 === "") {
        num2 += "0"
      }
      num2 += e.target.textContent
      resultado.textContent = num2
      cantSymbols = 0
    } else {
      mensajeError()
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
  if (banderaNum === 1 && (cantSymbols === 0 || cantSymbols === 1)) {
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
        numeroRedondeado = redondearNumero(parseFloat(num1) / parseFloat(num2))
        break
      default:
        break
    }
    if (!isNaN(numeroRedondeado)) {
      resultado.textContent = numeroRedondeado
      num1 = `${numeroRedondeado}`
      num2 = ""
      cantSymbols = 1
      banderaNum = 1
    }
  } else {
    mensajeError()
  }
})

// Funcion que lanza un error en pantalla
function mensajeError() {
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
