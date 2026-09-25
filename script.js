/**
 * Portfolio SQL & Python - Interações & Efeitos Zen Sakura
 * Animação de Pétalas de Cerejeira (Sakura) e Vagalumes (Hotaru)
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
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00CEC8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span style="color: #00CEC8;">Copiado! 🌸</span>
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
  // 3. Sistema Atmosférico de Sakura (Pétalas) e Hotaru (Vagalumes de Luz)
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

  // Quantidade equilibrada para performance cristalina
  const TOTAL_PETALS = Math.min(26, Math.floor(window.innerWidth / 45));
  const TOTAL_FIREFLIES = 14;

  const petals = [];
  const fireflies = [];

  // --- Classe das Pétalas de Cerejeira ---
  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -25;
      this.size = Math.random() * 9 + 8;
      this.speedY = Math.random() * 0.9 + 0.55;
      this.speedX = Math.random() * 0.75 + 0.35;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.022;
      this.oscillationSpeed = Math.random() * 0.02 + 0.012;
      this.oscillationPhase = Math.random() * Math.PI * 2;
      this.color = Math.random() > 0.45 
        ? 'rgba(251, 182, 206, ' + (Math.random() * 0.35 + 0.35) + ')' 
        : 'rgba(0, 206, 200, ' + (Math.random() * 0.3 + 0.28) + ')';
    }

    update() {
      this.oscillationPhase += this.oscillationSpeed;
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.oscillationPhase) * 0.7;
      this.rotation += this.rotationSpeed;

      if (this.y > height + 25 || this.x > width + 25) {
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

  // --- Classe dos Vagalumes / Pontos de Luz Suaves (Hotaru) ---
  class Firefly {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 15;
      this.radius = Math.random() * 2 + 1;
      this.speedY = -(Math.random() * 0.5 + 0.2); // sobe suavemente
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.pulseSpeed = Math.random() * 0.03 + 0.015;
      this.pulsePhase = Math.random() * Math.PI * 2;
      // Tons alternados entre ciano suave e rosa blush
      this.isCyan = Math.random() > 0.5;
    }

    update() {
      this.pulsePhase += this.pulseSpeed;
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.pulsePhase) * 0.3;

      if (this.y < -20 || this.x < -20 || this.x > width + 20) {
        this.reset();
      }
    }

    draw() {
      const alpha = (Math.sin(this.pulsePhase) * 0.4 + 0.5).toFixed(2);
      ctx.save();
      
      const grad = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.radius * 4
      );

      if (this.isCyan) {
        grad.addColorStop(0, `rgba(56, 189, 248, ${alpha})`);
        grad.addColorStop(0.5, `rgba(56, 189, 248, ${alpha * 0.3})`);
        grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      } else {
        grad.addColorStop(0, `rgba(251, 113, 133, ${alpha})`);
        grad.addColorStop(0.5, `rgba(251, 113, 133, ${alpha * 0.3})`);
        grad.addColorStop(1, 'rgba(251, 113, 133, 0)');
      }

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  for (let i = 0; i < TOTAL_PETALS; i++) petals.push(new Petal());
  for (let i = 0; i < TOTAL_FIREFLIES; i++) fireflies.push(new Firefly());

  let animationFrameId;
  let isRunning = true;

  function render() {
    if (!isRunning) return;
    ctx.clearRect(0, 0, width, height);

    // Desenha vagalumes de luz ascendentes
    for (let i = 0; i < fireflies.length; i++) {
      fireflies[i].update();
      fireflies[i].draw();
    }

    // Desenha pétalas de cerejeira descendentes
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
