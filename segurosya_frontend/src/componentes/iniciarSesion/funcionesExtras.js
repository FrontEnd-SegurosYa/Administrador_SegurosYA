import { LINKSERVER } from '../../utiles/constantes.js';

export function iniciarSesion(correo,contrasenha) {
    return fetch(LINKSERVER+"/api/cuenta/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({correo: correo, contrasenha: contrasenha})
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