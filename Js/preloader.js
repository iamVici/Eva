window.addEventListener('load', function() {
    var loader = document.getElementById('loader');
    var progress = document.getElementById('progress');
    var levelValue = document.getElementById('level-value');

    var interval = setInterval(function() {
        if (progress.value < 100) {
            progress.value += 50;
            levelValue.textContent = progress.value;
        } else {
            clearInterval(interval);
            loader.style.display = 'none';

            var content = document.getElementById('content');
            content.style.display = 'block';


        }
    }, 50);  // Atualiza o progresso a cada 50ms
});
