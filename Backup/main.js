window.onload = function() {
  var scrollSpy = new bootstrap.ScrollSpy(document.querySelector('#wrapper'), {
    target: '.menu',
    offset: 200 // Ajuste conforme necessário
  })

  // Observar a adição e remoção de elementos no DOM
  new MutationObserver(mutations => {
    var dataSpyList = [].slice.call(document.querySelectorAll('[data-bs-spy="scroll"]'))
    dataSpyList.forEach(function (dataSpyEl) {
      var scrollSpied = bootstrap.ScrollSpy.getInstance(dataSpyEl);
      if (scrollSpied) {
        scrollSpied.refresh();
      }
    })
  }).observe(document.querySelector(".menu"), { childList: true, subtree: true });
}
