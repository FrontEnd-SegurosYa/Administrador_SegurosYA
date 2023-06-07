import './Navbar.css'
import logo from '../../img/logoNombre.png';
import ModuloReportes from '../reportes/ModuloReportes';

import { Link } from 'react-router-dom';
import React, { useState } from 'react';

function cargarContenido(archivo) {
  import(archivo)
}

const NavbarElements = () => {
  const [activeTab, setActiveTab] = useState('Inicio');

  const handleTabClick = (tab,archivo) => {
    setActiveTab(tab);
    cargarContenido(archivo)

  };

  return(
    <>
      <nav className="navbar navbar-expand-lg navbar-dark">
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
          <button
            className={`tab-button ${activeTab === 'Inicio' ? 'active' : ''}`}
            onClick={() => handleTabClick('Inicio','')}
          >
            Inicio
          </button>
          <button
            className={`tab-button ${activeTab === 'Clientes' ? 'active' : ''}`}
            onClick={() => handleTabClick('Clientes','')}
          >
            Clientes
          </button>
          <button
            className={`tab-button ${activeTab === 'Polizas' ? 'active' : ''}`}
            onClick={() => handleTabClick('Polizas','')}
          >
            Pólizas
          </button>
          <button
            className={`tab-button ${activeTab === 'Cotizaciones' ? 'active' : ''}`}
            onClick={() => handleTabClick('Cotizaciones','')}
          >
            Cotizaciones
          </button>

          <button
            className={`tab-button ${activeTab === 'Usuarios' ? 'active' : ''}`}
            onClick={() => handleTabClick('Usuarios','')}
          >
            Usuarios
          </button>

          <button
            className={`tab-button ${activeTab === 'Reportes' ? 'active' : ''}`}
            onClick={() => handleTabClick('Reportes','../reportes/ModuloReportes')}
          >
            Reportes
          </button>
        </div>
        {/* Contenido de cada pestaña */}
      </div>
    </>
  )
}

export default NavbarElements;

