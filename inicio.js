const volcan = document.querySelector('.logo-volcan');
const contenedorFritanga = document.querySelector('.fritanga-container');

volcan.addEventListener('mouseenter', () => {
  for (let i = 0; i < 5; i++) {
    lanzarFritanga();
  }
});

function lanzarFritanga() {
  const frita = document.createElement("div");
  frita.classList.add('fritanga');
  frita.style.backgroundColor = getRandomColor();
  frita.style.position = 'absolute';

  // Obtener posición del volcán
  const rect = volcan.getBoundingClientRect();
  const contenedorRect = contenedorFritanga.getBoundingClientRect();

  // Calcular posición relativa al contenedor
  const volcanX = rect.left - contenedorRect.left + rect.width / 2;
  const volcanY = rect.top - contenedorRect.top;

  // Ubicar la fritanga en la punta del volcán
  frita.style.left = `${volcanX}px`;
  frita.style.top = `${volcanY}px`;

  contenedorFritanga.appendChild(frita);

  // Eliminar después de la animación
  setTimeout(() => {
    frita.remove();
  }, 2000);
}

// Función separada correctamente
function getRandomColor() {
  const colores = ['#FFD700', '#FF8C00', '#CD853F', '#FFA07A', '#F4A460'];
  return colores[Math.floor(Math.random() * colores.length)];
}