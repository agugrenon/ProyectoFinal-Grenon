class Usuario {
  constructor(nombre, saldoInicial = 0) {
    this.nombre = nombre;
    this.saldo = saldoInicial;
    this.compras = [];
  }

  comprar(producto, precio) {
    if (this.saldo >= precio) {
      this.saldo -= precio;
      this.compras.push(producto);
      return true;
    }
    return false;
  }

  agregarSaldo(monto) {
    if (monto > 0) {
      this.saldo += monto;
    }
  }
}

let usuario = new Usuario("", 5000);
let productos = [];

// Recuperar datos de localStorage
const datosGuardados = localStorage.getItem("usuario");
if (datosGuardados) {
  const datos = JSON.parse(datosGuardados);
  usuario = new Usuario(datos.nombre, datos.saldo);
  usuario.compras = datos.compras;
  document.getElementById("nombre").value = usuario.nombre;
}

const inputNombre = document.getElementById("nombre");
const btnIniciar = document.getElementById("iniciar");

btnIniciar.addEventListener("click", () => {
  const nombre = inputNombre.value.trim();
  if (nombre === "") {
    Swal.fire({
      icon: "warning",
      title: "Campo vacío",
      text: "Por favor, ingresá tu nombre.",
      confirmButtonText: "Ok"
    });
    return;
  }

  usuario.nombre = nombre;

  Swal.fire({
    icon: "success",
    title: `¡Bienvenido, ${usuario.nombre}!`,
    text: "Ya podés comenzar a comprar.",
    timer: 2000,
    showConfirmButton: false
  });

  guardarEnLocalStorage();
  mostrarApp();
});

function mostrarApp() {
  const app = document.getElementById("app");

  fetch("productos.json")
    .then((res) => res.json())
    .then((data) => {
      productos = data;

      app.innerHTML = `
        <p id="bienvenida">Hola ${usuario.nombre}, bienvenido/a al simulador.</p>
        <div id="listaProductos"></div>
        <p id="mensaje"></p>
        <p id="saldo"></p>
        <div id="cargarSaldo">
          <label for="montoSaldo">Ingresar saldo:</label>
          <input type="number" id="montoSaldo" />
          <button id="btnCargarSaldo">Cargar saldo</button>
        </div>
      `;

      actualizarSaldo();

      const lista = document.getElementById("listaProductos");
      productos.forEach((prod) => {
        const div = document.createElement("div");
        div.innerHTML = `
          <p>
            Producto: <strong>${prod.nombre}</strong> - Precio: $${prod.precio}
            <button class="comprar" data-id="${prod.id}">Comprar</button>
          </p>
        `;
        lista.appendChild(div);
      });

      document.getElementById("btnCargarSaldo").addEventListener("click", () => {
        const monto = parseFloat(document.getElementById("montoSaldo").value);
        if (isNaN(monto) || monto <= 0) {
          alert("Ingresá un monto válido.");
          return;
        }
        usuario.agregarSaldo(monto);
        document.getElementById("mensaje").textContent = `Se cargaron $${monto}.`;
        actualizarSaldo();
        guardarEnLocalStorage();
      });

      lista.addEventListener("click", (e) => {
        if (e.target.classList.contains("comprar")) {
          const id = parseInt(e.target.getAttribute("data-id"));
          const producto = productos.find((p) => p.id === id);
          if (usuario.comprar(producto.nombre, producto.precio)) {
            document.getElementById("mensaje").textContent = `Compraste una ${producto.nombre}.`;
            actualizarSaldo();
            guardarEnLocalStorage();
          } else {
            document.getElementById("mensaje").textContent = `Saldo insuficiente para comprar ${producto.nombre}.`;
          }
        }
      });
    })
    .catch((error) => {
      document.getElementById("app").textContent = "Error al cargar los productos.";
      console.error("Fetch error:", error);
    });
}

function actualizarSaldo() {
  const saldoTexto = document.getElementById("saldo");
  if (saldoTexto) {
    saldoTexto.textContent = "Saldo actual: $" + usuario.saldo;
  }
}

function guardarEnLocalStorage() {
  localStorage.setItem("usuario", JSON.stringify(usuario));
}