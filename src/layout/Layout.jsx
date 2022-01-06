import {Outlet, Link, useLocation} from 'react-router-dom';
const Layout = () => {
    //Detectamos en que página estamos, podemos obtener parametros
    const location = useLocation();
    //Obtenemos la url actual
    const urlActual = location.pathname;
    return (
        <div className="md:flex md:min-h-screen">
            <div className="md:w-1/4 bg-blue-900 px-5 py-10">
                <h2 className="text-4xl font-black text-center text-white">
                    CRM - Clientes
                </h2>
                <nav className='mt-10'>
                    <Link 
                        //Si la urlActual es igual a /clientes, entonces el texto sera azul, sino será blanco
                        className={`${urlActual === '/clientes' ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300`}
                        to="/clientes"
                    >Clientes</Link>
                    <Link 
                        //Si la urlActual es igual a /clientes/nuevo, entonces el texto sera azul, sino será blanco
                        className={`${urlActual === '/clientes/nuevo' ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300`}
                        to="/clientes/nuevo"
                    >Nuevo Cliente</Link>
                </nav>
            </div>
            <div className="md:w-3/4 p-10 md:h-screen overflow-scroll">
                {/* Lo que tenga el componente se inyecta en Outlet de Inicio */}
                <Outlet />
            </div>
            
        </div>
    )
}

export default Layout
