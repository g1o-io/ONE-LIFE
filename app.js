const message = document.getElementById("message");

function showMessage(text) {
  message.textContent = text;
  message.hidden = false;

  window.clearTimeout(showMessage.timeout);
  showMessage.timeout = window.setTimeout(() => {
    message.hidden = true;
  }, 2200);
}

document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;

    if (action === "new-game") {
      showMessage("Novo Jogo — o Character Creator será o próximo passo.");
    }

    if (action === "continue") {
      showMessage("Continuar — sistema de saves será ligado numa próxima versão.");
    }

    if (action === "settings") {
      showMessage("Definições — menu de configurações será construído em breve.");
    }
  });
});
