import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import GestionClientesEspeciales from '../gestionListaNegra/GestionClientesEspeciales.js';
import React, { useState, useEffect } from 'react';

test('Debería renderizar el componente GestionClientesEspeciales', () => {
    render(<BrowserRouter><GestionClientesEspeciales/></BrowserRouter>);
    const iniciarSesionElement = screen.getByTestId('gestionClientesEspeciales');
    expect(iniciarSesionElement).toBeInTheDocument();
    expect(iniciarSesionElement).toHaveTextContent('Tipo DocumentoNumero DocumentoNombre CompletoMotivoAccionesNuevoCarga MasivaExportarConfirmar Eliminación×¿Estás seguro de que deseas eliminar el/los cliente(s) seleccionado(s)?EliminarCancelarVer51015filasAnterior1Siguiente');
});