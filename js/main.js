/* ==========================================================
   BASE DE DATOS DE PROYECTOS (¡Modifica aquí tus trabajos!)
   ========================================================== */
const projectsData = [
    {
        id: 1,
        title: "Campañas Visuales para Redes Sociales",
        category: "digital",
        categoryName: "Diseño Digital & Redes",
        image: "assets/img/rrss.png",
        description: "Creación de contenido visual de alto impacto para redes sociales, combinando estética futurista, composición tipográfica y narrativa visual."
    },
    {
        id: 2,
        title: "Identidad Corporativa & Papelería",
        category: "impreso",
        categoryName: "Diseño Impreso",
        image: "assets/img/identidad.png",
        description: "Diseño de papelería fina, tarjetas de presentación con acabados especiales y optimización de archivos listos para preprensa."
    },
    {
        id: 3,
        title: "Ilustración Vectorial",
        category: "ilustracion",
        categoryName: "Ilustración",
        image: "assets/img/ilustracion.png", // Puedes cambiar por otra imagen
        description: "Ilustraciones personalizadas de personajes y conceptos con estilo minimalista y paletas de color vibrantes."
    },
    {
        id: 4,
        title: "Diagramación Editorial & Revista",
        category: "editorial",
        categoryName: "Diseño Editorial",
        image: "assets/img/editorial.png",
        description: "Maquetación de publicaciones impresas y digitales, cuidando retículas, jerarquía tipográfica y ritmo visual."
    },
    {
        id: 5,
        title: "Gran Formato para Expos y Eventos",
        category: "impreso",
        categoryName: "Diseño Impreso",
        image: "assets/img/gran_formato.png",
        description: "Diseño de cartel para exhibición en gran formato, adaptado a perfiles de color CMYK y control riguroso de resolución."
    },
    {
        id: 6,
        title: "Diseño Web",
        category: "web",
        categoryName: "Páginas web",
        image: "assets/img/web.png",
        description: "Diseño de páginas web, catálogos digitales, interfaz y experiencia de usuario."
    }
];

/* ==========================================================
   RENDERIZAR PROYECTOS EN EL DOM
   ========================================================== */
const portfolioGrid = document.getElementById('portfolioGrid');
const filterContainer = document.getElementById('filterContainer');

function renderProjects(filter = 'all') {
    portfolioGrid.innerHTML = '';

    const filteredProjects = filter === 'all' 
        ? projectsData 
        : projectsData.filter(project => project.category === filter);

    if (filteredProjects.length === 0) {
        portfolioGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem 0;">No hay proyectos en esta categoría por el momento.</p>`;
        return;
    }

    filteredProjects.forEach(project => {
        const card = document.createElement('div');
        card.classList.add('portfolio-card');
        card.setAttribute('data-category', project.category);
        
        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
            </div>
            <div class="card-info">
                <span class="card-category">${project.categoryName}</span>
                <h3>${project.title}</h3>
                <p>${project.description.substring(0, 85)}...</p>
            </div>
        `;

        // Evento para abrir el Lightbox con los detalles del proyecto
        card.addEventListener('click', () => {
            openLightbox(project);
        });

        portfolioGrid.appendChild(card);
    });
}

/* ==========================================================
   SISTEMA DE FILTROS
   ========================================================== */
filterContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
        // Remover clase active de todos los botones
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        // Agregar clase active al presionado
        e.target.classList.add('active');

        const filterValue = e.target.getAttribute('data-filter');
        renderProjects(filterValue);
    }
});

/* ==========================================================
   LIGHTBOX (VISOR DE IMÁGENES A DETALLE)
   ========================================================== */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(project) {
    lightboxImg.src = project.image;
    lightboxTitle.textContent = project.title;
    lightboxDesc.textContent = project.description;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Evita scroll de fondo
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Cerrar con tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

/* ==========================================================
   INICIALIZACIÓN
   ========================================================== */
document.addEventListener('DOMContentLoaded', () => {
    renderProjects('all');
});