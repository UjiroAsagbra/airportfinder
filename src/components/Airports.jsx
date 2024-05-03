import { useState,useEffect } from 'react'
const Airports=() => {
  const [airportData, setAirportData] = useState(null);
  const [airportCode, setAirportCode] = useState('');
  const [searchResult, setSearchResult] = useState(null);

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('airportData.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setAirportData(jsonData.data.airports);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once after the component mounts

  const handleSearch = (event) => {
    setAirportCode(event.target.value.toUpperCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Find the airport with the matching code
    const airport = airportData.find(airport => airport.code === airportCode);
    setSearchResult(airport);
    setAirportCode('')
  };

  
  

  
  return(
    <main>
      <div className="airport-form">
      <form onSubmit={handleSubmit}>
       
        <input  
          id="airport-code" 
          type="text" 
          className="three-letter-code" 
          placeholder='Enter Three Letter Code'
          name = 'airport-code'
          onChange={handleSearch}
          value={airportCode}

        /> 
        <button 
        className="form-button"
        >
          Find Airport
        </button>
        </form>
      </div>
      {searchResult && (
        <div className="airport-data">
          <h2>Airport Details</h2>
          <p>Code: {searchResult.code}</p>
          <p>Name: {searchResult.name}</p>
          <p>Country: {searchResult.country}</p>
        </div>
      )}

      {!searchResult && airportCode && (
        <p>No airport found with code {airportCode}</p>
      )}
    </main>
  )
}

export default Airports