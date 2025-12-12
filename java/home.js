// === MODAL ===
const botaoComoJogar = document.querySelector("#comojogar");
const modal = document.querySelector("#historia");
const fecharModal = document.querySelector(".close-button");

botaoComoJogar.addEventListener("click", () => {
    modal.classList.add("is-visible");
});

fecharModal.addEventListener("click", () => {
    modal.classList.remove("is-visible");
});

window.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("is-visible");
});

// === CARROSSEL ===
const slides = document.querySelectorAll(".slide");
let slideIndex = 0;

document.querySelector("#nextSlide").addEventListener("click", () => {
    slides[slideIndex].classList.remove("active");
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add("active");
});

document.querySelector("#prevSlide").addEventListener("click", () => {
    slides[slideIndex].classList.remove("active");
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    slides[slideIndex].classList.add("active");
});
