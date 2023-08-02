window.addEventListener("load", function() {
    var loader = document.getElementById('loading');
    setTimeout(function() {
        loader.style.opacity = '0';
    }, 1500);

    setTimeout(function() {
        loader.style.display = 'none';
    }, 2500);
});
