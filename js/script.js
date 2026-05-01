document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MENÚ HAMBURGUESA Y NAVEGACIÓN MÓVIL ---
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const itemsConSubmenu = document.querySelectorAll('.menu-item.has-sub');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            
            menu.classList.toggle('active');
            menuToggle.classList.toggle('open');
            
            if (menu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'initial';
                // Al cerrar el menú principal, cerramos también cualquier submenú abierto
                itemsConSubmenu.forEach(item => item.classList.remove('abierto'));
            }
        });

        // CORRECCIÓN: Solo cerrar el menú si el link NO es un disparador de submenú
        document.querySelectorAll('.menu a').forEach(link => {
            link.addEventListener('click', (e) => {
                // Si el link padre NO tiene la clase 'has-sub', cerramos el menú
                if (!link.closest('.has-sub')) {
                    menu.classList.remove('active');
                    menuToggle.classList.remove('open');
                    document.body.style.overflow = 'initial';
                }
            });
        });
    }

    // Lógica para submenús en móvil (acordeón)
    itemsConSubmenu.forEach(item => {
        const disparador = item.querySelector('a') || item.querySelector('.menu-label');

        if (disparador) {
            disparador.addEventListener('click', (e) => {
                if (window.innerWidth <= 850) {
                    e.preventDefault(); 
                    e.stopPropagation(); 

                    // Cerramos otros submenús (acordeón)
                    itemsConSubmenu.forEach(otro => {
                        if (otro !== item) otro.classList.remove('abierto');
                    });

                    // Abrimos o cerramos el actual
                    item.classList.toggle('abierto');
                }
            });
        }
    });

    // --- 2. SLIDER DE VALORES (HOME) ---
    const valores = document.querySelectorAll('.valor');
    const indicadoresContenedor = document.querySelector('.indicadores');
    let indiceActual = 0;
    let autoplay;

    if (valores.length > 0) {
        const coloresMotus = ['#345443', '#ba8f43', '#345443', '#ba8f43', '#345443', '#ba8f43', '#345443'];

        function mostrarValor(index) {
            valores.forEach(v => v.classList.remove('activo'));
            if (valores[index]) {
                valores[index].classList.add('activo');
                valores[index].scrollTop = 0;
            }
            updateActiveIndicator(index);
        }

        function proximo() {
            indiceActual = (indiceActual + 1) % valores.length;
            mostrarValor(indiceActual);
            reiniciarAutoplay();
        }

        function anterior() {
            indiceActual = (indiceActual - 1 + valores.length) % valores.length;
            mostrarValor(indiceActual);
            reiniciarAutoplay();
        }

        function createIndicators() {
            if (!indicadoresContenedor) return;
            indicadoresContenedor.innerHTML = '';
            
            valores.forEach((_, i) => {
                const ind = document.createElement('div');
                ind.className = 'indicador';
                ind.style.backgroundColor = coloresMotus[i % coloresMotus.length];
                
                ind.addEventListener('click', () => {
                    indiceActual = i;
                    mostrarValor(i);
                    reiniciarAutoplay();
                });
                indicadoresContenedor.appendChild(ind);
            });
            updateActiveIndicator(indiceActual);
        }

        function updateActiveIndicator(index) {
            const inds = document.querySelectorAll('.indicador');
            inds.forEach((el, i) => {
                if (i === index) {
                    el.classList.add('activo');
                    el.style.opacity = "1";
                    el.style.transform = "scaleY(1.3)";
                } else {
                    el.classList.remove('activo');
                    el.style.opacity = "0.3";
                    el.style.transform = "scaleY(1)";
                }
            });
        }

        function iniciarAutoplay() {
            autoplay = setInterval(proximo, 5000);
        }

        function reiniciarAutoplay() {
            clearInterval(autoplay);
            iniciarAutoplay();
        }

        const btnNext = document.querySelector('.next');
        const btnPrev = document.querySelector('.prev');

        if (btnNext) btnNext.addEventListener('click', proximo);
        if (btnPrev) btnPrev.addEventListener('click', anterior);

        createIndicators();
        mostrarValor(indiceActual);
        iniciarAutoplay();
    }

    // --- 3. FUNCIONES EXTRAS ---
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    document.querySelectorAll('.toggle-btn').forEach(header => {
        header.addEventListener('click', () => {
            const modulo = header.closest('.modulo');
            if (modulo) modulo.classList.toggle('abierto');
        });
    });
});

function abrirCorreo() {
    var esMovil = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (esMovil) {
        window.location.href = "mailto:consultoria.psimigrantes@gmail.com?subject=Hola&body=Hola%2C%0A%0AEncontr%C3%A9%20su%20web%20Programa%20Motus%20y%20quisiera%20recibir%20m%C3%A1s%20informaci%C3%B3n.%0A%0AMuchas%20gracias.";
    } else {
        window.open("https://mail.google.com/mail/?view=cm&fs=1&to=consultoria.psimigrantes@gmail.com&su=Hola&body=Hola%2C%0A%0AEncontr%C3%A9%20su%20web%20Programa%20Motus%20y%20quisiera%20recibir%20m%C3%A1s%20informaci%C3%B3n.%0A%0AMuchas%20gracias.", "_blank");
    }
}