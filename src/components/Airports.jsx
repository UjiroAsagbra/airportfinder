import { useState,useEffect } from 'react'
const Airports=() => {
  const [airportData, setAirportData] = useState(null);
  const [airportCode, setAirportCode] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [noResult, setNoResult] = useState("");

 
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
  }, []); 

  const handleSearch = (event) => {
    setAirportCode(event.target.value.toUpperCase());
    setSearchResult(null); 
    setNoResult('')
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const airport = airportData.find(airport => airport.code === airportCode);
    if (airport) {
      setSearchResult(airport);
      setNoResult('');
    } else {
      setSearchResult(null);
      setNoResult(`Ryanair doesn't fly to ${airportCode} try a different code`);
    }

   setAirportCode("")
  };

  
  

  
  return(
    <main className="col-3 col-s-12">
      <div className="airport-form">
      <form>
       
        <input  
          id="airport-code" 
          type="text" 
          className="lettercode" 
          placeholder='Enter Three Letter Code'
          name = 'airport-code'
          onChange={handleSearch}
          value={airportCode}

        /> 
        <button 
        className="form-button"
        onClick={handleSubmit}
        >
          Find Airport
        </button>
        </form>
      </div>
      {noResult && (
        <p>{noResult}</p>
      )}


      {searchResult && (
        <div className="airport-data">
          <h2>Airport Details</h2>
          <p>Code: {searchResult.code}</p>
          <p>Airport Name: {searchResult.name}</p>
          <p>Country: {searchResult.country}</p>
        </div>
      )}
      
    </main>
  )
}

export default Airports