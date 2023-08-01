document.addEventListener("DOMContentLoaded", function () {

    // Selecione todos os links do menu
    const menuLinks = document.querySelectorAll('.nav-link');

    // Define o primeiro link como ativo ao carregar a página
    const firstMenuLink = document.querySelector('.nav-link');
    setActiveMenuLink(firstMenuLink.getAttribute('href'));

    // Adicione um evento de clique a cada link do menu
    menuLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            // Impedir o comportamento padrão de clique do link
            event.preventDefault();

            // Obter o destino do link (o ID da seção)
            const targetId = this.getAttribute('href');

            // Obter a seção de destino
            const targetSection = document.querySelector(targetId);

            // Calcular a posição de destino com deslocamento
            const targetPosition = targetSection.offsetTop - 70;

            // Marcar o link do menu como ativo
            setActiveMenuLink(targetId);

            // Deixe um pequeno atraso (usando setTimeout) antes de realizar a rolagem suave para a seção de destino
            setTimeout(function () {
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 500);

        });
    });

    // Ative o Scrollspy
    const scrollspy = new bootstrap.ScrollSpy(document.querySelector('.scrollspy'));

    // Defina qual link do menu está ativo
    function setActiveMenuLink(targetId) {
        menuLinks.forEach(function (link) {
            // Remova a classe 'active' de todos os links
            link.classList.remove('active');

            // Adicione a classe 'active' apenas ao link correspondente à seção ativa
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }
});
