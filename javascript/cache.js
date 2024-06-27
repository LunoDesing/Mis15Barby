function cargarRecursos(recursos, version) {
    recursos.forEach(function (recurso) {
        var urlActualizada = recurso + '?v' + version;
        var elementos = document.querySelectorAll('[href="' + recurso + '"], [src="' + recurso + '"]');
        elementos.forEach(function (elemento) {
            if (elemento.tagName === 'SCRIPT') {
                var nuevoScript = document.createElement('script');
                nuevoScript.src = urlActualizada;
                nuevoScript.onload = function () {
                    elemento.parentNode.replaceChild(nuevoScript, elemento);
                };
                document.head.appendChild(nuevoScript);
            } else if (elemento.tagName === 'LINK') {
                var nuevaHojaEstilos = document.createElement('link');
                nuevaHojaEstilos.rel = 'stylesheet';
                nuevaHojaEstilos.href = urlActualizada;
                nuevaHojaEstilos.onload = function () {
                    elemento.parentNode.replaceChild(nuevaHojaEstilos, elemento);
                };
                document.head.appendChild(nuevaHojaEstilos);
            } else {
                elemento.src = urlActualizada;
            }
        });
    });
  }
  
  function forzarActualizacionCache() {
    var recursos = [
        'https://unpkg.com/aos@2.3.1/dist/aos.js',
        'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
        'estilos/normalize.css?v100',
        'estilos/styles.css?v100',
        'estilos/mediaQueries.css?v100',
        'javascript/script.js?v100',
        'assets/imagenes/fondo.webp',
        'assets/imagenes/album.webp',
        'assets/imagenes',
        'assets/vectores',
        'assets/musica.mp3',
      // Add the URLs of your resources here
    ];
    var version = Date.now();
    cargarRecursos(recursos, version);
  }
  
  forzarActualizacionCache();
  
  // service-worker.js
  
  self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('v100').then(function(cache) { // Incremented cache version
            return cache.addAll([
                'https://unpkg.com/aos@2.3.1/dist/aos.js',
                'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
                'estilos/normalize.css?v100',
                'estilos/styles.css?v100',
                'estilos/mediaQueries.css?v100',
                'javascript/script.js?v100',
                'assets/imagenes/fondo.webp',
                'assets/imagenes/album.webp',
                'assets/imagenes',
                'assets/vectores',
                'assets/musica.mp3',
              // Agrega aquí todos los recursos que deseas cachear
            ]);
        })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
  });
  