import {useNavigate} from 'react-router-dom'

//Desestructuramos de props, cliente y la funcion de handleEliminar que elimina un cliente
const Cliente = ({cliente, handleEliminar}) => {
    //useNavigate en donde navigate, almacenará la ruta a redirigir
    const navigate = useNavigate();
    //Desestructuramos de cliente, la información a requerir
    const {nombre, empresa, email, telefono, notas, id} = cliente;
    return (
        <tr className='border-b hover:bg-gray-50'>
            <td className='p-3'>{nombre}</td>
            <td className='p-3'>
                <p><span className='text-gray-800 uppercase font-bold'>Email:</span> {email}</p>
                <p><span className='text-gray-800 uppercase font-bold'>Tel:</span> {telefono}</p>
            </td>
            <td className='p-3'>{empresa}</td>
            <td className='p-3'>
                <button
                    type='button'
                    className='bg-yellow-500 hover:bg-yellow-600 block w-full text-white p-2 uppercarse font-bold text-xs'
                    //le asignamos a navigate la ruta de clientes seguido del id del cliente
                    onClick={()=>{navigate(`/clientes/${id}`)}}
                >Ver</button>
                <button
                    type='button'
                    className='bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercarse font-bold text-xs mt-3'
                    //Asignamos a clientes la ruta de clientes/editar e inyectamos en la url, el id del cliente
                    onClick={()=> navigate(`/clientes/editar/${id}`)}
                >Editar</button>
                <button
                    type='button'
                    className='bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercarse font-bold text-xs mt-3'
                    //Le asignamos al boton una funcion en donde llamamos a la funcion handleEliminar para eliminar un registro, pasamos como argumento el id
                    onClick={()=>handleEliminar(id)}
                >Eliminar</button>
            </td>
        </tr>
    )
}

export default Cliente