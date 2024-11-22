import { useEffect, useRef, useState } from 'react'
import './App.css'
import Controller from './components/Controller'
import Viewer from './components/Viewer'
import Even from './components/Even';

function App() {

  let [count, setCount] = useState(0);
  let [input, setInput] = useState('');

  let isMount = useRef(false); //아직 마운트되지않음

  useEffect(() => {
    console.log('mount')
  }, [])

  // 업데이트 단계에서만 실행
  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true;
      return;
    }
    console.log("update")
  })


  function onClickButton(value) {
    setCount(count + value);
  };

  return (
    <div className='App'>
      <h1>Simple Counter</h1>
      <section>
        <input value={input} onChange={(e) => { setInput(e.target.value) }} />
      </section>

      <section>
        <Viewer count={count} />
        {
          count % 2 === 0 ? <Even /> : null
        }
      </section>

      <section>
        <Controller onClickButton={onClickButton} />
      </section>
    </div>
  )
}

export default App
