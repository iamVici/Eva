let sections = window.sections;
var menu_links = document.querySelectorAll('.menu a');

var lastScrollTop = 0;
var direction = '';

window.addEventListener('scroll', function() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
    if (scrollTop > lastScrollTop) {
      // rolando para baixo
      direction = 'down';
    } else {
      // rolando para cima
      direction = 'up';
    }
    lastScrollTop = scrollTop;
  
    sections.forEach(function(section, index) {
      var sectionTop = section.offsetTop;
      var sectionBottom = sectionTop + section.offsetHeight;
  
      if (scrollTop >= sectionTop && scrollTop <= sectionBottom) {
        if (direction == 'down' && index < sections.length - 1 && scrollTop + window.innerHeight > sections[index + 1].offsetTop) {
          // caso especial: a próxima seção está no viewport
          sections.forEach(function(s) { s.classList.remove('active'); });
          menu_links.forEach(function(l) { l.classList.remove('active'); });
          sections[index + 1].classList.add('active');
          menu_links[index + 1].classList.add('active');
        } else {
          // caso geral
          sections.forEach(function(s) { s.classList.remove('active'); });
          menu_links.forEach(function(l) { l.classList.remove('active'); });
          section.classList.add('active');
          menu_links[index].classList.add('active');
        }
      }
    });
});