function pos(id, x, y) {
    const el = document.getElementById(id);
    el.style.left = (x * step) + "px";
    el.style.top = (y * step) + "px";
}

function iniciarNivel() {
    pos("carro1", 8, 1);
    pos("carro2", 3, 4);
    pos("gato", 12, 4);
    pos("destinoCasa", 18, 3);
    pos("carro", 3, 3);
}

