//Importar variables
import { LINKSERVER } from '../../utiles/constantes.js';


export function obtenerDepartamentos() {
    return fetch(LINKSERVER+"/api/departamento/listar")
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

export function obtenerDistritos() {
    return fetch(LINKSERVER+"/api/distrito/listar")
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

export function buscarProvinciasDep(idDepartamento) {
    return fetch(LINKSERVER+"/api/provincia/buscar", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({idDepartamento: idDepartamento})
    })
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

export function buscarDistritosProv(nombreProvincia) {
    return fetch(LINKSERVER+"/api/distrito/buscar", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({nombre: nombreProvincia})
    })
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