//Importar variables
import { LINKSERVER } from '../../utiles/constantes.js';

//Variables locales
const RESULTADOSXPAGINA = 10;

export function obtenerClientes() {
return fetch(LINKSERVER+"/api/cliente/listar")
    .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
        return response.json();
    })
    .catch(error => {
        console.error('Error:', error);
        throw error;
        }
    );
}

export function dividirPaginas(data){
    const result = [];
    const length = data.length;
    
    for (let i = 0; i < length; i += RESULTADOSXPAGINA) {
        const block = data.slice(i, i + RESULTADOSXPAGINA);
        result.push(block);
    }  
    
    return result;
}

function obtenerNumeroDePaginas(numeroElementos){
    return Math.ceil(numeroElementos / RESULTADOSXPAGINA);
}



