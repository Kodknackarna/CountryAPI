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

  //funktion som returnerar API url:en ner till useEffect
  function getUrl() {
    if (inputValue.trim() !== '') { //kollar så inputvalue inte är tom
      return `https://restcountries.com/v3.1/name/${inputValue}`;
    } else if (countries === 'all') {
      return 'https://restcountries.com/v3.1/all';
    }
    return null; //returnerar null om inga villkor är uppfyllda
  }
  
  useEffect(() => {
    const url = getUrl();
    if (url) { //kontrollerar så att url:en inte är null
      axios.get(url)
        .then(response => {
          const transformedData = transformToCountryModel(response.data);
          transformedData.sort((a, b) => a.name.localeCompare(b.name));
          setDataList(transformedData);
          if (countries === 'all') {
            setCountries(''); //rensar countries om alla länder har hämtats
          }
        });
    }
  }, [inputValue, countries]);

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
