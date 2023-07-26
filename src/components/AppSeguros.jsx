import Formulario from './Formulario'
import Spinner from './Spinner'
import { Fragment, useCallback } from 'react'
import useCotizador from '../hooks/useCotizador'
import {MARCAS, PLANES} from '../constants'

export default function AppSeguros() {

  const{ resultado, cargando, datos } = useCotizador()
  const {marca, plan, year} = datos



  const [nombreMarca] = useCallback( 
    MARCAS.filter(m => m.id === Number(marca)),
    [resultado]
  )
  const [nombrePlan] = useCallback( 
    PLANES.filter(p => p.id === Number(plan)), 
    [resultado]
  )

  return (
    <>
        <header className="my-10">
            <h1 className="text-white text-center text-4xl font-black">Cotizador de Seguros</h1>
        </header>

        <main className="bg-white md:w-2/3 lg:w-2/4 mx-auto shadow rounded-lg p-10 mb-5 w-4/5">
            <Formulario/>

            {cargando ? <Spinner/> : resultado === 0 ? null : 
              <div className='text-center mt-5 p-5 shadow bg-gray-200'>
                <h2 className='text-gray-600 font-black text-3xl mb-4'>
                  Resumen
                </h2>

                <p className='my-2'>
                  <span className='font-bold'>Marca: </span>
                  {nombreMarca.nombre}
                </p>
                <p className='my-2'>
                  <span className='font-bold'>Plan: </span>
                  {nombrePlan.nombre}
                </p>
                <Fragment>
                  <p className='my-2'>
                    <span className='font-bold'>Año: </span>
                    {year}
                  </p>
                </Fragment>
                <p className='my-2 text-2xl'>
                  <span className='font-bold'>Presupuesto Total: </span>
                  {resultado}
                </p>
              </div>
            }
        </main>
    </>
  )
}