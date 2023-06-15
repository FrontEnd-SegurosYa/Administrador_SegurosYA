import './Navbar.css'
import logo from '../../img/logoNombre.png';

import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


const NavbarElements = ({estado,informacionCuenta}) => {
  const [activeTab, setActiveTab] = useState('');
  const [content, setContent] = useState('');

  const handleTabClick = (tab) => {
    // setActiveTab(tab);
  };

  useEffect( () => {
    setActiveTab(estado);
  }, []);

  return(
    <>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <p>
          {activeTab}
        </p>
        <div className="container-fluid">
          <Link to={"/ "} >
            <a className="navbar-brand logo mx-2" href="#">
              <img src = {logo} alt="" width="80" height="40" className="d-inline-block align-text-top"/>
            </a>
          </Link>
        </div>
      </nav>
      <div className="tab-menu">
        <div className="tab-content">
          {activeTab === 'Inicio'&& <br/>}
          {activeTab === 'Clientes' && <div className='titulosAdminNavBar'>Módulo Clientes</div>}
          {activeTab === 'Polizas' && <div className='titulosAdminNavBar'>Módulo Pólizas</div>}
          {activeTab === 'Cotizaciones' && <div className='titulosAdminNavBar'>Módulo Cotizaciones</div>}
          {activeTab === 'Usuarios' && <div className='titulosAdminNavBar'>Módulo Usuarios</div>}
          {activeTab === 'Reportes' && <div className='titulosAdminNavBar'>Módulo Reportes</div>}
        </div>
        <br></br>
        <div className="tab">
          <Link to={"/inicio"} state={informacionCuenta} >            
            <button
              className={`tab-button ${activeTab === 'Inicio' ? 'active' : ''}`}
              onClick={() => handleTabClick('Inicio')}
            >
              Inicio
            </button>
          </Link>

          <Link to={"/clientes"} state={informacionCuenta}>
            <button
              className={`tab-button ${activeTab === 'Clientes' ? 'active' : ''}`}
              onClick={() => handleTabClick('Clientes')}
            >
              Clientes
            </button>
          </Link>

          {/* Polizas */}
          {/* <Link to={"/Polizas"} state={informacionCuenta}>
            <button
              className={`tab-button ${activeTab === 'Polizas' ? 'active' : ''}`}
              onClick={() => handleTabClick('Polizas')}
              disabled
            >
              Pólizas
            </button>
          </Link> */}


          <Link to={"/cotizaciones"} state={informacionCuenta}>
            <button
              className={`tab-button ${activeTab === 'Cotizaciones' ? 'active' : ''}`}
              onClick={() => handleTabClick('Cotizaciones')}
            >
              Cotizaciones
            </button>
          </Link>

          <Link to={"/usuarios"} state={informacionCuenta}>
            <button
              className={`tab-button ${activeTab === 'Usuarios' ? 'active' : ''}`}
              onClick={() => handleTabClick('Usuarios')}
            >
              Usuarios
            </button>
          </Link>
          <Link to={"/reportes"} state={informacionCuenta}>
            <button
              className={`tab-button ${activeTab === 'Reportes' ? 'active' : ''}`}
              onClick={() => handleTabClick('Reportes')}
            >
              Reportes
            </button>
          </Link>
        </div>
        {/* Contenido de cada pestaña */}
      </div> 
    </>
  )
}

export default NavbarElements;

