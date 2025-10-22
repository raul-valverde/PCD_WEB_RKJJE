// ubicacionesjava.js
(function () {
    // Devuelve el mensaje según la hora actual
    function getMensajePorHora(fecha = new Date()) {
        const hora = fecha.getHours();
        if (hora < 12) return 'Abrimos a las 12:00 p.m.';
        if (hora >= 12 && hora < 20) return 'Estamos abiertos, ¡ven por tu pollo asado!';
        return 'Ya cerramos por hoy. ¡Te esperamos mañana!';
    }

    // Inserta o actualiza el mensaje en la sección de horarios de ubicaciones.html
    function mostrarMensajeHorarios() {
        // Busca un contenedor común para "horarios": id, clase o atributo data
        const selector = '#horarios, .horarios, [data-horarios]';
        const contenedor = document.querySelector(selector);
        if (!contenedor) return; // nada que hacer si no existe la sección

        // Reutiliza un párrafo con clase 'mensaje-horario' si ya existe, si no lo crea
        let p = contenedor.querySelector('.mensaje-horario');
        if (!p) {
            p = document.createElement('p');
            p.className = 'mensaje-horario';
            contenedor.appendChild(p);
        }
        p.textContent = getMensajePorHora();
    }

    // Ejecutar cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', mostrarMensajeHorarios);

    // Exponer la función globalmente por si se desea actualizar manualmente
    window.mostrarMensajeHorarios = mostrarMensajeHorarios;
})();