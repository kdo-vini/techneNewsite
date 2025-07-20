document.addEventListener('DOMContentLoaded', () => {

    // Função para as abas (tabs) interativas da seção Pilot
    const initPilotTabs = () => {
        const tabNav = document.querySelector('.pilot-tabs .tab-nav');
        const tabLinks = document.querySelectorAll('.pilot-tabs .tab-link');
        const tabContents = document.querySelectorAll('.pilot-tabs .tab-content');

        if (!tabNav) return;

        tabNav.addEventListener('click', (e) => {
            const clickedTab = e.target.closest('.tab-link');
            if (!clickedTab) return;

            e.preventDefault();

            // Remove a classe 'active' de todos
            tabLinks.forEach(link => link.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Adiciona a classe 'active' ao clicado
            const tabId = clickedTab.dataset.tab;
            const targetContent = document.getElementById(tabId);

            clickedTab.classList.add('active');
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    };

    // Função para animação de entrada ao rolar (Scroll Reveal)
    const initScrollReveal = () => {
        const revealElements = document.querySelectorAll('.support-card, .plan-card, .section-header, .pilot-tabs');
        
        if (revealElements.length === 0) return;

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            revealObserver.observe(element);
        });
    };
    // ========== FUNÇÃO PARA O TOGGLE DE PREÇOS MENSAL/ANUAL ==========
const initPriceToggle = () => {
    const toggle = document.getElementById('price-toggle');
    if (!toggle) return;

    // Define os preços mensais e anuais
    const prices = {
        mensal: {
            base: 'R$ 249,00 <span class="price-period" id="period-base">/mês</span>',
            profissional: 'R$ 399,00 <span class="price-period" id="period-profissional">/mês</span>',
            premium: 'R$ 799,00 <span class="price-period" id="period-premium">/mês</span>',
            elite: 'R$ 1.990,00 <span class="price-period" id="period-elite">/mês</span>'
        },
        anual: {
            base: '12x de R$ 224,10 <span class="price-period" id="period-base">/ano</span>',
            profissional: '12x de R$ 359,10 <span class="price-period" id="period-profissional">/ano</span>',
            premium: '12x de R$ 719,10 <span class="price-period" id="period-premium">/ano</span>',
            elite: '12x de R$ 1.691,50 <span class="price-period" id="period-elite">/ano</span>'
        }
    };

    // Seleciona os elementos de preço no HTML
    const priceElements = {
        base: document.getElementById('price-base'),
        profissional: document.getElementById('price-profissional'),
        premium: document.getElementById('price-premium'),
        elite: document.getElementById('price-elite')
    };

    // Adiciona o "escutador" de eventos para o clique no toggle
    toggle.addEventListener('change', () => {
        const cycle = toggle.checked ? 'anual' : 'mensal';

        // Atualiza o HTML de cada card com o preço correspondente
        for (const plan in priceElements) {
            if (priceElements[plan]) {
                priceElements[plan].innerHTML = prices[cycle][plan];
            }
        }
    });
};



    // Inicializa todas as funções
    initPilotTabs();
    initScrollReveal();
    initPriceToggle();
});