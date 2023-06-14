import './ModuloReportes.css';
import { Link } from "react-router-dom";
import { obtenerDepartamentos, buscarProvinciasDep , buscarDistritosProv, obtenerDistritos} from './solicitarInformacion';

import { useForm, Controller} from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

function ModuloReportes() {

    const navigate = useNavigate();

    const { control, register, handleSubmit, formState: {errors}} = useForm();
    
    const [departamento,setDepartamento] = useState();
    const [listaDepartamentos,setListaDepartamentos] = useState([]);    
    const [provincia,setProvincia] = useState();
    const [listaProvincias, setListaProvincias] = useState([]);
    const [distrito,setDistrito] = useState();
    const [listaDistritos, setListaDistritos] = useState([]);

    const ubicacion = {
        departamento: departamento,
        provincia: provincia,
        distrito: distrito
    };

    const cambioDepartamento = (idDepartamento) => {
        var nuevoDepartamento = listaDepartamentos.find( (departamento)  => departamento.idDepartamento === idDepartamento);            
        setDepartamento(nuevoDepartamento);
        buscarProvinciasDep(nuevoDepartamento.idDepartamento)
        .then(nuListaProv => {
            setListaProvincias(nuListaProv);
            setProvincia(nuListaProv[0]);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        console.log("id a cambiar: "+idDepartamento);
    };

    const cambioProvincia = (idProvincia) => {
        const provObtenida = listaProvincias.find( (provincia)  => provincia.idProvincia === idProvincia);
        setProvincia(provObtenida);
    };

    const cambioDistrito = (idDistrito) => {
        const distObtenido = listaDistritos.find( (distrito)  => distrito.idDistrito === idDistrito);
        setDistrito(distObtenido);
    };

    useEffect( () => {
        obtenerDepartamentos()
        .then( listaDeps => {
                setListaDepartamentos(listaDeps);
                console.log(listaDeps);
                        setDepartamento(listaDeps[0]);
                        buscarProvinciasDep(listaDeps[0].idDepartamento)
                        .then( listaProvs => {
                                console.log(listaProvs);
                                setListaProvincias(listaProvs);
                                setProvincia(listaProvs[0]);
                                obtenerDistritos(listaProvs[0].idProvincia)
                                .then(listaDists => {
                                    setListaDistritos(listaDists);
                                    setDistrito(listaDists[0]);
                                })
                                .catch();
                        }).catch( error => {
                            console.error('Error:', error);
                        });
            }).catch( error => {
                console.error('Error:', error);
            });
    }, [] );

    const [selectedCheckboxProducto, setSelectedCheckboxProductor] = useState("vacio");
    const [selectedCheckboxCliente, setSelectedCheckboxCliente] = useState("vacio");
    const [selectedCheckboxPlan, setSelectedCheckboxPlan] = useState("vacio");
    const { setValue } = useForm({
        defaultValues: {
          checkboxProducto1: false,
          checkboxProducto2: false,

        },
      });

    const cambioCheckBoxProducto = (value) => {
        setSelectedCheckboxProductor(value);
        // Use setValue function to update the value of checkboxes
        if (value === "checkboxProducto1") {
            setValue("checkboxProducto1", true);
            setValue("checkboxProducto2", false);
        } else if (value === "checkboxProducto2") {
            setValue("checkboxProducto2", true);
            setValue("checkboxProducto1", false);
        }
      };

      const cambioCheckBoxCliente = (value) => {
        setSelectedCheckboxCliente(value);
        // Use setValue function to update the value of checkboxes
        if (value === "checkboxCliente1") {
            setValue("checkboxCliente1", true);
            setValue("chechboxCliente2", false);
        } else if (value === "chechboxCliente2") {
            setValue("chechboxCliente2", true);
            setValue("checkboxCliente1", false);
        }
      };

      const cambioCheckBoxPlan = (value) => {
        setSelectedCheckboxPlan(value);
        // Use setValue function to update the value of checkboxes
        if (value === "checkboxPlan1") {
            setValue("checkboxPlan1", true);
            setValue("chechboxPlan2", false);
        } else if (value === "chechboxPlan2") {
            setValue("chechboxPlan2", true);
            setValue("checkboxPlan1", false);
        }
      };

    return (
        <>
            <div className='ContenedorPrincipal'>
                <br></br>
                <div className='ContenedorReportes'>
                    <div className="ContenedorBoton">
                        <button className="BotonReporte" data-bs-toggle="modal" data-bs-target="#ReporteCotizacion">Reporte de Cotizaciones</button>
                    </div>
                    <div className="ContenedorBoton">
                        <button className="BotonReporte" style={{ marginRight: '100px' }} data-bs-toggle="modal" data-bs-target="#ReporteClientes">Reporte de Clientes</button>
                        <button className="BotonReporte" >Reporte SOAT más vendidos</button>
                    </div>
                </div>
                <br></br>
            </div>
            <div className="modal fade " id="ReporteCotizacion" tabIndex="-1" aria-labelledby="ReporteCotizacionLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content modalMensajes">
                    <img className="img-fluid check" alt = "Check"/>
                    <div className="modal-header">
                        <h3 className="modal-title Textos" id="ReporteCotizacionLabel"> <b>Parámetros de Reporte:</b></h3>
                    </div>
                    <div className="modal-body Textos" >
                        <h4>Desde:</h4>
                        <h4>Hasta:</h4>
                        <div>Tipo de Plan:
                            <div className='ContenedorOpciones'>
                                <div>
                                    <p>Si</p>
                                    <input
                                    {...register("checkboxPlan1")}
                                    type="checkbox"
                                    checked={selectedCheckboxPlan === "checkboxPlan1"}
                                    onChange={() => cambioCheckBoxPlan("checkboxPlan1")}
                                    className='CheckboxCircular'
                                    />
                                </div>
                                <div>
                                    <p>No</p>
                                    <input
                                    {...register("checkboxPlan2")}
                                    type="checkbox"
                                    checked={selectedCheckboxPlan === "checkboxPlan2"}
                                    onChange={() => cambioCheckBoxPlan("checkboxPlan2")}
                                    className='CheckboxCircular'
                                    />   
                                </div>
                            </div>
                        </div>
                        <h4>Tipo de Auto:</h4>
                    </div>
                    <div className="modal-footer">
                        <Link to={"/"} >
                        <button className="btnGeneral btnVolverCentrado" data-bs-dismiss="modal">Volver</button>
                        </Link>
                        <Link to={"/"} >
                        <button className="btnGeneral" data-bs-dismiss="modal">Generar</button>
                        </Link>
                    </div>
                    </div>
                </div>
            </div>
            <div className="modal fade " id="ReporteClientes" tabIndex="-1" aria-labelledby="ReporteClientesLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content modalMensajes">
                    <img className="img-fluid check" alt = "Check"/>
                    <div className="modal-header">
                        <h3 className="modal-title Textos" id="ReporteClientesLabel"> <b>Parámetros de Reporte:</b></h3>
                    </div>
                    <div className="modal-body Textos">
                        <div>Cliente Especial:
                            <div className='ContenedorOpciones'>
                                <div>
                                    <p>Si</p>
                                    <input
                                    {...register("checkboxCliente1")}
                                    type="checkbox"
                                    checked={selectedCheckboxCliente === "checkboxCliente1"}
                                    onChange={() => cambioCheckBoxCliente("checkboxCliente1")}
                                    className='CheckboxCircular'
                                    />
                                </div>
                                <div>
                                    <p>No</p>
                                    <input
                                    {...register("checkboxCliente2")}
                                    type="checkbox"
                                    checked={selectedCheckboxCliente === "checkboxCliente2"}
                                    onChange={() => cambioCheckBoxCliente("checkboxCliente2")}
                                    className='CheckboxCircular'
                                    />   
                                </div>
                            </div>
                        </div>
                        <div>Producto/Servicio:
                            <div className='ContenedorOpciones'>
                                <div>
                                    <p>SOAT</p>
                                    <input
                                    {...register("checkboxProducto1")}
                                    type="checkbox"
                                    checked={selectedCheckboxProducto === "checkboxProducto1"}
                                    onChange={() => cambioCheckBoxProducto("checkboxProducto1")}
                                    className='CheckboxCircular'
                                    />
                                </div>
                                <div>
                                    <p>Cotización Seguro</p>
                                    <input
                                    {...register("checkboxProducto2")}
                                    type="checkbox"
                                    checked={selectedCheckboxProducto === "checkboxProducto2"}
                                    onChange={() => cambioCheckBoxProducto("checkboxProducto2")}
                                    className='CheckboxCircular'
                                    />   
                                </div>
                            </div>
                        </div>
                    <div>
                        <div className='ContenedorCampoFormularioUbicacion'>
                            <div className='ContenedorCampoUbicacion'>
                                <div><p>Departamento:</p></div>
                                <div>
                                    <select onChange={(e) => cambioDepartamento(parseInt(e.target.value))} className='Resultado' value={departamento && departamento.idDepartamento}>
                                            {listaDepartamentos && listaDepartamentos.map((option) => (
                                            <option key={option.idDepartamento} value={option.idDepartamento}>
                                                {option.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>                            
                            </div>

                            <div className='ContenedorCampoUbicacion'>
                                <div><p>Provincia:</p></div>
                                <div>
                                    <select onChange={(e) => cambioProvincia(parseInt(e.target.value))} className='Resultado' value={provincia && provincia.idProvincia}>
                                            {listaProvincias && listaProvincias.map((option) => (
                                            <option key={option.idProvincia} value={option.idProvincia}>
                                                {option.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>                            
                            </div>

                            <div className='ContenedorCampoUbicacion'>
                                <div><p>Distrito:</p></div>
                                <div>
                                    <select onChange={(e) => cambioDistrito(parseInt(e.target.value))} className='Resultado' value={distrito && distrito.idDistrito}>
                                            {listaDistritos && listaDistritos.map((option) => (
                                            <option key={option.idDistrito} value={option.idDistrito}>
                                                {option.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>                            
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="modal-footer">
                        <Link to={"/"} >
                        <button className="btnGeneral btnVolverCentrado" data-bs-dismiss="modal">Volver</button>
                        </Link>
                        <Link to={"/"} >
                        <button className="btnGeneral" data-bs-dismiss="modal">Generar</button>
                        </Link>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}

export default ModuloReportes;
