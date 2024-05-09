import CountryModel from "../model/CountryModel";
import './country.css'

type CountryProps = {
  countries: CountryModel[];
};

function Country({ countries }: CountryProps) {
  return (
    <div className="country-list">
      {countries.map((country) => (
        <div key={country.name} className="country-card">
          <img src={country.flags} alt={`Flag of ${country.name}`} className="country-flag" />
          <div className="country-details">
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population.toLocaleString()}</p>
            <a href={country.maps} target="_blank" rel="noopener noreferrer">Se på karta</a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Country;