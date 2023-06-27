import React, { useRef, useState, useEffect } from 'react';
import '../index.css';
import { cargaMasivaSOATVigentes,cargaMasivaValoresAutos } from '../componentes/paginaInicio/funcionesExtras';
import { ModalCargaMasivaGenerico } from '../componentes/componenteAbajoAdmin/Modales';

import {Presentacion} from '../componentes/presentacion/Presentacion'
import Navbar from '../componentes/navbar/Navbar' 
import {ContenedorPrincipal} from '../componentes/contenedorPrinc/ContenedorPrincipal' 

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function PaginaInicio() {
  const location = useLocation();
  const navigate = useNavigate();
  var cuenta = null;  

  const [modalCargaMasiva,setModalCargaMasiva] = useState(false);
  const [listaErroresCargaMasiva,setListaErroresCargaMasiva] = useState([]);

  const fileInputRefMarcaModelo = useRef(null);
  const fileInputRefSoatVigentes = useRef(null);

  const handleFileSelectMarcasModelos = () => {
    const fileInput = fileInputRefMarcaModelo.current;
    fileInput.click();
  };

  const handleFileSelectSoatVigentes = () => {
    const fileInput = fileInputRefSoatVigentes.current;
    fileInput.click();
  };

  const handleCargaMasivaFileMarcaModelo = (event) => {
    const file = event.target.files[0];
    cargaMasivaValoresAutos(file)
    .then(response => {
      console.log(response);
      setModalCargaMasiva(true);
      setListaErroresCargaMasiva(response);
    })
    .catch(error => {
      console.error("Error: ",error);
    });
  };

  const handleCargaMasivaFileSoatVigentes = (event) => {
    const file = event.target.files[0];
    cargaMasivaSOATVigentes(file)
    .then(response => {
      console.log(response);
      setModalCargaMasiva(true);
      setListaErroresCargaMasiva(response);
    })
    .catch(error => {
      console.error("Error: ",error);
    });
  };



  if(location.state !== null){
    cuenta = location.state.cuenta;
  } 

  const estiloTemporal = {
    color: 'white',
    fontSize: '60px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
  };

  const centrarBoton = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  //Redirigir a inicio si no se realizo el flujo anterior
  useEffect(() => {    
    if(location.state === null){
      navigate("/");
    }
  },[]);

  

  return (
      <>
        <Navbar estado="Inicio" cuenta={cuenta }/>
        <div className='contenidoInicio'>
          <h3 style={estiloTemporal}>
            Bienvenido {cuenta && cuenta.nombre+" "+cuenta.apellidoPaterno+" "+cuenta.apellidoMaterno}.
          </h3> 
        </div>
        <div style={centrarBoton}>
          <button type="button" className="btnGeneral" onClick={handleFileSelectMarcasModelos}>Cargar Marcas y Modelos</button> 
          <button type="button" className="btnGeneral" onClick={handleFileSelectSoatVigentes}>Cargar Soat vigentes</button> 
          

          {/* Input archivo carga masiva */}
          <input
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          style={{ display: "none" }}
          ref={fileInputRefMarcaModelo}
          onChange={handleCargaMasivaFileMarcaModelo}
          />

          <input
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          style={{ display: "none" }}
          ref={fileInputRefSoatVigentes}
          onChange={handleCargaMasivaFileSoatVigentes}
          />

          {modalCargaMasiva && (
            <ModalCargaMasivaGenerico
              listaErrores={listaErroresCargaMasiva}
              setMostrarModal={setModalCargaMasiva}
            />
          )}

                   
        </div>
      </>
    );
  }
  
export default PaginaInicio;
