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

  // Estilo aleatorio para simular variedad
  frita.style.backgroundColor = getRandomColor();
  frita.style.left = `${50 + Math.random() * 20 - 10}%`;
  frita.style.bottom = '35%';

  contenedorFritanga.appendChild(frita);

  // Eliminar después de la animación
  setTimeout(() => {
    frita.remove();
  }, 2000);
}

function getRandomColor() {
  const colores = ['#FFD700', '#FF8C00', '#CD853F', '#FFA07A', '#F4A460'];
  return colores[Math.floor(Math.random() * colores.length)];
}