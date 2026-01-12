// component.js - injeção de Header e Footer

document.addEventListener("DOMContentLoaded", function () {
  // Função para buscar e injetar o conteúdo de um componente
  const loadComponent = (selector, url) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro ao carregar o componente ${url}: Status ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        const element = document.querySelector(selector);
        if (element) {
          element.innerHTML = data;
          if (selector === "#header-placeholder") {
            document.dispatchEvent(new CustomEvent("headerLoaded"));
          }
          if (selector === "#footer-placeholder") {
            document.dispatchEvent(new CustomEvent("footerLoaded"));
          }
        }
      })
      .catch((error) => console.error(error));
  };

  // Caminhos absolutos (funcionam em / e em /pages/)
  loadComponent("#header-placeholder", "/headerFooter/header.html");
  loadComponent("#footer-placeholder", "/headerFooter/footer.html");

  // Carrega favicon dinamicamente
  fetch("/meta/favicon.html")
    .then(response => response.text())
    .then(data => {
      const head = document.head;
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = data;
      Array.from(tempDiv.children).forEach(child => {
        head.appendChild(child);
      });
    })
    .catch(error => console.error('Erro ao carregar favicon:', error));
});

