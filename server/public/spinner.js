function showSpinner() {
  // Si el spinner ya existe, no lo agrega de nuevo
  if (document.getElementById("global-spinner-overlay")) {
    document.getElementById("global-spinner-overlay").style.display = "flex";

    return;
  }

  // Cargar el HTML del spinner y agregarlo al cuerpo
  fetch("spinner.html")
    .then((response) => response.text())
    .then((html) => {
      document.body.insertAdjacentHTML("beforeend", html);
    })
    .catch((err) => console.error("Error al cargar el spinner:", err));
}

function hideSpinner() {
  const spinner = document.getElementById("global-spinner-overlay");
  if (spinner) spinner.style.display = "none";
}
