document.addEventListener('DOMContentLoaded', () => {

    // Função para animação de entrada ao rolar (Scroll Reveal)
    const initScrollReveal = () => {
        const revealElements = document.querySelectorAll('.story-text > *, .mission-content > *, .founder-visual');
        
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

    // Inicializa a função
    initScrollReveal();

    // Aqui você pode adicionar o mesmo código do menu mobile que usou nas outras páginas.
});