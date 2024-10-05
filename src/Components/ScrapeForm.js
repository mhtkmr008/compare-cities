import React from 'react';
import { useState } from 'react';

const ScraperForm=({onSubmit})=>{
    const[cityOne,setCityOne]=useState('');
    const[cityTwo,setCityTwo]=useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();
        onSubmit({cityOne,cityTwo});
        setCityOne('');
        setCityTwo('');
    };

    return(
        <form onSubmit={handleSubmit}>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'10vh'}}>
                <input type="text" placeholder="Enter City Name" value={cityOne} onChange={(e)=>setCityOne(e.target.value)}></input>
                &nbsp;
                <input type="text" placeholder="Enter City Name" value={cityTwo} onChange={(e)=>setCityTwo(e.target.value)}></input>
            <button type="submit">Compare</button>
            </div>
            
        </form>
    );
};

export default ScraperForm;