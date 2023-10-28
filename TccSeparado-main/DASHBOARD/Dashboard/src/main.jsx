import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeAdm from './routes/HomeAdm.jsx';
import Login from './routes/Login.jsx';
import Dashboard from './opcoesMenu/Dashboard.jsx';
import Parque from './opcoesMenu/Parque.jsx';
import Usuario from './opcoesMenu/Usuario.jsx';
import Solicitacao from './opcoesMenu/Solicitacao.jsx';
//import AppChat from './chat-app/src/AppChat.jsx'  
import { ChakraProvider } from "@chakra-ui/react";
import HomeAdmParque from './routes/HomeAdmParque.jsx';
//import AppChat from './chat-app/src/AppChat.jsx'


const router = createBrowserRouter([
  {

    children: [
        {
          path: "/homeadm",
          element: <HomeAdm />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/parque",
          element: <Parque />,
        },
        {
          path: "/usuario",
          element: <Usuario />,
        },
        {
          path: "/solicitacao",
          element: <Solicitacao />,
        },
        {
          path: "/",
          element: <App />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/homeadmparque",
          element: <HomeAdmParque />,
        },
        //{
          //path: "/chat",
          //element: <AppChat />,
        //},
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
