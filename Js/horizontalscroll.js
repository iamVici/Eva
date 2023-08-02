var isScrolling = false;
var currentSectionIndex = 0;
var sections = document.querySelectorAll('.section');
var wrapper = document.querySelector('#wrapper');
var sectionPositions = Array.from(sections).map(sec => sec.offsetLeft);
var menuLinks = document.querySelectorAll('.menu .section-link');

function handleScroll(event) {
    if (isScrolling) return;
    isScrolling = true;

    event.preventDefault();
    var nextSectionIndex = event.deltaY > 0 
        ? Math.min(currentSectionIndex + 1, sections.length - 1)
        : Math.max(currentSectionIndex - 1, 0);
    
    gsap.to(wrapper, {
        scrollTo: {
            x: sectionPositions[nextSectionIndex],
            autoKill: false
        },
        duration: 1.0,
        onComplete: function() {
            isScrolling = false;
        }
    });
    
    // Remove a classe "active" de todos os links do menu
    menuLinks.forEach(a => a.classList.remove('active'));
    
    // Adicione a classe "active" ao link do menu correspondente à seção ativa
    menuLinks[nextSectionIndex].classList.add('active');
    
    currentSectionIndex = nextSectionIndex;
}

// Adicione um ouvinte de eventos de clique a cada link do menu
menuLinks.forEach(a => {
    a.addEventListener('click', function(event) {
        event.preventDefault();

        // Obtenha o índice da seção correspondente ao item do menu clicado
        var sectionIndex = parseInt(this.getAttribute('data-order')) - 1;

        // Role para a seção correspondente
        gsap.to(wrapper, {
            scrollTo: {
                x: sectionPositions[sectionIndex],
                autoKill: false
            },
            duration: 1.0,
            onComplete: function() {
                isScrolling = false;
            }
        });

        // Remova a classe "active" de todos os links do menu
        menuLinks.forEach(a => a.classList.remove('active'));

        // Adicione a classe "active" ao link do menu clicado
        this.classList.add('active');

        currentSectionIndex = sectionIndex;
    });
});

// Adicione a classe "active" ao primeiro link do menu
menuLinks[0].classList.add('active');

// Adicione um ouvinte de eventos de rolagem ao documento
document.addEventListener('wheel', handleScroll, { passive: false });

