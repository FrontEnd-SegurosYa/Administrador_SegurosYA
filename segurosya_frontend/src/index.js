import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";


import IngresarCuenta from './paginas/IngresarCuenta';
import GestionClientes from './componentes/gestionClientes/GestionClientes';
import ModuloReportes from './componentes/reportes/ModuloReportes';




const router = createBrowserRouter([
    {
      path: "/",
      element: <IngresarCuenta/>,
    },
    {
      path: "/clientes",
      element: <GestionClientes/>,
    },
    {
      path: "/reportes",
      element: <ModuloReportes/>,
    },
  ]);

  
  
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );