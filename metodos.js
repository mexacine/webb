let currentMovieUrl = '';
let currentTrailerUrl = '';

/**
 * 
 * @param {HTMLElement} card - 
 */
function mostrarDetalle(card) {
    
    const title = card.getAttribute('data-title');
    const year = card.getAttribute('data-year');
    const director = card.getAttribute('data-director');
    const genre = card.getAttribute('data-genre');
    const sinopsis = card.getAttribute('data-sinopsis');

    
    currentTrailerUrl = card.getAttribute('data-trailer-url') + '?mute=0&controls=0';
    currentMovieUrl = card.getAttribute('data-movie-url');

    
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-year').textContent = year;
    document.getElementById('modal-director').textContent = director;
    document.getElementById('modal-genre').textContent = genre;
    document.getElementById('modal-sinopsis').textContent = sinopsis;

    document.getElementById('modal-trailer-iframe').src = currentTrailerUrl;

    
    
const btnVerPelicula = document.getElementById('btn-ver-pelicula');


if (currentMovieUrl === 'SOLO EN CINES') {
   
    btnVerPelicula.textContent = 'SOLO EN CINES ';
    btnVerPelicula.disabled = true;
    btnVerPelicula.classList.add('disabled-cines');
    

} else if (currentMovieUrl.includes('primevideo.com') || currentMovieUrl === 'amazon') { 
    // Si la URL contiene el dominio o es el marcador 'amazon'
    btnVerPelicula.textContent = 'DISPONIBLE EN PRIME VIDEO ';
    btnVerPelicula.disabled = false; // HABILITADO
    btnVerPelicula.classList.remove('disabled-cines'); 
    // Habilitado, no necesita estilo de deshabilitado

} else if (currentMovieUrl.includes('mubi.com') ) { 
    // Si la URL contiene el dominio o es el marcador 'amazon'
    btnVerPelicula.textContent = 'DISPONIBLE EN MUBI';
    btnVerPelicula.disabled = false; // HABILITADO
    btnVerPelicula.classList.remove('disabled-cines');  

    
} else if (currentMovieUrl.includes('netflix.com') || currentMovieUrl === 'netflix') {
    btnVerPelicula.textContent = 'DISPONIBLE EN NETFLIX ';
    btnVerPelicula.disabled = false;
    btnVerPelicula.classList.remove('disabled-cines');

} else if (currentMovieUrl.includes('max.com') || currentMovieUrl === 'hbo') {
    btnVerPelicula.textContent = 'DISPONIBLE EN HBO MAX ';
    btnVerPelicula.disabled = false;
    btnVerPelicula.classList.remove('disabled-cines');
    
} else if (currentMovieUrl.includes('disneyplus.com') || currentMovieUrl === 'disney') {
    btnVerPelicula.textContent = 'DISPONIBLE EN DISNEY+ ';
    btnVerPelicula.disabled = false;
    btnVerPelicula.classList.remove('disabled-cines');

} else if (currentMovieUrl === 'NO') {
    // Si es una URL de YouTube válida o cualquier otra URL (el caso genérico de streaming)
    btnVerPelicula.textContent = 'PELICULA NO DISPONIBLE';
    btnVerPelicula.disabled = false;
    btnVerPelicula.classList.remove('disabled-cines');

} else {
   
    btnVerPelicula.textContent = 'VER PELÍCULA';
    btnVerPelicula.disabled = false;
    btnVerPelicula.classList.remove('disabled-cines');
}
    // 4. Mostrar el modal
    document.getElementById('movie-modal').classList.add('is-active');
    //document.body.style.overflow = 'hidden';

    // 5. Ocultar la vista del player que no se usa, asegurando que solo el tráiler se vea
    document.getElementById('movie-player-container').style.display = 'none';
    document.getElementById('trailer-container').style.display = 'flex';
}

function cerrarDetalle() {
    const modal = document.getElementById('movie-modal');
    const trailerIframe = document.getElementById('modal-trailer-iframe');

    trailerIframe.src = '';
    // Quitamos el sandbox para que el siguiente video (tráiler) cargue normal
    trailerIframe.removeAttribute("sandbox");

    modal.classList.remove('is-active');
}
// Función NUEVA: Abrir la URL de la película en una nueva pestaña
function abrirPelicula() {
    if (currentMovieUrl === 'SOLO EN CINES') {
        alert('Esta película se encuentra SOLO EN CINES actualmente.');
        return;
    }
    
    if (currentMovieUrl) {
        // 1. Ocultamos el contenedor del tráiler
        document.getElementById('trailer-container').style.display = 'none';
        
        // 2. Mostramos el contenedor del reproductor de película
        const playerContainer = document.getElementById('movie-player-container');
        playerContainer.style.display = 'flex';
        
        // 3. Buscamos el iframe dentro del modal (puedes reusar el del tráiler o tener uno aparte)
        const videoIframe = document.getElementById('modal-trailer-iframe');
        
        // 4. APLICAMOS EL BLOQUEO DE ANUNCIOS (Sandbox)
        // allow-scripts y allow-same-origin permiten que el video cargue.
        // Al NO poner allow-popups, el navegador bloquea las ventanas de publicidad.
        videoIframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms");
        
        // 5. Cargamos la película
        videoIframe.src = currentMovieUrl;
        
    } else {
        alert('Lo sentimos, aun no esta disponible la pelicula completa :´(');
    }
}

// Permitir cerrar al hacer clic fuera del contenido
document.getElementById('movie-modal').addEventListener('click', function (e) {
    if (e.target.id === 'movie-modal') {
        cerrarDetalle();
    }
})



;

