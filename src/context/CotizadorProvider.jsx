import { useState, createContext } from "react";
import { obtenerDiferenciaYear, calcularMarca, calcularPlan, formatearDinero } from "../helpers";

const CotizadorContext = createContext()

const CotizadorProvider = ({children}) => {

    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    const [error, setError] = useState('')
    const [resultado, setResultado] = useState(0)
    const [cargando, setCargando] = useState(false)

    const handleChangeDatos = e => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const cotizarSeguro = () => {
        let resultado = 2000

        //Obtener dif de Years
        const diferencia = obtenerDiferenciaYear(datos.year)
        
        //Hay que restar el 3% por año
        resultado -= ((diferencia * 3) * resultado) / 100

        //Calcular incremento por Marca
        resultado *= calcularMarca(datos.marca)


        //Calcular incremento por Plan
        resultado *= calcularPlan(datos.plan)

        //Formatear el Presupuesto Final
        resultado = formatearDinero(resultado)

        setCargando(true)

        setTimeout(() => {
            setResultado(resultado)
            setCargando(false)
        }, 3000);

    }

    return (
        <CotizadorContext.Provider
            value={{
                datos,
                handleChangeDatos,
                error,
                setError,
                cotizarSeguro,
                resultado,
                cargando
            }}
        >
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider
}
export default CotizadorContext