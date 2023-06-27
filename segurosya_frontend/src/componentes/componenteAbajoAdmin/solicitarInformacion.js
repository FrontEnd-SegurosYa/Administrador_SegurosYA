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
    return fetch(LINKSERVER+"/api/provincia/buscarXDepartamento", {
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

export function buscarDistritosProv(idProvincia) {
    return fetch(LINKSERVER+"/api/distrito/buscarXProvincia", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({idProvincia: idProvincia})
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

export function consultarDNI(dniBuscado) {
    return fetch(LINKSERVER+"/api/cliente/buscar", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({dni: dniBuscado})
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

export function consultarClienteEspecial(numDoc) {
    return fetch(LINKSERVER+"/api/listanegra/buscar", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({numDoc: numDoc})
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