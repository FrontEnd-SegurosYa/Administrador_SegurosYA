//Importar variables
import { LINKSERVER } from '../../utiles/constantes.js';

export function cargaMasivaValoresAutos (archivo) {
    //Utiles
    const formData = new FormData();
    formData.append('file',archivo);
    return fetch(LINKSERVER+"/api/valoresauto/carga", {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('File upload failed');
        }else{
            return response.json();
        }            
    })
    .catch(error => {
        console.error('Error Uploading File:', error);
        throw error;
    });
  }

  export function cargaMasivaSOATVigentes (archivo) {
    //Utiles
    const formData = new FormData();
    formData.append('file',archivo);
    return fetch(LINKSERVER+"/api/soatvigente/carga", {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('File upload failed');
        }else{
            return response.json();
        }            
    })
    .catch(error => {
        console.error('Error Uploading File:', error);
        throw error;
    });
  }
  

  