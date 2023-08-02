window.onload = function() {
  window.menuItems = Array.from(document.querySelectorAll('.menu .section-link'));
  window.sections = Array.from(document.querySelectorAll('section'));

  window.menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', event => {
        event.preventDefault();
    
        const targetId = menuItem.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const targetOrder = parseInt(targetSection.dataset.order);
    
        window.currentSectionIndex = targetOrder - 1;  // Atualiza o índice atual da seção.
    
        // Atualiza o ScrollSpy.
        updateActiveSection(window.sections, window.menuItems);
    
        window.scrollTo({
            left: targetSection.offsetLeft,
            behavior: 'smooth',
        });
    });
  });
}

function updateActiveSection(sections, menuItems) {
    const currentSection = sections[window.currentSectionIndex];

    menuItems.forEach(menuItem => {
        if (menuItem.getAttribute('href') === '#' + currentSection.id) {
            menuItem.classList.add('active');
        } else {
            menuItem.classList.remove('active');
        }
    });
}
