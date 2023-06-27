import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";


import IngresarCuenta from './paginas/IngresarCuenta';
import AdminClientes from './paginas/AdminClientes';
import Reportes from './paginas/Reportes';
import AdminCotizaciones from './paginas/AdminCotizaciones';
import PaginaInicio from './paginas/PaginaInicio';
import AdminUsuarios from './paginas/AdminUsuarios';
import AdminPolizas from './paginas/AdminPolizas';
import PaginaReporteSoatVendidos from './paginas/PaginaReporteSoatVendidos';
import AdminListaNegra from './paginas/AdminListaNegra';
import AdminMarcasModelos from './paginas/AdminMarcasModelos';




const router = createBrowserRouter([
    {
      path: "/",
      element: <IngresarCuenta/>,
    },
    {
      path: "/inicio",
      element: <PaginaInicio/>,
    },
    {
      path: "/clientes",
      element: <AdminClientes/>,
    },
    {
      path: "/listaNegra",
      element: <AdminListaNegra/>,
    },
    {
      path: "/polizas",
      element: <AdminPolizas/>,
    },
    {
      path: "/reportes",
      element: <Reportes/>,
    },
    {
      path: "/cotizaciones",
      element: <AdminCotizaciones/>,
    },
    {
      path: "/usuarios",
      element: <AdminUsuarios/>,
    },
    {
      path: "/reporteSoatVendidos",
      element: <PaginaReporteSoatVendidos/>,
    },
    {
      path: "/marcasModelos",
      element: <AdminMarcasModelos/>,
    },
  ]);

  
  
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );