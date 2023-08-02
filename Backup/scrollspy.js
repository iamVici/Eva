function getCurrentSection(sections) {
  let i = 0;
  while(i < sections.length && sections[i].offsetLeft < window.scrollX) {
    i++;
  }
  return Math.max(i - 1, 0);
}

function updateActiveSection(sections, menu_links) {
  const currentSectionIndex = getCurrentSection(sections);
  menu_links.forEach((link, i) => {
    if(i === currentSectionIndex) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

window.onload = function() {
  const sections = document.querySelectorAll('.section');
  const menu_links = document.querySelectorAll('.menu a');

  updateActiveSection(sections, menu_links);

  window.addEventListener('scroll', () => {
    updateActiveSection(sections, menu_links);
  });
}
