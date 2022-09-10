import {resultado} from './selectores.js';


const registroPorPagina = 50;
let totalPaginas;

function validarFormulario(e) {
    e.preventDefault();
    const terminoBusqueda = document.querySelector('#termino').value;


    if (!terminoBusqueda) {
        mostrarAlerta('Agrega un termino de busqueda');
        return;
    }

    buscarImagenes(terminoBusqueda);
}


function mostrarAlerta(mensaje) {
    const alerta = document.querySelector('.alerta');

    if (!alerta) {
        const alerta = document.createElement('p');
        alerta.classList.add('bg-red-400','text-red-700','px-4','py-3','rounded','max-w-lg','mx-auto','mt-6','text-center','alerta');
        alerta.textContent = mensaje;

        formulario.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        },3000)
    }
}


function buscarImagenes(busqueda) {
    const key = '29825345-23b0aa787e49a42d52cd70573';
    const url = `https://pixabay.com/api?key=${key}&q=${busqueda}&per_page=100`;
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            totalPaginas = calcularPaginas(resultado.totalHits);
            mostrarImagenes(resultado.hits)
        })
        .catch(error => console.log(error));
}

function mostrarImagenes(imagenes) {
    limpiarHTML();


    // Iterar sobre el arreglo de imagenes y construir el HTML
    imagenes.forEach(imagen => {
        const { previewURL, likes, views, largeImageURL } = imagen;

        const contenedorImagen = document.createElement('div');
        // contenedorImagen.classList.add(');

        const contenidoImagen = document.createElement('a');
        contenidoImagen.href = largeImageURL;
        contenidoImagen.target = "_blank";
        contenidoImagen.rel = "noopener noreferrer";
        contenidoImagen.classList.add('relative','flex','flex-col');
        
        const img = document.createElement('img');
        img.src = largeImageURL;
        img.classList.add('w-full');

        const contenedorTexto = document.createElement('div');
        contenedorTexto.classList.add('p-4','w-full','h-full','absolute','bg-gradient-to-b','from-black/0','to-black/50','opacity-0','hover:opacity-100','flex','justify-end','items-end','gap-2','transition-all');


        const likesText = document.createElement('p');
        likesText.classList.add('text-white','text-lg','font-bold');
        likesText.textContent = `${likes} Likes`;

        const viewsText = document.createElement('p');
        viewsText.classList.add('text-white','text-lg','font-bold');
        viewsText.textContent = `${views} Views`;

        contenedorTexto.appendChild(likesText);
        contenedorTexto.appendChild(viewsText);

        contenidoImagen.appendChild(img);
        contenidoImagen.appendChild(contenedorTexto);
        contenedorImagen.appendChild(contenidoImagen);
        resultado.appendChild(contenedorImagen);
    })
}

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function calcularPaginas(total) {
    return Math.ceil(total/registroPorPagina);
}




export { validarFormulario };
