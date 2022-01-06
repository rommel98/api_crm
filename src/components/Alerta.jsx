import React from 'react'

const Alerta = ({children}) => {
    return (
        <div className='text-center my-4 bg-red-600 text-white font-bold p-3 uppercase'>
            {/* Mostramos el error con children, ya que mostrara lo que esté entre la apertura y cierre de este componente */}
            {children}
        </div>
    )
}

export default Alerta
