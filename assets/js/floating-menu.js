


(function () {
  'use strict';


  const WHATSAPP_CONFIG = {
    numero: '557930454880',
    mensagemPadrao: 'Olá! Gostaria de saber mais sobre os planos da Fastnet.',
    mensagemWhatsApp: 'Olá! Vim através do site e gostaria de falar pelo WhatsApp.',
    mensagemInstagram: 'Olá! Vim através do site e gostaria de conhecer o Instagram da Fastnet.',
    mensagemTelefone: 'Olá! Vim através do site e gostaria de falar por telefone.'
  };


  let menuAberto = false;
  let animacaoEmAndamento = false;


  let menuPrincipal = null;
  let botaoPrincipal = null;
  let opcoes = null;
  let botaoWhatsApp = null;
  let botaoInstagram = null;
  let botaoTelefone = null;


  function inicializar() {
    console.log('Inicializando sistema de menu flutuante...');


    menuPrincipal = document.querySelector('.floating-menu');
    botaoPrincipal = document.querySelector('.floating-main-btn');
    opcoes = document.querySelector('.floating-options');
    botaoWhatsApp = document.querySelector('.floating-option.whatsapp');
    botaoInstagram = document.querySelector('.floating-option.instagram');
    botaoTelefone = document.querySelector('.floating-option.phone');


    if (!menuPrincipal || !botaoPrincipal || !opcoes) {
      console.warn('Elementos do menu flutuante não encontrados');
      return;
    }

    console.log('Elementos encontrados, configurando eventos...');
    configurarEventos();
    configurarLinks();
  }


  function configurarEventos() {

    botaoPrincipal.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      alternarMenu();
    });


    menuPrincipal.addEventListener('click', function (e) {
      e.stopPropagation();
    });


    document.addEventListener('click', function (e) {
      if (menuAberto && !menuPrincipal.contains(e.target)) {
        fecharMenu();
      }
    });


    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuAberto) {
        fecharMenu();
      }
    });


    configurarTooltips();
  }


  function configurarLinks() {
    if (botaoWhatsApp) {
      botaoWhatsApp.addEventListener('click', function (e) {
        e.preventDefault();
        abrirWhatsApp('whatsapp');
        fecharMenu();
      });
    }

    if (botaoInstagram) {
      botaoInstagram.addEventListener('click', function (e) {
        e.preventDefault();
        abrirWhatsApp('instagram');
        fecharMenu();
      });
    }

    if (botaoTelefone) {
      botaoTelefone.addEventListener('click', function (e) {
        e.preventDefault();
        abrirWhatsApp('telefone');
        fecharMenu();
      });
    }
  }


  function configurarTooltips() {
    const opcoesBotoes = document.querySelectorAll('.floating-option');

    opcoesBotoes.forEach(botao => {
      const tooltip = botao.querySelector('.tooltip');
      if (!tooltip) return;


      botao.addEventListener('mouseenter', function () {
        if (botao.classList.contains('whatsapp')) {
          tooltip.textContent = 'Falar no WhatsApp';
        } else if (botao.classList.contains('instagram')) {
          tooltip.textContent = 'Seguir no Instagram';
        } else if (botao.classList.contains('phone')) {
          tooltip.textContent = 'Ligar Agora';
        }
      });


      if (botao.classList.contains('instagram')) {
        botao.addEventListener('click', function (e) {
          e.preventDefault();
          window.open('https:
          fecharMenu();
        });
      }


      if (botao.classList.contains('phone')) {
        botao.addEventListener('click', function (e) {
          e.preventDefault();
          window.open('tel:+557930454880', '_self');
          fecharMenu();
        });
      }


      botao.addEventListener('mouseleave', function () {
        if (botao.classList.contains('whatsapp')) {
          tooltip.textContent = 'WhatsApp';
        } else if (botao.classList.contains('instagram')) {
          tooltip.textContent = 'Instagram';
        } else if (botao.classList.contains('phone')) {
          tooltip.textContent = 'Ligar';
        }
      });
    });
  }


  function alternarMenu() {
    if (animacaoEmAndamento) return;

    if (menuAberto) {
      fecharMenu();
    } else {
      abrirMenu();
    }
  }


  function abrirMenu() {
    if (animacaoEmAndamento || menuAberto) return;

    animacaoEmAndamento = true;
    menuAberto = true;

    console.log('Abrindo menu flutuante...');


    menuPrincipal.classList.add('menu-ativo');


    const icone = botaoPrincipal.querySelector('i');
    if (icone) {
      icone.style.transform = 'rotate(45deg)';
    }


    opcoes.style.display = 'flex';


    setTimeout(() => {
      opcoes.classList.add('opcoes-visiveis');
      animacaoEmAndamento = false;
    }, 10);


    const botoesOpcoes = opcoes.querySelectorAll('.floating-option');
    botoesOpcoes.forEach((botao, index) => {
      setTimeout(() => {
        botao.classList.add('botao-visivel');
      }, index * 100);
    });
  }


  function fecharMenu() {
    if (animacaoEmAndamento || !menuAberto) return;

    animacaoEmAndamento = true;
    menuAberto = false;

    console.log('Fechando menu flutuante...');


    menuPrincipal.classList.remove('menu-ativo');


    const icone = botaoPrincipal.querySelector('i');
    if (icone) {
      icone.style.transform = 'rotate(0deg)';
    }


    opcoes.classList.remove('opcoes-visiveis');


    const botoesOpcoes = opcoes.querySelectorAll('.floating-option');
    botoesOpcoes.forEach(botao => {
      botao.classList.remove('botao-visivel');
    });


    setTimeout(() => {
      if (!menuAberto) {
        opcoes.style.display = 'none';
      }
      animacaoEmAndamento = false;
    }, 300);
  }


  function abrirWhatsApp(tipo) {
    let mensagem = WHATSAPP_CONFIG.mensagemPadrao;

    switch (tipo) {
      case 'whatsapp':
        mensagem = WHATSAPP_CONFIG.mensagemWhatsApp;
        break;
      case 'instagram':
        mensagem = WHATSAPP_CONFIG.mensagemInstagram;
        break;
      case 'telefone':
        mensagem = WHATSAPP_CONFIG.mensagemTelefone;
        break;
    }

    const url = `https:

    console.log(`Abrindo WhatsApp (${tipo}):`, url);


    mostrarFeedback(tipo);


    window.open(url, '_blank');
  }


  function mostrarFeedback(tipo) {
    const botao = botaoPrincipal;
    const icone = botao.querySelector('i');


    if (icone) {
      const iconeOriginal = icone.className;
      icone.className = 'fas fa-check';
      icone.style.color = '#4CAF50';


      setTimeout(() => {
        icone.className = iconeOriginal;
        icone.style.color = '';
      }, 1000);
    }


    botao.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
    setTimeout(() => {
      botao.style.background = '';
    }, 1000);
  }


  window.FloatingMenu = {
    abrir: abrirMenu,
    fechar: fecharMenu,
    alternar: alternarMenu,
    estaAberto: () => menuAberto
  };


  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializar);
  } else {
    inicializar();
  }

  console.log('Sistema de menu flutuante carregado');

})();
