window.onload = function() {
    const marquee = document.getElementById('marquee');
    const text = marquee.innerHTML;
    marquee.innerHTML = text + text + text + text;

    const options = {
      root: marquee,
      rootMargin: '0px',
      threshold: 0
    }

    const callback = (entries) => {
      if (!entries[0].isIntersecting) {
        marquee.scrollLeft = 0;
      }
    }

    const observer = new IntersectionObserver(callback, options);
    observer.observe(marquee.firstChild);
}