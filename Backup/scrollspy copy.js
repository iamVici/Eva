window.initScrollSpy = function(sections) {
  var menu_links = document.querySelectorAll('.menu a');
  var lastScrollTop = 0;

  window.addEventListener('wheel', function(e) {
      var direction = '';
      var currentSection = sections[window.currentSectionIndex];
  
      if (e.deltaY < 0) {
          // Rolagem para cima
          window.currentSectionIndex = Math.max(0, window.currentSectionIndex - 1);
      } else {
          // Rolagem para baixo
          window.currentSectionIndex = Math.min(sections.length - 1, window.currentSectionIndex + 1);
      }
  
      // Mudança de seção
      var targetSection = sections[window.currentSectionIndex];
  
      // Evita scroll vertical
      e.preventDefault();

      // Scroll para a seção alvo
      window.scrollTo({
          left: targetSection.offsetLeft, // scroll to offsetLeft of target section
          behavior: 'smooth',
      });

      // Atualiza a classe ativa do link do menu
      menu_links.forEach(link => link.classList.remove('active'));
      menu_links[window.currentSectionIndex].classList.add('active');
  });
}
