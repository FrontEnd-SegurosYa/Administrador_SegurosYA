import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ReporteSoatVendidos from '../reporteSoatVendidos/ReporteSoatVendidos.js';
import React, { useState, useEffect } from 'react';
import BarChart from '../reporteSoatVendidos/BarChart.js';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import 'jest-canvas-mock';

test('Debería renderizar el componente ReporteSoatVendidos', () => {
    render(<BrowserRouter><ReporteSoatVendidos/></BrowserRouter>);
    const iniciarSesionElement = screen.getByTestId('reporteSoatVendidos');
    expect(iniciarSesionElement).toBeInTheDocument();
    expect(iniciarSesionElement).toHaveTextContent('Cotizaciones durante el mes0');
});