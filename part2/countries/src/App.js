import './App.css';
import axios from 'axios';
import React, {useEffect, useState} from 'react';

const allCountries_api = 'https://restcountries.eu/rest/v2/all';
const singleCountryDetail_api = 'https://restcountries.eu/rest/v2/alpha/';

function Result({resultCountries}) {
  console.log('ResultCountries from Result >>', resultCountries);
  if(resultCountries.length === 1 && resultCountries[0].alpha2Code != 'NA')
  {
    let country = resultCountries[0];
    return (
     <div>
       <h2>{country.name}</h2>
       <br/>
       <p>Capital: {country.capital}</p> 
       <p>Population: {country.population}</p> 
       <br/>
       <h3>language</h3>
       <br/>
       <ul>
         {
         (country.languages).map(lang => <li>{lang.name}</li>)
        }
       </ul>
       <img src={country.flag} height='160px' width='200px'/>

     </div> 
    );
  }
  else {
    
    console.log('in Else return');
    return (
      <ul>
         {
           resultCountries.map(country => <li key={country.alpha2Code}> {country.name} </li>)
         }
       </ul>
    );
  }
}

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
      else if(totalResCountries.length === 1)
      {
        console.log('Only one country in result');   
        setResultCountries(totalResCountries);  
      }
      else if(totalResCountries.length < 10)
        setResultCountries(totalResCountries);
      else
        setResultCountries([{name: 'Too many countries, please specify any other filter', alpha2Code: 'NA'}])
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
    console.log('resultCountries >>', resultCountries);
    if(resultCountries.length === 1 && resultCountries[0].alpha2Code != 'NA')
    {
      let singleCountryCode = (resultCountries[0].alpha3Code);
      console.log('SingleCountry >>', singleCountryCode);
      console.log('In Single country UseEffect');

      const uri = singleCountryDetail_api+singleCountryCode;
      console.log('URI >>', uri);

      axios
       .get(uri)
       .then(response => {
          console.log(' Single country UseEffect Promise Fulfilled');
          console.log(response.data);
       })
    }
    },[inputCountry]);


  return (
    <div>
      <h2> Country Search App</h2>
      <br/>
     <div>
       find countries: <input type='text' onChange={handleCountryInputChange} value={inputCountry}></input>
     </div>
     <div>
       <br/>
       <br/>
       <Result resultCountries={resultCountries}/>
     </div>
    </div>
  );
}

export default App;
