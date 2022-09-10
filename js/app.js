import { resultado , formulario } from './selectores.js';
import { validarFormulario } from './funciones.js';


window.onload = function() {
    formulario.addEventListener('submit', validarFormulario);
}
