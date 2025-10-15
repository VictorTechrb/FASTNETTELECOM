// Sistema de navegação universal para páginas diretas
(function() {
    'use strict';
    
    // Detectar se estamos em uma subpasta
    const isInSubfolder = window.location.pathname.includes('/pages/');
    const basePath = isInSubfolder ? '..' : '.';
    
    // Função para incluir HTML
    function includeHTML() {
        const elements = document.querySelectorAll('[data-include]');
        const promises = [];
        
        elements.forEach(el => {
            const file = el.getAttribute('data-include');
            const promise = fetch(file)
                .then(response => {
                    if (!response.ok) throw new Error('Erro ao carregar: ' + file);
                    return response.text();
                })
                .then(data => {
                    el.innerHTML = data;
                    return { element: el, file: file };
                })
                .catch(err => {
                    console.error('Erro ao incluir HTML:', err);
                    return null;
                });
            promises.push(promise);
        });
        
        return Promise.all(promises).then(results => {
            results.forEach(result => {
                if (!result) return;
                if (result.file.includes('navbar.html')) {
                    // Aguardar um momento para o DOM se atualizar
                    setTimeout(() => {
                        setupPageNavigation();
                    }, 100);
                }
                if (result.file.includes('footer.html')) {
                    // Corrigir caminhos do rodapé quando incluído por data-include
                    adjustFooter(result.element);
                }
            });
        });
    }
    
    // Configurar navegação para páginas diretas
    function setupPageNavigation() {
        // Corrigir caminhos das imagens na navbar
        const logoImg = document.getElementById('logo-img');
        if (logoImg) {
            console.log('Logo encontrada, caminho atual:', logoImg.src);
            
            // Se estamos em subpasta e o caminho ainda aponta para ./assets/, corrigir
            if (isInSubfolder && (logoImg.src.includes('./assets/') || logoImg.getAttribute('src').includes('./assets/'))) {
                const newSrc = basePath + '/assets/images/fastbranco.webp';
                logoImg.src = newSrc;
                logoImg.setAttribute('src', newSrc);
                console.log('Logo corrigida para:', newSrc);
            }
       
            else if (!isInSubfolder && (logoImg.src.includes('../assets/') || logoImg.getAttribute('src').includes('../assets/'))) {
                const newSrc = './assets/images/fastbranco.webp';
                logoImg.src = newSrc;
                logoImg.setAttribute('src', newSrc);
                console.log('Logo corrigida para:', newSrc);
            }
        } else {
            console.warn('Logo não encontrada no DOM');
        }

        const navLinks = {
            'nav-logo': () => window.location.href = basePath + '/index.html',
            'nav-home': () => window.location.href = basePath + '/index.html',
            'nav-services': () => window.location.href = isInSubfolder ? 'services.html' : 'pages/services.html',
            'nav-about': () => window.location.href = isInSubfolder ? 'about.html' : 'pages/about.html',
            'nav-support': () => window.location.href = isInSubfolder ? 'support.html' : 'pages/support.html',
            'nav-contact': () => window.location.href = isInSubfolder ? 'contact.html' : 'pages/contact.html',
            'nav-velocimetro': () => window.location.href = isInSubfolder ? 'velocimetro.html' : 'pages/velocimetro.html',
            'nav-contratos': () => window.location.href = (isInSubfolder ? 'support.html' : 'pages/support.html') + '#documents',
            'nav-security': () => window.location.href = (isInSubfolder ? 'support.html' : 'pages/support.html') + '#documents'
        };

        Object.entries(navLinks).forEach(([id, handler]) => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('click', (e) => {
                    e.preventDefault();
                    handler();
                });
            }
        });
    }

    // Ajusta imagens e links do rodapé para caminhos relativos corretos
    function adjustFooter(rootEl) {
        try {
            const base = isInSubfolder ? '..' : '.';
            const footerRoot = rootEl || document.querySelector('#footer-placeholder');
            if (!footerRoot) return;

            const companyLogo = footerRoot.querySelector('.footer-logo img');
            if (companyLogo) {
                companyLogo.src = `${base}/assets/images/fastbranco.webp`;
                companyLogo.setAttribute('src', `${base}/assets/images/fastbranco.webp`);
            }
            const devLogo = footerRoot.querySelector('.dev-link img');
            if (devLogo) {
                devLogo.src = `${base}/assets/images/victortech-logo.webp`;
                devLogo.setAttribute('src', `${base}/assets/images/victortech-logo.webp`);
            }

            // Normaliza links internos quando já estamos em /pages/
            if (isInSubfolder) {
                footerRoot.querySelectorAll('a[href^="pages/"]').forEach(a => {
                    const href = a.getAttribute('href');
                    if (href) a.setAttribute('href', href.replace(/^pages\//, ''));
                });
            }
        } catch (e) {
            console.warn('Falha ao ajustar rodapé:', e);
        }
    }
    
    // Função para carregar componentes via placeholders (compatibilidade com sistema antigo)
    function loadPlaceholders() {
        const placeholders = [
            { id: 'navbar-placeholder', file: basePath + '/includes/navbar.html' },
            { id: 'footer-placeholder', file: basePath + '/includes/footer.html' }
        ];
        
        placeholders.forEach(({ id, file }) => {
            const element = document.getElementById(id);
            if (element) {
                fetch(file)
                    .then(response => response.text())
                    .then(data => {
                        element.innerHTML = data;
                        if (id === 'navbar-placeholder') {
                            // Aguardar um momento para o DOM se atualizar
                            setTimeout(() => {
                                setupPageNavigation();
                            }, 100);
                        }
                        if (id === 'footer-placeholder') {
                            adjustFooter(element);
                        }
                    })
                    .catch(err => console.error(`Erro ao carregar ${file}:`, err));
            }
        });
    }
    
    // Inicializar quando DOM estiver pronto
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Iniciando sistema de navegação universal...');
        
        // Carregar includes via data-include
        includeHTML();
        
        // Carregar placeholders (para compatibilidade)
        loadPlaceholders();
        
        // Verificar logo após um pequeno delay para garantir que foi carregada
        setTimeout(function() {
            const logoImg = document.getElementById('logo-img');
            if (logoImg) {
                setupPageNavigation();
            } else {
                // Se ainda não encontrou, tentar novamente
                setTimeout(forceLogoFix, 1000);
            }
        }, 500);
        
        // Verificação adicional para garantir que a logo seja corrigida
        setTimeout(forceLogoFix, 2000);
        
        console.log('Sistema de navegação carregado para:', isInSubfolder ? 'subpasta' : 'raiz');
    });
    
    // Função para forçar correção da logo (fallback)
    function forceLogoFix() {
        const logoImg = document.getElementById('logo-img');
        if (logoImg) {
            const currentSrc = logoImg.getAttribute('src') || logoImg.src;
            let newSrc;
            
            if (isInSubfolder) {
                // Para páginas em subpasta, usar ../assets/
                newSrc = '../assets/images/fastbranco.webp';
            } else {
                // Para página raiz, usar ./assets/
                newSrc = './assets/images/fastbranco.webp';
            }
            
            if (currentSrc !== newSrc) {
                logoImg.src = newSrc;
                logoImg.setAttribute('src', newSrc);
                console.log('Logo corrigida forçadamente para:', newSrc);
                return true;
            }
        }
        return false;
    }
    
    // Expor funções globalmente se necessário
    window.FastnetNavigation = {
        includeHTML,
        setupPageNavigation,
    forceLogoFix,
    adjustFooter,
        isInSubfolder,
        basePath
    };
})();
