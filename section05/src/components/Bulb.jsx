import { useState } from "react";

 const Bulb = () => {
    let [light, setLight] = useState('OFF');
    console.log(light);
    return (
      <div>
        {light === 'ON' ?
          (<h1 style={{ background: 'orange' }}>ON</h1>) :
          (<h1 style={{ background: 'gray' }}>OFF</h1>)}
  
        <button onClick={() => {
          setLight(light === 'ON' ? "OFF" : "ON");
        }}>
          {light === "ON" ? '끄기' : '켜기'}
        </button>
      </div>
    )
  }
  
  export default Bulb;