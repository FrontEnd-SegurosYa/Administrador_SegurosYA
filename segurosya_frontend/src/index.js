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




const router = createBrowserRouter([
    {
      path: "/",
      element: <IngresarCuenta/>,
    },
    {
      path: "/clientes",
      // element: <GestionClientes/>,
      element: <AdminClientes/>,
    },
    {
      path: "/reportes",
      element: <Reportes/>,
    },
    {
      path: "/cotizaciones",
      element: <AdminCotizaciones/>,
    },
  ]);

  
  
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );