// Seleciona o elemento do canvas e seu contexto
const canvas = document.querySelector('#particles');
const ctx = canvas.getContext('2d');

// Configurações das partículas
const numParticles = 40;
const particles = [];

// Redimensiona o canvas com base no tamanho da janela
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Preenche a matriz 'particles' com novas partículas, se necessário
  while (particles.length < numParticles) { 
    particles.push(createParticle(Math.random() * window.innerWidth, Math.random() * window.innerHeight));
  }
}

// Cria uma nova partícula com valores iniciais
function createParticle(x, y) {
  const speedY = Math.random() * -1 - 2;  
  const size = Math.random() * 5 + 1;

  return {
    x,
    y,
    size,
    speedX: Math.random() + 2.5,
    speedY,
    rotation: Math.random() * Math.PI * 2,
    opacity: Math.random(),
    blur: size > 3 ? (size - 3) / 2 : 0,
    color: [255, 255, 255],
    targetColor: [255, 255, 255]
  };
}

// Função para animar as partículas
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Verifica se o elemento de carregamento está visível
  const loadingElement = document.getElementById('loading');
  const isLoading = loadingElement && getComputedStyle(loadingElement).display !== 'none';

  // Define o z-index do canvas com base no status de carregamento
  canvas.style.zIndex = isLoading ? "99999" : "0";

  // Loop pelas partículas
  particles.forEach((particle, index) => {
    // Atualiza a posição e propriedades da partícula
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    particle.opacity -= 0.002;
    particle.targetColor = isLoading ? [255, 255, 255] : [0, 0, 0]; // Muda para preto se não estiver carregando, senão branco

    // Gradualmente muda a cor da partícula para a cor alvo
    for (let i = 0; i < 3; i++) {
      if (particle.color[i] < particle.targetColor[i]) {
        particle.color[i]++;
      } else if (particle.color[i] > particle.targetColor[i]) {
        particle.color[i]--;
      }
    }

    ctx.save();
    ctx.translate(particle.x, particle.y);
    ctx.rotate(particle.rotation);

    // Aplica efeito de desfoque se a opacidade for menor que 0.4
    ctx.filter = particle.opacity < 0.4 ? `blur(${particle.blur}px)` : 'none';
    
    ctx.fillStyle = `rgba(${particle.color[0]}, ${particle.color[1]}, ${particle.color[2]}, ${particle.opacity})`;  
    ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);

    ctx.restore();

    // Recria a partícula se estiver fora dos limites ou sua opacidade for menor que 0
    if (particle.opacity < 0 || particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
      particles[index] = createParticle(Math.random() * window.innerWidth, canvas.height + 2);
    }
  });

  // Solicita uma nova animação
  requestAnimationFrame(animateParticles);
}

// Inicializa o canvas e inicia a animação das partículas
resizeCanvas(); 
animateParticles();
