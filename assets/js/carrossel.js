/* ===============================================
   CARROSSEL SWIPER - CONFIGURAÇÃO E CONTROLES
   =============================================== */


document.addEventListener('DOMContentLoaded', function() {
  
  if (typeof Swiper === 'undefined') {
    console.error('Swiper library not loaded');
    return;
  }

  
  const swiperConfig = {
    
    loop: true,
    centeredSlides: true,
    spaceBetween: 0,
    
    
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    
    
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '" aria-label="Slide ' + (index + 1) + '"></span>';
      },
    },
    
    
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    
    
    speed: 1000,
    preloadImages: false,
    lazy: {
      loadPrevNext: true,
      loadOnTransitionStart: true,
    },
    
    
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    
    
    a11y: {
      enabled: true,
      prevSlideMessage: 'Slide anterior',
      nextSlideMessage: 'Próximo slide',
      firstSlideMessage: 'Este é o primeiro slide',
      lastSlideMessage: 'Este é o último slide',
    },
    
    
    breakpoints: {
      320: {
        spaceBetween: 10,
        autoplay: {
          delay: 4000,
        },
      },
      768: {
        spaceBetween: 20,
        autoplay: {
          delay: 4500,
        },
      },
      1024: {
        spaceBetween: 30,
        autoplay: {
          delay: 5000,
        },
      },
    },
    
    
    on: {
      init: function () {
        console.log('Carrossel inicializado com sucesso');
        
        this.el.classList.add('swiper-initialized');
      },
      
      slideChange: function () {
        
        const videos = this.el.querySelectorAll('video');
        videos.forEach(video => {
          video.pause();
        });
        
        
        if (typeof gtag !== 'undefined') {
          gtag('event', 'slide_change', {
            'slide_index': this.activeIndex,
            'slide_total': this.slides.length
          });
        }
      },
      
      autoplayStop: function () {
        console.log('Autoplay parado pelo usuário');
      },
      
      touchStart: function () {
        
        this.autoplay.stop();
      },
      
      touchEnd: function () {
        
        setTimeout(() => {
          this.autoplay.start();
        }, 3000);
      },
    },
  };

  
  let swiper;
  try {
    swiper = new Swiper('.swiper-container', swiperConfig);
  } catch (error) {
    console.error('Erro ao inicializar o Swiper:', error);
  }

  
  const swiperContainer = document.querySelector('.swiper-container');
  if (swiperContainer) {
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (swiper) {
          if (entry.isIntersecting) {
            swiper.autoplay.start();
          } else {
            swiper.autoplay.stop();
          }
        }
      });
    }, {
      threshold: 0.5
    });
    
    observer.observe(swiperContainer);
    
    
    document.addEventListener('visibilitychange', () => {
      if (swiper) {
        if (document.hidden) {
          swiper.autoplay.stop();
        } else {
          swiper.autoplay.start();
        }
      }
    });
  }

  
  function preloadImages() {
    const images = document.querySelectorAll('.banner-image');
    images.forEach((img, index) => {
      if (index < 2) { 
        const imageObj = new Image();
        imageObj.src = img.src;
      }
    });
  }

  
  function setupLazyLoading() {
    const images = document.querySelectorAll('.banner-image[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  
  preloadImages();
  setupLazyLoading();

  
  const prevButton = document.querySelector('.swiper-button-prev');
  const nextButton = document.querySelector('.swiper-button-next');
  
  if (prevButton && nextButton) {
    prevButton.addEventListener('focus', () => {
      if (swiper) swiper.autoplay.stop();
    });
    
    nextButton.addEventListener('focus', () => {
      if (swiper) swiper.autoplay.stop();
    });
    
    prevButton.addEventListener('blur', () => {
      if (swiper) setTimeout(() => swiper.autoplay.start(), 1000);
    });
    
    nextButton.addEventListener('blur', () => {
      if (swiper) setTimeout(() => swiper.autoplay.start(), 1000);
    });
  }

  
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.debugSwiper = swiper;
  }
});


function controlCarrossel(action) {
  const swiper = document.querySelector('.swiper-container').swiper;
  if (!swiper) return;
  
  switch (action) {
    case 'play':
      swiper.autoplay.start();
      break;
    case 'pause':
      swiper.autoplay.stop();
      break;
    case 'next':
      swiper.slideNext();
      break;
    case 'prev':
      swiper.slidePrev();
      break;
    case 'goto':
      const slideIndex = arguments[1] || 0;
      swiper.slideTo(slideIndex);
      break;
  }
}


if (typeof module !== 'undefined' && module.exports) {
  module.exports = { controlCarrossel };
}
