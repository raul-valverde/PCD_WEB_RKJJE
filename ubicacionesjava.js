// archivo: ubicacionesjava.js
(function () {
    function displayHorarioMessage() {
        const selectors = [
            '#horarios',
            '.horarios',
            'section#horarios',
            'section.horarios',
            '[data-section="horarios"]'
        ];
        const el = selectors.map(s => document.querySelector(s)).find(node => node) || null;
        if (!el) {
            console.warn('Sección de horarios no encontrada. Añade id="horarios" o class="horarios" en ubicaciones.html');
            return;
        }

        const hour = new Date().getHours(); // 0-23
        let mensaje = '';

        if (hour < 12) {
            mensaje = 'Abrimos a las 12:00 p.m.';
        } else if (hour < 20) {
            mensaje = 'Estamos abiertos, ¡ven por tu pollo asado!';
        } else {
            mensaje = 'Ya cerramos por hoy. ¡Te esperamos mañana!';
        }

        // Inserta el mensaje y marca para lectores de pantalla
        el.textContent = mensaje;
        el.setAttribute('aria-live', 'polite');
    }

    document.addEventListener('DOMContentLoaded', displayHorarioMessage);
    // Exporta por si se desea llamar manualmente desde otra parte
    window.displayHorarioMessage = displayHorarioMessage;
})();