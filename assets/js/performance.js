/* ===============================================
   OTIMIZAÇÕES DE PERFORMANCE
   =============================================== */


function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}


function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}


function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    images.forEach(img => imageObserver.observe(img));
  } else {
    
    images.forEach(img => {
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      img.classList.add('loaded');
    });
  }
}


function preloadCriticalResources() {
  const criticalImages = [
    'assets/images/fastnet banner 400 mega(1920 x 1080 px).webp.jpg',
    'assets/images/fastnet banner 700 mega (1920 x 1080 px).webp.jpg'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}


async function loadComponentsAsync() {
  
  const isInSubfolder = window.location.pathname.includes('/pages/');
  const basePath = isInSubfolder ? '..' : '.';
  
  const components = [
    { 
      selector: '#navbar-placeholder',
      url: `${basePath}/includes/navbar.html`,
      fallback: '<div class="error-placeholder">Menu indisponível</div>'
    },
    { 
      selector: '#footer-placeholder',
      url: `${basePath}/includes/footer.html`,
      fallback: '<div class="error-placeholder">Rodapé indisponível</div>'
    }
  ];

  const loadPromises = components.map(async (component) => {
    try {
      const response = await fetch(component.url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const html = await response.text();
      const element = document.querySelector(component.selector);
      if (element) {
        element.innerHTML = html;
        
        
        if (component.selector === '#navbar-placeholder') {
          const logoImg = document.getElementById('logo-img');
          if (logoImg) {
            logoImg.src = basePath + '/assets/images/fastbranco.webp';
          }
          
          
          setupNavbarListeners();
        }

        // Ajustes pós-carregamento do rodapé
        if (component.selector === '#footer-placeholder') {
          const isInSubfolderLocal = window.location.pathname.includes('/pages/');
          const basePathLocal = isInSubfolderLocal ? '..' : '.';
          const footerRoot = document.querySelector('#footer-placeholder');

          // Corrigir logos no rodapé (empresa e desenvolvedor)
          const companyLogo = footerRoot?.querySelector('.footer-logo img');
          if (companyLogo) {
            companyLogo.src = `${basePathLocal}/assets/images/fastbranco.webp`;
          }
          const devLogo = footerRoot?.querySelector('.dev-link img');
          if (devLogo) {
            devLogo.src = `${basePathLocal}/assets/images/victortech-logo.webp`;
          }

          // Ajustar links internos "pages/..." quando já estamos em /pages/
          const internalLinks = footerRoot?.querySelectorAll('a[href^="pages/"]') || [];
          internalLinks.forEach(a => {
            const href = a.getAttribute('href');
            if (isInSubfolderLocal && href && href.startsWith('pages/')) {
              a.setAttribute('href', href.replace(/^pages\//, ''));
            }
          });
        }
      }
    } catch (error) {
      console.error(`Erro ao carregar ${component.url}:`, error);
      const element = document.querySelector(component.selector);
      if (element) {
        element.innerHTML = component.fallback;
      }
    }
  });

  return Promise.allSettled(loadPromises);
}


function optimizeScroll() {
  let ticking = false;
  
  function updateOnScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
      if (scrollTop > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
    
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick, { passive: true });
}


function optimizeResize() {
  const handleResize = debounce(() => {
    
    const swiper = document.querySelector('.swiper-container')?.swiper;
    if (swiper) {
      swiper.update();
    }
    
    
    const grids = document.querySelectorAll('.apps-logos-grid');
    grids.forEach(grid => {
      grid.style.gridTemplateColumns = `repeat(auto-fit, minmax(${window.innerWidth < 768 ? '70px' : '100px'}, 1fr))`;
    });
  }, 250);
  
  window.addEventListener('resize', handleResize, { passive: true });
}


function optimizeFonts() {
  
  if ('fonts' in document) {
    document.fonts.ready.then(() => {
      console.log('Fontes carregadas com sucesso');
      document.body.classList.add('fonts-loaded');
    });
  }
}


function optimizeForms() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateInput(this);
      });
    });
    
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(this);
      submitFormAsync(formData, this);
    });
  });
}


function validateInput(input) {
  const value = input.value.trim();
  const type = input.type;
  let isValid = true;
  
  
  if (input.required && !value) {
    isValid = false;
  }
  
  if (type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    isValid = false;
  }
  
  if (type === 'tel' && value && !/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(value)) {
    isValid = false;
  }
  
  
  if (isValid) {
    input.classList.remove('invalid');
    input.classList.add('valid');
  } else {
    input.classList.remove('valid');
    input.classList.add('invalid');
  }
  
  return isValid;
}


async function submitFormAsync(formData, form) {
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  
  try {
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    
    const response = await fetch(form.action || '/submit', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      showNotification('Formulário enviado com sucesso!', 'success');
      form.reset();
    } else {
      throw new Error('Erro no servidor');
    }
  } catch (error) {
    showNotification('Erro ao enviar formulário. Tente novamente.', 'error');
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
}


function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}


function createBackToTopButton() {
  const button = document.createElement('button');
  button.className = 'back-to-top';
  button.innerHTML = '<i class="fas fa-chevron-up"></i>';
  button.setAttribute('aria-label', 'Voltar ao topo');
  
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  document.body.appendChild(button);
}


document.addEventListener('DOMContentLoaded', async function() {
  console.log('Iniciando otimizações de performance...');
  
  
  preloadCriticalResources();
  initLazyLoading();
  optimizeScroll();
  optimizeResize();
  optimizeFonts();
  optimizeForms();
  createBackToTopButton();
  
  
  await loadComponentsAsync();
  
  
  document.body.classList.add('optimized');
  
  console.log('Otimizações de performance carregadas com sucesso!');
});


if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('SW registrado'))
      .catch(error => console.log('SW falhou'));
  });
}


window.FastnetOptimizations = {
  debounce,
  throttle,
  showNotification,
  validateInput,
  submitFormAsync
};






function goToHome() {
  const isInSubfolder = window.location.pathname.includes('/pages/');
  const basePath = isInSubfolder ? '..' : '.';
  window.location.href = basePath + '/index.html';
}


function goToPage(page, hash = '') {
  const isInSubfolder = window.location.pathname.includes('/pages/');
  
  if (page === 'home') {
    goToHome();
  } else {
    const url = isInSubfolder ? `${page}.html${hash}` : `pages/${page}.html${hash}`;
    window.location.href = url;
  }
}


function setupNavbarListeners() {
  const navLinks = {
    'nav-logo': () => goToHome(),
    'nav-home': () => goToHome(),
    'nav-services': () => goToPage('services'),
    'nav-about': () => goToPage('about'),
    'nav-support': () => goToPage('support'),
    'nav-contact': () => goToPage('contact'),
    'nav-velocimetro': () => goToPage('velocimetro'),
    'nav-security': () => goToPage('support', '#documents')
  };

  Object.entries(navLinks).forEach(([id, handler]) => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('click', (e) => {
        e.preventDefault();
        handler();
      });
      console.log(`Event listener adicionado para ${id}`);
    } else {
      console.warn(`Elemento ${id} não encontrado`);
    }
  });
}


window.goToHome = goToHome;
window.goToPage = goToPage;


console.log('Funções de navegação carregadas:', {
  goToHome: typeof window.goToHome,
  goToPage: typeof window.goToPage
});
