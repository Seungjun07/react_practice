import './App.css'
import { useReducer, useRef, createContext, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Diary from './pages/Diary'
import Home from './pages/Home'
import New from './pages/New'
import Edit from './pages/Edit'
import NotFound from './pages/NotFound'

import { getEmotionImage } from './util/get-emotion-image'
import Button from './components/Button'
import Header from './components/Header'

// const mockData = [
//   {
//     id: 1,
//     createdDate: new Date("2024-11-05").getTime(),
//     emotionId: 1,
//     content: "1번 일기 내용",
//   },
//   {
//     id: 2,
//     createdDate: new Date("2024-11-04").getTime(),
//     emotionId: 2,
//     content: "2번 일기 내용",
//   },
//   {
//     id: 3,
//     createdDate: new Date("2024-10-04").getTime(),
//     emotionId: 3,
//     content: "3번 일기 내용",
//   }
// ]

function reducer(state, action) {
  let nextState;

  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE":
      {
        nextState = [action.data, ...state];
        break;
      }
    case "UPDATE":
      {
        nextState = state.map((item) =>
          String(item.id) === String(action.data.id) ? action.data : item);
        break;
      }
    case "DELETE":
      {
        nextState = state.filter((item) => String(item.id) !== String(action.id));
        break;
      }
    case "DEFAULT":
      return state;
  }
  localStorage.setItem('diary', JSON.stringify(nextState));
  return nextState;
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef();

  useEffect(() => {
    const storedData = localStorage.getItem('diary');
    if (!storedData) {
      return;
    }

    const parsedData = JSON.parse(storedData);
    if (!Array.isArray(parsedData)) {
      setIsLoading(false);
      return;
    }

    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id)
      }
    })
    idRef.current = maxId + 1;

    dispatch({
      type: 'INIT',
      data: parsedData,
    });
    setIsLoading(false);
  }, [])

  // 새로운 일기 추가
  function onCreate(createdDate, emotionId, content) {
    // 새로운 일기를 추가하는 기능
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    })
  };

  // 기존 일기 수정
  function onUpdate(id, createdDate, emotionId, content) {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content
      }
    })
  };

  // 기존 일기 삭제
  function onDelete(id) {
    dispatch({
      type: "DELETE",
      id,
    })
  };

  if(isLoading){
    return <div>데이터 로딩중입니다...!</div>
  }

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{
          onCreate, onUpdate, onDelete
        }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/new' element={<New />} />
            <Route path='/diary/:id' element={<Diary />} />
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  )
}

export default App
