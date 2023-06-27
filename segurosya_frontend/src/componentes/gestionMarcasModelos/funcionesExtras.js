//Importar variables
import { LINKSERVER } from '../../utiles/constantes.js';

export function obtenerMarcas() {
return fetch(LINKSERVER+"/api/marca/listar")
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

export function obtenerModelosXMarcas(idMarca) {
    return fetch(LINKSERVER+"/api/modelo/listarMarca",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({idMarca: parseInt(idMarca,10)})
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

export function eliminarMarca(idMarca) {
    return fetch(LINKSERVER+"/api/marca/desactivar",{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({idMarca: parseInt(idMarca,10)})
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