import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import NavbarElements from '../navbar/NavbarElements.js';
import logo from '../../img/logoNombre.png';
import React, { useState, useEffect } from 'react';

test('Debería renderizar el componente NavBar', () => {
    const estado = "Inicio";
    const cuenta = null;
    render(<BrowserRouter><NavbarElements estado={estado} cuenta={cuenta}/></BrowserRouter>);
    const iniciarSesionElement = screen.getByTestId('navBar');
    expect(iniciarSesionElement).toBeInTheDocument();
    expect(iniciarSesionElement).toHaveTextContent('InicioClientesClientes EspecialesPólizasCotizacionesUsuariosReportes');
});