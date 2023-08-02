window.onload = function() {
    window.sections = Array.from(document.querySelectorAll('.section'));
    window.menuItems = Array.from(document.querySelectorAll('.menu a'));
    window.currentSectionIndex = 0;
    window.sectionPositions = window.sections.map(section => section.offsetLeft);
    const wrapper = document.querySelector('#wrapper'); // Adicione esta linha
  
    function handleScroll(event) {
        console.log("handleScroll function called"); // Adicione esta linha
        event.preventDefault();
        let nextSectionIndex;
        
        if (event.deltaY > 0) {
            nextSectionIndex = (window.currentSectionIndex + 1) < window.sectionPositions.length ? window.currentSectionIndex + 1 : window.currentSectionIndex;
        } else {
            nextSectionIndex = (window.currentSectionIndex - 1) >= 0 ? window.currentSectionIndex - 1 : window.currentSectionIndex;
        }
        
        gsap.to(wrapper, {
            scrollTo: {
                x: window.sectionPositions[nextSectionIndex],
                autoKill: false
            },
            duration: 1.5
        });
        
        window.currentSectionIndex = nextSectionIndex; // Atualiza o índice atual da seção.
        // Atualiza o ScrollSpy.
        updateActiveSection(window.sections, window.menuItems);
    }
    
    function updateActiveSection(sections, menuItems) {
        const currentSection = sections[window.currentSectionIndex];
        menuItems.forEach((item, index) => {
            if (item.getAttribute('href') === '#' + currentSection.getAttribute('id')) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
  
    wrapper.addEventListener('wheel', handleScroll);
    wrapper.addEventListener('touchmove', handleScroll);
}
