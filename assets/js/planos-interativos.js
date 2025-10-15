document.addEventListener('DOMContentLoaded', function() {
    inicializarPlanosInterativos();
    setTimeout(destacarPlanoPopular, 1000);
    animarEntradaCards();
    
    // Adicionar informações de ajuda no console
    console.log('%c🛠️ SISTEMA DE LIMITES IMPLEMENTADO', 'background: #e02121; color: white; padding: 10px; border-radius: 5px; font-weight: bold;');
    console.log('%c📋 INSTRUÇÕES DE TESTE:', 'background: #333; color: white; padding: 5px; border-radius: 3px;');
    console.log('1. Abra um modal de aplicativos');
    console.log('2. Tente selecionar mais apps que o limite permitido');
    console.log('3. Standard: máximo 10 apps');
    console.log('4. Advanced: máximo 6 apps'); 
    console.log('5. Premium: máximo 6 apps');
    console.log('%c🔧 Execute testarLimites() para teste automatizado', 'background: #28a745; color: white; padding: 5px; border-radius: 3px;');
});

// ===== NOVA IMPLEMENTAÇÃO A LA CARTE =====
// Dados dos aplicativos por categoria com IDs únicos
const appsData = {
    'standard': [
        { id: 'std_1', name: 'SKY+ Light', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/Imagem6-qr08k11b1vq6b8ocsnx64h0m4fiobudf2jx7lknz68.png' },
        { id: 'std_2', name: 'iLooke', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/Design-sem-nome-1-r5utkbxpzwdc1hci9xyizagel2upex9s9um4x657sk.png' },
        { id: 'std_3', name: 'PlayKids+', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/Captura_de_tela_2025-04-07_134116-removebg-preview-r40m7bz4wde4dh9pelj95rkepsmtxjxk55ltfp3d1s.png' },
        { id: 'std_4', name: 'Kaspersky I', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/Imagem333-qqwwslxdbrpv8h95gj2ctxzzufyh79c2n099q391ao.png' },
        { id: 'std_5', name: 'ExitLag', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/image-2-r7hzti30166nf78cxv8wnxqwkr9qlan4gto3pbarps.png' },
        { id: 'std_6', name: 'KiddlePass', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/Design-sem-nome-r5wmer218i0jxwgzwibwxph5luskxjr9k5mz3avkqc.png' },
        { id: 'std_7', name: 'Hub Vantagens', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/Imagem5-qr08i1lkmh0dsvk4dt1iuz1kz5as2uhtgqcb4jlwb4.png' },
        { id: 'std_8', name: 'UBookPlus', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/Ubook-Plus-qqmkqahb4lwniz8xv9fikgca38ugentkrae045513k.png' },
        { id: 'std_9', name: 'SocialComics', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/SocialComics-qqmkkb89njpzo9xls6dy7gnq20befz31lozt7s06og.png' },
        { id: 'std_10', name: 'Estuda+', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/Imagem2-qpa2ajupfzcto55487r1lt6g0b865o1v3w1nmmnai4.png' },
        { id: 'std_11', name: 'Playlist', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/icon-playlist-qpuk0ao16qsad7co3c5yd5wkk3wjuls21p9yms9fbk.png' },
        { id: 'std_12', name: '+QNutri', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/QNutri-1-r0h4wx4k6hbeh6f6j9c8mjp8vbfzi5609qjdys5dxs.png' },
        { id: 'std_13', name: 'Hube Revistas', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/LOGO-HUBE-REVISTAS-qqwwnnc198xdykgkfdv8o72ez8eqkrn2mgb0jilu4w.png' },
        { id: 'std_14', name: 'Fluid', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/fluid-qqmkvdru5avkexup4ynrko35xdr13n18ghlop3l9e8.png' },
        { id: 'std_15', name: 'CurtaON', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/CurtaOn-1-r0h4x7gs9npk0w05uvt4vz3bek10utb1z5pq8tq21c.png' },
        { id: 'std_16', name: 'DocWay', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/logo-qqkql3w1vq8w0y1sazdb2c4z5de6y4ou1iyjffqrps.png' },
        { id: 'std_17', name: 'PlayKids', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/Captura_de_tela_2025-04-07_134116-removebg-preview-r40m7bz4wde4dh9pelj95rkepsmtxjxk55ltfp3d1s.png' },
        { id: 'std_18', name: 'KiddlePass Plus', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/Design-sem-nome-r5wmer218i0jxwgzwibwxph5luskxjr9k5mz3avkqc.png' }
    ],
    'advanced': [
        { id: 'adv_1', name: 'SKY+ Light e Globo', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/Imagem99-qr08s5d4pa8keyyll4pq7yo5dxln5l7ssn3sxbv5fo.png' },
        { id: 'adv_2', name: 'Deezer', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/Imagem3-qr08e9az3htt1f23ho4mbffqu9yk2qgqlzqwjf7zdc.png' },
        { id: 'adv_3', name: 'KiddlePass', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/Design-sem-nome-r5wmer218i0jxwgzwibwxph5luskxjr9k5mz3avkqc.png' },
        { id: 'adv_4', name: 'Kaspersky III', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/Imagem333-qqwwslxdbrpv8h95gj2ctxzzufyh79c2n099q391ao.png' },
        { id: 'adv_5', name: 'HotGo', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/Imagem4-qr08g4zcrkeg9cbsihdraycxm0ozgxxevapv3cfmxc.png' },
        { id: 'adv_6', name: 'CurtaOn', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/CurtaOn-1-r0h4x7gs9npk0w05uvt4vz3bek10utb1z5pq8tq21c.png' },
        { id: 'adv_7', name: 'O Jornalista', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/icon-o-jornalista-qpt1ot7f4pvgxjswr2h43mgise8of8n0iy6ydfofyo.png' },
        { id: 'adv_8', name: 'DocWay', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/logo-qqkql3w1vq8w0y1sazdb2c4z5de6y4ou1iyjffqrps.png' }
    ],
    'premium': [
        { id: 'pre_1', name: 'Disney+', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/Disney-r0g001wr97l5z37q1xf8qjn755wvxj7m1qwi5wbg0m.jpeg' },
        { id: 'pre_2', name: 'Max', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/Captura_de_tela_2025-04-07_133811-removebg-preview-r40mm6tax3q9vlotnipz2iloq1eolbwtuot3i52cpc.png' },
        { id: 'pre_3', name: 'NBA', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/nba-qqml4jp6s5f7m2jgmf9tdutyfmkv9tdutyfmkv5ef0pul45802q8.png' },
        { id: 'pre_4', name: 'SmartContent', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/Imagem666-qqwwynzxdc0e20ge35bsweyxnu3mt1dsszlx2a9p74.png' },
        { id: 'pre_5', name: 'Kaspersky Plus', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/Imagem333-qqwwslxdbrpv8h95gj2ctxzzufyh79c2n099q391ao.png' },
        { id: 'pre_6', name: 'QueimadiÁria', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/Imagem5555-qqwwwzu97xq1eyvrufbogu5fn6c54eqz8puuckqw9c.png' },
        { id: 'pre_7', name: 'Zen', icon: 'https://comologar.com.br/wp-content/uploads/elementor/thumbs/Icon-Zen-SVG-_2_-qogeb5ojzdngpkxxg0bwehfn1nyh3uvvo50kem113k.png' }
    ]
};

// ===== NOVA IMPLEMENTAÇÃO A LA CARTE COMPLETA =====

// Preços fixos conforme regras de negócio
const PRECOS_ALACARDS = {
    'standard': 5.00,
    'advanced': 10.00,
    'premium': 25.00
};

// Limites de aplicativos por tier conforme especificação
const LIMITES_APPS = {
    standard: 10,
    advanced: 6,
    premium: 6
};

// Variáveis globais para controle de estado
let selectedApps = []; // Array para rastrear aplicativos selecionados
let currentCategory = ''; // Categoria atual do modal
let currentPlan = ''; // Plano atual
let showedPopupOnSecond = false; // Flag para controlar se já mostrou popup no segundo app

function inicializarPlanosInterativos() {
    console.log('🚀 Sistema A la Carte inicializado!');
    console.log('📱 Apps disponíveis por categoria:');
    console.log('Standard:', appsData.standard.length, 'apps');
    console.log('Advanced:', appsData.advanced.length, 'apps');  
    console.log('Premium:', appsData.premium.length, 'apps');
    console.log('💰 Preços: Standard R$5, Advanced R$10, Premium R$25');
    console.log('🚫 Limites implementados:');
    console.log('Standard: máximo', LIMITES_APPS.standard, 'apps');
    console.log('Advanced: máximo', LIMITES_APPS.advanced, 'apps');
    console.log('Premium: máximo', LIMITES_APPS.premium, 'apps');
    
    // Função de teste para validar limites
    window.testarLimites = function() {
        console.log('🧪 TESTE DE LIMITES INICIADO');
        console.log('Standard - Limite:', LIMITES_APPS.standard, '| Apps disponíveis:', appsData.standard.length);
        console.log('Advanced - Limite:', LIMITES_APPS.advanced, '| Apps disponíveis:', appsData.advanced.length);
        console.log('Premium - Limite:', LIMITES_APPS.premium, '| Apps disponíveis:', appsData.premium.length);
        
        // Testes de validação
        selectedApps = []; // Reset para teste
        console.log('🔍 Testando validação Standard (limite 10):');
        
        // Simular seleção de apps até o limite
        for (let i = 0; i < LIMITES_APPS.standard; i++) {
            const resultado = validarSelecaoApp('standard');
            console.log(`App ${i + 1}: ${resultado ? '✅ Permitido' : '❌ Bloqueado'}`);
            if (resultado) {
                selectedApps.push({ categoria: 'standard', id: `test_${i}` });
            }
        }
        
        // Tentar adicionar um a mais (deve ser bloqueado)
        const resultadoExcesso = validarSelecaoApp('standard');
        console.log(`App ${LIMITES_APPS.standard + 1}: ${resultadoExcesso ? '⚠️ ERRO - Foi permitido!' : '✅ Corretamente bloqueado'}`);
        
        console.log('🧪 TESTE CONCLUÍDO');
        selectedApps = []; // Limpar após teste
    };
    
    console.log('💡 Para testar os limites, execute: testarLimites() no console');
}

// ===== FUNÇÃO PRINCIPAL: ABERTURA DO MODAL COM TOGGLE =====
function abrirModalApps(tipoPlano, nomeDoPlano) {
    // Prevenir comportamento padrão
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    console.log(`🎯 Verificando estado para: ${tipoPlano} em plano ${nomeDoPlano}`);
    
    // Encontrar o checkbox correspondente
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
    
    // LÓGICA DE TOGGLE: Verificar estado atual do checkbox
    if (checkbox.checked) {
        // Checkbox JÁ ESTÁ MARCADO - DESMARCAR E LIMPAR
        console.log(`🔄 Checkbox marcado: desmarcando e limpando aplicativos...`);
        desmarcarELimparAplicativos(checkbox, tipoPlano, nomeDoPlano, planoCard);
    } else {
        // Checkbox NÃO ESTÁ MARCADO - ABRIR MODAL
        console.log(`🎯 Checkbox desmarcado: abrindo modal para seleção...`);
        abrirModalParaSelecao(tipoPlano, nomeDoPlano, checkbox, planoCard);
    }
}

// ===== FUNÇÃO PARA ABRIR MODAL (ESTADO DESMARCADO) =====
function abrirModalParaSelecao(tipoPlano, nomeDoPlano, checkbox, planoCard) {
    console.log(`🚀 Abrindo modal de seleção: ${tipoPlano} para plano ${nomeDoPlano}`);
    
    // Definir variáveis globais
    currentCategory = tipoPlano;
    currentPlan = nomeDoPlano;
    selectedApps = []; // Reset da seleção
    showedPopupOnSecond = false; // Reset do popup
    
    // Atualizar título do modal
    const modalTitle = document.getElementById('modal-title');
    const categoryName = tipoPlano.charAt(0).toUpperCase() + tipoPlano.slice(1);
    modalTitle.textContent = `APP's ${categoryName} - R$ ${PRECOS_ALACARDS[tipoPlano].toFixed(2)} cada`;
    
    // Renderizar aplicativos
    renderizarAppsNoModal(tipoPlano);
    
    // Atualizar informações de preço
    atualizarInfoPrecos(tipoPlano);
    
    // Atualizar interface inicial
    atualizarContadorSelecao();
    atualizarPrecoTotal();
    
    // Mostrar modal
    document.getElementById('apps-modal').style.display = 'flex';
    
    // Adicionar classe para animação
    document.querySelector('.apps-modal-content').style.animation = 'modalSlideIn 0.3s ease-out';
}

// ===== FUNÇÃO PARA DESMARCAR E LIMPAR (ESTADO MARCADO) =====
function desmarcarELimparAplicativos(checkbox, tipoPlano, nomeDoPlano, planoCard) {
    console.log(`🧹 Desmarcando e limpando: ${tipoPlano} do plano ${nomeDoPlano}`);
    
    // 1. Desmarcar o checkbox
    checkbox.checked = false;
    console.log(`❌ Checkbox desmarcado`);
    
    // 2. Resetar atributo de preço do checkbox
    const precoOriginal = PRECOS_ALACARDS[tipoPlano];
    checkbox.setAttribute('data-preco', '0');
    console.log(`💰 Preço resetado de ${precoOriginal} para 0`);
    
    // 3. Atualizar visualmente o texto do label
    const extraOpcao = checkbox.closest('.extra-opcao');
    if (extraOpcao) {
        const extraNome = extraOpcao.querySelector('.extra-nome');
        const extraPreco = extraOpcao.querySelector('.extra-preco');
        
        if (extraNome && extraPreco) {
            const categoriaFormatada = tipoPlano.charAt(0).toUpperCase() + tipoPlano.slice(1);
            
            // Resetar para texto original
            extraNome.textContent = `APP's ${categoriaFormatada}`;
            extraPreco.textContent = `+ R$ ${precoOriginal.toFixed(2)}`;
            
            // Resetar estilos visuais
            extraPreco.style.fontWeight = '';
            extraPreco.style.color = '';
            
            console.log(`🎨 Interface atualizada para estado original`);
        }
    }
    
    // 4. Recalcular preço total do plano
    calcularPrecoTotalPlano(planoCard);
    console.log(`💲 Preço total do plano recalculado`);
    
    // 5. Mostrar feedback visual de limpeza
    mostrarFeedbackLimpeza(tipoPlano, nomeDoPlano);
    
    // 6. Fechar modal se estiver aberto
    const modal = document.getElementById('apps-modal');
    if (modal && modal.style.display === 'flex') {
        console.log(`🚪 Fechando modal aberto`);
        fecharModalApps(false);
    }
}

// ===== FEEDBACK VISUAL DE LIMPEZA =====
function mostrarFeedbackLimpeza(tipoPlano, nomeDoPlano) {
    const categoriaFormatada = tipoPlano.charAt(0).toUpperCase() + tipoPlano.slice(1);
    
    // Criar notificação toast
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
    
    // Mostrar e remover automaticamente
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
    
    console.log(`✅ Feedback de limpeza exibido para ${categoriaFormatada} em ${nomeDoPlano}`);
}

// ===== RENDERIZAÇÃO DOS APLICATIVOS NO MODAL =====
function renderizarAppsNoModal(categoria) {
    const appsGrid = document.getElementById('apps-grid');
    const apps = appsData[categoria] || [];
    
    console.log(`📱 Renderizando ${apps.length} apps da categoria ${categoria}`);
    
    // Limpar grid
    appsGrid.innerHTML = '';
    
    // Verificar se existem apps
    if (apps.length === 0) {
        appsGrid.innerHTML = '<p class="no-apps">Nenhum aplicativo disponível nesta categoria.</p>';
        return;
    }
    
    // Criar cards dos aplicativos
    apps.forEach((app) => {
        const appCard = document.createElement('div');
        appCard.className = 'app-card';
        appCard.setAttribute('data-app-id', app.id);
        appCard.setAttribute('data-app-name', app.name);
        
        // Verificar se app já está selecionado para aplicar classe correta
        const isSelected = selectedApps.some(selectedApp => selectedApp.id === app.id);
        
        appCard.innerHTML = `
            <div class="app-icon">
                <img src="${app.icon}" alt="${app.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;50&quot; height=&quot;50&quot; viewBox=&quot;0 0 50 50&quot;><rect width=&quot;50&quot; height=&quot;50&quot; fill=&quot;%23f0f0f0&quot;/><text x=&quot;25&quot; y=&quot;25&quot; text-anchor=&quot;middle&quot; dy=&quot;.3em&quot; font-family=&quot;Arial&quot; font-size=&quot;12&quot; fill=&quot;%23666&quot;>APP</text></svg>'">
            </div>
            <div class="app-name">${app.name}</div>
            <div class="app-price">R$ ${PRECOS_ALACARDS[categoria].toFixed(2)}</div>
            <div class="app-selection-indicator">
                <div class="selection-circle">${isSelected ? '✓' : ''}</div>
                <span class="selection-text">${isSelected ? 'Selecionado' : 'Selecionar'}</span>
            </div>
        `;
        
        // Aplicar visual de seleção se app já estiver selecionado
        if (isSelected) {
            appCard.classList.add('selected');
            appCard.style.background = 'linear-gradient(135deg, #e8f5e8, #d4edda)';
            appCard.style.borderColor = '#28a745';
        }
        
        // Adicionar event listener para seleção
        appCard.addEventListener('click', () => selecionarApp(app, categoria));
        
        appsGrid.appendChild(appCard);
    });
    
    console.log(`✅ ${apps.length} apps renderizados com sucesso!`);
    console.log(`🎯 Apps já selecionados: ${selectedApps.length}`);
}

// ===== FUNÇÃO DE VALIDAÇÃO DE LIMITES =====
function validarSelecaoApp(categoria) {
    const contagemAtual = contarAppsSelecionados(categoria);
    const limite = LIMITES_APPS[categoria];
    
    console.log(`🔍 Validação: ${categoria} - Atual: ${contagemAtual}, Limite: ${limite}`);
    
    if (contagemAtual >= limite) {
        const categoriaFormatada = categoria.charAt(0).toUpperCase() + categoria.slice(1);
        const mensagem = `⚠️ Limite máximo atingido!\n\nVocê pode selecionar no máximo ${limite} aplicativo${limite > 1 ? 's' : ''} ${categoriaFormatada}.\n\nAtualmente você já tem ${contagemAtual} aplicativo${contagemAtual > 1 ? 's' : ''} selecionado${contagemAtual > 1 ? 's' : ''}.`;
        
        // Mostrar alerta personalizado
        mostrarAlerteLimite(mensagem, categoria, limite);
        return false;
    }
    
    return true;
}

function contarAppsSelecionados(categoria) {
    return selectedApps.filter(app => app.categoria === categoria).length;
}

function mostrarAlerteLimite(mensagem, categoria, limite) {
    // Criar popup de limite personalizado
    const popup = document.createElement('div');
    popup.className = 'popup-limite-apps';
    popup.innerHTML = `
        <div class="popup-content limite-content">
            <div class="popup-header limite-header">
                <div class="popup-icon limite-icon">⚠️</div>
                <h3>Limite Atingido!</h3>
            </div>
            <div class="popup-body limite-body">
                <p><strong>Você atingiu o limite máximo de aplicativos para esta categoria.</strong></p>
                <div class="limite-info">
                    <div class="limite-row">
                        <span>📱 Categoria:</span>
                        <span><strong>${categoria.charAt(0).toUpperCase() + categoria.slice(1)}</strong></span>
                    </div>
                    <div class="limite-row">
                        <span>🔢 Limite máximo:</span>
                        <span><strong>${limite} aplicativo${limite > 1 ? 's' : ''}</strong></span>
                    </div>
                    <div class="limite-row atual">
                        <span>✅ Já selecionados:</span>
                        <span><strong>${contarAppsSelecionados(categoria)} aplicativo${contarAppsSelecionados(categoria) > 1 ? 's' : ''}</strong></span>
                    </div>
                </div>
                <div class="limite-dica">
                    <p><strong>💡 Dica:</strong> Para selecionar um novo aplicativo, remova primeiro um dos já selecionados clicando sobre ele.</p>
                </div>
            </div>
            <div class="popup-footer limite-footer">
                <button class="popup-btn-confirm limite-btn" onclick="fecharPopupLimite()">
                    Entendi
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Mostrar popup com animação
    setTimeout(() => popup.classList.add('show'), 10);
    
    console.log(`🚫 Alerta de limite exibido para ${categoria}: ${limite} apps máximo`);
}

function fecharPopupLimite() {
    const popup = document.querySelector('.popup-limite-apps');
    if (popup) {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 300);
    }
}

// ===== LÓGICA DE SELEÇÃO DE APLICATIVOS COM VALIDAÇÃO =====
function selecionarApp(app, categoria) {
    console.log(`🎯 Tentando selecionar app: ${app.name} (${app.id})`);
    
    // Verificar se app já está selecionado
    const appIndex = selectedApps.findIndex(selectedApp => selectedApp.id === app.id);
    const isCurrentlySelected = appIndex !== -1;
    
    if (isCurrentlySelected) {
        // App já selecionado - permitir remoção sempre
        selectedApps.splice(appIndex, 1);
        console.log(`❌ App ${app.name} removido da seleção`);
        atualizarVisualSelecao(app.id, false);
    } else {
        // App não selecionado - VALIDAR ANTES DE ADICIONAR
        if (!validarSelecaoApp(categoria)) {
            console.log(`🚫 Seleção impedida: limite de ${LIMITES_APPS[categoria]} apps ${categoria} atingido`);
            return; // Impede a seleção
        }
        
        // Validação passou - pode adicionar
        console.log(`✅ Validação passou: adicionando ${app.name} à seleção`);
        
        // Verificar se é o segundo app e mostrar popup
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
    
    // Atualizar interface
    atualizarContadorSelecao();
    atualizarPrecoTotal();
    
    console.log(`📊 Total de apps selecionados: ${selectedApps.length}`);
    console.log(`📋 Apps selecionados por categoria:`, {
        standard: contarAppsSelecionados('standard'),
        advanced: contarAppsSelecionados('advanced'),
        premium: contarAppsSelecionados('premium')
    });
}

// ===== ATUALIZAÇÃO VISUAL DA SELEÇÃO =====
function atualizarVisualSelecao(appId, selecionado) {
    const appCard = document.querySelector(`[data-app-id="${appId}"]`);
    if (!appCard) return;
    
    const circle = appCard.querySelector('.selection-circle');
    const text = appCard.querySelector('.selection-text');
    
    if (selecionado) {
        // Aplicar visual de selecionado
        appCard.classList.add('selected');
        circle.innerHTML = '✓';
        text.textContent = 'Selecionado';
        appCard.style.background = 'linear-gradient(135deg, #e8f5e8, #d4edda)';
        appCard.style.borderColor = '#28a745';
        appCard.style.transform = 'scale(1.02)';
        appCard.style.boxShadow = '0 8px 25px rgba(40, 167, 69, 0.3)';
        
        // Adicionar animação de confirmação
        circle.style.animation = 'checkmarkAnimation 0.3s ease-out';
    } else {
        // Remover visual de selecionado
        appCard.classList.remove('selected');
        circle.innerHTML = '';
        text.textContent = 'Selecionar';
        appCard.style.background = '';
        appCard.style.borderColor = '';
        appCard.style.transform = '';
        appCard.style.boxShadow = '';
        circle.style.animation = '';
    }
    
    // Remover animação após completar
    setTimeout(() => {
        if (circle) circle.style.animation = '';
    }, 300);
}

// ===== POPUP INFORMATIVO NO SEGUNDO APP =====
function mostrarPopupSegundoApp(categoria) {
    const precoUnitario = PRECOS_ALACARDS[categoria];
    const categoriaFormatada = categoria.charAt(0).toUpperCase() + categoria.slice(1);
    
    // Criar popup customizado
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
    
    // Mostrar popup com animação
    setTimeout(() => popup.classList.add('show'), 10);
}

function fecharPopupSegundoApp() {
    const popup = document.querySelector('.popup-segundo-app');
    if (popup) {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 300);
    }
}

// ===== FUNÇÃO PARA LIMPAR TODOS OS APLICATIVOS =====
function clearApps() {
    console.log(`🧹 Limpando todos os apps selecionados...`);
    
    // Backup da lista para log
    const appsAntes = [...selectedApps];
    
    // Limpar array de seleção
    selectedApps = [];
    
    // Remover visual de seleção de TODOS os apps na interface
    const todosAppCards = document.querySelectorAll('.app-card');
    todosAppCards.forEach(appCard => {
        const appId = appCard.getAttribute('data-app-id');
        if (appId) {
            atualizarVisualSelecao(appId, false);
        }
    });
    
    // NOVA FUNCIONALIDADE: Desmarcar checkboxes dos planos
    desmarcarCheckboxesPlanos();
    
    // Resetar contador e preço total
    atualizarContadorSelecao();
    atualizarPrecoTotal();
    
    // Resetar flag do popup
    showedPopupOnSecond = false;
    
    // Feedback visual com animação
    const clearBtn = document.querySelector('.apps-clear-btn');
    if (clearBtn) {
        clearBtn.style.background = '#28a745';
        clearBtn.innerHTML = '✅ Limpo!';
        
        setTimeout(() => {
            clearBtn.style.background = '';
            clearBtn.innerHTML = '🧹Limpar apps';
        }, 1500);
    }
    
    // Mostrar notificação
    if (appsAntes.length > 0) {
        mostrarNotificacaoLimpeza(appsAntes.length);
    }
    
    console.log(`✅ ${appsAntes.length} apps removidos da seleção`);
    console.log(`📊 Apps selecionados agora: ${selectedApps.length}`);
    console.log(`🔄 Checkboxes dos planos desmarcados`);
}

function mostrarNotificacaoLimpeza(quantidadeRemovida) {
    // Criar notificação toast para limpeza
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
    
    // Mostrar e remover automaticamente
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// ===== FUNÇÃO PARA DESMARCAR CHECKBOXES DOS PLANOS =====
function desmarcarCheckboxesPlanos() {
    console.log(`🔄 Desmarcando checkboxes dos planos...`);
    
    // Encontrar todos os checkboxes relacionados aos apps (standard, advanced, premium)
    const checkboxesApps = document.querySelectorAll('input[type="checkbox"][value="standard"], input[type="checkbox"][value="advanced"], input[type="checkbox"][value="premium"]');
    
    checkboxesApps.forEach(checkbox => {
        if (checkbox.checked) {
            console.log(`❌ Desmarcando checkbox: ${checkbox.value}`);
            
            // Desmarcar o checkbox
            checkbox.checked = false;
            
            // Resetar atributo de preço
            checkbox.setAttribute('data-preco', '0');
            
            // Atualizar visualmente o label correspondente
            const extraOpcao = checkbox.closest('.extra-opcao');
            if (extraOpcao) {
                const extraNome = extraOpcao.querySelector('.extra-nome');
                const extraPreco = extraOpcao.querySelector('.extra-preco');
                
                if (extraNome && extraPreco) {
                    const categoria = checkbox.value;
                    const categoriaFormatada = categoria.charAt(0).toUpperCase() + categoria.slice(1);
                    
                    // Resetar texto para estado original
                    extraNome.textContent = `APP's ${categoriaFormatada}`;
                    extraPreco.textContent = `+ R$ ${PRECOS_ALACARDS[categoria].toFixed(2)}`;
                    
                    // Resetar estilos visuais
                    extraPreco.style.fontWeight = '';
                    extraPreco.style.color = '';
                }
            }
            
            // Recalcular preço total do plano que contém este checkbox
            const planoCard = checkbox.closest('.plano-card');
            if (planoCard) {
                calcularPrecoTotalPlano(planoCard);
            }
        }
    });
    
    console.log(`✅ Checkboxes dos planos desmarcados e preços resetados`);
}

// ===== CÁLCULO E ATUALIZAÇÃO DE PREÇOS =====
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
    const limite = LIMITES_APPS[currentCategory];
    const quantidadeSelecionada = selectedApps.length;
    
    if (quantidadeSelecionada > 0) {
        contador.style.display = 'flex';
        contador.textContent = `${quantidadeSelecionada}/${limite}`;
        
        // Remover classes anteriores
        contador.classList.remove('warning', 'danger');
        
        // Aplicar classes CSS baseado na proximidade do limite
        if (quantidadeSelecionada >= limite) {
            contador.classList.add('danger');
        } else if (quantidadeSelecionada >= limite * 0.8) {
            contador.classList.add('warning');
        }
        
        // Resetar estilos inline para usar as classes CSS
        contador.style.background = '';
        contador.style.color = '';
        
        confirmBtn.style.background = '#28a745';
        confirmBtn.disabled = false;
    } else {
        contador.style.display = 'none';
        contador.classList.remove('warning', 'danger');
        confirmBtn.style.background = '#6c757d';
        confirmBtn.disabled = true;
    }
    
    // Atualizar título do modal com informação de limite
    const modalTitle = document.getElementById('modal-title');
    if (modalTitle && currentCategory) {
        const categoriaFormatada = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);
        modalTitle.textContent = `APP's ${categoriaFormatada} - R$ ${PRECOS_ALACARDS[currentCategory].toFixed(2)} cada (${quantidadeSelecionada}/${limite})`;
    }
}

function atualizarInfoPrecos(categoria) {
    const precoUnitario = PRECOS_ALACARDS[categoria];
    const limite = LIMITES_APPS[categoria];
    const categoriaFormatada = categoria.charAt(0).toUpperCase() + categoria.slice(1);
    const infoElement = document.querySelector('.pricing-text');
    
    if (infoElement) {
        infoElement.innerHTML = `
            <strong>Como funciona o preço:</strong><br>
            <span class="price-rule">Cada aplicativo adiciona R$ ${precoUnitario.toFixed(2)} ao plano</span><br>
            <span class="price-limit">⚠️ <strong>Limite máximo: ${limite} aplicativo${limite > 1 ? 's' : ''} ${categoriaFormatada}</strong></span><br>
            <span class="price-example">Ex: 1 app = R$ ${precoUnitario.toFixed(2)}</span><br>
            <span class="price-example">Ex: 2 apps = R$ ${precoUnitario.toFixed(2)} × 2 = R$ ${(precoUnitario * 2).toFixed(2)}</span><br>
            <span class="price-example">Ex: ${Math.min(3, limite)} apps = R$ ${precoUnitario.toFixed(2)} × ${Math.min(3, limite)} = R$ ${(precoUnitario * Math.min(3, limite)).toFixed(2)}</span>
        `;
    }
}

// ===== CONFIRMAÇÃO DA SELEÇÃO =====
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
    
    // Atualizar interface do plano
    atualizarCheckboxEPrecoPlano(categoria, plano, selectedApps.length, valorTotal);
    
    // Fechar modal (informando que é uma confirmação)
    fecharModalApps(true);
    
    // Mostrar confirmação
    mostrarConfirmacaoSelecao(selectedApps.length, valorTotal, categoria);
}

function mostrarConfirmacaoSelecao(quantidade, valor, categoria) {
    const categoriaFormatada = categoria.charAt(0).toUpperCase() + categoria.slice(1);
    const mensagem = `✅ Seleção confirmada!\n\n${quantidade} app${quantidade > 1 ? 's' : ''} ${categoriaFormatada}\nTotal: R$ ${valor.toFixed(2)}`;
    
    // Criar notificação toast
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
    
    // Mostrar e remover automaticamente
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== ATUALIZAÇÃO DA INTERFACE DO PLANO =====
function atualizarCheckboxEPrecoPlano(categoria, plano, quantidade, valorTotal) {
    const planoCard = document.querySelector(`[data-plano="${plano}"]`);
    if (!planoCard) return;
    
    const checkbox = planoCard.querySelector(`input[value="${categoria}"]`);
    if (!checkbox) return;
    
    // Marcar checkbox e atualizar preço
    checkbox.checked = true;
    checkbox.setAttribute('data-preco', valorTotal.toFixed(2));
    
    // Atualizar texto do label
    const extraInfo = checkbox.closest('.extra-opcao').querySelector('.extra-nome');
    const extraPreco = checkbox.closest('.extra-opcao').querySelector('.extra-preco');
    
    if (extraInfo && extraPreco) {
        const categoriaFormatada = categoria.charAt(0).toUpperCase() + categoria.slice(1);
        extraInfo.textContent = `APP's ${categoriaFormatada} (${quantidade} app${quantidade > 1 ? 's' : ''})`;
        extraPreco.textContent = `+ R$ ${valorTotal.toFixed(2)}`;
        
        // Destacar visualmente
        extraPreco.style.fontWeight = '700';
        extraPreco.style.color = '#e02121';
    }
    
    // Recalcular preço total do plano
    calcularPrecoTotalPlano(planoCard);
}

// ===== CONTROLE DO MODAL =====
function fecharModalApps(isConfirmacao = false) {
    console.log(`🚪 Fechando modal A la Carte... (Confirmação: ${isConfirmacao})`);
    
    // FUNCIONALIDADE: Limpar seleções apenas ao cancelar (não ao confirmar)
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
        
        // Limpar estado interno apenas
        if (isConfirmacao) {
            // Se foi confirmação, apenas limpar estado interno sem afetar UI
            selectedApps = [];
            currentCategory = '';
            currentPlan = '';
            showedPopupOnSecond = false;
            console.log(`✅ Modal fechado após confirmação - Estado interno limpo`);
        } else {
            // Se foi cancelamento, estado já foi limpo pelo clearApps()
            selectedApps = [];
            currentCategory = '';
            currentPlan = '';
            showedPopupOnSecond = false;
            console.log(`✅ Modal fechado após cancelamento - Estado limpo`);
        }
    }, 300);
}

// Fechar modal ao clicar fora
document.addEventListener('click', function(event) {
    const modal = document.getElementById('apps-modal');
    if (event.target === modal) {
        fecharModalApps();
    }
});

// ===== FUNÇÕES AUXILIARES (PLANOS) =====
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
    
    // Animação visual
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
    const whatsappUrl = `https://api.whatsapp.com/send?phone=557930454880&text=${mensagemCodificada}`;
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

// ===== FUNCIONALIDADES DA BARRA DE AÇÃO FIXA =====

// Variáveis globais para controle da barra de ação
let actionBarVisible = false;
let globalSelectedApps = [];
let globalTotalValue = 0;

function updateActionBar() {
    const actionBar = document.getElementById('action-bar');
    const totalValueElement = document.getElementById('action-bar-total');
    const selectedCountElement = document.getElementById('selected-apps-count');
    
    if (!actionBar || !totalValueElement || !selectedCountElement) return;
    
    // Calcular total e apps selecionados de todos os planos
    let totalValue = 0;
    let totalAppsSelected = 0;
    const allPlans = [];
    
    // Verificar todos os planos na página
    const planoCards = document.querySelectorAll('.plano-card');
    planoCards.forEach(planoCard => {
        const planoNome = planoCard.getAttribute('data-plano');
        const precoBase = parseFloat(planoCard.querySelector('.preco-base').getAttribute('data-preco'));
        let valorExtras = 0;
        let appsCount = 0;
        
        // Verificar checkboxes selecionados
        const checkboxesSelecionados = planoCard.querySelectorAll('.extra-opcao input[type="checkbox"]:checked');
        checkboxesSelecionados.forEach(checkbox => {
            const valor = parseFloat(checkbox.getAttribute('data-preco') || '0');
            valorExtras += valor;
            
            // Contar apps baseado no nome do campo
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
    
    // Atualizar variáveis globais
    globalTotalValue = totalValue;
    globalSelectedApps = allPlans;
    
    // Atualizar elementos da interface
    totalValueElement.textContent = `R$ ${totalValue.toFixed(2)}`;
    selectedCountElement.textContent = `${totalAppsSelected} app${totalAppsSelected !== 1 ? 's' : ''} selecionado${totalAppsSelected !== 1 ? 's' : ''}`;
    
    // Mostrar/ocultar barra
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
    
    // Verificar se é desktop ou mobile
    const isDesktop = window.innerWidth > 768;
    
    if (isDesktop) {
        // Desktop: barra no fluxo normal da página
        actionBar.style.position = 'relative';
        actionBar.style.bottom = 'auto';
        actionBar.style.display = 'block';
        actionBar.classList.add('show');
        // Não adicionar padding ao body no desktop
    } else {
        // Mobile/Tablet: barra fixa
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
        // Desktop: simplesmente ocultar
        actionBar.style.display = 'none';
    } else {
        // Mobile: animação de saída
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
    
    // Limpar todos os checkboxes
    const todosCheckboxes = document.querySelectorAll('input[type="checkbox"][value="standard"], input[type="checkbox"][value="advanced"], input[type="checkbox"][value="premium"]');
    
    todosCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            // Desmarcar o checkbox
            checkbox.checked = false;
            
            // Resetar atributo de preço
            checkbox.setAttribute('data-preco', '0');
            
            // Atualizar visualmente o label correspondente
            const extraOpcao = checkbox.closest('.extra-opcao');
            if (extraOpcao) {
                const extraNome = extraOpcao.querySelector('.extra-nome');
                const extraPreco = extraOpcao.querySelector('.extra-preco');
                
                if (extraNome && extraPreco) {
                    const categoria = checkbox.value;
                    const categoriaFormatada = categoria.charAt(0).toUpperCase() + categoria.slice(1);
                    
                    // Resetar texto para estado original
                    extraNome.textContent = `APP's ${categoriaFormatada}`;
                    extraPreco.textContent = `+ R$ ${PRECOS_ALACARDS[categoria].toFixed(2)}`;
                    
                    // Resetar estilos visuais
                    extraPreco.style.fontWeight = '';
                    extraPreco.style.color = '';
                }
            }
            
            // Recalcular preço total do plano que contém este checkbox
            const planoCard = checkbox.closest('.plano-card');
            if (planoCard) {
                calcularPrecoTotalPlano(planoCard);
            }
        }
    });
    
    // Limpar seleções do modal se estiver aberto
    selectedApps = [];
    showedPopupOnSecond = false;
    
    // Atualizar barra de ação
    updateActionBar();
    
    // Mostrar feedback visual
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
    
    // Mostrar notificação
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
    const whatsappUrl = `https://api.whatsapp.com/send?phone=557930454880&text=${mensagemCodificada}`;
    window.open(whatsappUrl, '_blank');
    
    // Feedback visual
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

// Modificar a função calcularPrecoTotalPlano para atualizar a barra de ação
const calcularPrecoTotalPlanoOriginal = calcularPrecoTotalPlano;
calcularPrecoTotalPlano = function(planoCard) {
    calcularPrecoTotalPlanoOriginal(planoCard);
    
    // Atualizar barra de ação após mudança nos preços
    setTimeout(updateActionBar, 100);
}

// Modificar a função confirmarSelecaoApps para atualizar a barra de ação
const confirmarSelecaoAppsOriginal = confirmarSelecaoApps;
confirmarSelecaoApps = function() {
    confirmarSelecaoAppsOriginal();
    
    // Atualizar barra de ação após confirmação
    setTimeout(updateActionBar, 300);
}

// Modificar a função clearApps para atualizar a barra de ação
const clearAppsOriginal = clearApps;
clearApps = function() {
    clearAppsOriginal();
    
    // Atualizar barra de ação após limpeza
    setTimeout(updateActionBar, 100);
}

// Adicionar listener para mudanças nos checkboxes
document.addEventListener('change', function(event) {
    if (event.target.type === 'checkbox' && 
        (event.target.value === 'standard' || event.target.value === 'advanced' || event.target.value === 'premium')) {
        
        setTimeout(updateActionBar, 100);
    }
});

// Inicializar barra de ação ao carregar página
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(updateActionBar, 500);
});

// Listener para mudanças de tamanho de tela
window.addEventListener('resize', function() {
    // Reagir a mudanças de orientação/tamanho da tela
    if (actionBarVisible) {
        hideActionBar();
        setTimeout(() => {
            if (globalTotalValue > 0) {
                showActionBar();
            }
        }, 100);
    }
});

// Função utilitária para verificar se é mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Função utilitária para verificar se é desktop
function isDesktop() {
    return window.innerWidth > 768;
}
