// Constantes de la app
const precioProducto = 3000;
const nombreProducto = "Campera";

// Variables iniciales
let saldo = 5000;
let usuario = {
  nombre: "",
  saldo: saldo,
  compras: []
};

// Recuperar datos si existen en localStorage
const datosGuardados = localStorage.getItem("usuario");
if (datosGuardados) {
  usuario = JSON.parse(datosGuardados);
  document.getElementById("nombre").value = usuario.nombre;
}

// DOM elements
const inputNombre = document.getElementById("nombre");
const btnIniciar = document.getElementById("iniciar");
const app = document.getElementById("app");
const bienvenida = document.getElementById("bienvenida");
const btnComprar = document.getElementById("comprar");
const mensaje = document.getElementById("mensaje");
const saldoTexto = document.getElementById("saldo");

// Mostrar saldo actualizado
function actualizarSaldo() {
  saldoTexto.textContent = "Saldo actual: $" + usuario.saldo;
}

// Guardar en localStorage
function guardarEnLocalStorage() {
  localStorage.setItem("usuario", JSON.stringify(usuario));
}

// Evento al hacer clic en "Iniciar"
btnIniciar.addEventListener("click", () => {
  const nombre = inputNombre.value.trim();
  if (nombre === "") {
    alert("Por favor, ingresá tu nombre.");
    return;
  }

  usuario.nombre = nombre;
  bienvenida.textContent = `Hola ${usuario.nombre}, bienvenido/a al simulador.`;
  app.style.display = "block";
  actualizarSaldo();
  guardarEnLocalStorage();
});

// Evento al hacer clic en "Comprar"
btnComprar.addEventListener("click", () => {
  if (usuario.saldo >= precioProducto) {
    usuario.saldo -= precioProducto;
    usuario.compras.push(nombreProducto);
    mensaje.textContent = `¡Compra realizada! Has comprado una ${nombreProducto}.`;
    actualizarSaldo();
    guardarEnLocalStorage();
    console.log("Compra exitosa:", nombreProducto);
  } else {
    mensaje.textContent = "No tenés suficiente saldo para comprar.";
    console.log("Saldo insuficiente.");
  }
});
