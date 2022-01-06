import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Formulario from '../components/Formulario'

const EditarCliente = () => {
    //useState que almacenara los datos del cliente y con setCliente cambiamos los valores de cliente
    const [cliente, setCliente] = useState({})
    //useState que se usa para verificar cuando cargue el componente donde se muestran los datos del cliente
    const [cargando, setCargando] = useState(true);
    //Hook para leer los parametros que se envian en la url
    //Desestructuramos de params el id
    const {id} = useParams();
    //useEffect para consultar la API, se ejecutará solo 1 vez
    useEffect(() => {
        //Funcion para obtener el cliente desde la api
        const obtenerClienteAPI = async() =>{
            try {
                //url de la api en donde enviamos el id como parametro
                const url = `http://localhost:4000/clientes/${id}`
                //Retornamos la respuesta que nos da la api
                const respuesta = await fetch(url);
                //Obtenos el resultado de la respuesta como un json
                const resultado = await respuesta.json();
                setCliente(resultado);
            } catch (error) {
                console.log(error);
            }
            //regresamos el valor de cargando a su contrario
            setCargando(!cargando);
        }
        obtenerClienteAPI();
    }, [])
    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
            <p className='mt-3'>Utiliza este formulario para editar datos para el cliente</p>
            {/* Componente Formulario para ingresar información */}
            {/* Si nombre existe en el objeto cliente, mostrará el formulario, sino mostrará un mensaje diciendo que el cliente ID no es válido */}
            {cliente?.nombre ? (
                <Formulario
                    //Pasamos la informacion del cliente al formulario 
                    cliente={cliente}
                    //Pasamos la propiedad de cargando que se usará para el spinner
                    cargando={cargando}
                />
            ) : <p>Cliente ID no válido</p>}
        </>
    )
}

export default EditarCliente
