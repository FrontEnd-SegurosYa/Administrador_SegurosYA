import React from 'react'

const infoCobertura = (props) => {
  const {titulo, costo}=props
  return (
    <div>
    <p>{titulo}</p>
    <p>Mensual desde:</p>
    <p>S/ {costo}</p>
    <p>Coberturas</p>
    <p>Asistencias</p>
    </div>
  )
}

export default infoCobertura