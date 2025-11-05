const gato = document.getElementById('gato');

if (!gato) {
  console.error('Elemento #gato não encontrado no DOM.');
}

// impedir arrasto nativo
gato.addEventListener('dragstart', e => e.preventDefault());

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

gato.addEventListener('mousedown', (e) => {
  e.preventDefault();
  isDragging = true;

  offsetX = e.clientX - gato.offsetLeft;
  offsetY = e.clientY - gato.offsetTop;

  gato.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  gato.style.left = `${e.clientX - offsetX}px`;
  gato.style.top  = `${e.clientY - offsetY}px`;
});

document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    gato.style.cursor = 'grab';

    localStorage.setItem('posGato', JSON.stringify({
      left: gato.style.left,
      top: gato.style.top
    }));
  }
});

window.addEventListener('load', () => {
  const posGato = JSON.parse(localStorage.getItem('posGato'));
  if (posGato) {
    gato.style.left = posGato.left;
    gato.style.top = posGato.top;
  } else {
    gato.style.left = '100px';
    gato.style.top = '100px';
  }
});