

document.addEventListener('DOMContentLoaded', function() {
    // 1. Selecciona todos los botones (iconos) que abrirán/cerrarán los contenidos.
    // Usamos la clase 'open-content-btn' que añadimos a tus <a>.
    const openButtons = document.querySelectorAll('.open-content-btn');

    // 2. Selecciona todos los contenedores de contenido que deben aparecer como overlay.
    // Usamos la clase 'overlay-content'.
    const overlayContents = document.querySelectorAll('.overlay-content');

    // 3. Selecciona todos los botones de "Cerrar" dentro de los contenedores emergentes.
    const closeButtons = document.querySelectorAll('.close-content-btn');

    // 4. Añade un escuchador de eventos 'click' a cada botón (icono) de la barra de navegación.
    openButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Evita que el enlace # recargue la página.

            // Obtiene el ID del contenido que este botón debe controlar.
            // El 'data-target' del HTML es crucial aquí.
            const targetId = this.dataset.target;

            // Busca el contenedor de contenido específico por su ID.
            const targetContent = document.getElementById(targetId);

            // Verifica si el contenido objetivo ya está activo (visible).
            const isActive = targetContent.classList.contains('active');

            // Itera sobre TODOS los contenedores de contenido...
            overlayContents.forEach(content => {
                // ...y remueve la clase 'active' de cada uno.
                // Esto asegura que solo un contenido esté abierto a la vez.
                content.classList.remove('active');
            });

            // Si el contenido objetivo NO estaba activo (es decir, estaba oculto cuando se hizo clic),
            // entonces le añadimos la clase 'active' para mostrarlo.
            // Si SÍ estaba activo, al haber sido ocultado por el bucle anterior,
            // permanecerá oculto, logrando el efecto de alternancia (mostrar/ocultar con el mismo clic).
            if (!isActive) {
                targetContent.classList.add('active');
            }
        });
    });

    // 5. Añade un escuchador de eventos 'click' a cada botón de "Cerrar" dentro de los overlays.
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Cuando se hace clic en un botón de cerrar, busca el padre más cercano
            // que tenga la clase 'overlay-content' y le remueve la clase 'active'.
            this.closest('.overlay-content').classList.remove('active');
        });
    });

    // 6. Opcional: Cierra el overlay si se hace clic fuera del 'content-box' (en el fondo oscuro).
    overlayContents.forEach(overlay => {
        overlay.addEventListener('click', function(event) {
            // Verifica si el clic ocurrió directamente en el 'overlay'
            // y no en un elemento hijo dentro del 'content-box'.
            if (event.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });
});


document.querySelector("header").style.display = "flex";


 /* ---------------------------------------------------- */
    /* COMIENZO DEL JAVASCRIPT (ORIGINAL + MODIFICACIONES) */
    /* ---------------------------------------------------- */

    // Variable para guardar la ruta de la imagen seleccionada globalmente
    let imagenSeleccionadaURL = "";

    // Elementos del DOM para la galería y el carrito
    const galeriaDiv = document.getElementById("galeria-productos");
    const carritoDiv = document.getElementById("contenido-carrito");
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const imgCarrito = document.getElementById("img-carrito");
    const nombreInput = document.getElementById("nombre");
    const tallaSelect = document.getElementById("talla");
    const colorSelect = document.getElementById("color");
    const estiloSelect = document.getElementById("estilo");
    const tituloGaleria = document.getElementById("titulo-galeria");
    const tituloCarrito = document.getElementById("titulo-carrito");
    // Se actualiza la referencia al ID del div que ahora envuelve el botón
    const volverGaleriaWrapper = document.getElementById("volver-galeria-wrapper");

    /**
     * @function abrirModal
     * @description Abre el modal con la imagen que el usuario hizo clic.
     * Guarda la URL de la imagen seleccionada.
     * @param {string} src - La ruta de la imagen a mostrar en el modal.
     */
    function abrirModal(src) {
      imagenSeleccionadaURL = src; // Guarda la URL para usarla al agregar al carrito
      modalImg.src = src;
      modal.style.display = "flex"; // Usa flex para centrar el contenido
    }

    /**
     * @function cerrarModal
     * @description Cierra el modal de la imagen.
     */
    function cerrarModal() {
      modal.style.display = "none";
    }

    /**
     * @function agregarAlCarritoDesdeModal
     * @description Se activa desde el botón "Agregar al carrito" en el modal.
     * Guarda la imagen seleccionada en localStorage y redirige a la vista del carrito.
     * Muestra una alerta de confirmación.
     */
    function agregarAlCarritoDesdeModal() {
      if (imagenSeleccionadaURL) {
        localStorage.setItem("productoSeleccionado", imagenSeleccionadaURL); // Guarda la URL de la imagen
        // NOTA: No hay redirección a una nueva página 'carrito.html' aquí.
        // En su lugar, se cambia la visibilidad de los elementos en la misma página.
        cerrarModal(); // Cierra el modal
        mostrarCarrito(); // Muestra la vista del carrito
        alert("¡Producto agregado al carrito!"); // Alerta de confirmación
      } else {
        alert("Error: No se ha seleccionado ninguna imagen.");
      }
    }

    /**
     * @function mostrarCarrito
     * @description Muestra la sección del carrito y oculta la galería.
     * Carga la imagen y el nombre del usuario si están guardados.
     */
    function mostrarCarrito() {
      document.body.classList.add("carrito-activo"); // Agrega clase para controlar la visibilidad con CSS
      galeriaDiv.style.display = "none";
      tituloGaleria.style.display = "none";
      carritoDiv.style.display = "flex"; // Se asegura de que el carrito se muestre como flex
      tituloCarrito.style.display = "block";
      // Muestra el div que envuelve el botón "Volver a la Galería"
      volverGaleriaWrapper.style.display = "block";

      // Recuperar la imagen guardada para mostrarla en el carrito
      const imgGuardada = localStorage.getItem("productoSeleccionado");
      if (imgGuardada) {
        imgCarrito.src = imgGuardada;
        // Extrae el nombre del archivo de la ruta para alt, si es posible
        const fileName = imgGuardada.split('/').pop().split('.')[0];
        imgCarrito.alt = `Producto: ${fileName}`;
      } else {
        imgCarrito.alt = "No hay producto seleccionado.";
        imgCarrito.src = ""; // Asegurarse de que no haya una imagen anterior
      }

      // Cargar nombre guardado si existe (para conveniencia del usuario)
      const nombreGuardado = localStorage.getItem("nombreUsuario");
      if (nombreGuardado) {
        nombreInput.value = nombreGuardado;
      }
    }

    /**
     * @function mostrarGaleria
     * @description Muestra la sección de la galería y oculta el carrito.
     */
    function mostrarGaleria() {
      document.body.classList.remove("carrito-activo"); // Elimina la clase del body
      galeriaDiv.style.display = "grid"; // Vuelve a mostrar la galería como grid
      tituloGaleria.style.display = "block";
      carritoDiv.style.display = "none";
      tituloCarrito.style.display = "none";
      // Oculta el div que envuelve el botón "Volver a la Galería"
      volverGaleriaWrapper.style.display = "none";
    }


    /**
     * @function confirmarPedido
     * @description Recopila los datos del formulario de pedido, los valida
     * y los prepara para enviar por WhatsApp.
     * Muestra una alerta con el resumen del pedido y luego redirige a WhatsApp.
     */
    function confirmarPedido() {
      const nombre = nombreInput.value.trim();
      const talla = tallaSelect.value;
      const color = colorSelect.value;
      const estilo = estiloSelect.value;
      const imgProducto = localStorage.getItem("productoSeleccionado"); // La ruta de la imagen seleccionada

      // --- VALIDACIONES ---
      if (nombre === "") {
        alert("Por favor, ingresa tu nombre para el pedido.");
        nombreInput.focus(); // Enfoca el campo de nombre
        return;
      }

      if (!imgProducto) {
        alert("No hay un producto seleccionado para el pedido. Por favor, selecciona uno de la galería.");
        // Si no hay imagen, redirige a la galería para que seleccione una
        mostrarGaleria();
        return;
      }

      // Guarda el nombre del usuario para futuras visitas
      localStorage.setItem("nombreUsuario", nombre);

      // --- RESUMEN DEL PEDIDO EN ALERTA ---
      const mensajeAlerta = `¡Pedido Confirmado!\n\n` +
                            `Nombre: ${nombre}\n` +
                            `Producto: ${imgProducto.split('/').pop()}\n` + // Muestra solo el nombre del archivo de la imagen
                            `Talla: ${talla}\n` +
                            `Color: ${color}\n` +
                            `Estilo: ${estilo}\n\n` +
                            `Presiona "Aceptar" para continuar a WhatsApp y enviar tu pedido.`;

      alert(mensajeAlerta); // Muestra la alerta con el resumen

      // --- ENVÍO A WHATSAPP ---
      // El número de WhatsApp al que se enviará el mensaje
      const numeroWhatsApp = "+14084308346"; // <--- ¡REEMPLAZA ESTE NÚMERO CON EL TUYO!

      // Construye el mensaje para WhatsApp
      const mensajeWhatsApp = `Hola, mi nombre es ${nombre} y me gustaría realizar el siguiente pedido:\n` +
                             `*Producto:* ${imgProducto.split('/').pop()}\n` +
                             `*Talla:* ${talla}\n` +
                             `*Color:* ${color}\n` +
                             `*Estilo:* ${estilo}\n\n` +
                             `¡Gracias!`;

      // Codifica el mensaje para la URL
      const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajeWhatsApp)}`;

      // Abre la ventana de WhatsApp
      window.open(urlWhatsApp, "_blank");

      // Opcional: Limpiar el carrito después de confirmar el pedido
      // localStorage.removeItem("productoSeleccionado");
      // imgCarrito.src = "";
      // nombreInput.value = "";
    }

    // --- LÓGICA INICIAL AL CARGAR LA PÁGINA ---
    document.addEventListener("DOMContentLoaded", () => {
      // Por defecto, muestra la galería. Si el usuario llega al carrito directamente
      // (por ejemplo, recarga la página del carrito), la lógica de `mostrarCarrito`
      // se encargará de mostrarlo si `productoSeleccionado` está en localStorage.
      // Pero para una experiencia fluida, siempre empezamos mostrando la galería.
      mostrarGaleria();

      // Si hay un producto guardado en localStorage, podemos decidir si mostrar el carrito al cargar
      // Esto es útil si el usuario recargó la página estando en el carrito.
      if (localStorage.getItem("productoSeleccionado")) {
         // Si quieres que al recargar en la página se vea el carrito automáticamente:
         // mostrarCarrito();
         // Si quieres que siempre empiece en la galería, no hagas nada aquí.
      }
    });

    /* ---------------------------------------------------- */
    /* FIN DEL JAVASCRIPT */
    /* ---------------------------------------------------- */
