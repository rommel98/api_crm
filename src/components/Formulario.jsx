import React from 'react'
import { Formik, Form, Field } from 'formik'
import {useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'

//Desestructuramos de props a cliente y cargando, que tiene la informacion del cliente y cargando para usarlo con el spinner
const Formulario = ({cliente, cargando}) => {
    //useNavigate en donde navigate, almacenará la ruta a redirigir
    const navigate = useNavigate();
    //Schema que contiene los datos y que forma van a tener
    //Shape, forma de los datos,
    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                    .min(3, 'El Nombre es muy corto')
                    .max(20, 'El Nombre es muy largo')
                    .required('El Nombre del Cliente es Obligatorio'),
        empresa: Yup.string()
                    .required('El nombre de la empresa es obligatorio'),
        email: Yup.string()
                    .email('Email no válido')
                    .required('El e-mail es obligatorio'),
        telefono: Yup.number()
                    .positive('El número no es válido')
                    .integer('El número no es válido')
                    .typeError('El número no es válido')
    })
    //Función asincrona para enviar los datos del formulario
    const handleSubmit = async(valores) =>{
        //con try-catch debugeamos en caso de haber problemas a la hora de llamar a la api
        try{
            //Respuesta que se asignará por medio de lo que retorne la api
            let respuesta;
            //Si el id en cliente existe, entonces estamos editando, sino, estamos ingresando un nuevo registro
            if(cliente.id){
                //Editando Registro
                //URL de la tabla clientes agregando el id del cliente
                const url = `http://localhost:4000/clientes/${cliente.id}`;
                //Enviamos la peticion a la url, colocamos await porque no sabemos cuanto tiempo tardará en crearse el registro, por lo que bloqueamos el código con await.
                //Para crear, eliminar o actualizar un registro, pasamos la información, para crear la configuración de la peticion hacia fetch api.
                //Si solo se envia la URL, es el metodo GET
                respuesta = await fetch(url, {
                    //Metodo para la peticion hacia la api, en este caso PUT para actualizar los datos
                    method: 'PUT',
                    //Información a enviar a la api
                    //Convertimos el json a string, enviamos la información
                    body: JSON.stringify(valores),
                    //Objeto de cabeceras
                    //Se envia primero el header y luego los datos del body
                    headers:{
                        //Especificamos el tipo de contenido
                        'Content-Type': 'application/json'
                    }
                });
            }else{
                //Nuevo Registro
                //URL de la tabla clientes
                const url = 'http://localhost:4000/clientes'
                //Enviamos la peticion a la url, colocamos await porque no sabemos cuanto tiempo tardará en crearse el registro, por lo que bloqueamos el código con await.
                //Para crear, eliminar o actualizar un registro, pasamos la información, para crear la configuración de la peticion hacia fetch api.
                //Si solo se envia la URL, es el metodo GET
                respuesta = await fetch(url, {
                    //Metodo para la peticion hacia la api
                    method: 'POST',
                    //Información a enviar a la api
                    //Convertimos el json a string, enviamos la información
                    body: JSON.stringify(valores),
                    //Objeto de cabeceras
                    //Se envia primero el header y luego los datos del body
                    headers:{
                        //Especificamos el tipo de contenido
                        'Content-Type': 'application/json'
                    }
                });
            }
            //Retornamos el resultado en formato JSON
            const resultado = await respuesta.json();
            //Le asignamos a navigate la url a redirigir
            navigate('/clientes');
        }catch(error){
            console.log(error);
        }
    }
    return (
        //Si cargando es true, muestra el Spinner, sino, muestra el formulario
        cargando ? <Spinner /> : (
            <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
                {/* Si nombre en cliente existe, quiere decir que el objeto viene lleno, entonces mostrará Editar cliente, sino existe quiere decir que el objeto está vacio, muestra Agregar Cliente */}
                <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>
                {/* Usamos Formik para hacer el formulario */}
                <Formik
                    initialValues={{
                        //Al colocar un ? busca cliente.nombre, Si existe cliente.nombre lo agrega como valor inicial a nombre, sino colocará un string vacio, este caso se aplica para empresa, email, telefono y notas.
                        nombre: cliente?.nombre ?? "",
                        empresa: cliente?.empresa ?? "",
                        email: cliente?.email ?? "",
                        telefono: cliente?.telefono ?? "",
                        notas: cliente?.notas ?? "",
                    }}
                    //Si está en true, Formik restablece el formulario cuando los valores iniciales cambien
                    enableReinitialize={true}
                    //onSubmit para enviar la información al formulario
                    //Volvemos la función asincrona
                    onSubmit={async (values, {resetForm})=>{
                        //Enviamos a una función los valores, Espera a que esta funcion se complete para despues resetear el formulario.
                        await handleSubmit(values);
                        //Reseteamos el formulario
                        resetForm();
                    }}
                    //Aqui se encuentra el esquema de validacion y cual va a ser la forma en como se esperan los datos
                    validationSchema={nuevoClienteSchema}
                >
                    {/* Desestructuramos data para obtener los errores con errors */}
                    {({errors, touched}) => {
                        //Retornamos el formulario
                        return(
                        <Form //Colocamos el Form que es el formulario
                            className="mt-10"
                        >
                            <div className='mb-4'>
                                <label 
                                    className='text-gray-800'
                                    htmlFor='nombre'
                                >Nombre:</label>
                                {/* Input para ingresar texto */}
                                <Field 
                                    id="nombre"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Nombre del Cliente"
                                    name="nombre"
                                />
                                {/* Mensaje de Error */}
                                {/* Touched lo que hace es que cuando se presione el input y el usuario salga del input, se valide en tiempo real */}
                                {/* Si errors.nombre y touched.nombre son verdaderos, entonces retornamos el mensaje de error*/}
                                {errors.nombre && touched.nombre ?(
                                    //Llamamos al componente alerta y entre la apertura y cierre enviamos el error, utilizando children
                                    <Alerta>{errors.nombre}</Alerta>
                                ): null}
                            </div>
                            <div className='mb-4'>
                                <label 
                                    className='text-gray-800'
                                    htmlFor='empresa'
                                >Empresa:</label>
                                {/* Input para ingresar texto */}
                                <Field 
                                    id="empresa"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Empresa del Cliente"
                                    name="empresa"
                                />
                                {errors.empresa && touched.empresa ?(
                                    <Alerta>{errors.empresa}</Alerta>
                                ): null}
                            </div>
                            <div className='mb-4'>
                                <label 
                                    className='text-gray-800'
                                    htmlFor='email'
                                >E-mail:</label>
                                {/* Input para ingresar texto */}
                                <Field 
                                    id="email"
                                    type="email"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="E-mail del Cliente"
                                    name="email"
                                />
                                {errors.email && touched.email ?(
                                    <Alerta>{errors.email}</Alerta>
                                ): null}
                            </div>
                            <div className='mb-4'>
                                <label 
                                    className='text-gray-800'
                                    htmlFor='telefono'
                                >Telefono:</label>
                                {/* Input para ingresar texto */}
                                <Field 
                                    id="telefono"
                                    type="tel"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Telefono del Cliente"
                                    name="telefono"
                                />
                                {errors.telefono && touched.telefono ?(
                                    <Alerta>{errors.telefono}</Alerta>
                                ): null}
                            </div>
                            <div className='mb-4'>
                                <label 
                                    className='text-gray-800'
                                    htmlFor='notas'
                                >Notas:</label>
                                {/* Input para ingresar texto */}
                                <Field
                                    //Decimos que es un text area
                                    as="textarea" 
                                    id="notas"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50 h-40"
                                    placeholder="Notas del Cliente"
                                    name="notas"
                                />
                            </div>
                            <input 
                                type="submit"
                                //Si nombre en cliente existe, quiere decir que el objeto viene lleno, entonces mostrará Editar cliente, sino existe quiere decir que el objeto está vacio, muestra Agregar Cliente 
                                value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                                className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg'
                            />
                        </Form>
                    )}}
                </Formik>
            </div>
        )
    )
}
//Props por defecto cuando llamamos el componente
Formulario.defaultProps = {
    //Si llamamos a Formulario y no le pasamos props, por defecto el prop será un objeto vacio, si no, será el prop que reciba el componente
    cliente: {},
    //Si llamamos a Spinner y no le pasamos props, por defecto el prop será falso, si no, será el prop que reciba el componente
    cargando :  false,
}
export default Formulario
