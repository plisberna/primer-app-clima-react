import { useState } from "react"

export const Clima = () => {
  let key = 'ea6027b7c466c1e1111e6912b9773a8e'
  let diferencia = 271.15

  const [city, setCity] = useState('');
  
 const [dataClim, setDataClim] = useState(null);
  
  const handelcity = (e) => {
  setCity(e.target.value)
  }
  
  const clearContent = () => {
    setCity('')
    setDataClim('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
   if(city.length > 0)fetchDataClim() 
  
  }

  const fetchDataClim = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
      const data = await response.json()
      setDataClim(data)
    } catch(error) {
      console.error(`ocurrio es el siguiente error:`,error)
    }
  }

  return (
    <div className="container">
      <h1>Aplicacion del Clima</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Ingresa el nombre de la ciudad"
          value={city}
          onChange={handelcity}
        />
        <button type="submit" >Buscar</button>
        <button type="input" onClick={clearContent}>Reiniciar Busqueda</button>
      </form>
      {
        dataClim && (
          <>
            <h2>{dataClim.name},{dataClim.sys.country} </h2>
            <p>La temperatura es: {parseInt(dataClim.main.temp - diferencia)}℃</p>
            <img src={`https://openweathermap.org/img/wn/${dataClim.weather[0].icon}@2x.png `} />
          </>
        )
       }
      
    </div>
  )
}
