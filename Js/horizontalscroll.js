var isScrolling = false;
var isMouseOverTimeline = false;
var isMouseOverProjects = false;
var currentSectionIndex = 0;
var sections = document.querySelectorAll('.section');
var wrapper = document.querySelector('#wrapper');
var sectionPositions = Array.from(sections).map(sec => sec.offsetLeft);
var menuLinks = document.querySelectorAll('.menu .section-link');

var timelineDiv = document.querySelector('.mytimeline');
timelineDiv.addEventListener('mouseover', function() {
  isMouseOverTimeline = true;
});
timelineDiv.addEventListener('mouseout', function() {
  isMouseOverTimeline = false;
});

var projectsDiv = document.querySelector('.projects');
projectsDiv.addEventListener('mouseover', function() {
  isMouseOverProjects = true;
});
projectsDiv.addEventListener('mouseout', function() {
  isMouseOverProjects = false;
});

projectsDiv.addEventListener('wheel', handleProjectScroll, {passive: false}); // Adicione essa linha

function handleProjectScroll(event) {
  event.preventDefault();
  this.scrollLeft += Math.sign(event.deltaY) * 40; // Altera a posição de rolagem horizontal baseado no deltaY do evento
}

function handleScroll(event) {
  if (isScrolling || isMouseOverTimeline || isMouseOverProjects) return;
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

  menuLinks.forEach(a => a.classList.remove('active'));
  menuLinks[nextSectionIndex].classList.add('active');
  currentSectionIndex = nextSectionIndex;
}

menuLinks.forEach(a => {
  a.addEventListener('click', function(event) {
      event.preventDefault();
      var sectionIndex = parseInt(this.getAttribute('data-order')) - 1;
      gsap.to(wrapper, {
          scrollTo: {
              x: sectionPositions[sectionIndex],
              autoKill: false
          },
          duration: 1.0,
          onComplete: function() {
              isScrolling = false;
              isMouseOverProjects = false;
          }
      });
      menuLinks.forEach(a => a.classList.remove('active'));
      this.classList.add('active');
      currentSectionIndex = sectionIndex;
  });
});

menuLinks[0].classList.add('active');
document.addEventListener('wheel', handleScroll, { passive: false });
