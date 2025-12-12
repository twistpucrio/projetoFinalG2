const obstaculos = [
    // Carro roxo (topo centro)
    {x: 5,  y: 2}, {x: 6,  y: 2},

    //carro rosa distante
    {x: 14, y: 1}, {x: 15, y: 1},

    // Carro rosa 
    {x: 4, y: 5}, {x: 5, y: 5},

    // Carro rosa escuro
    {x: 2,  y: 3}, {x: 3,  y: 3},

    // Carro roxo (meio centro)
    {x: 9,  y: 3}, {x: 10, y: 3},

    // Gato
    {x: 8, y: 3},

    // Carro vermelho
    {x: 10,  y: 4}, {x: 11, y: 4},

    // Cachorro
    {x: 10, y: 5},


    // Carro verde (fundo direita)
    {x: 14, y: 5}, {x: 15, y: 5},
];


//blockly
const toolbox = {
  // There are two kinds of toolboxes. The simpler one is a flyout toolbox.
  kind: 'flyoutToolbox',
  // -----Blocos de comando ------------
  contents: [
    {
      kind: 'block',
      type: 'controls_if'
    },
    {
      kind: 'block',
      type: 'controls_repeat'
    },
    {
      kind: 'block',
      type: 'blocked_path'
    },
    {
      kind: 'block',
      type: 'cleared_path'
    },
    {
      kind: 'block',
      type: 'go_forward'
    },
    {
      kind: 'block',
      type: 'turn_left'
    },
    {
      kind: 'block',
      type: 'turn_right'
    }
  ]
};


//onde adicionamos a toolbox no espaco da div e fazemos limites
const workspace = Blockly.inject(document.getElementById('drag'), {
  toolbox, 
  maxInstances: {
    go_forward: 4,
    controls_repeat: 1,
    controls_if: 2
  }
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Elementos do Modal
    const modal = document.getElementById('comoJogarModal');
    // Adicionei uma verificação para evitar erros se o modal não existir
    if (!modal) return; 

    const modalContent = modal.querySelector('.como-jogar-content');
    const btnAbrir = document.getElementById('btnComoJogar');
    // Agora o 'X' tem o ID que procuramos!
    const btnFechar = document.getElementById('closeTutorialModal'); 

    // 2. Elementos do Carrossel
    const slides = modal.querySelectorAll('.carousel-slide');
    const prevBtn = modal.querySelector('.prev-btn');
    const nextBtn = modal.querySelector('.next-btn');
    const dotsContainer = modal.querySelector('.dots-container');
    
    const totalSlides = slides.length;
    let currentSlide = 1; // Começa no slide 1

    // Se não há slides, não continua a inicialização do carrossel.
    if (totalSlides === 0) return;

    // --- NOVO: GERAÇÃO DINÂMICA DOS DOTS ---
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        // Usa o índice + 1 (para ser 1-based) no evento de clique
        dot.addEventListener('click', () => {
            currentSlideByDot(i + 1);
        });
        dotsContainer.appendChild(dot);
    }
    const dots = dotsContainer.querySelectorAll('.dot'); // Recarrega a lista de dots

    // --- FUNÇÕES DE CONTROLE DO CARROSSEL ---

    /**
     * Mostra o slide com o índice 'n' e esconde os outros.
     * Atualiza a visibilidade dos botões e dos indicadores (dots).
     * @param {number} n - O índice do slide a ser mostrado (1-based).
     */
    function showSlide(n) {
        // Correção de limites
        if (n > totalSlides) {
            currentSlide = totalSlides;
        } else if (n < 1) {
            currentSlide = 1;
        } else {
            currentSlide = n;
        }

        // 1. Esconde todos os slides 
        slides.forEach(slide => {
            slide.style.display = 'none';
        });

        // 2. Remove o estado 'active' de todos os dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // 3. Mostra o slide atual e ativa o dot correspondente
        if (slides[currentSlide - 1]) {
            slides[currentSlide - 1].style.display = 'block';
        }
        if (dots[currentSlide - 1]) {
            dots[currentSlide - 1].classList.add('active');
        }

        // 4. Atualiza a visibilidade das setas
        // Se for o primeiro slide, esconde a seta de 'Anterior'
        prevBtn.style.display = (currentSlide === 1) ? 'none' : 'block';
        // Se for o último slide, esconde a seta de 'Próximo'
        nextBtn.style.display = (currentSlide === totalSlides) ? 'none' : 'block';
    }

    /** Muda para o slide seguinte (incrementa o índice) */
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    /** Muda para o slide anterior (decrementa o índice) */
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    /** Mostra um slide específico clicando no dot */
    function currentSlideByDot(n) {
        showSlide(n);
    }

    // --- FUNÇÕES DO MODAL ---

    function abrirModal() {
        modal.style.visibility = 'visible';
        // Atrasar a adição da classe 'is-visible' um pouco para garantir a transição
        setTimeout(() => {
            modalContent.classList.add('is-visible');
        }, 10); 
        
        currentSlide = 1; // Garante que comece no primeiro slide
        showSlide(currentSlide);
    }

    function fecharModal() {
        // Inicia a transição de saída
        modalContent.classList.remove('is-visible');
        // Esconde o modal após a transição (0.5s no seu CSS)
        setTimeout(() => {
            modal.style.visibility = 'hidden';
        }, 500); 
    }


    // --- EVENT LISTENERS ---

    // Abrir modal ao clicar no botão "Como Jogar"
    btnAbrir.addEventListener('click', (e) => {
        e.preventDefault(); // Evita a navegação do link
        abrirModal();
    });

    // Fechar modal ao clicar no 'X'
    if (btnFechar) {
        btnFechar.addEventListener('click', fecharModal);
    }

    // Fechar modal ao clicar fora da área de conteúdo
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            fecharModal();
        }
    });

    // Eventos das setas
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
     
    
    // 2. Fechar modal ao apertar a tecla ESC
    document.addEventListener('keydown', (e) => {
        // Verifica se a tecla pressionada é a 'Escape' e se o modal está visível
        if (e.key === 'Escape' && modal.style.visibility === 'visible') {
            fecharModal();
        }
    });
});