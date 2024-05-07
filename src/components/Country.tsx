import CountryModel from "../model/CountryModel";

type CountryProps = {
  countries: CountryModel[];
};

function Country({ countries }: CountryProps) {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name}>
          <h2>{country.name}</h2>
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population.toLocaleString()}</p>
          <img src={country.flags} alt={`Flag of ${country.name}`} />
          <a href={country.maps} target="_blank" rel="noopener noreferrer">Se på karta</a>
        </li>
      ))}
    </ul>
  );
}

export default Country;