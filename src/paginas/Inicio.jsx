import {useState, useEffect} from 'react'
import Cliente from '../components/Cliente';

const Inicio = () => {
    const [clientes, setClientes] = useState([]);
    //useEffect para consultar informacion de la api, solo se ejecutará una vez cuando el componente este listo
    useEffect(()=>{
        //Función asincrona para obtener a los clientes de la api
        const obtenerClientesAPI = async() =>{
            try {
                //url de la api
                const url = 'http://localhost:4000/clientes';
                //Recibimos la respuesta esperando a que se ejecute la linea anterior, en donde con fetch enviamos solo la url, sera metodo get
                const respuesta = await fetch(url);
                //Recibimos en formaton json la respuesta de la api, pero para obtenerla esperamos a que la linea anterior se termine de ejecutar
                const resultado = await respuesta.json();
                //Le asignamos lo que tenga resultado a clientes por medio de la función setClientes
                setClientes(resultado);
            } catch (error) {
                console.log(error);
            }
        }
        //Llamamos a la funcion
        obtenerClientesAPI();
    }, [])
    //Funcion para eliminar un registro que recibe como parametro un id
    const handleEliminar = async id => {
        //Enviamos un mensaje preguntando si deseamos eliminar al cliente
        const confirmar = confirm("¿Deseas eliminar este cliente?");
        //Si confirmar es verdadero, entonces eliminamos al cliente
        if(confirmar){
            try{
                //URL de la api en donde enviamos el id para eliminar al cliente
                const url = `http://localhost:4000/clientes/${id}`
                //Respuesta de la api que está en espera, en donde enviamos la url de la api y el método delete porque eliminaremos un cliente
                const respuesta = await fetch(url, {
                    //Definimos que metodo vamos a utilizar, que es DELETE para eliminar
                    method: 'DELETE'
                })
                //Retornamos en formato JSON la respuesta, pero espera a que se termine de ejecutar la linea anterior
                await respuesta.json();
                //Con filter, recorremos el arreglo clientes que va a filtrar los clientes cuyo cliente.id sea diferente al id del cliente que eliminamos, solo mostrara los clientes que no eliminamos
                const arrayClientes = clientes.filter(cliente => cliente.id !== id);
                //Cambiamos el valor de clientes por el nuevo arreglo que tiene los clientes que no eliminamos
                setClientes(arrayClientes);
            }catch(error){
                console.log(error);
            }
        }
    }
    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
            <p className='mt-3'>Administra tus clientes</p>
            <table className='w-full mt-5 table-auto shadow bg-white'>
                <thead className='bg-blue-800 text-white'>
                    <tr>
                        <th className='p-2'>Nombre</th>
                        <th className='p-2'>Contacto</th>
                        <th className='p-2'>Empresa</th>
                        <th className='p-2'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Iteramos sobre clientes para mostrarlos en la tabla */}
                    {clientes.map(cliente =>(
                        //Mostramos el componente Cliente dependiendo del número de clientes almacenados
                        <Cliente 
                            //Pasamos el key siendo el id el key
                            key={cliente.id}
                            //Pasamos la información del cliente
                            cliente={cliente}
                            //Pasamos la funcion de eliminar a cliente
                            handleEliminar={handleEliminar}
                        />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Inicio
