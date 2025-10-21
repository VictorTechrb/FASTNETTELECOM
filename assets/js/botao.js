(function() {
  'use strict';

  const PLANOS = {
    basico: {
      nome: 'Plano Básico',
      velocidade: '400MB',
      preco: 'R$ 65,90',
      beneficios: [
        'Wi-Fi de última geração',
        'Fastnet Play',
        'Digilivros'
      ]
    },
    avancado: {
      nome: 'Plano Avançado', 
      velocidade: '700MB',
      preco: 'R$ 89,90',
      beneficios: [
        'Wi-Fi de última geração',
        'Fastnet Play',
        'Digilivros'
      ]
    },
    premium: {
      nome: 'Plano Premium',
      velocidade: '1GB',
      preco: 'R$ 125,90',
      beneficios: [
        'Wi-Fi de última geração',
        'Fastnet Play',
        'Digilivros'
      ]
    }
  };

  const ATIVIDADES_VALORES = {
    browsing: 50,
    streaming: 100,
    gaming: 300,
    videocall: 200,
    content: 200,
    smarthome: 150
  };

  const NOMES_ATIVIDADES = {
    browsing: 'Navegação Básica',
    streaming: 'Streaming de Vídeo',
    gaming: 'Jogos Online',
    videocall: 'Videochamadas / Home Office',
    content: 'Criação de Conteúdo / Live',
    smarthome: 'Casa Inteligente'
  };

  const WHATSAPP_NUMERO = '557930454880';

  function coletarDadosSimulador() {
    const checkboxes = document.querySelectorAll('.atividade-check:checked');
    const dispositivosRange = document.getElementById('dispositivos-range');
    if (!dispositivosRange) {
      console.error('Elemento dispositivos-range não encontrado');
      return null;
    }
    const atividadesSelecionadas = [];
    let velocidadeNecessaria = 0;
    checkboxes.forEach(checkbox => {
      const atividade = checkbox.value;
      const mbps = ATIVIDADES_VALORES[atividade] || 0;
      velocidadeNecessaria += mbps;
      if (NOMES_ATIVIDADES[atividade]) {
        atividadesSelecionadas.push(NOMES_ATIVIDADES[atividade]);
      }
    });
    const dispositivos = parseInt(dispositivosRange.value) || 1;
    velocidadeNecessaria += dispositivos * 10; 
    if (velocidadeNecessaria > 1000) {
      velocidadeNecessaria = 1000;
    }
    return {
      atividades: atividadesSelecionadas,
      dispositivos: dispositivos,
      velocidadeCalculada: velocidadeNecessaria
    };
  }

  function determinarPlanoIdeal(velocidadeNecessaria) {
    if (velocidadeNecessaria <= 400) {
      return PLANOS.basico;
    } else if (velocidadeNecessaria <= 700) {
      return PLANOS.avancado;
    } else {
      return PLANOS.premium;
    }
  }

  function atualizarModal(dados, plano) {
    const velocidadePlano = document.getElementById('velocidade-plano');
    const nomePlano = document.getElementById('nome-plano');
    const precoPlano = document.getElementById('preco-plano');
    if (velocidadePlano) velocidadePlano.textContent = plano.velocidade;
    if (nomePlano) nomePlano.textContent = plano.nome;
    if (precoPlano) precoPlano.textContent = plano.preco;
    const velocidadeCalculada = document.getElementById('velocidade-calculada');
    const dispositivosModal = document.getElementById('dispositivos-modal');
    if (velocidadeCalculada) velocidadeCalculada.textContent = dados.velocidadeCalculada + 'MB';
    if (dispositivosModal) dispositivosModal.textContent = dados.dispositivos;
    const listaAtividades = document.getElementById('lista-atividades-modal');
    if (listaAtividades) {
      listaAtividades.innerHTML = '';
      dados.atividades.forEach(atividade => {
        const li = document.createElement('li');
        li.textContent = atividade;
        listaAtividades.appendChild(li);
      });
    }
    const beneficiosLista = document.getElementById('beneficios-lista');
    if (beneficiosLista) {
      beneficiosLista.innerHTML = '';
      plano.beneficios.forEach(beneficio => {
        const li = document.createElement('li');
        li.innerHTML = `• ${beneficio}`;
        beneficiosLista.appendChild(li);
      });
    }
  }

  function gerarMensagemWhatsApp(dados, plano) {
    let mensagem = `Olá! Gostaria de contratar um plano Fastnet\n\n`;
    mensagem += `Calculei minha velocidade ideal e recebi a seguinte recomendação:\n\n`;
    mensagem += `Plano Recomendado: ${plano.nome}\n`;
    mensagem += `Velocidade: ${plano.velocidade}\n`;
    mensagem += `Preço: ${plano.preco}/mês\n\n`;
    mensagem += `Minhas atividades online:\n`;
    dados.atividades.forEach(atividade => {
      mensagem += `• ${atividade}\n`;
    });
    mensagem += `\nVelocidade calculada necessária: ${dados.velocidadeCalculada}MB\n\n`;
    mensagem += `O que está incluído no plano:\n`;
    plano.beneficios.forEach(beneficio => {
      mensagem += `• ${beneficio}\n`;
    });
    mensagem += `\nGostaria de mais informações e contratar este plano!`;
    return mensagem;
  }

  function abrirWhatsApp(mensagem) {
    const mensagemCodificada = encodeURIComponent(mensagem);
    const urlWhatsApp = `https:
    window.open(urlWhatsApp, '_blank');
  }

  window.descobrirPlanoIdeal = function() {
    console.log('Descobrir plano ideal iniciado');
    const dados = coletarDadosSimulador();
    if (!dados) {
      alert('Erro ao coletar dados do simulador. Verifique se todos os elementos estão presentes.');
      return;
    }
    if (dados.atividades.length === 0) {
      alert('Por favor, selecione pelo menos uma atividade antes de descobrir seu plano ideal.');
      return;
    }
    const planoIdeal = determinarPlanoIdeal(dados.velocidadeCalculada);
    atualizarModal(dados, planoIdeal);
    window.dadosPlanoAtual = {
      dados: dados,
      plano: planoIdeal
    };
    const modal = document.getElementById('modal-plano-ideal');
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      console.log('Modal exibido com sucesso');
    } else {
      console.error('Modal não encontrado');
      alert('Erro: Modal não encontrado na página.');
    }
  };

  window.fecharModal = function() {
    const modal = document.getElementById('modal-plano-ideal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
      console.log('Modal fechado');
    }
  };

  window.contratarPlanoWhatsApp = function() {
    const dadosAtuais = window.dadosPlanoAtual;
    if (!dadosAtuais) {
      alert('Erro: Dados do plano não encontrados. Tente descobrir o plano novamente.');
      return;
    }
    const mensagem = gerarMensagemWhatsApp(dadosAtuais.dados, dadosAtuais.plano);
    abrirWhatsApp(mensagem);
    window.fecharModal();
    console.log('Mensagem enviada para WhatsApp');
  };

  document.addEventListener('click', function(e) {
    const modal = document.getElementById('modal-plano-ideal');
    if (modal && e.target === modal) {
      window.fecharModal();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      window.fecharModal();
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    console.log('Botão Descobrir Plano Ideal carregado e pronto!');
    const btnDescobrir = document.getElementById('btn-descobrir-plano');
    if (btnDescobrir) {
      btnDescobrir.disabled = true;
      btnDescobrir.style.opacity = '0.5';
      btnDescobrir.style.cursor = 'not-allowed';
      const checkboxes = document.querySelectorAll('.atividade-check');
      checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
          const atividadesSelecionadas = document.querySelectorAll('.atividade-check:checked');
          if (atividadesSelecionadas.length > 0) {
            btnDescobrir.disabled = false;
            btnDescobrir.style.opacity = '1';
            btnDescobrir.style.cursor = 'pointer';
          } else {
            btnDescobrir.disabled = true;
            btnDescobrir.style.opacity = '0.5';
            btnDescobrir.style.cursor = 'not-allowed';
          }
        });
      });
    }
  });

})();
