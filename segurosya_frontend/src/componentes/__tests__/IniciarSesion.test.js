import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import IniciarSesion from '../iniciarSesion/IniciarSesion.js';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { iniciarSesion } from '../iniciarSesion/funcionesExtras';
import { LINKSERVER } from '../../utiles/constantes.js';

test('Debería renderizar el componente IniciarSesion', () => {
    render(<BrowserRouter><IniciarSesion/></BrowserRouter>);
    const iniciarSesionElement = screen.getByTestId('iniciarsesion');
    expect(iniciarSesionElement).toBeInTheDocument();
    expect(iniciarSesionElement).toHaveTextContent('RegistrarseIniciar sesión¿No tienes una cuenta? Registrate¿Has olvidado tu contraseña?');
});