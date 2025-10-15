// Catálogo central de planos Fastnet
// Atualize preços/benefícios somente aqui para refletir em toda a aplicação.
window.FASTNET_PLANOS = {
  p300: { id: 'p300', nome: 'Plano Básico', velocidade: 300, rotulo: '300MB', preco: 'R$ 65,00', incluiRoteador: false,
    beneficios: ['📶 Fibra Óptica', '📺 Fastnet Play', '📚 Digilivros'] },
  p500: { id: 'p500', nome: 'Plano Conecta', velocidade: 500, rotulo: '500MB', preco: 'R$ 80,00', incluiRoteador: true,
    beneficios: ['📶 Wi-Fi de última geração', '📺 Fastnet Play', '📚 Digilivros'] },
  p700: { id: 'p700', nome: 'Plano Plus', velocidade: 700, rotulo: '700MB', preco: 'R$ 89,00', incluiRoteador: true,
    beneficios: ['📶 Wi-Fi de última geração', '📺 Fastnet Play', '📚 Digilivros'] },
  p1000:{ id: 'p1000', nome: 'Plano Premium', velocidade: 1000, rotulo: '1GB', preco: 'R$ 119,00', incluiRoteador: true,
    beneficios: ['📶 Wi-Fi de última geração', '📺 Fastnet Play', '📚 Digilivros'] }
};

// Função utilitária opcional para formatação de preço quando for número.
window.formatarPreco = (p) => typeof p === 'number' ? p.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}) : p;