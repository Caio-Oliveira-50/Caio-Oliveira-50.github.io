/**
 * Portfolio SQL & Python - Interações & Efeitos Zen Sakura
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. Gerenciamento de Abas dos Projetos (Desafio / Código / Resultados)
  // =========================================================================
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    const tabBtns = card.querySelectorAll('.tab-btn');
    const tabContents = card.querySelectorAll('.project-tab-content');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        btn.classList.add('active');
        const activeContent = card.querySelector(`.project-tab-content[data-content="${targetTab}"]`);
        if (activeContent) {
          activeContent.classList.add('active');
        }
      });
    });
  });

  // =========================================================================
  // 2. Botão de Copiar Código com Feedback Visual
  // =========================================================================
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
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f472b6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span style="color: #f472b6;">Copiado! 🌸</span>
        `;
        
        setTimeout(() => {
          btn.innerHTML = originalHtml;
        }, 2000);
      } catch (err) {
        console.error('Erro ao copiar código:', err);
      }
    });
  });

  // =========================================================================
  // 3. Sistema de Pétalas de Sakura Flutuantes (Canvas Leve e Suave)
  // =========================================================================
  const canvas = document.getElementById('sakura-canvas');
  if (!canvas) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const TOTAL_PETALS = Math.min(25, Math.floor(window.innerWidth / 50));
  const petals = [];

  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.size = Math.random() * 8 + 7;
      this.speedY = Math.random() * 0.9 + 0.5;
      this.speedX = Math.random() * 0.8 + 0.3;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      this.oscillationSpeed = Math.random() * 0.02 + 0.01;
      this.oscillationPhase = Math.random() * Math.PI * 2;
      this.color = Math.random() > 0.4 
        ? 'rgba(251, 182, 206, ' + (Math.random() * 0.35 + 0.3) + ')' 
        : 'rgba(244, 114, 182, ' + (Math.random() * 0.3 + 0.25) + ')';
    }

    update() {
      this.oscillationPhase += this.oscillationSpeed;
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.oscillationPhase) * 0.6;
      this.rotation += this.rotationSpeed;

      if (this.y > height + 20 || this.x > width + 20) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);

      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(0, -this.size / 2);
      ctx.bezierCurveTo(this.size / 2, -this.size / 3, this.size / 2, this.size / 2, 0, this.size);
      ctx.bezierCurveTo(-this.size / 2, this.size / 2, -this.size / 2, -this.size / 3, 0, -this.size / 2);
      ctx.fill();

      ctx.restore();
    }
  }

  for (let i = 0; i < TOTAL_PETALS; i++) {
    petals.push(new Petal());
  }

  let animationFrameId;
  let isRunning = true;

  function render() {
    if (!isRunning) return;
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < petals.length; i++) {
      petals[i].update();
      petals[i].draw();
    }

    animationFrameId = requestAnimationFrame(render);
  }

  render();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
    } else {
      isRunning = true;
      render();
    }
  });
});
