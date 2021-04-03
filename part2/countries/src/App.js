import './App.css';
import axios from 'axios';
import React, {useEffect, useState} from 'react';

const allCountries_api = 'https://restcountries.eu/rest/v2/all';
const singleCountryDetail_api = 'https://restcountries.eu/rest/v2/alpha/';

function App() {

  const [inputCountry, setInputCountry] = useState('');
  const [allCountries, setAllCountries] = useState([]);
  const [resultCountries, setResultCountries] = useState([]);

  const handleCountryInputChange = (event) => {

    let val = event.target.value;
    console.log('Value', val);

    setInputCountry(val);
    
   

    const isInputInCountry = thisCountry => {
  
      //console.log('InputCountry', inputCountry);
      //console.log('Includes off >>', ((thisCountry.name).toLowerCase()).includes(inputCountry.toLowerCase()));
      if(((thisCountry.name).toLowerCase()).includes(val.toLowerCase()))
        return true;
       return false;
    } 

    if(allCountries.length > 0)
    {
      console.log('We got countries from server, yaeeee');
     // console.log('Total countries', allCountries.length);
      //console.log('Countries', allCountries);

      const totalResCountries = allCountries.filter(isInputInCountry);
      console.log('Res Countries', totalResCountries.length);

      if(totalResCountries.length === allCountries.length)
        setResultCountries([]);
      // else if(totalResCountries.length === 1)
      // {
        
      // }
      else if(totalResCountries.length < 10)
        setResultCountries(totalResCountries);
      else
        setResultCountries([{name: 'Too many countries, please specify any other filter', alpha2Code: 'TMC'}])
    }
    console.log('Total countries', allCountries.length);
  };

  useEffect(()=>{
    console.log('In UseEffect');
    axios
      .get(allCountries_api)
      .then(response => {
        console.log('Promise Fulfilled');
        setAllCountries(response.data);
      })
  },[])

  useEffect(()=>{
    console.log('In Single country UseEffect');
    axios
      .get(singleCountryDetail_api)
      .then(response => {
        console.log(' Single country UseEffect Promise Fulfilled');
        console.log(response.data);
        // setAllCountries(response.data);
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
         {
          resultCountries.map(country => <li key={country.alpha2Code}> {country.name} </li>)
         }
        </ul> 
     </div>
    </div>
  );
}

export default App;
