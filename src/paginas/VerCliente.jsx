import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Spinner from '../components/Spinner'

const VerCliente = () => {
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
        //Si cargando es verdadero entonces, muestra el componente Spinner de carga, Si el objeto clientes tiene una longitud de 0, entonces dice que no hay resultados, sino, visualiza el componente con la información del cliente
        cargando ? <Spinner /> : 
            Object.keys(cliente).length === 0 ? 
            <p>No Hay Resultados</p> : (
                <div>                   
                    <h1 className='font-black text-4xl text-blue-900'>Ver Cliente: {cliente.nombre}</h1>
                    <p className='mt-3'>Información del cliente</p>
                    {cliente.nombre && (
                        <p className='text-4xl text-gray-600 mt-10'>
                            <span className='text-gray-800 uppercase font-bold'>Cliente: </span>
                            {cliente.nombre}
                        </p>
                    )}
                    {cliente.email && (
                        <p className='text-2xl text-gray-600 mt-4'>
                            <span className='text-gray-800 uppercase font-bold'>E-mail: </span>
                            {cliente.email}
                        </p>
                    )}
                    {cliente.telefono && (
                        <p className='text-2xl text-gray-600 mt-4'>
                            <span className='text-gray-800 uppercase font-bold'>Télefono: </span>
                            {cliente.telefono}
                        </p>
                    )}
                    {cliente.empresa && (
                        <p className='text-2xl text-gray-600 mt-4'>
                            <span className='text-gray-800 uppercase font-bold'>Empresa: </span>
                            {cliente.empresa}
                        </p>
                    )}
                    {cliente.notas &&(
                        <p className='text-2xl text-gray-600 mt-4'>
                            <span className='text-gray-800 uppercase font-bold'>Notas: </span>
                            {cliente.notas}
                        </p>
                    )}           
                </div>
        )
    )
}

export default VerCliente
