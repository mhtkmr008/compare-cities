import './App.css';
import ScraperForm from './Components/ScrapeForm';
import { useState } from 'react';
import getCityInfo from './Service/cityService';

function App() {
  const[comparisonResult,setComparisonResult]=useState('');

  const handleCityCompare=async({cityOne,cityTwo})=>{
    try
    {
      const cityOneData=await getCityInfo(cityOne);
      const cityTwoData=await getCityInfo(cityTwo);

      setComparisonResult({
        cityOneData: cityOneData,
        cityTwoData: cityTwoData,
      });
    }
    catch(error)
      {
        console.error("Error Comparing Cities : ",error)
      }
  };
  return (
    <div>
      <h1 style={{display:'flex', justifyContent:'center'}}>City Comparison Tool</h1>
      <div>
        <ScraperForm onSubmit={handleCityCompare}></ScraperForm>
      </div>
      {comparisonResult && (
        <div style={{textAlign:'center',marginTop:'20px'}}>
          <h2>Comparison Result</h2>
          <div  style={{ display:'flex',justifyContent:'center',gap:'0'}}>
            <div style={{border: '1px solid #ccc',padding:'10px',width:'300px'}}>
            <h3 style={{ margin:'0' }}>
              {comparisonResult.cityOneData.city}</h3>
              <p>Country :{comparisonResult.cityOneData.countryName}</p>
              <p>State:{comparisonResult.cityOneData.stateName}</p>
              <p>Population:{comparisonResult.cityOneData.population}</p>
              <p>SexRatio:{comparisonResult.cityOneData.sexRatio}</p>
              <p>Languages:{comparisonResult.cityOneData.languages}</p>
              <p>Area:{comparisonResult.cityOneData.area}</p>
              <p>Elevation:{comparisonResult.cityOneData.elevation}</p>
          </div>
          <div style={{ border: '1px solid #ccc', padding: '10px', width: '300px' }}>
          <h3 style={{ margin:'0'}}>{comparisonResult.cityTwoData.city}</h3>
              <p>Country :{comparisonResult.cityTwoData.countryName}</p>
              <p>State:{comparisonResult.cityTwoData.stateName}</p>
              <p>Population:{comparisonResult.cityTwoData.population}</p>
              <p>SexRatio:{comparisonResult.cityTwoData.sexRatio}</p>
              <p>Languages:{comparisonResult.cityTwoData.languages}</p>
              <p>Area:{comparisonResult.cityTwoData.area}</p>
              <p>Elevation:{comparisonResult.cityTwoData.elevation}</p>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default App;
