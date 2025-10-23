document.addEventListener("DOMContentLoaded", function() {
    // 1. Selecciona todos los elementos que quieres animar (ej. todas las tarjetas de menú)
    const elementosAnimar = document.querySelectorAll('.item-menu');

    // 2. Define las opciones del observador
    const opciones = {
        root: null, // Usa el viewport (la ventana del navegador) como área de detección
        rootMargin: '0px',
        threshold: 0.2 // Cuando el 20% del elemento esté visible, ejecuta la función
    };

    // 3. Define la función que se ejecuta cuando el elemento entra en la vista
    const observadorCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // El elemento es visible, ¡haz que aparezca!
                entry.target.classList.add('aparecer');
                
                // Deja de observarlo para que la animación solo se ejecute una vez
                observer.unobserve(entry.target);
            }
        });
    };

    // 4. Crea el Intersection Observer
    const observer = new IntersectionObserver(observadorCallback, opciones);

    // 5. Asigna el observador a cada elemento
    elementosAnimar.forEach(elemento => {
        observer.observe(elemento);
    });
});