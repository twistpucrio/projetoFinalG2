document.addEventListener("DOMContentLoaded", () => {

  const totalNiveis = 5;

  for (let i = 1; i <= totalNiveis; i++) {

    const pizza = document.getElementById(`nivel${i}`);
    const block = document.getElementById(`nivel${i}Blocked`);

    // NIVEL 1 SEMPRE LIBERADO
    if (i === 1) {
      if (block) block.style.display = "none";
      if (pizza) {
        pizza.style.cursor = "pointer";
        pizza.onclick = () => window.location.href = "nivel1.html";
      }
      continue;
    }

    // verificar se o nível anterior está concluído
    const anteriorUnlocked = localStorage.getItem(`nivel${i - 1}`) === "unlocked";

    if (anteriorUnlocked) {
      // desbloqueado
      if (block) block.style.display = "none";
      if (pizza) {
        pizza.style.pointerEvents = "auto";
        pizza.style.cursor = "pointer";
        pizza.onclick = () => window.location.href = `nivel${i}.html`;
      }
    } else {
      // bloqueado
      if (block) block.style.display = "block";
      if (pizza) {
        pizza.style.pointerEvents = "none";
        pizza.style.cursor = "default";
        // removemos onclick para evitar conflito
        pizza.onclick = null;
      }
    }
  }

  // opcional: botão para resetar (se existir)
  const resetBtn = document.getElementById("resetProgress");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      for (let i = 1; i <= totalNiveis; i++) {
        localStorage.removeItem(`nivel${i}`);
      }
      // refresca a página para ver efeito
      location.reload();
    });
  }

});