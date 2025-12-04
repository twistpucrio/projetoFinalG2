// Localiza os elementos usando os IDs/Classes atualizados
const comoJogarModal = document.getElementById('comoJogarModal');
// CORREÇÃO: Seleciona o botão usando o ID que adicionamos ao <button> no HTML
const btnComoJogar = document.getElementById('btnComoJogar'); 
// Seleciona o CONTEÚDO do modal para aplicar a transição
const comoJogarContent = comoJogarModal ? comoJogarModal.querySelector('.como-jogar-content') : null;
// Seleciona o botão de fechar dentro do modal
const spanClose = comoJogarModal ? comoJogarModal.querySelector('.close-button') : null; 

// Função para abrir o modal
function abrirComoJogarModal() {
    if (comoJogarModal && comoJogarContent) {
        // 1. Torna o modal-container visível (fundo preto) imediatamente
        comoJogarModal.style.visibility = 'visible'; 
        
        // 2. Após um pequeno delay, adiciona a classe que ativa a transição (descida)
        // Isso garante que o navegador reconheça o estado inicial (translateY(-100%)) antes de mudar para o estado final (translateY(0))
        setTimeout(() => {
            comoJogarContent.classList.add('is-visible');
        }, 10); // 10ms é suficiente
    }
}

// Função para fechar o modal
function fecharComoJogarModal() {
    if (comoJogarModal && comoJogarContent) {
        // 1. Remove a classe para acionar a transição de volta (subida/ocultação)
        comoJogarContent.classList.remove('is-visible');
        
        // 2. Espera a transição terminar antes de ocultar o modal-container
        // O tempo deve ser igual ao tempo de transição no CSS (0.5s = 500ms)
        comoJogarContent.addEventListener('transitionend', function handler() {
            comoJogarModal.style.visibility = 'hidden';
            // IMPORTANTE: Remove o listener para evitar execuções futuras
            comoJogarContent.removeEventListener('transitionend', handler); 
        });
    }
}

// ... (O restante do seu código JavaScript, a lógica de evento é a mesma) ...

// 1. Abre o modal ao clicar no botão "comoJogar"
if (btnComoJogar) {
    btnComoJogar.addEventListener('click', (event) => {
        event.preventDefault(); 
        abrirComoJogarModal();
    });
} else {
    console.warn('Alerta: Botão "Como Jogar" (ID: btnComoJogar) não encontrado.');
}

// 2. Fecha o modal ao clicar no 'X'
if (spanClose) {
    spanClose.addEventListener('click', fecharComoJogarModal);
}

// 3. Opcional: Fecha o modal ao clicar fora dele (no fundo escuro)
window.addEventListener('click', (event) => {
    // ATENÇÃO: Aqui precisamos verificar se o target é o container e se o conteúdo está visível
    if (event.target === comoJogarModal && comoJogarContent.classList.contains('is-visible')) {
        fecharComoJogarModal();
    }
});

window.addEventListener('load', () => {
    // Verifica se o modal deve ser exibido automaticamente.
    // É uma boa prática verificar se o usuário já viu o tutorial (usando localStorage, por exemplo), 
    // mas para a exibição inicial, chamamos a função diretamente:
    abrirComoJogarModal();
});

document.addEventListener('keyup', (event) => {
    // Verifica se a tecla pressionada é 'Escape' (código 27)
    if (event.key === 'Escape' && comoJogarContent.classList.contains('is-visible')) {
        fecharComoJogarModal();
    }
});