
//Importar variables
import { LINKSERVER } from '../../utiles/constantes.js';
export function cargaMasivaClientesEspeciales (archivo) {
    //Utiles
    const formData = new FormData();
    formData.append('file',archivo);
    return fetch(LINKSERVER+"/api/listanegra/carga", {
        method: "POST",
        // headers: {
        // "Content-Type": "application/json"
        // },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('File upload failed');
        }else{
            return response.text();
        }            
    })
    .catch(error => {
        console.error('Error Uploading File:', error);
        throw error;
    });
}

export function cargaMasivaClientesEspecialesPrueba (archivo) {
    //Utiles
    const formData = new FormData();
    formData.append('file',archivo);
    return fetch(LINKSERVER+"/api/listanegra/cargaPrueba", {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('File upload failed');
        }else{
            return response.text();
        }            
    })
    .catch(error => {
        console.error('Error Uploading File:', error);
        throw error;
    });
}