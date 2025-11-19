// Localiza os elementos usando os IDs/Classes atualizados
const comoJogarModal = document.getElementById('comoJogarModal');
// CORREÇÃO: Seleciona o botão usando o ID que adicionamos ao <button> no HTML
const btnComoJogar = document.getElementById('btnComoJogar'); 
// Seleciona o botão de fechar dentro do modal para garantir que pegamos o correto
const spanClose = comoJogarModal ? comoJogarModal.querySelector('.close-button') : null; 

// Função para abrir o modal
function abrirComoJogarModal() {
    if (comoJogarModal) {
        // Usamos 'flex' para o display, conforme o CSS
        comoJogarModal.style.display = 'flex'; 
    }
}

// Função para fechar o modal
function fecharComoJogarModal() {
    if (comoJogarModal) {
        comoJogarModal.style.display = 'none';
    }
}

// 1. Abre o modal ao clicar no botão "comoJogar"
if (btnComoJogar) {
    btnComoJogar.addEventListener('click', (event) => {
        // ESSENCIAL: Previne o comportamento padrão (navegação do link <a> dentro do botão)
        event.preventDefault(); 
        abrirComoJogarModal();
    });
} else {
    // Isso aparecerá no console se o elemento não for encontrado
    console.warn('Alerta: Botão "Como Jogar" (ID: btnComoJogar) não encontrado.');
}

// 2. Fecha o modal ao clicar no 'X'
if (spanClose) {
    spanClose.addEventListener('click', fecharComoJogarModal);
}

// 3. Opcional: Fecha o modal ao clicar fora dele (no fundo escuro)
window.addEventListener('click', (event) => {
    if (event.target === comoJogarModal) {
        fecharComoJogarModal();
    }
});