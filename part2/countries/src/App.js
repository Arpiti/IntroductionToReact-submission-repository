import './App.css';
import axios from 'axios';
import React, {useEffect, useState} from 'react';

const allCountries_api = 'https://restcountries.eu/rest/v2/all';

function App() {

  const [inputCountry, setInputCountry] = useState('');
  const [allCountries, setAllCountries] = useState([]);
  const [resultCountries, setResultCountries] = useState([]);

  const handleCountryInputChange = (event) => {

    let val = event.target.value;
    console.log('Value', val);

    setInputCountry(val);
    
    if(allCountries.length > 0)
    {
      console.log('We got countries from server, yaeeee');
     // console.log('Total countries', allCountries.length);
     // console.log('Countries', allCountries);
      setResultCountries(allCountries.filter(isInputInCountry));
    }
    console.log('Total countries', allCountries.length);
  };

  const isInputInCountry = thisCountry => {
  
    //console.log('InputCountry', inputCountry);
    //console.log('Includes off >>', ((thisCountry.name).toLowerCase()).includes(inputCountry.toLowerCase()));
    if(((thisCountry.name).toLowerCase()).includes(inputCountry.toLowerCase()))
      return true;

    console.log(thisCountry.name,' is False');
    return false;
  } 

  useEffect(()=>{
    console.log('In UseEffect');
    axios
      .get(allCountries_api)
      .then(response => {
        console.log('Promise Fulfilled');
        setAllCountries(response.data);
      })
  },[])

  return (
    <div className="App">
      <h2> Country Search App</h2>
      <br/>
     <div>
       find countries: <input type='text' onChange={handleCountryInputChange} value={inputCountry}></input>
     </div>
     <div>
       <br/>
       <br/>
       <ul>
         {resultCountries.map(country => <li> {country.name} </li>)}
        </ul> 
     </div>
    </div>
  );
}

export default App;
