import { LINKSERVER } from '../../utiles/constantes.js';

export function obtenerDatosReporte() {
    return fetch(LINKSERVER+"/api/poliza/ObtenerPlanesMasVendidos")
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