import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import GestionClientes from '../gestionClientes/GestionClientes.js';
import logo from '../../img/logoNombre.png';
import React, { useState, useEffect } from 'react';

test('Debería renderizar el componente GestionClientes', () => {
    render(<BrowserRouter><GestionClientes/></BrowserRouter>);
    const iniciarSesionElement = screen.getByTestId('gestionClientes');
    expect(iniciarSesionElement).toBeInTheDocument();
    expect(iniciarSesionElement).toHaveTextContent('CodigoNombre CompletoDNITelefonoCorreoAccionesNuevoCarga MasivaExportarEliminarClientes EspecialesConfirmar Eliminación×¿Estás seguro de que deseas eliminar el/los cliente(s) seleccionado(s)?EliminarCancelarVer51015filasAnterior1Siguiente');
});