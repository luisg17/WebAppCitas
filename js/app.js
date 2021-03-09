//Validar si estamos en local host o en el 

const url = window.location.href;
const swLocation ='/WebAppCitas/sw.js';


//Revisar si el navegador soporta service worker
if('serviceWorker' in navigator){

    if(url.includes('localhost')){
        swLocation = '/sw.js';
    }

    //registramos nuestro sw.js y esto nos retornara un Promise
    navigator.serviceWorker.register(swLocation)
        .then(registrado => console.log('Se instalo correctamente', registrado))
        .catch(error => console.log('Fallo la instalacion', error))
}else{
    console.log('Service Workers no soportados');
}
