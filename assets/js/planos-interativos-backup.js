document.addEventListener('DOMContentLoaded', function() {
    inicializarPlanosInterativos();
    setTimeout(destacarPlanoPopular, 1000);
    animarEntradaCards();
});



const appsData = {
    'standard': [
        { id: 'std_1', name: 'SKY+ Light', icon: 'https:
        { id: 'std_2', name: 'iLooke', icon: 'https:
        { id: 'std_3', name: 'PlayKids+', icon: 'https:
        { id: 'std_4', name: 'Kaspersky I', icon: 'https:
        { id: 'std_5', name: 'ExitLag', icon: 'https:
        { id: 'std_6', name: 'KiddlePass', icon: 'https:
        { id: 'std_7', name: 'Hub Vantagens', icon: 'https:
        { id: 'std_8', name: 'UBookPlus', icon: 'https:
        { id: 'std_9', name: 'SocialComics', icon: 'https:
        { id: 'std_10', name: 'Estuda+', icon: 'https:
        { id: 'std_11', name: 'Playlist', icon: 'https:
        { id: 'std_12', name: '+QNutri', icon: 'https:
        { id: 'std_13', name: 'Hube Revistas', icon: 'https:
        { id: 'std_14', name: 'Fluid', icon: 'https:
        { id: 'std_15', name: 'CurtaON', icon: 'https:
        { id: 'std_16', name: 'DocWay', icon: 'https:
        { id: 'std_17', name: 'PlayKids', icon: 'https:
        { id: 'std_18', name: 'KiddlePass Plus', icon: 'https:
    ],
    'advanced': [
        { id: 'adv_1', name: 'SKY+ Light e Globo', icon: 'https:
        { id: 'adv_2', name: 'Deezer', icon: 'https:
        { id: 'adv_3', name: 'KiddlePass', icon: 'https:
        { id: 'adv_4', name: 'Kaspersky III', icon: 'https:
        { id: 'adv_5', name: 'HotGo', icon: 'https:
        { id: 'adv_6', name: 'CurtaOn', icon: 'https:
        { id: 'adv_7', name: 'O Jornalista', icon: 'https:
        { id: 'adv_8', name: 'DocWay', icon: 'https:
    ],
    'premium': [
        { id: 'pre_1', name: 'Disney+', icon: 'https:
        { id: 'pre_2', name: 'Max', icon: 'https:
        { id: 'pre_3', name: 'NBA', icon: 'https:
        { id: 'pre_4', name: 'SmartContent', icon: 'https:
        { id: 'pre_5', name: 'Kaspersky Plus', icon: 'https:
        { id: 'pre_6', name: 'QueimadiÁria', icon: 'https:
        { id: 'pre_7', name: 'Zen', icon: 'https:
    ]
};




const PRECOS_ALACARDS = {
    'standard': 5.00,
    'advanced': 10.00,
    'premium': 25.00
};


let selectedApps = []; 
let currentCategory = ''; 
let currentPlan = ''; 
let showedPopupOnSecond = false; 

function inicializarPlanosInterativos() {
    console.log('🚀 Sistema A la Carte inicializado!');
    console.log('📱 Apps disponíveis por categoria:');
    console.log('Standard:', appsData.standard.length, 'apps');
    console.log('Advanced:', appsData.advanced.length, 'apps');  
    console.log('Premium:', appsData.premium.length, 'apps');
    console.log('💰 Preços: Standard R$5, Advanced R$10, Premium R$25');
}


function abrirModalApps(tipoPlano, nomeDoPlano) {
    
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    console.log(`🎯 Verificando estado para: ${tipoPlano} em plano ${nomeDoPlano}`);
    
    
    const planoCard = document.querySelector(`[data-plano="${nomeDoPlano}"]`);
    if (!planoCard) {
        console.error(`❌ Plano card não encontrado: ${nomeDoPlano}`);
        return;
    }
    
    const checkbox = planoCard.querySelector(`input[value="${tipoPlano}"]`);
    if (!checkbox) {
        console.error(`❌ Checkbox não encontrado: ${tipoPlano} em ${nomeDoPlano}`);
        return;
    }
    
    
    if (checkbox.checked) {
        
        console.log(`🔄 Checkbox marcado: desmarcando e limpando aplicativos...`);
        desmarcarELimparAplicativos(checkbox, tipoPlano, nomeDoPlano, planoCard);
    } else {
        
        console.log(`🎯 Checkbox desmarcado: abrindo modal para seleção...`);
        abrirModalParaSelecao(tipoPlano, nomeDoPlano, checkbox, planoCard);
    }
}


function abrirModalParaSelecao(tipoPlano, nomeDoPlano, checkbox, planoCard) {
    console.log(`🚀 Abrindo modal de seleção: ${tipoPlano} para plano ${nomeDoPlano}`);
    
    
    currentCategory = tipoPlano;
    currentPlan = nomeDoPlano;
    selectedApps = []; 
    showedPopupOnSecond = false; 
    
    
    const modalTitle = document.getElementById('modal-title');
    const categoryName = tipoPlano.charAt(0).toUpperCase() + tipoPlano.slice(1);
    modalTitle.textContent = `APP's ${categoryName} - R$ ${PRECOS_ALACARDS[tipoPlano].toFixed(2)} cada`;
    
    
    renderizarAppsNoModal(tipoPlano);
    
    
    atualizarInfoPrecos(tipoPlano);
    
    
    atualizarContadorSelecao();
    atualizarPrecoTotal();
    
    
    document.getElementById('apps-modal').style.display = 'flex';
    
    
    document.querySelector('.apps-modal-content').style.animation = 'modalSlideIn 0.3s ease-out';
}


function desmarcarELimparAplicativos(checkbox, tipoPlano, nomeDoPlano, planoCard) {
    console.log(`🧹 Desmarcando e limpando: ${tipoPlano} do plano ${nomeDoPlano}`);
    
    
    checkbox.checked = false;
    console.log(`❌ Checkbox desmarcado`);
    
    
    const precoOriginal = PRECOS_ALACARDS[tipoPlano];
    checkbox.setAttribute('data-preco', '0');
    console.log(`💰 Preço resetado de ${precoOriginal} para 0`);
    
    
    const extraOpcao = checkbox.closest('.extra-opcao');
    if (extraOpcao) {
        const extraNome = extraOpcao.querySelector('.extra-nome');
        const extraPreco = extraOpcao.querySelector('.extra-preco');
        
        if (extraNome && extraPreco) {
            const categoriaFormatada = tipoPlano.charAt(0).toUpperCase() + tipoPlano.slice(1);
            
            
            extraNome.textContent = `APP's ${categoriaFormatada}`;
            extraPreco.textContent = `+ R$ ${precoOriginal.toFixed(2)}`;
            
            
            extraPreco.style.fontWeight = '';
            extraPreco.style.color = '';
            
            console.log(`🎨 Interface atualizada para estado original`);
        }
    }
    
    
    calcularPrecoTotalPlano(planoCard);
    console.log(`💲 Preço total do plano recalculado`);
    
    
    mostrarFeedbackLimpeza(tipoPlano, nomeDoPlano);
    
    
    const modal = document.getElementById('apps-modal');
    if (modal && modal.style.display === 'flex') {
        console.log(`🚪 Fechando modal aberto`);
        fecharModalApps(false);
    }
}


function mostrarFeedbackLimpeza(tipoPlano, nomeDoPlano) {
    const categoriaFormatada = tipoPlano.charAt(0).toUpperCase() + tipoPlano.slice(1);
    
    
    const toast = document.createElement('div');
    toast.className = 'toast-notification toast-clear';
    toast.innerHTML = `
        <div class="toast-content">
            <div class="toast-icon">🧹</div>
            <div class="toast-text">
                <strong>Aplicativos removidos!</strong><br>
                ${categoriaFormatada} desmarcado do ${nomeDoPlano}
            </div>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
    
    console.log(`✅ Feedback de limpeza exibido para ${categoriaFormatada} em ${nomeDoPlano}`);
}


function renderizarAppsNoModal(categoria) {
    const appsGrid = document.getElementById('apps-grid');
    const apps = appsData[categoria] || [];
    
    console.log(`📱 Renderizando ${apps.length} apps da categoria ${categoria}`);
    
    
    appsGrid.innerHTML = '';
    
    
    if (apps.length === 0) {
        appsGrid.innerHTML = '<p class="no-apps">Nenhum aplicativo disponível nesta categoria.</p>';
        return;
    }
    
    
    apps.forEach((app) => {
        const appCard = document.createElement('div');
        appCard.className = 'app-card';
        appCard.setAttribute('data-app-id', app.id);
        appCard.setAttribute('data-app-name', app.name);
        
        
        const isSelected = selectedApps.some(selectedApp => selectedApp.id === app.id);
        
        appCard.innerHTML = `
            <div class="app-icon">
                <img src="${app.icon}" alt="${app.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=&quot;http:
            </div>
            <div class="app-name">${app.name}</div>
            <div class="app-price">R$ ${PRECOS_ALACARDS[categoria].toFixed(2)}</div>
            <div class="app-selection-indicator">
                <div class="selection-circle">${isSelected ? '✓' : ''}</div>
                <span class="selection-text">${isSelected ? 'Selecionado' : 'Selecionar'}</span>
            </div>
        `;
        
        
        if (isSelected) {
            appCard.classList.add('selected');
            appCard.style.background = 'linear-gradient(135deg, #e8f5e8, #d4edda)';
            appCard.style.borderColor = '#28a745';
        }
        
        
        appCard.addEventListener('click', () => selecionarApp(app, categoria));
        
        appsGrid.appendChild(appCard);
    });
    
    console.log(`✅ ${apps.length} apps renderizados com sucesso!`);
    console.log(`🎯 Apps já selecionados: ${selectedApps.length}`);
}


function selecionarApp(app, categoria) {
    console.log(`🎯 Tentando selecionar app: ${app.name} (${app.id})`);
    
    
    const appIndex = selectedApps.findIndex(selectedApp => selectedApp.id === app.id);
    const isCurrentlySelected = appIndex !== -1;
    
    if (isCurrentlySelected) {
        
        selectedApps.splice(appIndex, 1);
        console.log(`❌ App ${app.name} removido da seleção`);
        atualizarVisualSelecao(app.id, false);
    } else {
        
        
        
        if (selectedApps.length === 1 && !showedPopupOnSecond) {
            mostrarPopupSegundoApp(categoria);
            showedPopupOnSecond = true;
        }
        
        selectedApps.push({
            id: app.id,
            name: app.name,
            categoria: categoria,
            preco: PRECOS_ALACARDS[categoria]
        });
        
        console.log(`✅ App ${app.name} adicionado à seleção`);
        atualizarVisualSelecao(app.id, true);
    }
    
    
    atualizarContadorSelecao();
    atualizarPrecoTotal();
    
    console.log(`📊 Total de apps selecionados: ${selectedApps.length}`);
    console.log(`📋 Apps selecionados:`, selectedApps.map(app => app.name));
}


function atualizarVisualSelecao(appId, selecionado) {
    const appCard = document.querySelector(`[data-app-id="${appId}"]`);
    if (!appCard) return;
    
    const circle = appCard.querySelector('.selection-circle');
    const text = appCard.querySelector('.selection-text');
    
    if (selecionado) {
        
        appCard.classList.add('selected');
        circle.innerHTML = '✓';
        text.textContent = 'Selecionado';
        appCard.style.background = 'linear-gradient(135deg, #e8f5e8, #d4edda)';
        appCard.style.borderColor = '#28a745';
        appCard.style.transform = 'scale(1.02)';
        appCard.style.boxShadow = '0 8px 25px rgba(40, 167, 69, 0.3)';
        
        
        circle.style.animation = 'checkmarkAnimation 0.3s ease-out';
    } else {
        
        appCard.classList.remove('selected');
        circle.innerHTML = '';
        text.textContent = 'Selecionar';
        appCard.style.background = '';
        appCard.style.borderColor = '';
        appCard.style.transform = '';
        appCard.style.boxShadow = '';
        circle.style.animation = '';
    }
    
    
    setTimeout(() => {
        if (circle) circle.style.animation = '';
    }, 300);
}


function mostrarPopupSegundoApp(categoria) {
    const precoUnitario = PRECOS_ALACARDS[categoria];
    const categoriaFormatada = categoria.charAt(0).toUpperCase() + categoria.slice(1);
    
    
    const popup = document.createElement('div');
    popup.className = 'popup-segundo-app';
    popup.innerHTML = `
        <div class="popup-content">
            <div class="popup-header">
                <div class="popup-icon">⚠️</div>
                <h3>Atenção!</h3>
            </div>
            <div class="popup-body">
                <p><strong>Você está adicionando um novo aplicativo.</strong></p>
                <p>Para cada aplicativo selecionado, o valor do plano será adicionado à sua compra.</p>
                <div class="popup-pricing">
                    <div class="pricing-row">
                        <span>💰 Valor por app ${categoriaFormatada}:</span>
                        <span><strong>R$ ${precoUnitario.toFixed(2)}</strong></span>
                    </div>
                    <div class="pricing-example">
                        <span>📱 O valor total será o preço do plano, multiplicado pela quantidade de aplicativos que você escolher.</span>
                    </div>
                    <div class="example-calculation">
                        <strong>Exemplo:</strong><br>
                        3 apps = R$ ${precoUnitario.toFixed(2)} × 3 = R$ ${(precoUnitario * 3).toFixed(2)}
                    </div>
                </div>
            </div>
            <div class="popup-footer">
                <button class="popup-btn-confirm" onclick="fecharPopupSegundoApp()">
                    Entendi, continuar seleção
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    
    setTimeout(() => popup.classList.add('show'), 10);
}

function fecharPopupSegundoApp() {
    const popup = document.querySelector('.popup-segundo-app');
    if (popup) {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 300);
    }
}


function clearApps() {
    console.log(`🧹 Limpando todos os apps selecionados...`);
    
    
    const appsAntes = [...selectedApps];
    
    
    selectedApps = [];
    
    
    const todosAppCards = document.querySelectorAll('.app-card');
    todosAppCards.forEach(appCard => {
        const appId = appCard.getAttribute('data-app-id');
        if (appId) {
            atualizarVisualSelecao(appId, false);
        }
    });
    
    
    desmarcarCheckboxesPlanos();
    
    
    atualizarContadorSelecao();
    atualizarPrecoTotal();
    
    
    showedPopupOnSecond = false;
    
    
    const clearBtn = document.querySelector('.apps-clear-btn');
    if (clearBtn) {
        clearBtn.style.background = '#28a745';
        clearBtn.innerHTML = '✅ Limpo!';
        
        setTimeout(() => {
            clearBtn.style.background = '';
            clearBtn.innerHTML = '🧹Limpar apps';
        }, 1500);
    }
    
    
    if (appsAntes.length > 0) {
        mostrarNotificacaoLimpeza(appsAntes.length);
    }
    
    console.log(`✅ ${appsAntes.length} apps removidos da seleção`);
    console.log(`📊 Apps selecionados agora: ${selectedApps.length}`);
    console.log(`🔄 Checkboxes dos planos desmarcados`);
}

function mostrarNotificacaoLimpeza(quantidadeRemovida) {
    
    const toast = document.createElement('div');
    toast.className = 'toast-notification toast-clear';
    toast.innerHTML = `
        <div class="toast-content">
            <div class="toast-icon">🧹</div>
            <div class="toast-text">
                <strong>Seleção limpa!</strong><br>
                ${quantidadeRemovida} app${quantidadeRemovida > 1 ? 's' : ''} removido${quantidadeRemovida > 1 ? 's' : ''} - Total: R$ 0,00
            </div>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}


function desmarcarCheckboxesPlanos() {
    console.log(`🔄 Desmarcando checkboxes dos planos...`);
    
    
    const checkboxesApps = document.querySelectorAll('input[type="checkbox"][value="standard"], input[type="checkbox"][value="advanced"], input[type="checkbox"][value="premium"]');
    
    checkboxesApps.forEach(checkbox => {
        if (checkbox.checked) {
            console.log(`❌ Desmarcando checkbox: ${checkbox.value}`);
            
            
            checkbox.checked = false;
            
            
            checkbox.setAttribute('data-preco', '0');
            
            
            const extraOpcao = checkbox.closest('.extra-opcao');
            if (extraOpcao) {
                const extraNome = extraOpcao.querySelector('.extra-nome');
                const extraPreco = extraOpcao.querySelector('.extra-preco');
                
                if (extraNome && extraPreco) {
                    const categoria = checkbox.value;
                    const categoriaFormatada = categoria.charAt(0).toUpperCase() + categoria.slice(1);
                    
                    
                    extraNome.textContent = `APP's ${categoriaFormatada}`;
                    extraPreco.textContent = `+ R$ ${PRECOS_ALACARDS[categoria].toFixed(2)}`;
                    
                    
                    extraPreco.style.fontWeight = '';
                    extraPreco.style.color = '';
                }
            }
            
            
            const planoCard = checkbox.closest('.plano-card');
            if (planoCard) {
                calcularPrecoTotalPlano(planoCard);
            }
        }
    });
    
    console.log(`✅ Checkboxes dos planos desmarcados e preços resetados`);
}


function calcularPrecoTotal() {
    if (selectedApps.length === 0) return 0;
    
    const categoria = currentCategory;
    const precoUnitario = PRECOS_ALACARDS[categoria];
    const quantidade = selectedApps.length;
    const total = precoUnitario * quantidade;
    
    console.log(`💰 Cálculo: ${categoria} × ${quantidade} = R$ ${total.toFixed(2)}`);
    return total;
}

function atualizarPrecoTotal() {
    const total = calcularPrecoTotal();
    const priceDisplay = document.querySelector('.apps-modal-footer .total-price');
    
    if (priceDisplay) {
        priceDisplay.textContent = `Total: R$ ${total.toFixed(2)}`;
    }
}

function atualizarContadorSelecao() {
    const contador = document.getElementById('selected-count');
    const confirmBtn = document.querySelector('.apps-confirm-btn');
    
    if (selectedApps.length > 0) {
        contador.style.display = 'inline';
        contador.textContent = selectedApps.length;
        confirmBtn.style.background = '#28a745';
        confirmBtn.disabled = false;
    } else {
        contador.style.display = 'none';
        confirmBtn.style.background = '#6c757d';
        confirmBtn.disabled = true;
    }
}

function atualizarInfoPrecos(categoria) {
    const precoUnitario = PRECOS_ALACARDS[categoria];
    const infoElement = document.querySelector('.pricing-text');
    
    if (infoElement) {
        infoElement.innerHTML = `
            <strong>Como funciona o preço:</strong><br>
            <span class="price-rule">Cada aplicativo adiciona R$ ${precoUnitario.toFixed(2)} ao plano</span><br>
            <span class="price-example">Ex: 1 app = R$ ${precoUnitario.toFixed(2)}</span><br>
            <span class="price-example">Ex: 2 apps = R$ ${precoUnitario.toFixed(2)} × 2 = R$ ${(precoUnitario * 2).toFixed(2)}</span><br>
            <span class="price-example">Ex: 3 apps = R$ ${precoUnitario.toFixed(2)} × 3 = R$ ${(precoUnitario * 3).toFixed(2)}</span>
        `;
    }
}


function confirmarSelecaoApps() {
    if (selectedApps.length === 0) {
        alert('Selecione pelo menos um aplicativo!');
        return;
    }
    
    const valorTotal = calcularPrecoTotal();
    const categoria = currentCategory;
    const plano = currentPlan;
    
    console.log(`✅ Confirmando seleção:`, {
        plano,
        categoria,
        apps: selectedApps.length,
        total: valorTotal
    });
    
    
    atualizarCheckboxEPrecoPlano(categoria, plano, selectedApps.length, valorTotal);
    
    
    fecharModalApps(true);
    
    
    mostrarConfirmacaoSelecao(selectedApps.length, valorTotal, categoria);
}

function mostrarConfirmacaoSelecao(quantidade, valor, categoria) {
    const categoriaFormatada = categoria.charAt(0).toUpperCase() + categoria.slice(1);
    const mensagem = `✅ Seleção confirmada!\n\n${quantidade} app${quantidade > 1 ? 's' : ''} ${categoriaFormatada}\nTotal: R$ ${valor.toFixed(2)}`;
    
    
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <div class="toast-content">
            <div class="toast-icon">✅</div>
            <div class="toast-text">
                <strong>Seleção confirmada!</strong><br>
                ${quantidade} app${quantidade > 1 ? 's' : ''} ${categoriaFormatada} - R$ ${valor.toFixed(2)}
            </div>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}


function atualizarCheckboxEPrecoPlano(categoria, plano, quantidade, valorTotal) {
    const planoCard = document.querySelector(`[data-plano="${plano}"]`);
    if (!planoCard) return;
    
    const checkbox = planoCard.querySelector(`input[value="${categoria}"]`);
    if (!checkbox) return;
    
    
    checkbox.checked = true;
    checkbox.setAttribute('data-preco', valorTotal.toFixed(2));
    
    
    const extraInfo = checkbox.closest('.extra-opcao').querySelector('.extra-nome');
    const extraPreco = checkbox.closest('.extra-opcao').querySelector('.extra-preco');
    
    if (extraInfo && extraPreco) {
        const categoriaFormatada = categoria.charAt(0).toUpperCase() + categoria.slice(1);
        extraInfo.textContent = `APP's ${categoriaFormatada} (${quantidade} app${quantidade > 1 ? 's' : ''})`;
        extraPreco.textContent = `+ R$ ${valorTotal.toFixed(2)}`;
        
        
        extraPreco.style.fontWeight = '700';
        extraPreco.style.color = '#e02121';
    }
    
    
    calcularPrecoTotalPlano(planoCard);
}


function fecharModalApps(isConfirmacao = false) {
    console.log(`🚪 Fechando modal A la Carte... (Confirmação: ${isConfirmacao})`);
    
    
    if (selectedApps.length > 0 && !isConfirmacao) {
        console.log(`🔄 Cancelar: limpando ${selectedApps.length} apps selecionados...`);
        clearApps();
    }
    
    const modal = document.getElementById('apps-modal');
    const modalContent = document.querySelector('.apps-modal-content');
    
    modalContent.style.animation = 'modalSlideOut 0.3s ease-in';
    
    setTimeout(() => {
        modal.style.display = 'none';
        modalContent.style.animation = '';
        
        
        if (isConfirmacao) {
            
            selectedApps = [];
            currentCategory = '';
            currentPlan = '';
            showedPopupOnSecond = false;
            console.log(`✅ Modal fechado após confirmação - Estado interno limpo`);
        } else {
            
            selectedApps = [];
            currentCategory = '';
            currentPlan = '';
            showedPopupOnSecond = false;
            console.log(`✅ Modal fechado após cancelamento - Estado limpo`);
        }
    }, 300);
}


document.addEventListener('click', function(event) {
    const modal = document.getElementById('apps-modal');
    if (event.target === modal) {
        fecharModalApps();
    }
});


function calcularPrecoTotalPlano(planoCard) {
    const precoBaseElement = planoCard.querySelector('.preco-base');
    const valorTotalElement = planoCard.querySelector('.valor-total');
    
    if (!precoBaseElement || !valorTotalElement) return;
    
    const precoBase = parseFloat(precoBaseElement.getAttribute('data-preco'));
    let valorExtras = 0;
    
    const checkboxesSelecionados = planoCard.querySelectorAll('.extra-opcao input[type="checkbox"]:checked');
    checkboxesSelecionados.forEach(checkbox => {
        valorExtras += parseFloat(checkbox.getAttribute('data-preco') || '0');
    });
    
    const total = precoBase + valorExtras;
    valorTotalElement.textContent = `R$ ${total.toFixed(2)}`;
    
    
    valorTotalElement.style.transform = 'scale(1.1)';
    valorTotalElement.style.color = '#e02121';
    setTimeout(() => {
        valorTotalElement.style.transform = 'scale(1)';
    }, 200);
}

function contratarPlano(tipoPlano) {
    const planoCard = document.querySelector(`[data-plano="${tipoPlano}"]`);
    const valorTotal = planoCard.querySelector('.valor-total').textContent;
    const velocidade = planoCard.querySelector('.velocidade-badge').textContent;
    const planoTitulo = planoCard.querySelector('.plano-titulo').textContent;
    const extrasSelecionados = [];
    
    const checkboxesSelecionados = planoCard.querySelectorAll('.extra-opcao input[type="checkbox"]:checked');
    checkboxesSelecionados.forEach(checkbox => {
        const extraInfo = checkbox.closest('.extra-opcao').querySelector('.extra-nome').textContent;
        const extraPreco = checkbox.closest('.extra-opcao').querySelector('.extra-preco').textContent;
        extrasSelecionados.push(`${extraInfo} (${extraPreco})`);
    });

    let mensagem = `🚀 *Olá! Tenho interesse no ${planoTitulo}*\n\n`;
    mensagem += `📊 *Detalhes do Plano Escolhido:*\n\n`;
    mensagem += `✅ *Plano:* ${planoTitulo}\n`;
    mensagem += `🚀 *Velocidade:* ${velocidade}\n`;
    mensagem += `💰 *Valor Total:* ${valorTotal}/mês\n\n`;
    mensagem += ` *Incluído no plano:*\n`;
    mensagem += `• 📶 Wi-Fi de última geração\n`;
    mensagem += `• 📺 Fastnet Play\n`;
    mensagem += `• 📚 Digilivros\n\n`;
    
    if (extrasSelecionados.length > 0) {
        mensagem += `🎯 *Personalizações Adicionadas:*\n`;
        extrasSelecionados.forEach(extra => {
            mensagem += `• ${extra}\n`;
        });
        mensagem += `\n`;
    }
    
    mensagem += ` *Gostaria de mais informações e contratar este plano!*`;

    const mensagemCodificada = encodeURIComponent(mensagem);
    const whatsappUrl = `https:
    window.open(whatsappUrl, '_blank');

    const botaoContratar = planoCard.querySelector('.btn-contratar');
    const textoOriginal = botaoContratar.textContent;
    botaoContratar.textContent = 'Redirecionando...';
    botaoContratar.style.background = '#4CAF50';
    setTimeout(() => {
        botaoContratar.textContent = textoOriginal;
        botaoContratar.style.background = '';
    }, 2000);
}

function destacarPlanoPopular() {
    const planosDestaque = document.querySelectorAll('.plano-card.destaque');
    if (!planosDestaque.length) return;
    planosDestaque.forEach((card, idx) => {
        const delay = 500 * idx;
        setTimeout(() => {
            setInterval(() => {
                card.style.boxShadow = '0 15px 40px rgba(224, 33, 33, 0.25)';
                setTimeout(() => {
                    card.style.boxShadow = '0 8px 30px rgba(224, 33, 33, 0.1)';
                }, 1000);
            }, 3000);
        }, delay);
    });
}

function animarEntradaCards() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    });
    document.querySelectorAll('.plano-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}




let actionBarVisible = false;
let globalSelectedApps = [];
let globalTotalValue = 0;

function updateActionBar() {
    const actionBar = document.getElementById('action-bar');
    const totalValueElement = document.getElementById('action-bar-total');
    const selectedCountElement = document.getElementById('selected-apps-count');
    
    if (!actionBar || !totalValueElement || !selectedCountElement) return;
    
    
    let totalValue = 0;
    let totalAppsSelected = 0;
    const allPlans = [];
    
    
    const planoCards = document.querySelectorAll('.plano-card');
    planoCards.forEach(planoCard => {
        const planoNome = planoCard.getAttribute('data-plano');
        const precoBase = parseFloat(planoCard.querySelector('.preco-base').getAttribute('data-preco'));
        let valorExtras = 0;
        let appsCount = 0;
        
        
        const checkboxesSelecionados = planoCard.querySelectorAll('.extra-opcao input[type="checkbox"]:checked');
        checkboxesSelecionados.forEach(checkbox => {
            const valor = parseFloat(checkbox.getAttribute('data-preco') || '0');
            valorExtras += valor;
            
            
            const extraNome = checkbox.closest('.extra-opcao').querySelector('.extra-nome').textContent;
            if (extraNome.includes('(') && extraNome.includes('app')) {
                const match = extraNome.match(/\((\d+)\s+app/);
                if (match) {
                    appsCount += parseInt(match[1]);
                }
            } else if (valor > 0) {
                appsCount += 1;
            }
        });
        
        if (valorExtras > 0) {
            allPlans.push({
                nome: planoNome,
                precoBase: precoBase,
                extras: valorExtras,
                total: precoBase + valorExtras,
                apps: appsCount
            });
            totalValue += precoBase + valorExtras;
            totalAppsSelected += appsCount;
        }
    });
    
    
    globalTotalValue = totalValue;
    globalSelectedApps = allPlans;
    
    
    totalValueElement.textContent = `R$ ${totalValue.toFixed(2)}`;
    selectedCountElement.textContent = `${totalAppsSelected} app${totalAppsSelected !== 1 ? 's' : ''} selecionado${totalAppsSelected !== 1 ? 's' : ''}`;
    
    
    if (totalValue > 0 && !actionBarVisible) {
        showActionBar();
    } else if (totalValue === 0 && actionBarVisible) {
        hideActionBar();
    }
    
    console.log(`📊 Barra de ação atualizada: ${totalAppsSelected} apps, R$ ${totalValue.toFixed(2)}`);
}

function showActionBar() {
    const actionBar = document.getElementById('action-bar');
    if (!actionBar) return;
    
    
    const isDesktop = window.innerWidth > 768;
    
    if (isDesktop) {
        
        actionBar.style.position = 'relative';
        actionBar.style.bottom = 'auto';
        actionBar.style.display = 'block';
        actionBar.classList.add('show');
        
    } else {
        
        actionBar.style.position = 'fixed';
        actionBar.style.bottom = '0';
        actionBar.style.display = 'block';
        actionBar.classList.add('show', 'animate-in');
        document.body.classList.add('action-bar-visible');
    }
    
    actionBarVisible = true;
    console.log(`📱 Barra de ação exibida (${isDesktop ? 'Desktop' : 'Mobile'})`);
}

function hideActionBar() {
    const actionBar = document.getElementById('action-bar');
    if (!actionBar) return;
    
    const isDesktop = window.innerWidth > 768;
    
    actionBar.classList.remove('show');
    
    if (isDesktop) {
        
        actionBar.style.display = 'none';
    } else {
        
        setTimeout(() => {
            actionBar.style.display = 'none';
            actionBar.classList.remove('animate-in');
        }, 300);
        document.body.classList.remove('action-bar-visible');
    }
    
    actionBarVisible = false;
    console.log(`📱 Barra de ação ocultada (${isDesktop ? 'Desktop' : 'Mobile'})`);
}

function clearAllSelections() {
    console.log('🧹 Limpando todas as seleções...');
    
    
    const todosCheckboxes = document.querySelectorAll('input[type="checkbox"][value="standard"], input[type="checkbox"][value="advanced"], input[type="checkbox"][value="premium"]');
    
    todosCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            
            checkbox.checked = false;
            
            
            checkbox.setAttribute('data-preco', '0');
            
            
            const extraOpcao = checkbox.closest('.extra-opcao');
            if (extraOpcao) {
                const extraNome = extraOpcao.querySelector('.extra-nome');
                const extraPreco = extraOpcao.querySelector('.extra-preco');
                
                if (extraNome && extraPreco) {
                    const categoria = checkbox.value;
                    const categoriaFormatada = categoria.charAt(0).toUpperCase() + categoria.slice(1);
                    
                    
                    extraNome.textContent = `APP's ${categoriaFormatada}`;
                    extraPreco.textContent = `+ R$ ${PRECOS_ALACARDS[categoria].toFixed(2)}`;
                    
                    
                    extraPreco.style.fontWeight = '';
                    extraPreco.style.color = '';
                }
            }
            
            
            const planoCard = checkbox.closest('.plano-card');
            if (planoCard) {
                calcularPrecoTotalPlano(planoCard);
            }
        }
    });
    
    
    selectedApps = [];
    showedPopupOnSecond = false;
    
    
    updateActionBar();
    
    
    const clearBtn = document.getElementById('action-clear-btn');
    if (clearBtn) {
        const originalContent = clearBtn.innerHTML;
        clearBtn.innerHTML = '<i class="fas fa-check"></i><span>Limpo!</span>';
        clearBtn.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
        
        setTimeout(() => {
            clearBtn.innerHTML = originalContent;
            clearBtn.style.background = '';
        }, 2000);
    }
    
    
    mostrarNotificacaoLimpeza(globalSelectedApps.length);
    
    console.log('✅ Todas as seleções foram limpas');
}

function contractSelectedPlan() {
    if (globalSelectedApps.length === 0) {
        alert('Nenhum plano selecionado!');
        return;
    }
    
    console.log('📞 Iniciando contratação via WhatsApp...');
    
    let mensagem = `🚀 *Olá! Tenho interesse em contratar um plano da Fastnet!*\n\n`;
    mensagem += `📊 *Detalhes da Minha Seleção:*\n\n`;
    
    globalSelectedApps.forEach((plano, index) => {
        mensagem += `📋 *Plano ${index + 1}:*\n`;
        mensagem += `✅ *Nome:* ${plano.nome}\n`;
        mensagem += `💰 *Valor Base:* R$ ${plano.precoBase.toFixed(2)}\n`;
        
        if (plano.extras > 0) {
            mensagem += `🎯 *Aplicativos:* ${plano.apps} app${plano.apps > 1 ? 's' : ''} (R$ ${plano.extras.toFixed(2)})\n`;
        }
        
        mensagem += `💸 *Total do Plano:* R$ ${plano.total.toFixed(2)}\n\n`;
    });
    
    mensagem += `💰 *VALOR TOTAL FINAL: R$ ${globalTotalValue.toFixed(2)}/mês*\n\n`;
    mensagem += `📞 *Gostaria de mais informações e fechar este negócio!*`;
    
    const mensagemCodificada = encodeURIComponent(mensagem);
    const whatsappUrl = `https:
    window.open(whatsappUrl, '_blank');
    
    
    const contractBtn = document.getElementById('action-contract-btn');
    if (contractBtn) {
        const originalContent = contractBtn.innerHTML;
        contractBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Redirecionando...</span>';
        contractBtn.style.background = 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)';
        
        setTimeout(() => {
            contractBtn.innerHTML = originalContent;
            contractBtn.style.background = '';
        }, 3000);
    }
    
    console.log('✅ Mensagem WhatsApp enviada');
}


const calcularPrecoTotalPlanoOriginal = calcularPrecoTotalPlano;
calcularPrecoTotalPlano = function(planoCard) {
    calcularPrecoTotalPlanoOriginal(planoCard);
    
    
    setTimeout(updateActionBar, 100);
}


const confirmarSelecaoAppsOriginal = confirmarSelecaoApps;
confirmarSelecaoApps = function() {
    confirmarSelecaoAppsOriginal();
    
    
    setTimeout(updateActionBar, 300);
}


const clearAppsOriginal = clearApps;
clearApps = function() {
    clearAppsOriginal();
    
    
    setTimeout(updateActionBar, 100);
}


document.addEventListener('change', function(event) {
    if (event.target.type === 'checkbox' && 
        (event.target.value === 'standard' || event.target.value === 'advanced' || event.target.value === 'premium')) {
        
        setTimeout(updateActionBar, 100);
    }
});


document.addEventListener('DOMContentLoaded', function() {
    setTimeout(updateActionBar, 500);
});


window.addEventListener('resize', function() {
    
    if (actionBarVisible) {
        hideActionBar();
        setTimeout(() => {
            if (globalTotalValue > 0) {
                showActionBar();
            }
        }, 100);
    }
});


function isMobile() {
    return window.innerWidth <= 768;
}


function isDesktop() {
    return window.innerWidth > 768;
}
