import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import GestionUsuarios from '../gestionUsuarios/GestionUsuarios.js';
import logo from '../../img/logoNombre.png';
import React, { useState, useEffect } from 'react';

test('Debería renderizar el componente GestionUsuarios', () => {
    render(<BrowserRouter><GestionUsuarios/></BrowserRouter>);
    const iniciarSesionElement = screen.getByTestId('gestionUsuarios');
    expect(iniciarSesionElement).toBeInTheDocument();
    expect(iniciarSesionElement).toHaveTextContent('CodigoNombre CompletoDNITelefonoCorreoAccionesNuevoCarga MasivaExportarEliminarConfirmar Eliminación×¿Estás seguro de que deseas eliminar el/los cliente(s) seleccionado(s)?EliminarCancelarVer51015filasAnterior1Siguiente');
});