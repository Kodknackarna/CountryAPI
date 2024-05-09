type SearchProps = {
  inputValue: string;
  onInputChange: (newValue: string) => void;
  onSearchCountries: () => void;
}

function Search ({
    inputValue,
    onInputChange,
    onSearchCountries,
  }  : SearchProps ) {

    return (
        <section>
      <button onClick={onSearchCountries} className="button">Countries</button>
      <input
        type="text"
        placeholder="country name"
        className="searchTerm"
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
      />
    </section>
    )

}

export default Search;