import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'
import CountryModel from './model/CountryModel';
import Country from './components/Country';
import './components/country.css'

function App() {
  const [countries, setCountries] = useState<string>('');
  const [dataList, setDataList] = useState<CountryModel[]>([]);
  const [inputValue, setInputValue] = useState('');

  function transformToCountryModel(data: any): CountryModel[] {
    return data.map((item: any) => {
      const languages = item.languages ? Object.values(item.languages).join(', ') : 'Unknown ';
      return {
        name: item.name.common,
        languages : languages,
        capital : item.capital,
        population: item.population,
        flags: item.flags.svg,
        maps : item.maps.googleMaps
      }
    });
  }

//API anrop för att ta fram alla länder
  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/${countries}`)
    .then(response => {
      console.log(response.data)
      const transformedData = transformToCountryModel(response.data);
      transformedData.sort((a, b) => a.name.localeCompare(b.name));
      setDataList(transformedData)
      setCountries('') //rensar datan
    })
  }, [countries]);

//API anrop för söka på specifika länder
  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/name/${inputValue}`)
    .then(response => {
      const transformedData = transformToCountryModel(response.data);
      transformedData.sort((a, b) => a.name.localeCompare(b.name));
      setDataList(transformedData)
    })
  }, [inputValue]);

  useEffect(() => {
    console.log(dataList);
  }, [dataList]);

  return (
    <div>
    <section>
      <button onClick={ () => setCountries('all') } className="button">All countries</button>
      <input type="Text" placeholder='countryname' className='searchTerm' value={inputValue}
             onChange={(e) => setInputValue(e.target.value)}></input>
    </section>
    <Country countries={dataList}/>
  </div>
  )
}

export default App
