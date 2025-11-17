function fecharAviso() {
    const modal = document.getElementById('aviso-societario-modal');
    if (modal) {
        modal.classList.remove('active');
    }
    // Salva no sessionStorage que o cliente já viu este aviso na sessão atual
    sessionStorage.setItem('avisoVistoFastnet', 'true');
}

function exibirAvisoInstitucional() {
    // Verifica se o cliente já viu o aviso nesta sessão
    const avisoVisto = sessionStorage.getItem('avisoVistoFastnet');
    
    if (!avisoVisto) {
        // Se não viu, exibe o modal
        setTimeout(() => {
            const modal = document.getElementById('aviso-societario-modal');
            if (modal) modal.classList.add('active');
        }, 1000); // Exibe após 1 segundo para não chocar o usuário
    }
}

// Vincula a função para ser executada assim que o DOM carregar
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', exibirAvisoInstitucional);
}
