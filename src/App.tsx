import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'
import CountryModel from './model/CountryModel';
import Country from './components/Country';
import './components/country.css'
import Search from './components/Search'


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

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
  };

  const handleSearchCountries = () => {
    setCountries('all');
  };

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
    <Search
    inputValue={inputValue}
    onInputChange={handleInputChange}
    onSearchCountries={handleSearchCountries}
    />
    <Country countries={dataList}/>
  </div>
  )
}

export default App
