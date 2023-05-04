import './FormularioClienteSinCuenta.css';
import { Link } from 'react-router-dom';

// import imagenConductor from '../img/imagenFormularioSinCuenta.png';

import {useForm} from 'react-hook-form';
import { useNavigate } from "react-router-dom";

//Contenedor principal
export function FormularioClienteSinCuenta () {

    return (
        <>
            <ContenedorPrincipal />
        </>
        
    );
}

function ContenedorPrincipal ( ) {
    const navigate = useNavigate();
    // Declaraciones para botones
    const {register, handleSubmit} = useForm();
    const onSubmit = (data) => {
        console.log(data);
        navigate("/cotizacion1");
    }
   
    return (
        <form className='ContenedorPrincipal' onSubmit={handleSubmit(onSubmit)}>
            <div className='ContenedorImagenFormulario'>
                {/* <Formulario/> */}
                <div className='ContenedorFormulario' >
                <div className='Texto1'>
                    ¡Protege tu auto, protege tu inversión!
                </div>
                <div className='Texto2'>
                    Ingresa los siguientes datos:
                </div>
                <div >
                    <div className='ContenedorCampoFormulario'>
                        Nombre Completo: <br/>                        
                        <input type='text' {...register('nombreCompleto')}/>
                    </div>
                    
                </div>
                <div>
                    <div className='ContenedorCampoFormulario'>
                        DNI: <br/>                        
                        <input type='text' {...register('DNI',{
                            required: true,
                        })}/>
                    </div>
                    
                </div>
                <div>
                    <div className='ContenedorCampoFormulario'>
                        Correo electrónico: <br/>                        
                        <input type='text' {...register('correoElectonico',{
                            required: true,
                        })}/>
                    </div>
                </div>  
                <div>
                    <div className='ContenedorCampoFormulario'>
                        Teléfono celular: <br/>                        
                        <input type='text' {...register('telefonoCelular',{
                            required: true,
                        })}/>
                    </div>
                </div>
                <div>
                    <div className='ContenedorCampoFormulario'>
                        Direccion: <br/>
                        Departamento:
                        <select {...register('departamento')}>
                            <option value="Lima">Lima</option>
                            <option value="Ancash">Ancash</option>
                            <option value="Ica">Ica</option>
                        </select>
                        Provincia:
                        <select {...register('provincia')}>
                            <option value="LimaMetropolitana">Lima Metropolitana</option>
                            <option value="Callao">Callao</option>
                            <option value="Huarochiri">Huarochiri</option>
                        </select>
                        Distrito:
                        <select {...register('distrito')}>
                            <option value="SanMiguel">San Miguel</option>
                            <option value="Lince">Lince</option>
                            <option value="JesusMaria">Jesus María</option>
                        </select>
                    </div>
                </div>
                <div className='ContenedorLink'>
                    <p className='Link1'>
                        Al continuar acepto la <a className="Texto3Formulario" href="https://google.com" rel="noreferrer">Política de Privacidad</a>
                    </p>    
                    {/* <input type="submit" value="enviar"/> */}
                </div>

        </div>
                <div className='ImagenConductor'/>
            </div>
            <div class ="botones text-center">
                <div class="btn-group" role="group" aria-label="Botones con separación">

                    <Link to={"/"}>
                        <button type="button" class="btnGeneral2 mx-3">Volver</button>
                    </Link>   

                    <button type="submit" className='btnGeneral mx-3'>Continuar</button> 
                                   
                </div>
            </div>
                
            
        </form>
    );
}

function ContenedorImagenFormulario () {
    return(
        <div className='ContenedorImagenFormulario'>
            <Formulario/>
            
            <div className='ImagenConductor'/>
        </div>
    );
}

function Formulario () {
    // const {register, handleSubmit} = useForm();
    // const onSubmit = (data) => {
    //     console.log(data);
    // }
    return (
        <>
        {/* <div className='ContenedorFormulario' onSubmit={handleSubmit(onSubmit)}>
                <div className='Texto1'>
                    ¡Protege tu auto, protege tu inversión!
                </div>
                <div className='Texto2'>
                    Ingresa los siguientes datos:
                </div>
                <div >
                    <div className='ContenedorCampoFormulario'>
                        Nombre Completo: <br/>                        
                        <input type='text' {...register('nombreCompleto')}/>
                    </div>
                    
                </div>
                <div>
                    <div className='ContenedorCampoFormulario'>
                        DNI: <br/>                        
                        <input type='text' {...register('DNI',{
                            required: true,
                        })}/>
                    </div>
                    
                </div>
                <div>
                    <div className='ContenedorCampoFormulario'>
                        Correo electrónico: <br/>                        
                        <input type='text' {...register('correoElectonico',{
                            required: true,
                        })}/>
                    </div>
                </div>  
                <div>
                    <div className='ContenedorCampoFormulario'>
                        Teléfono celular: <br/>                        
                        <input type='text' {...register('telefonoCelular',{
                            required: true,
                        })}/>
                    </div>
                </div>
                <div>
                    <div className='ContenedorCampoFormulario'>
                        Direccion: <br/>
                        Departamento:
                        <select {...register('departamento')}>
                            <option value="Lima">Lima</option>
                            <option value="Ancash">Ancash</option>
                            <option value="Ica">Ica</option>
                        </select>
                        Provincia:
                        <select {...register('provincia')}>
                            <option value="LimaMetropolitana">Lima Metropolitana</option>
                            <option value="Callao">Callao</option>
                            <option value="Huarochiri">Huarochiri</option>
                        </select>
                        Distrito:
                        <select {...register('distrito')}>
                            <option value="SanMiguel">San Miguel</option>
                            <option value="Lince">Lince</option>
                            <option value="JesusMaria">Jesus María</option>
                        </select>
                    </div>
                </div>
                <div className='ContenedorLink'>
                    <p className='Link1'>
                        Al continuar acepto la <a className="Texto3Formulario" href="https://google.com" rel="noreferrer">Política de Privacidad</a>
                    </p>    
                    <input type="submit" value="enviar"/>
                </div>

        </div> */}

       </>
    );

}