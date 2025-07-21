/**
 * JavaScript para interatividade do site da Téchne
 * Funcionalidades: Menu Mobile, Scroll Suave, Animações de Entrada
 */
document.addEventListener('DOMContentLoaded', () => {

    // ========== 1. MENU HAMBÚRGUER FUNCIONAL ==========
    /**
     * Controla a abertura/fechamento do menu mobile
     * Gerencia o estado do ícone hambúrguer e previne scroll
     */
    const initMobileMenu = () => {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const body = document.body;
        const nav = document.querySelector('nav');

        if (!mobileToggle || !nav) return;

        // Função para abrir/fechar menu
        const toggleMenu = () => {
            const isOpen = body.classList.contains('menu-aberto');
            const newState = !isOpen;

            // Alterna estado visual
            body.classList.toggle('menu-aberto', newState);
            mobileToggle.setAttribute('aria-expanded', newState.toString());

            // Previne/permite scroll da página
            body.style.overflow = newState ? 'hidden' : '';
        };

        // Fecha o menu
        const closeMenu = () => {
            body.classList.remove('menu-aberto');
            body.style.overflow = '';
            mobileToggle.setAttribute('aria-expanded', 'false');
        };

        // Event listeners
        mobileToggle.addEventListener('click', toggleMenu);

        // Fecha menu ao clicar em links de navegação
        const navLinks = nav.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Fecha menu com tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && body.classList.contains('menu-aberto')) {
                closeMenu();
            }
        });

        // Fecha menu ao redimensionar janela (caso usuário gire o dispositivo)
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                closeMenu();
            }
        });
    };

    // ========== 2. SCROLL SUAVE (SMOOTH SCROLLING) ==========
    /**
     * Implementa navegação suave entre seções da página
     * Funciona com todos os links âncora internos
     */
    const initSmoothScrolling = () => {
        // Seleciona todos os links âncora internos
        const anchorLinks = document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // Ignora links vazios ou só com #
                if (!href || href === '#') return;

                // Previne comportamento padrão
                e.preventDefault();

                // Encontra o elemento de destino
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // Calcula offset para compensar header fixo
                    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;

                    // Scroll suave usando behavior smooth
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Adiciona foco para acessibilidade
                    targetElement.focus({ preventScroll: true });
                }
            });
        });
    };

    // ========== 3. ANIMAÇÃO FADE-IN AO ROLAR (SCROLL REVEAL) ==========
    /**
     * Usa Intersection Observer para animações performáticas
     * Elementos aparecem gradualmente conforme entram na tela
     */
    const initScrollReveal = () => {
        // Configurações do observador
        const observerOptions = {
            threshold: 0.15, // Ativa quando 15% do elemento estiver visível
            rootMargin: '0px 0px -50px 0px' // Margem negativa na parte inferior
        };

        // Callback executado quando elementos entram/saem da tela
        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Adiciona classe que ativa a animação CSS
                    entry.target.classList.add('visivel');

                    // Para de observar o elemento após aparecer (otimização)
                    scrollObserver.unobserve(entry.target);
                }
            });
        };

        // Cria o observador
        const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

        // Elementos que terão animação de entrada
        const animatedElements = [
            ...document.querySelectorAll('section'),
            ...document.querySelectorAll('.solution-card'),
            ...document.querySelectorAll('.about-content > *')
        ];

        // Aplica estilos iniciais e inicia observação
        animatedElements.forEach((element, index) => {
            // Adiciona classe inicial para animação
            element.classList.add('animate-on-scroll');

            // Define delay escalonado para múltiplos elementos
            if (element.classList.contains('solution-card')) {
                element.style.transitionDelay = `${index * 0.1}s`;
            }

            // Inicia observação
            scrollObserver.observe(element);
        });
    };

    // ========== 4. EFEITOS ADICIONAIS ==========
    /**
     * Efeitos visuais complementares para melhor experiência
     */
    const initAdditionalEffects = () => {
        // Header com transparência dinâmica no scroll
        const header = document.querySelector('header');
        let lastScrollY = window.scrollY;

        const updateHeaderOnScroll = () => {
            const currentScrollY = window.scrollY;

            if (header) {
                // Adiciona classe quando rolar para baixo
                header.classList.toggle('scrolled', currentScrollY > 100);

                // Header se esconde ao rolar para baixo, aparece ao rolar para cima
                if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }

                lastScrollY = currentScrollY;
            }
        };

        // Otimiza scroll listener com requestAnimationFrame
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateHeaderOnScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Efeito de typing no título principal (opcional)
        const heroTitle = document.querySelector('.hero-section h1');
        if (heroTitle && window.innerWidth > 768) {
            const text = heroTitle.textContent;
            heroTitle.style.opacity = '0';

            setTimeout(() => {
                heroTitle.style.opacity = '1';
                heroTitle.style.animation = 'fadeInUp 1s ease-out forwards';
            }, 300);
        }
    };

    // ========== 5. PERFORMANCE E ACESSIBILIDADE ==========
    /**
     * Configurações para melhor performance e acessibilidade
     */
    const initAccessibility = () => {
        // Respeita preferências de movimento reduzido
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            // Desabilita animações complexas
            document.documentElement.style.setProperty('--transition', 'none');
        }

        // Melhora foco para navegação por teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    };
    // ========== FUNÇÃO PARA ENVIO DO FORMULÁRIO DE CONTATO COM AJAX ==========
