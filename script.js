document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const postsContainer = document.getElementById('posts-container');
    const articles = postsContainer.getElementsByTagName('article');

    // Elementos del panel de detalles
    const overlay = document.getElementById('overlay');
    const detailPanel = document.getElementById('cocktail-detail-panel');
    const closeButton = detailPanel.querySelector('.close-button');
    const detailTitle = document.getElementById('detail-title');
    const detailImage = document.getElementById('detail-image');
    const detailDescription = document.getElementById('detail-description');
    const detailIngredientsList = document.getElementById('detail-ingredients-list');
    const detailAdornmentsText = document.getElementById('detail-adornments-text');
    const detailObservationsText = document.getElementById('detail-observations-text');

    // Elementos del botón "Volver arriba"
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    // Función para mostrar el panel de detalles
    function showDetailPanel(article) {
        // Obtener datos del artículo para el panel
        const title = article.querySelector('h2').dataset.title || article.querySelector('h2').textContent;
        const description = article.querySelector('p[data-description]').dataset.description || article.querySelector('p[data-description]').textContent;
        const imageSrc = article.querySelector('img').src;
        const ingredients = Array.from(article.querySelectorAll('ul li')).map(li => li.textContent.trim());
        const adornments = article.querySelector('p[data-adornments]') ? (article.querySelector('p[data-adornments]').dataset.adornments || article.querySelector('p[data-adornments]').textContent) : 'No especificado.';
        const observations = article.querySelector('p[data-observations]') ? (article.querySelector('p[data-observations]').dataset.observations || article.querySelector('p[data-observations]').textContent) : 'No especificado.';

        // Llenar el panel con los datos
        detailTitle.textContent = title;
        detailImage.src = imageSrc;
        detailImage.alt = title;
        detailDescription.textContent = description;

        detailIngredientsList.innerHTML = ''; // Limpiar lista anterior
        ingredients.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            detailIngredientsList.appendChild(li);
        });

        detailAdornmentsText.textContent = adornments;
        detailObservationsText.textContent = observations;

        // Mostrar el overlay y el panel
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Evita el scroll del cuerpo cuando el panel está abierto
    }

    // Función para ocultar el panel de detalles
    function hideDetailPanel() {
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restaura el scroll del cuerpo
    }

    // Event Listener para el campo de búsqueda
    searchInput.addEventListener('keyup', function() {
        const searchTerm = searchInput.value.toLowerCase();

        for (let i = 0; i < articles.length; i++) {
            const article = articles[i];
            const titleElement = article.querySelector('h2'); 
            // CORRECCIÓN: Asegurarse de que `titleElement` no es nulo antes de acceder a sus propiedades
            const title = titleElement ? (titleElement.dataset.title ? titleElement.dataset.title.toLowerCase() : titleElement.textContent.toLowerCase()) : ''; 

            if (title.includes(searchTerm)) {
                article.style.display = 'flex'; // Usamos 'flex' porque los contenedores tienen display: flex
            } else {
                article.style.display = 'none';
            }
        }
    });

    // Para evitar que el formulario se envíe y recargue la página
    const searchForm = document.querySelector('.buscador');
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
        });
    }

    // Añadir event listener para cada artículo (para abrir el panel)
    Array.from(articles).forEach(article => {
        article.addEventListener('click', function() {
            showDetailPanel(article);
        });
    });

    // Añadir event listener para el botón de cerrar y el overlay (para cerrar el panel)
    closeButton.addEventListener('click', hideDetailPanel);
    overlay.addEventListener('click', function(event) {
        if (event.target === overlay) { // Solo cierra si se hace clic en el fondo oscuro, no en el panel
            hideDetailPanel();
        }
    });

    // Cerrar con la tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && overlay.classList.contains('active')) {
            hideDetailPanel();
        }
    });

    // Lógica para el botón "Volver arriba"
    window.addEventListener('scroll', function() {
        // Muestra el botón cuando el usuario ha bajado 100px desde el inicio
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        // Desplaza suavemente la página al inicio
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Desplazamiento suave
        });
    });
});