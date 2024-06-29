import { useEffect, useState } from 'react';
import './App.css';
import {datos} from './assets/datos.js'
import star from './assets/estrella.png'

console.log(datos)
function App() {
  const [productos, setProductos] = useState(datos)
  const [misProductos, setMisProductos] = useState([])
  const [productosOrdenados, setProductosOrdenados] = useState([])
  let arrStars = [];
  const Comprar = (id, name) => {
  setMisProductos([...misProductos, {
    producto: name,
    estrellas:1
  }])
  setProductos(prev => 
    prev.map(item => {
      if (item.id === id) {
        return {...item,estado:true}
      }
      return item
    })
  )
  }

  const addStars = (cantidad) => {
    arrStars = [];
    for (let i = 0; i < cantidad; i++) {
      arrStars.push(<img width="16" key={i} src={star} alt="estrella" />)
    }
    return arrStars
  }                             
  const incrementarStars = (name, cuantas) => {
    setMisProductos(prev => 
      prev.map(item => {
        if (item.producto === name) {
          return {...item, estrellas: (cuantas<5) ? cuantas+1 : 1}
        }
        return item
      })
    )
  }
  useEffect(() => {
    setProductosOrdenados(misProductos.sort((a,b) => b.estrellas - a.estrellas))
  }, [misProductos])

  return (
    <>    
    <h1 className='title'>Menu hecho con react</h1>
    <main className='main'>
      <article>
    <section className='listingProd'>
      {
        productos.filter((dato) => dato.estado === false).map((prod,index) => (
          <div key={index} onClick={() => Comprar(prod.id, prod.producto)} className='producto'>
            {prod.producto}
          </div>
        ))
      }
    </section>
    <section className='listingMisProd'>


        <table>
          <thead>
            <tr>
            <th>
              Items
            </th>
            <th>Stars</th>
            </tr>
          </thead>
          <tbody>
            
          {productosOrdenados.map((prod,index) =>
            <tr key={prod.producto} className='misProd' onClick={ () => incrementarStars(prod.producto, prod.estrellas)}>
              <td className='celdas'>{prod.producto}</td>
              <td className='celdas'>{
              addStars(prod.estrellas)              
              }</td>
            </tr>
        )} 
          </tbody>
        </table>
    </section>
    </article>
    </main>
    </>
  );
}

export default App;
