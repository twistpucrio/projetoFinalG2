document.addEventListener('DOMContentLoaded', () => {

    // === 1. SELEÇÃO DOS ELEMENTOS DO HTML ===
    const botaoAbrir = document.getElementById('comojogar'); // Seu botão 'historia.png'
    const modalContainer = document.getElementById('historia'); // Seu elemento modal/carrossel
    const fecharModal = document.querySelector(".close-button");

    // === 2. FUNÇÕES DE ABRIR E FECHAR O MODAL COM TRANSIÇÃO ===

    function abrirModal() {
        if (modalContainer) {
            // 1. Torna o container visível (visibility: visible)
            modalContainer.style.visibility = 'visible'; 
            
            // 2. Adiciona a classe que ativa a transição (transform: translateY(0))
            // O setTimeout é crucial para garantir que a transição ocorra suavemente.
            setTimeout(() => {
                modalContainer.classList.add("is-visible");
            }, 10); 
        }
    }

    function fecharModalComTransicao() {
        if (modalContainer) {
            // 1. Remove a classe para acionar a transição de volta (subida/ocultação)
            modalContainer.classList.remove("is-visible");
            
            // 2. Espera a transição CSS terminar (0.5s no CSS = 500ms) antes de ocultar o elemento.
            modalContainer.addEventListener('transitionend', function handler() {
                // Oculta o modal completamente para que não interfira nos cliques
                modalContainer.style.visibility = 'hidden'; 
                // Remove o listener para que ele não se execute mais vezes
                modalContainer.removeEventListener('transitionend', handler); 
            }, {once: true}); // {once: true} faz o mesmo que a remoção manual
        }
    }

    // === 3. EVENTOS DE CLIQUE ===

    // Abre o modal ao clicar no botão "historia.png"
    if (botaoAbrir) {
        botaoAbrir.addEventListener("click", (event) => {
             event.preventDefault(); 
             abrirModal();
        });
    }

    // Fecha o modal ao clicar no 'X'
    if (fecharModal) {
        fecharModal.addEventListener("click", fecharModalComTransicao);
    }

    // Fecha o modal ao clicar fora dele (fundo)
    window.addEventListener("click", (e) => {
        // Verifica se o clique foi no próprio container do modal e se ele está visível
        if (e.target === modalContainer && modalContainer.classList.contains('is-visible')) {
            fecharModalComTransicao();
        }
    });

    // Fecha o modal ao pressionar a tecla ESC (Opcional, mas útil)
    document.addEventListener('keyup', (event) => {
        if (event.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            fecharModalComTransicao();
        }
    });


    // ====================================================================
    // === CÓDIGO DO CARROSSEL (MANTIDO E ISOLADO) ===
    // ====================================================================
    
    const slides = document.querySelectorAll(".slide");
    let slideIndex = 0;

    // Inicializa o primeiro slide como ativo
    if(slides.length > 0) {
        slides[0].classList.add("active");
    }

    // Navegação PRÓXIMO
    document.querySelector("#nextSlide")?.addEventListener("click", () => {
        slides[slideIndex].classList.remove("active");
        slideIndex = (slideIndex + 1) % slides.length;
        slides[slideIndex].classList.add("active");
    });

    // Navegação ANTERIOR
    document.querySelector("#prevSlide")?.addEventListener("click", () => {
        slides[slideIndex].classList.remove("active");
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        slides[slideIndex].classList.add("active");
    });
});