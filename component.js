// component.js - VERSÃO CORRIGIDA E FINAL

document.addEventListener("DOMContentLoaded", function() {
    // Função para buscar e injetar o conteúdo de um componente
    const loadComponent = (selector, url) => {
        fetch(url)
            .then(response => {
                // Verifica se a requisição foi bem sucedida
                if (!response.ok) {
                    throw new Error(`Erro ao carregar o componente ${url}: Status ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                // Injeta o HTML no elemento placeholder
                const element = document.querySelector(selector);
                if (element) {
                    element.innerHTML = data;
                } else {
                    // Este erro não deve acontecer se o HTML estiver correto
                    console.error(`Placeholder '${selector}' não foi encontrado na página.`);
                }
            })
            .catch(error => console.error(error));
    };

    // CORREÇÃO: Apontando para os arquivos dentro da pasta 'files'
    // Esta é a única parte que mudou.
    loadComponent("#header-placeholder", "header.html");
    loadComponent("#footer-placeholder", "footer.html");
});