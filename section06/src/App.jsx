import { useState } from 'react'
import './App.css'
import Controller from './components/Controller'
import Viewer from './components/Viewer'

function App() {

  let [count, setCount] = useState(0);

  function onClickButton(value) {
    setCount(count + value);
  };

  return (
    <div className='App'>
      <h1>Simple Counter</h1>

      <section>
        <Viewer count={count} />
      </section>

      <section>
        <Controller onClickButton={onClickButton}/>
      </section>
    </div>
  )
}

export default App
