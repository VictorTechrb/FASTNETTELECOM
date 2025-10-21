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
      contadorMbps.textContent = currentMbps;
      
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
    if (total > maxMbps) total = maxMbps;
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
    } else if (total >= maxMbps) {
      status.textContent = '🚀 Nosso plano 1GB é ideal para você!';
    } else if (total >= 701) {
      status.textContent = '⚡ Plano indicado 1GB';
    } else if (total >= 401) {
      status.textContent = '✨ Plano indicado 700MB';
    } else {
      status.textContent = '📈 Plano indicado 400MB';
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
    
    
    let planoRecomendado = {
      nome: 'Plano Básico',
      velocidade: '400MB',
      preco: 'R$ 65,90',
      beneficios: [
        '📶 Wi-Fi de última geração',
        '📺 Fastnet Play', 
        '📚 Digilivros'
      ]
    };
    
  if (velocidadeNecessaria > 700) {
    planoRecomendado = {
      nome: 'Plano Premium',
      velocidade: '1GB',
      preco: 'R$ 125,90',
      beneficios: [
        '📶 Wi-Fi de última geração',
        '📺 Fastnet Play',
        '📚 Digilivros',
        '🎮 Gaming prioritário',
        '☁️ Backup em nuvem'
      ]
    };
  } else if (velocidadeNecessaria > 400) {
    planoRecomendado = {
  nome: 'Plano Conecta',
      velocidade: '700MB', 
  preco: 'R$ 69,90',
      beneficios: [
        '📶 Wi-Fi de última geração',
        '📺 Fastnet Play',
        '📚 Digilivros',
        '🎵 Streaming de música'
      ]
    };
  }
    
    
    if (atividadesSelecionadas.length === 0) {
      alert('⚠️ Por favor, selecione pelo menos uma atividade para descobrir seu plano ideal!');
      return;
    }
    
    
    document.getElementById('velocidade-plano').textContent = planoRecomendado.velocidade;
    document.getElementById('nome-plano').textContent = planoRecomendado.nome;
    document.getElementById('preco-plano').textContent = planoRecomendado.preco;
    document.getElementById('velocidade-calculada').textContent = velocidadeNecessaria + 'MB';
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
    
    if (!dados) {
      alert('Erro: Dados do plano não encontrados.');
      return;
    }
    
    
    let mensagem = `Olá! Gostaria de contratar um plano Fastnet\n\n`;
    mensagem += `Calculei minha velocidade ideal e recebi a seguinte recomendação:\n\n`;
    mensagem += `Plano Recomendado: ${dados.plano.nome}\n`;
    mensagem += `Velocidade: ${dados.plano.velocidade}\n`;
    mensagem += `Preço: ${dados.plano.preco}/mês\n\n`;
    mensagem += `Minhas atividades online:\n`;
    dados.atividades.forEach(atividade => {
      mensagem += `• ${atividade}\n`;
    });
    mensagem += `\nVelocidade calculada necessária: ${dados.velocidadeCalculada}MB\n\n`;
    mensagem += `O que está incluído no plano:\n`;
    dados.plano.beneficios.forEach(beneficio => {
      mensagem += `• ${beneficio}\n`;
    });
    mensagem += `\nGostaria de mais informações e contratar este plano!`;
    
    
    const mensagemCodificada = encodeURIComponent(mensagem);
    
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
