document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('interactive-card');

  card.style.transition = "transform 320ms";

  const cardWidth = card.offsetWidth;
  const cardHeight = card.offsetHeight;

  card.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX - card.getBoundingClientRect().left;
    const mouseY = e.clientY - card.getBoundingClientRect().top;

    const offsetX = 0.5 - (mouseX / cardWidth); // Calcula o deslocamento horizontal do mouse em relação ao centro do card
    const offsetY = 0.5 - (mouseY / cardHeight); // Calcula o deslocamento vertical do mouse em relação ao centro do card

    const maxRotate = 20; // Define o ângulo máximo de rotação

    const rotateX = offsetY * maxRotate; // Ajusta a rotação X com base no deslocamento vertical
    const rotateY = -offsetX * maxRotate; // Ajusta a rotação Y com base no deslocamento horizontal

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
});
