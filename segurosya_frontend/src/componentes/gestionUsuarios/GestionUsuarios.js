import React, { useState, useEffect } from 'react';
import './GestionUsuarios.css';
import '../../index.css';
import { obtenerUsuarios, dividirPaginas } from './funcionesExtras';
import BotonesPaginacion from '../componenteAbajoAdmin/BotonesYPaginacion'
import BotonesYPaginacionEstandar from '../componenteAbajoAdmin/BotonesYPaginacionEstandar'

const MAX_LINEAS_POR_PAGINA = 15;
const CANTIDAD_LINEAS_POR_DEFECTO = 10;

function GestionUsuarios() {
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listaPaginas, setListaPaginas] = useState([[]]);
  const [indicePagina, setIndicePagina] = useState(0);
  const [cantidadLineas, setCantidadLineas] = useState(CANTIDAD_LINEAS_POR_DEFECTO);
  const [usuariosSeleccionados, setUsuariosSeleccionados] = useState([]);

  const seleccionCliente = (idUsuario) => {
    if (usuariosSeleccionados.includes(idUsuario)) {
      setUsuariosSeleccionados(usuariosSeleccionados.filter((id) => id !== idUsuario));
    } else {
      setUsuariosSeleccionados([...usuariosSeleccionados, idUsuario]);
    }
  };

  const cabeceraTabla = [
    "",
    "Codigo",
    "Nombre Completo",
    "DNI",
    "Telefono",
    "Correo",
    "Acciones"
  ];

  const cambioIndice = (event) => {
    const value = parseInt(event.target.value);
    setIndicePagina(value);
  };

  useEffect(() => {
    obtenerUsuarios()
      .then(data => {
        setListaUsuarios(data);
        const paginas = dividirPaginas(data, cantidadLineas);
        setListaPaginas(paginas);
        if (indicePagina >= paginas.length) {
          setIndicePagina(paginas.length - 1);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [cantidadLineas, indicePagina]);

  const handlePageChange = (pageNumber) => {
    setIndicePagina(pageNumber - 1);
  };

  const cambioCantidadLineas = (event) => {
    const value = parseInt(event.target.value);
    const maxLineas = Math.min(value, 15);
    setCantidadLineas(maxLineas);
  };

  return (
    <>
      <div id='ContenedorGestionClientes'>
        <table id='TablaCLientes'>      
          <thead>            
            <tr>
              {cabeceraTabla.map(cabecera => 
                <td >{cabecera}</td>
                )}
              
            </tr>              
          </thead>

          {/* Cuerpo */}
          <tbody>
            {listaPaginas[indicePagina].slice(0, cantidadLineas).map(usuario => (
              <tr key={usuario.idUsuario}>
                {/* Cabeceras */}
                <td key={cabeceraTabla[0]}>
                  <input
                    type='checkbox'
                    checked={usuariosSeleccionados.includes(usuario.idUsuario)}
                    onChange={() => seleccionCliente(usuario.idUsuario)}
                  />
                </td>
                <td key={cabeceraTabla[1]}> {usuario.idCuenta} </td>
                <td key={cabeceraTabla[2]}> {usuario.nombre+" "+usuario.apellidoPaterno+" "+usuario.apellidoMaterno} </td>
                <td key={cabeceraTabla[3]}> {usuario.dni} </td>
                <td key={cabeceraTabla[4]}> {usuario.telefono} </td>
                <td key={cabeceraTabla[5]}> {usuario.correo} </td>
                <td key={cabeceraTabla[6]}><button id="BotonEditar">Editar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {/*llamamos al componente de abajo (botones y paginacion)*/}
        <BotonesYPaginacionEstandar
          cantidadLineas={cantidadLineas}
          cambioCantidadLineas={cambioCantidadLineas}
          indicePagina={indicePagina}
          handlePageChange={handlePageChange}
          listaPaginas={listaPaginas}
          listaClientes={listaUsuarios}
          clientesSeleccionados={usuariosSeleccionados}
          setClientesSeleccionados={setUsuariosSeleccionados}
        />
      </div>
    </>
  );
}

export default GestionUsuarios;
