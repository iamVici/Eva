const menuItems = document.querySelectorAll('.menu a');

menuItems.forEach(menuItem => {
    
    menuItem.addEventListener('click', event => {
        event.preventDefault();
      
        const targetId = menuItem.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const targetOrder = parseInt(targetSection.dataset.order);

        // Atualize currentSectionIndex baseado na seção alvo
        window.currentSectionIndex = targetOrder - 1;

        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
    });
});
