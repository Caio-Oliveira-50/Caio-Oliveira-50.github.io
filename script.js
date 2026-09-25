/**
 * Portfolio SQL & Python - Interações
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Gerenciamento de Abas dos Projetos (Desafio / Código / Resultados)
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    const tabBtns = card.querySelectorAll('.tab-btn');
    const tabContents = card.querySelectorAll('.project-tab-content');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        // Remove classe ativa de todos os botões e abas deste card
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Ativa o botão clicado e a aba correspondente
        btn.classList.add('active');
        const activeContent = card.querySelector(`.project-tab-content[data-content="${targetTab}"]`);
        if (activeContent) {
          activeContent.classList.add('active');
        }
      });
    });
  });

  // 2. Botão de Copiar Código com Feedback Visual
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const codeBlock = btn.closest('.code-container').querySelector('.code-block code');
      if (!codeBlock) return;

      const codeText = codeBlock.innerText;

      try {
        await navigator.clipboard.writeText(codeText);
        const originalHtml = btn.innerHTML;
        
        btn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span style="color: #10b981;">Copiado!</span>
        `;
        
        setTimeout(() => {
          btn.innerHTML = originalHtml;
        }, 2000);
      } catch (err) {
        console.error('Erro ao copiar código:', err);
      }
    });
  });
});

