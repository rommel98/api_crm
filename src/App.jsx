import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './layout/Layout';
import EditarCliente from './paginas/EditarCliente';
import Inicio from './paginas/Inicio';
import NuevoCliente from './paginas/NuevoCliente';
import VerCliente from './paginas/VerCliente';

function App() {
  return(
    //Queremos con BrowserRouter crear un nuevo routing o registrar diferentes endpoints y que cargue ciertos componentes, Es un contenedor para las rutas
    <BrowserRouter>
      {/* Todas las rutas van en Routes */}
      <Routes>
        {/* Esta es la ruta de la página, Si Route tiene apertura y cierre es un grupo de rutas, si solo es Route en una sola linea, es una ruta singular */}
        {/* Nos referimos a la ruta principal y mostramos el componente a mostrar */}
        {/* <Route path="/" element={<IniciarSesion />}>
          <Route index element={<LoginForm />} />
        </Route> */}
        {/* Si visito /clientes, muestra el Layout */}
        <Route path="/clientes" element={<Layout />}>
          {/* Cada componente se muestra por separado ya que están anidados */}
          <Route index element={<Inicio />} />
          {/* Hereda la ruta principal y luego la une con / junto al nombre del path del componente, con :id agregamos un placeholder */}
          <Route path="nuevo" element={<NuevoCliente />} />
          <Route path="editar/:id" element={<EditarCliente />} />
          {/* Si tiene : la ruta la trata como variable al parametro que está despues de los : */}
          <Route path=":id" element={<VerCliente />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
