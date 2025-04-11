document.addEventListener('DOMContentLoaded', () => {
    // Configuración de partículas
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#c23616' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });

    // Configuración de la cuenta regresiva
    const targetDate = new Date('2025-05-10T19:00:00-06:00'); // Fecha y hora del evento

    function updateCountdown() {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    // Iniciar la cuenta regresiva
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Reproductor de YouTube
    const player = new YT.Player('youtube-player', {
        videoId: 'https://www.youtube.com/watch?v=8xg3vE8Ie_E&list=RD8xg3vE8Ie_E&start_radio=1', // Reemplaza con el ID de tu video de YouTube
        playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            showinfo: 0,
            rel: 0,
            loop: 1,
            playlist: 'VIDEO_ID' // Reemplaza con el ID de tu video
        },
        events: {
            'onReady': onPlayerReady
        }
    });

    function onPlayerReady(event) {
        event.target.mute();
        event.target.playVideo();
    }

    // Función para abrir mapas en Google Maps
    function openGoogleMaps(location) {
        let query;
        switch(location) {
            case 'church':
                query = 'Iglesia de San Juan, León, Guanajuato';
                break;
            case 'reception':
                query = 'Casa de Piedra, León, Guanajuato';
                break;
        }
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank');
    }

    // Inicializar mapas de Leaflet
    const churchMap = L.map('church-map').setView([21.1365, -101.6677], 15); // Coordenadas aproximadas de León
    const receptionMap = L.map('reception-map').setView([21.1365, -101.6677], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: ' OpenStreetMap contributors'
    }).addTo(churchMap);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: ' OpenStreetMap contributors'
    }).addTo(receptionMap);

    // Agregar marcadores
    L.marker([21.1365, -101.6677]).addTo(churchMap)
        .bindPopup('Iglesia de San Juan');
    L.marker([21.1365, -101.6677]).addTo(receptionMap)
        .bindPopup('Casa de Piedra');

    // Animaciones de entrada
    const sections = document.querySelectorAll('section, .families-section, .love-story-section, .bridesmaids-section, .witnesses-section, .location-section, .program-section, .menu-section, .gift-section, .videos-section, .gallery-section, .messages-section, .confirmation-section, .reflections-section, .dedications-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
    });

    // Animación de entrada para cada sección
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => observer.observe(section));

    // Animación de entrada para imágenes de la galería
    const galleryImages = document.querySelectorAll('.gallery-images img');
    galleryImages.forEach((img, index) => {
        img.style.opacity = '0';
        img.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            img.style.opacity = '1';
            img.style.transform = 'translateX(0)';
        }, index * 300);
    });

    // Efecto de paralaje en la imagen principal
    const mainImage = document.querySelector('.main-image');
    const mainImg = document.querySelector('.main-img');

    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { width, height, left, top } = mainImage.getBoundingClientRect();
        
        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;
        
        mainImg.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    });

    // Formulario de confirmación
    const form = document.getElementById('confirmation-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Aquí iría la lógica para enviar los datos al servidor
        console.log('Formulario enviado:', data);
        
        // Mostrar mensaje de éxito
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = '¡Gracias por confirmar tu asistencia!';
        form.appendChild(successMessage);
        
        // Limpiar el formulario
        form.reset();
    });

    // Animación de flotación para elementos
    const floatingElements = document.querySelectorAll('.floating');
    floatingElements.forEach(element => {
        element.style.animation = 'float 3s ease-in-out infinite';
    });

    // Animación de entrada para el contenedor principal
    const container = document.querySelector('.invitation-container');
    container.style.opacity = '0';
    container.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        container.style.opacity = '1';
        container.style.transform = 'scale(1)';
    }, 100);

    // Función para controlar la música
    function toggleMusic(action) {
        const audio = document.getElementById('eventMusic');
        const playButton = document.querySelector('.music-play');
        const pauseButton = document.querySelector('.music-pause');

        if (action === 'play') {
            audio.play().catch(() => {
                // Si falla la reproducción automática, mostrar el botón de play
                playButton.style.display = 'block';
                pauseButton.style.display = 'none';
            });
            playButton.style.display = 'none';
            pauseButton.style.display = 'block';
        } else {
            audio.pause();
            playButton.style.display = 'block';
            pauseButton.style.display = 'none';
        }
    }

    // Iniciar la música al cargar la página
    document.addEventListener('DOMContentLoaded', () => {
        const audio = document.getElementById('eventMusic');
        audio.volume = 0.5; // Volumen inicial al 50%
        
        // Intentar reproducir automáticamente
        audio.play().catch(() => {
            // Si falla, mostrar el botón de play
            document.querySelector('.music-play').style.display = 'block';
            document.querySelector('.music-pause').style.display = 'none';
        });
    });
});