import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import GestionPolizas from '../gestionPolizas/GestionPolizas.js';
import logo from '../../img/logoNombre.png';
import React, { useState, useEffect } from 'react';

test('Debería renderizar el componente GestionPolizas', () => {
    render(<BrowserRouter><GestionPolizas/></BrowserRouter>);
    const iniciarSesionElement = screen.getByTestId('gestionPolizas');
    expect(iniciarSesionElement).toBeInTheDocument();
    expect(iniciarSesionElement).toHaveTextContent('CodigoNombre CompletoPlanFecha Inicio - FinSOATAccionesNuevoCarga MasivaExportarEliminarConfirmar Eliminación×¿Estás seguro de que deseas eliminar el/los cliente(s) seleccionado(s)?EliminarCancelarVer51015filasAnterior1Siguiente');
});