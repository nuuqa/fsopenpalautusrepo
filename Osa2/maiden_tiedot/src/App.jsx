import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import weatherService from './services/weather'


// Search
const Search = ({handleSearchChange, value}) => {
  return(
    <div>
      Find countries <Input handleSearchChange={handleSearchChange} value={value} />
    </div>
  )
}

// Input
const Input = ({handleSearchChange, value}) => {
  return(
    <input onChange={handleSearchChange} value={value}/>
  )
}

// Button
const Button = ({handleClick}) => {
  return(
    <button onClick={handleClick}>Show</button>
  )
}

// Countries
const Countries = ({countries, handleClick, weatherInfo}) => {
  if(countries.length > 10){
    return(
      <div>Too many matches, specify another filter!</div>
    )
  }
  if(countries.length === 1){
    return(
      <Country country={countries[0]} weatherInfo={weatherInfo}/>
    )
  }
  return (
    <div>
      {countries.map(country => 
      <CountryName 
      key={country.cca2}
      country={country} 
      handleClick={() => handleClick(country.name.common)}/>)}
      
    </div>
  )
}

// CountryName
const CountryName = ({country, handleClick}) => {
  return(
    <div>
      {country.name.common} <Button handleClick={handleClick}/>
    </div>
  )
}

// Country
const Country = ({country, weatherInfo}) => {
  return(
    <div>
      <Header text={country.name.common}/>
      <div>
        Capital: {country.capital} <br />
        Area: {country.area} <br />
      </div>
      <br/>
      <div>
        <strong>Languages</strong>
      </div>
      <br/>
      <Languages languages={country.languages} />
      <img src={country.flags.png}></img>
      <br />
      <Header text={`Weather in ${country.capital}`} />
      <Weather weatherInfo={weatherInfo} />
    </div>
  )
}

// Header
const Header = ({text}) => {
  return(
  <div>
    <h1>{text}</h1>
  </div>
  )
}

// Languages
const Languages = ({languages}) => {
  const languagesArray = Object.values(languages) // Muutetaan taulukoksi
  return(
    <div>
      <ul>
      {languagesArray.map((language, i) => (
          <li key={i}>{language}</li>
        ))}
      </ul>
    </div>
  )
}

// Weather
const Weather = ({weatherInfo}) => {
  // Tässä ehto, koska jos säätiedot eivät olleet kerenneet latautua, ohjelma kaatui.
  if (!weatherInfo.main || !weatherInfo.wind) {
    return <div>Loading weather data...</div>
  }
  return(
    <div>
    Temperature {(weatherInfo.main.temp - 273.15).toFixed(2)} Celcius
    <br />
    <img src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}></img>
    <br />
    Wind {weatherInfo.wind.speed} m/s
  </div>
  )
}


const App = () => {
  const [countries, setCountries] = useState(null)
  const [filtered, setFiltered] = useState('')
  const [weatherInfo, setWeatherInfo] = useState({})
  const [city, setCity] = useState('')

  // Lähetetään tyhjä lista jos haku kenttä on tyhjä, muussa tapauksessa filtteröity lista maista.
  const showCountries = filtered === ''
  ? []
  : countries.filter(country => country.name.common.toLowerCase().includes(filtered.toLowerCase()))
  
  // Maat.
  useEffect(() => {
    console.log('Render')
    countriesService
    .getAll()
    .then(initialCountries => {
      setCountries(initialCountries)
    })
  }, [])

  // Sää
  useEffect(() => {
    if (city) {
      console.log('Getting weather for ', city)
      weatherService
      .getCurrentWeather(city)
      .then(returnedWeather => {
        setWeatherInfo(returnedWeather)
      })
    }
  }, [city])


  // Kaupunki
  useEffect(() => {
    if (showCountries.length === 1) {
      if (city !== showCountries[0].capital) { 
        setCity(showCountries[0].capital)
        console.log(showCountries[0].capital)
      }
    } else {
      if (city !== '') {
        setCity('')
        console.log('no capital set')
      }
    }
  }, [showCountries, city])


  const handleSearchChange = (e) =>{
    setFiltered(e.target.value)
  }

  const handleClick = (name) => {
    setFiltered(name)
  }
  
  return (
    <div>
      <Search 
        handleSearchChange={handleSearchChange} 
        value={filtered} />
      <Countries 
        countries={showCountries} 
        handleClick={handleClick} 
        weatherInfo={weatherInfo}/>
    </div>
  )
}

export default App