const initContactForm = () => {
    const form = document.querySelector('.contact-form form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        // 1. Previne o comportamento padrão (redirecionamento)
        e.preventDefault();

        const formData = new FormData(form);
        const formAction = form.action;

        // 2. Envia os dados para o Formspree em segundo plano
        fetch(formAction, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            // 3. Verifica a resposta do Formspree
            if (response.ok) {
                // 4. Se deu tudo certo, mostra o alerta de sucesso
                Swal.fire({
                    title: 'Enviado!',
                    text: 'Sua mensagem foi enviada com sucesso. Entraremos em contato em breve!',
                    icon: 'success',
                    confirmButtonColor: '#3B82F6' // Cor azul do seu site
                });
                form.reset(); // Limpa o formulário
            } else {
                // 5. Se deu erro, mostra o alerta de erro
                Swal.fire({
                    title: 'Oops...',
                    text: 'Algo deu errado no envio. Por favor, tente novamente ou contate diretamente.',
                    icon: 'error',
                    confirmButtonColor: '#3B82F6'
                });
            }
        })
        .catch(error => {
            // 5b. Se deu erro de rede
            Swal.fire({
                title: 'Erro de Conexão',
                text: 'Não foi possível enviar. Verifique sua conexão com a internet.',
                icon: 'error',
                confirmButtonColor: '#3B82F6'
            });
        });
    });
};
    // ========== INICIALIZAÇÃO ==========
    /**
     * Executa todas as funcionalidades após DOM estar pronto
     */
    try {
        initMobileMenu();
        initSmoothScrolling();
        initScrollReveal();
        initAdditionalEffects();
        initAccessibility();
        initContactForm(); 
        console.log('✅ Téchne: JavaScript inicializado com sucesso');
    } catch (error) {
        console.error('❌ Erro ao inicializar JavaScript:', error);
    }

    // Dropdown responsivo para o menu "Serviços"
    document.querySelectorAll('.dropdown-toggle').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const li = btn.closest('.menu-item-has-children');
            const isOpen = li.classList.contains('open');
            // Fecha outros dropdowns abertos no mobile
            document.querySelectorAll('.menu-item-has-children.open').forEach(openLi => {
                if (openLi !== li) openLi.classList.remove('open');
            });
            li.classList.toggle('open', !isOpen);
            btn.setAttribute('aria-expanded', String(!isOpen));
            // Evita navegação
            e.preventDefault();
        });
    });
});