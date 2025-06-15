# Proyecto Final - Simulador de Billetera Virtual

## Autor: Grenon

---

## Descripción

Este proyecto es un simulador de billetera virtual que permite al usuario:

- Iniciar sesión ingresando su nombre.
- Visualizar y cargar saldo en su cuenta.
- Comprar productos simulados, descontando el saldo correspondiente.
- Guardar la información del usuario (nombre, saldo y compras) en el navegador usando `localStorage`.
- Interactuar con mensajes elegantes gracias a la integración de SweetAlert2.
- Utilizar datos simulados de productos a través de un archivo JSON.
- La interfaz es dinámica y generada parcialmente desde JavaScript.

---

## Funcionalidades

- **Ingreso de nombre** con validación y mensaje de bienvenida.
- **Carga de saldo** para aumentar el dinero disponible.
- **Simulación de compra** que resta el precio del producto y registra la compra.
- **Mensajes interactivos** que reemplazan alertas nativas para mejor UX.
- **Persistencia** de datos usando `localStorage`, manteniendo la sesión activa incluso tras cerrar el navegador.
- **Interfaz dinámica**, donde los productos y botones se generan mediante JavaScript.

---

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- SweetAlert2 (para mensajes emergentes)
- JSON (simulación de datos remotos)
- LocalStorage (para persistencia de datos en el navegador)

---

## Cómo usar

1. Clonar o descargar el repositorio.
2. Abrir el archivo `index.html` en cualquier navegador moderno.
3. Ingresar tu nombre en el campo indicado y presionar "Iniciar".
4. Visualizarás tu saldo inicial y las opciones para cargar saldo o comprar productos.
5. Interactuar con la aplicación realizando compras o cargando saldo.
6. Los datos se guardan automáticamente y se restauran al volver a abrir la página.

---

## Estructura del proyecto
