// Espera o documento HTML ser completamente carregado antes de executar o código
document.addEventListener('DOMContentLoaded', function() {
  // Seleciona todos os elementos com a classe 'project-list' e os armazena em uma lista
  const projectLists = document.querySelectorAll('.project-list');

  // Seleciona o primeiro elemento com a classe 'project' e guarda-o na variável 'card'
  const card = document.querySelector('.project');

  // Dentro do elemento 'card', seleciona o elemento com a classe 'proj-numeration' e armazena-o na variável 'cardNumber'
  const cardNumber = card.querySelector('.proj-numeration');

  // Dentro do elemento 'card', seleciona o elemento com a classe 'proj-title' e armazena-o na variável 'cardTitle'
  const cardTitle = card.querySelector('.proj-title');

  // Seleciona o elemento com a classe 'proj-description' e armazena-o na variável 'hoverFace'
  const hoverFace = document.querySelector('.proj-description');

  // Seleciona o elemento com a classe 'proj-category' e armazena-o na variável 'cardFace'
  const cardFace = document.querySelector('.proj-category');

  // Seleciona o elemento com a classe 'proj-progress-eva' e armazena-o na variável 'element'
  const element = document.querySelector('.proj-progress-eva');

  // Inicializa a variável 'activeItem' como nula
  let activeItem = null;

  // Função para atualizar o conteúdo do cartão com base no índice fornecido
  function updateCardContent(index) {
    // Obtém o texto do elemento com a classe 'project-name' dentro da lista de projetos no índice especificado
    const newTitle = projectLists[index].querySelector('.project-name').innerText;

    // Obtém o texto do elemento com a classe 'project-number' dentro da lista de projetos no índice especificado
    let newNumber = projectLists[index].querySelector('.project-number').innerText;

    // Encontra a classe que começa com 'proj-list-' no elemento da lista de projetos no índice especificado
    const newClass = findClassStartingWith(projectLists[index], 'proj-list-');

    // Atualiza o texto do título e número no cartão
    cardTitle.innerText = newTitle;
    newNumber = newNumber.replace('.', '').replace(/^0+/, '');
    cardNumber.innerText = newNumber;

    // Remove todas as classes que começam com "proj-" do elemento do cartão
    card.classList.forEach(function(className) {
      if (className.startsWith('proj-')) {
        card.classList.remove(className);
      }
    });

    // Adiciona a classe correspondente ao valor do atributo "data-title" ao elemento do cartão
    card.classList.add(newClass.replace('-list', ''));
  }

  // Função para atualizar a face de informações ao passar o mouse sobre um item
  function updateHoverFace(item) {
    const title = item.getAttribute('data-title');
    const subtitle = item.getAttribute('data-subtitle');
    const content = item.getAttribute('data-content');
    const type = item.getAttribute('data-type');

    hoverFace.querySelector('.proj-hover-title').innerText = title;
    hoverFace.querySelector('.proj-hover-subtitle').innerText = subtitle;
    hoverFace.querySelector('.proj-hover-content').innerText = content;

    cardFace.firstChild.nodeValue = type + '\n';
  }

  // Função para atualizar o progresso do projeto com base no item
  function updateProjProgress(item) {
    const dataTitle = item.getAttribute('data-title').toLowerCase();

    // Remove todas as classes que começam com "proj-progress-" do elemento de progresso
    element.classList.forEach(function(className) {
      if (className.startsWith('proj-progress-')) {
        element.classList.remove(className);
      }
    });

    // Adiciona a classe correspondente ao valor do atributo "data-title" ao elemento de progresso
    element.classList.add('proj-progress-' + dataTitle);
  }

  // Função para redirecionar para uma URL com base no item
  function redirectToURL(item) {
    const url = item.getAttribute('data-url');
    window.location.href = url;
  }

  // Função auxiliar para encontrar uma classe que começa com um determinado prefixo em um elemento
  function findClassStartingWith(element, prefix) {
    for (let i = 0; i < element.classList.length; i++) {
      const className = element.classList[i];
      if (className.startsWith(prefix)) {
        return className;
      }
    }
    return '';
  }

  // Adiciona ouvintes de eventos aos elementos da lista de projetos
  projectLists.forEach((item, index) => {
    // Ouve o evento de passar o mouse sobre um item
    item.addEventListener('mouseover', () => {
      // Remove a classe 'active' do item ativo anterior (se houver)
      if (activeItem) {
        activeItem.classList.remove('active');
      }
      // Adiciona a classe 'active' ao item atual
      item.classList.add('active');
      // Atualiza o conteúdo do cartão, a face de informações e o progresso com base no item
      activeItem = item;
      updateCardContent(index);
      updateHoverFace(item);
      updateProjProgress(item);
    });

    // Ouve o evento de clique em um item e redireciona para a URL correspondente
    item.addEventListener('click', () => {
      redirectToURL(item);
    });
  });

  // Dispara manualmente o evento 'mouseover' no primeiro item da lista de projetos (se houver)
  if (projectLists.length > 0) {
    projectLists[0].dispatchEvent(new Event('mouseover'));
  }
});
