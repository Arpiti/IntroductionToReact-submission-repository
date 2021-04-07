import './App.css';
import axios from 'axios';
import React, {useEffect, useState} from 'react';

const allCountriesApi = 'https://restcountries.eu/rest/v2/all';

//API KEY to remember '5e85474583bebe818a9e1ffa5209ff80' - It's in DEV ENV Variable
const accessKey = process.env.REACT_APP_API_KEY
const weatherStackApi = 'http://api.weatherstack.com/current?access_key='+accessKey+'&query=';

function Weather({resultCountries}) {

  const [weatherDetail, setWeatherDetail] = useState([]);

  useEffect(()=>{

    if(resultCountries.length === 1 && resultCountries[0].alpha2Code !== 'NA'){
      let capital = (resultCountries[0].capital); 
      const weatherUri = weatherStackApi+capital;
      console.log('weatherUri >>', weatherUri);

      axios
       .get(weatherUri)
       .then(response => {
          console.log(' Waether UseEffect Promise Fulfilled');
          const data = (response.data);
          //console.log('data >>', data);
          let temp = { 'temperature': data.current.temperature, 
                        'icon': data.current.weather_icons,
                      'pressure': data.current.pressure,
                      'humidity': data.current.humidity,
                      'feelslike': data.current.feelslike };
          setWeatherDetail(temp);
       })
    }
    },[]);

  return (
    <div>
      <img src={weatherDetail.icon} alt-text={resultCountries[0].capital+'Weather'}/>
      <p>Temperature {weatherDetail.temperature} &deg;C </p>
      <p>Pressure {weatherDetail.pressure} Pa</p>
      <p>Humidity {weatherDetail.humidity}</p>
      <p>FeelsLike {weatherDetail.feelslike}  &deg;C</p>
    </div>
  )
}

function DetailResult({resultCountries}) {
  let country = resultCountries[0];
    return (
     <div>
       <h2>{country.name}</h2>
       <img src={country.flag} height='160px' width='200px'/>
       <br/>
       <h3>Capital</h3>
       <p>{country.capital}</p> 
       <br/>
       <h3>Population</h3>
       <p>{country.population}</p> 
       <br/>
       <h3>Languages Spoken</h3>
       <ul class="UnorderedList">
         {
         (country.languages).map(lang => <li key = {lang.name}>{lang.name} aka <i>{lang.nativeName}</i></li>)
         }
       </ul>
       <br/>
       <h3>Currencies</h3>
       <ul class="UnorderedList">
         {
         (country.currencies).map(curr => <li key = {curr.code}>{curr.name}</li>)
         }
       </ul>
       <br/>
       <h3>Region - SubRegion</h3>
       <p>{country.region} - {country.subregion}</p>
       <br/>
       <h3>Area</h3>
       <p>{country.area} km square</p>
       <br/>
       <h3>Calling Code</h3>
       <ul class="UnorderedList">
         {
         (country.callingCodes).map(callCode => <li key={callCode}>+{callCode}</li>)
         }
       </ul>
       <br/>
       <h3>Current Weather Report</h3>
       <Weather resultCountries={resultCountries}/>
     </div> 
    );

}

function Result({resultCountries, setResultCountries}) {
  
  console.log('ResultCountries from Result >>', resultCountries);
 
  if(resultCountries.length === 1 && resultCountries[0].alpha2Code != 'NA')
    return <DetailResult resultCountries={resultCountries}></DetailResult>
  else if(resultCountries.length === 1 && resultCountries[0].alpha2Code === 'NA')
    return <div>{resultCountries[0].name}</div>
  else {
    console.log('in Else return');
    return (
      <ul class="UnorderedList">
         {
           resultCountries.map(country => <li key={country.alpha2Code}> {country.name} 
           <Button country={country} resultCountries={resultCountries} setResultCountries={setResultCountries}></Button></li>)
         }
       </ul>
    );
  }
}



function Button({country,resultCountries,setResultCountries}) {
  
  let id = '';

  const findCoun = (country) => 
  {
    console.log('id >>', id);
    return country.name==id.replace("Button","")
  }

  const showDetailResult = (event) =>
  {
    id = event.target.id;
    let coun = resultCountries.find(findCoun);
    //console.log('Button id >>', coun);
    
    setResultCountries([coun]);
  }

  return (
    <button id= {country.name+'Button'} onClick={showDetailResult}>show</button>
  )
}

function App() {

  const [inputCountry, setInputCountry] = useState('');
  const [allCountries, setAllCountries] = useState([]);
  const [resultCountries, setResultCountries] = useState([]);

  useEffect(()=>{
    console.log('In UseEffect');
    axios
      .get(allCountriesApi)
      .then(response => {
        console.log('Promise Fulfilled');
        setAllCountries(response.data);
      })
  },[])

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


 


  return (
    <div className="App">
      <h2> Country Search App</h2>
      <br/>
     <div>
       Find countries: <input type='text' onChange={handleCountryInputChange} value={inputCountry}></input>
     </div>
     <div>
       <br/>
       <br/>
       <Result resultCountries={resultCountries} setResultCountries={setResultCountries}/>
     </div>
    </div>
  );
}

export default App;
