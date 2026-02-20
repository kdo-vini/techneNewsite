/**
 * JavaScript para interatividade do site da Téchne
 * Funcionalidades: Menu, Scroll, Animações e Formulários
 */

document.addEventListener('headerLoaded', () => {
    initUI();
    initAnimations();
    initContactForm();
    initAccessibility();
}, { once: true });

// ========== UI & NAVEGAÇÃO ==========
function initUI() {
    const body = document.body;
    const header = document.getElementById('header-placeholder');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = body.classList.toggle('menu-aberto');
            mobileToggle.setAttribute('aria-expanded', isOpen);
            body.style.overflow = isOpen ? 'hidden' : '';
        });
    }

    // Dropdowns
    document.querySelectorAll('.dropdown-toggle').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const li = btn.closest('.menu-item-has-children');
            const isOpen = li.classList.contains('open');

            // Fecha outros dropdowns
            document.querySelectorAll('.menu-item-has-children.open').forEach(openLi => {
                if (openLi !== li) openLi.classList.remove('open');
            });

            li.classList.toggle('open', !isOpen);
            btn.setAttribute('aria-expanded', !isOpen);
        });
    });

    // Header Scroll Effect
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        if (header) {
            header.classList.toggle('scrolled', currentScrollY > 100);
            header.style.transform = (currentScrollY > lastScrollY && currentScrollY > 200)
                ? 'translateY(-100%)' : 'translateY(0)';
            lastScrollY = currentScrollY;
        }
    }, { passive: true });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                body.classList.remove('menu-aberto');
                body.style.overflow = '';

                const headerHeight = header?.offsetHeight || 0;
                window.scrollTo({
                    top: target.offsetTop - headerHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== ANIMAÇÕES ==========
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visivel');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    const elements = document.querySelectorAll('section, .solution-card, .about-content > *, .solution-card-revamped');
    elements.forEach((el, i) => {
        el.classList.add('animate-on-scroll');
        if (el.classList.contains('solution-card') || el.classList.contains('solution-card-revamped')) {
            el.style.transitionDelay = `${(i % 3) * 0.1}s`;
        }
        observer.observe(el);
    });
}

// ========== FORMULÁRIOS ==========
function initContactForm() {
    const form = document.querySelector('.contact-form form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const button = form.querySelector('button');
        const originalText = button.textContent;

        try {
            button.disabled = true;
            button.textContent = 'Enviando...';

            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                showMsg('Enviado!', 'Sua mensagem foi enviada com sucesso.', 'success');
                form.reset();
            } else {
                throw new Error();
            }
        } catch (err) {
            showMsg('Oops...', 'Algo deu errado. Tente novamente mais tarde.', 'error');
        } finally {
            button.disabled = false;
            button.textContent = originalText;
        }
    });

    const showMsg = (title, text, icon) => {
        if (window.Swal) {
            Swal.fire({ title, text, icon, confirmButtonColor: '#3B82F6' });
        } else {
            alert(`${title}\n${text}`);
        }
    };
}

// ========== ACESSIBILIDADE ==========
function initAccessibility() {
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') document.body.classList.add('keyboard-navigation');
        if (e.key === 'Escape') {
            document.body.classList.remove('menu-aberto');
            document.body.style.overflow = '';
        }
    });
    window.addEventListener('mousedown', () => document.body.classList.remove('keyboard-navigation'));
}

// ========== RODAPÉ ==========
document.addEventListener('footerLoaded', () => {
    const year = document.getElementById('current-year');
    if (year) year.textContent = new Date().getFullYear();
});