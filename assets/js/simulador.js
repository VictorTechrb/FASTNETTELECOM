document.addEventListener('DOMContentLoaded', function() {
  console.log('Simulador: DOM carregado');
  
(function() {
  console.log('Simulador: Iniciando função principal');
  
  const atividadesValores = {
    browsing: 50,
    streaming: 100,
    gaming: 300,
    videocall: 200,
    content: 200,
    smarthome: 150
  };
  const maxMbps = 1000;
  const mbpsPorDispositivo = 10;
  
  
  
  const PLANOS = {
    p300: {
      id: 'p300', nome: 'Plano Básico', velocidade: 300, rotulo: '300MB', preco: 'R$ 65,00', incluiRoteador: false,
      beneficios: ['📶 Fibra Óptica', '📺 Fastnet Play', '📚 Digilivros']
    },
    p500: {
      id: 'p500', nome: 'Plano Conecta', velocidade: 500, rotulo: '500MB', preco: 'R$ 80,00', incluiRoteador: true,
      beneficios: ['📶 Wi-Fi de última geração', '📺 Fastnet Play', '📚 Digilivros']
    },
    p700: {
      id: 'p700', nome: 'Plano Plus', velocidade: 700, rotulo: '700MB', preco: 'R$ 89,00', incluiRoteador: true,
      beneficios: ['📶 Wi-Fi de última geração', '📺 Fastnet Play', '📚 Digilivros']
    },
    p1000: {
      id: 'p1000', nome: 'Plano Premium', velocidade: 1000, rotulo: '1GB', preco: 'R$ 119,00', incluiRoteador: true,
      beneficios: ['📶 Wi-Fi de última geração', '📺 Fastnet Play', '📚 Digilivros']
    }
  };

  
  
  function recomendarPlanoPorVelocidade(vel) {
    if (vel <= 299) return PLANOS.p300;      
    if (vel <= 699) return PLANOS.p700;      
    return PLANOS.p1000;                     
  }

  function formatarPreco(p) { return typeof p === 'number' ? p.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}) : p; }

  
  function criarMensagemWhatsApp(dados) {
    const plano = dados.plano;
    const incluiRoteadorTxt = plano.incluiRoteador ? '✅ Inclui roteador Wi‑Fi' : '❌ Sem roteador incluso';
    let msg = '';
    msg += '🚀 Olá! Gostaria de contratar um plano Fastnet\n\n';
    msg += '🧠 Calculei minha velocidade ideal e recebi a seguinte recomendação:\n\n';
    msg += `✅ Plano Recomendado: ${plano.nome}\n`;
    msg += `🚀 Velocidade: ${plano.rotulo}\n`;
    msg += `💰 Preço: ${formatarPreco(plano.preco)}/mês\n`;
    msg += `${incluiRoteadorTxt}\n\n`;
    msg += 'Minhas atividades online:\n';
    dados.atividades.forEach(a => { msg += `• ${a}\n`; });
    const velocidadeTexto = dados.velocidadeCalculada >= 1000 ? '1GB' : dados.velocidadeCalculada + 'MB';
    msg += `\nVelocidade calculada necessária: ${velocidadeTexto}\n\n`;
    msg += 'O que está incluído no plano:\n';
    plano.beneficios.forEach(b => { msg += `• ${b}\n`; });
    msg += '\nGostaria de mais informações e contratar este plano!';
    return msg;
  }

  
  const checkboxes = document.querySelectorAll('.atividade-check');
  const rangeDispositivos = document.getElementById('dispositivos-range');
  const contadorDispositivos = document.getElementById('contador-dispositivos');
  const contadorMbps = document.getElementById('contador-mbps');
  const gaugeBar = document.getElementById('gauge-bar');
  const status = document.getElementById('contador-status');

  console.log('Simulador: Elementos encontrados:', {
    checkboxes: checkboxes.length,
    rangeDispositivos: !!rangeDispositivos,
    contadorDispositivos: !!contadorDispositivos,
    contadorMbps: !!contadorMbps,
    gaugeBar: !!gaugeBar,
    status: !!status
  });

  
  if (!checkboxes.length || !rangeDispositivos || !contadorDispositivos || !contadorMbps || !gaugeBar || !status) {
    console.error('Simulador: Elementos necessários não encontrados no DOM');
    return;
  }

  
  let animFrame;
  let currentMbps = 0;
  let currentPercent = 0;
  function animateTo(targetMbps, targetPercent) {
    if (animFrame) cancelAnimationFrame(animFrame);
    const startMbps = currentMbps;
    const startPercent = currentPercent;
    const diffMbps = targetMbps - startMbps;
    const diffPercent = targetPercent - startPercent;
    const duration = 750;
    const startTime = performance.now();
    function animate(now) {
      const elapsed = Math.min((now - startTime) / duration, 1);
      
      const ease = 1 - Math.pow(1 - elapsed, 3);
      currentMbps = Math.round(startMbps + diffMbps * ease);
      currentPercent = startPercent + diffPercent * ease;
      
      
      if (currentMbps >= 1000) {
        contadorMbps.textContent = '1GB';
        
        const unidadeElement = document.querySelector('.contador-mbps-unit');
        if (unidadeElement) {
          unidadeElement.textContent = '';
        }
      } else {
        contadorMbps.textContent = currentMbps;
        
        const unidadeElement = document.querySelector('.contador-mbps-unit');
        if (unidadeElement) {
          unidadeElement.textContent = 'MB';
        }
      }
      
      const circ = 2 * Math.PI * 60;
      gaugeBar.setAttribute('stroke-dasharray', `${(circ * currentPercent).toFixed(2)} ${(circ * (1 - currentPercent)).toFixed(2)}`);
      if (elapsed < 1) {
        animFrame = requestAnimationFrame(animate);
      }
    }
    animFrame = requestAnimationFrame(animate);
  }

  function atualizarSimulador() {
    console.log('Simulador: Atualizando simulador');
    let total = 0;
    checkboxes.forEach(cb => {
      if (cb.checked) {
        const valor = atividadesValores[cb.value] || 0;
        total += valor;
        console.log(`Atividade ${cb.value}: ${valor}MB`);
      }
    });
    const dispositivos = parseInt(rangeDispositivos.value, 10);
    total += dispositivos * mbpsPorDispositivo;
    
    
    if (total > maxMbps) {
      total = maxMbps;
    }
    
    contadorDispositivos.textContent = dispositivos;
    
    console.log(`Total calculado: ${total}MB, Dispositivos: ${dispositivos}`);
    
    const btnDescobrir = document.getElementById('btn-descobrir-plano');
    const atividadesSelecionadas = document.querySelectorAll('.atividade-check:checked').length;
    
    if (btnDescobrir) {
      if (atividadesSelecionadas === 0) {
        btnDescobrir.disabled = true;
        btnDescobrir.style.opacity = '0.5';
        btnDescobrir.style.cursor = 'not-allowed';
      } else {
        btnDescobrir.disabled = false;
        btnDescobrir.style.opacity = '1';
        btnDescobrir.style.cursor = 'pointer';
      }
    }
    
    
    const percent = total / maxMbps;
    animateTo(total, percent);
    
    if (total === 0) {
      status.textContent = '💡 Selecione suas atividades para começar';
    } else {
      const recomendado = recomendarPlanoPorVelocidade(total);
      const prefix = total >= maxMbps ? '🚀' : total > 700 ? '⚡' : total > 300 ? '✨' : '📈';
      status.textContent = `${prefix} Plano indicado ${recomendado.rotulo}`;
    }
  }

  
  function descobrirPlanoIdeal() {
    
    const checkboxes = document.querySelectorAll('.atividade-check:checked');
    const atividadesSelecionadas = [];
    let velocidadeNecessaria = 0;
    
    
    const nomesAtividades = {
      browsing: 'Navegação Básica',
      streaming: 'Streaming de Vídeo', 
      gaming: 'Jogos Online',
      videocall: 'Videochamadas / Home Office',
      content: 'Criação de Conteúdo / Live',
      smarthome: 'Casa Inteligente'
    };
    
    
    checkboxes.forEach(cb => {
      const atividade = cb.value;
      const mbps = parseInt(cb.dataset.mbps) || 0;
      velocidadeNecessaria += mbps;
      atividadesSelecionadas.push(nomesAtividades[atividade] || atividade);
    });
    
    
    const dispositivos = parseInt(document.getElementById('dispositivos-range').value);
    velocidadeNecessaria += dispositivos * 10; 
    
    
    if (velocidadeNecessaria > 1000) {
      velocidadeNecessaria = 1000;
    }
    
    
    const planoObj = recomendarPlanoPorVelocidade(velocidadeNecessaria);
    const planoRecomendado = {
      nome: planoObj.nome,
      velocidade: planoObj.rotulo,
      preco: planoObj.preco,
      beneficios: planoObj.beneficios,
      incluiRoteador: planoObj.incluiRoteador
    };
    
    
    if (atividadesSelecionadas.length === 0) {
      alert('⚠️ Por favor, selecione pelo menos uma atividade para descobrir seu plano ideal!');
      return;
    }
    
    
  document.getElementById('velocidade-plano').textContent = planoRecomendado.velocidade;
    document.getElementById('nome-plano').textContent = planoRecomendado.nome;
    document.getElementById('preco-plano').textContent = planoRecomendado.preco;
    
    
    const velocidadeTexto = velocidadeNecessaria >= 1000 ? '1GB' : velocidadeNecessaria + 'MB';
    document.getElementById('velocidade-calculada').textContent = velocidadeTexto;
    document.getElementById('dispositivos-modal').textContent = dispositivos;
    
    
    const listaAtividades = document.getElementById('lista-atividades-modal');
    listaAtividades.innerHTML = '';
    atividadesSelecionadas.forEach(atividade => {
      const li = document.createElement('li');
      li.textContent = '• ' + atividade;
      listaAtividades.appendChild(li);
    });
    
    
    const listaBeneficios = document.getElementById('beneficios-lista');
    if (listaBeneficios) {
      listaBeneficios.innerHTML = '';
      planoRecomendado.beneficios.forEach(beneficio => {
        const li = document.createElement('li');
        li.textContent = beneficio;
        listaBeneficios.appendChild(li);
      });
    }
    
    
    window.planoRecomendadoData = {
      plano: planoRecomendado,
      atividades: atividadesSelecionadas,
      dispositivos: dispositivos,
      velocidadeCalculada: velocidadeNecessaria
    };
    
    
    document.getElementById('modal-plano-ideal').style.display = 'flex';
    document.body.style.overflow = 'hidden'; 
  }

  
  function fecharModal() {
    document.getElementById('modal-plano-ideal').style.display = 'none';
    document.body.style.overflow = 'auto'; 
  }

  
  function contratarPlanoWhatsApp() {
    const dados = window.planoRecomendadoData;
    if (!dados) { alert('Erro: Dados do plano não encontrados.'); return; }
    const mensagemCodificada = encodeURIComponent(criarMensagemWhatsApp(dados));
    const numeroWhatsApp = '557930454880';
    const urlWhatsApp = `https:
    window.open(urlWhatsApp, '_blank');
    fecharModal();
  }

  
  window.descobrirPlanoIdeal = descobrirPlanoIdeal;
  window.fecharModal = fecharModal;
  window.contratarPlanoWhatsApp = contratarPlanoWhatsApp;

  
  checkboxes.forEach((cb, index) => {
    console.log(`Adicionando listener para checkbox ${index}`);
    cb.addEventListener('change', function() {
      console.log(`Checkbox ${index} mudou para:`, cb.checked, 'valor:', cb.value);
      atualizarSimulador();
    });
  });
  
  rangeDispositivos.addEventListener('input', function() {
    console.log('Range mudou para:', rangeDispositivos.value);
    atualizarSimulador();
  });
  
  
  atualizarSimulador();
  
  
  setTimeout(() => {
    const btnDescobrir = document.getElementById('btn-descobrir-plano');
    if (btnDescobrir) {
      btnDescobrir.disabled = true;
      btnDescobrir.style.opacity = '0.5';
      btnDescobrir.style.cursor = 'not-allowed';
    }
  }, 100);
})();
});
