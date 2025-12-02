document.addEventListener("DOMContentLoaded", () => {

  // identifica o nível atual pela data attribute do body
  const nivelAtual = Number(document.body.dataset.nivel || 0);

  window.abrirVitoria = function() {
    if (!nivelAtual || isNaN(nivelAtual)) {
      console.warn("nivelAtual inválido. Verifique data-nivel no <body>.");
    } else {
      // GARANTE que gravamos antes de qualquer navegação
      const chave = `nivel${nivelAtual}`;
      localStorage.setItem(chave, "unlocked");
      console.log(`Gravado no localStorage: ${chave} = unlocked`);
    }

    // mostra modal de vitória (se existir)
    const modal = document.getElementById("vitoriaModal");
    if (modal) modal.style.display = "flex";
  };

  // função que pode ser chamada no botão "Voltar ao menu" do modal
  window.voltarAoMenu = function() {
    // opcional: forçar um pequeno delay para garantir a gravação (não estritamente necessário)
    window.location.href = "index.html";
  };

  // fechar modal
  window.fecharModalVitoria = function() {
    const modal = document.getElementById("vitoriaModal");
    if (modal) modal.style.display = "none";
  };

});