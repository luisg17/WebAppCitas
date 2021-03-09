//Cachear archivos de la pagina para que funcione sin internet
const nombreCache = 'apv-v1';
const archivos = [
    //Para evitar error de ruta colocamos un . es decir la ruta relativa
      // '/',
    '/index.html',
    '/error.html',
    '/css/bootstrap.css',
    '/css/styles.css',
    '/js/app.js',
    '/js/apv.js'
];


//Cuando se  instala el service Worker(Solo se ejecuta una vez)
self.addEventListener('install', e => {
    console.log('Instalado el service Worker');

    //Guardar en cache
    e.waitUntil(
        caches.open(nombreCache)
        .then(cache => {
            console.log('Cacheando');
            //agregamos los caches
            cache.addAll(archivos);
        })
    )
});

//Este metodo se ejecuta cuando se activan el service worker

self.addEventListener('activate', e =>{
    console.log('Service Worker Activado');

    e.waitUntil(
        caches.keys()
        .then(keys => {
            // console.log(keys);

            return Promise.all(
                keys.filter(key => key !== nombreCache)
                .map(key => caches.delete(key)) //Borra los demas
            )
        })
    )
});

//eventos fetch para descargar archivos estaticos
self.addEventListener('fetch', e => {
    console.log('Fetch', e)

    e.respondWith(
        (async function () {
          const cachedResponse = await caches.match(e.request);
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(e.request);
        })()    // <-- Importante estos paréntesis finales!!
      );
  });

// .then(cacheResponse => (cacheResponse ? cacheResponse : caches.match('/error.html')))
