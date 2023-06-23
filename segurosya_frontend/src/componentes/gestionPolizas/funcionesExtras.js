//Importar variables
import { LINKSERVER } from '../../utiles/constantes.js';

export function obtenerPolizas() {
return fetch(LINKSERVER+"/api/poliza/listarConDatos")
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

export function eliminarPoliza(idPoliza) {
  return fetch(LINKSERVER+"/api/poliza/desactivar",{
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({idPoliza: idPoliza})
  })
  .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
        return response.text();
    })
  .catch(error => {
    console.error('Error:', error);
    throw error;
    }
  );
}

export function cargaMasivaPrueba (archivo) {
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

export function dividirPaginas(data, cantidadLineas) {
    const result = [];
    const length = data.length;
  
    for (let i = 0; i < length; i += cantidadLineas) {
      const block = data.slice(i, i + cantidadLineas);
      result.push(block);
    }
  
    return result;
  }
  

  function obtenerNumeroDePaginas(numeroElementos, cantidadLineas) {
    return Math.ceil(numeroElementos / cantidadLineas);
  }


