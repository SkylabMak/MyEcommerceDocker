import { useState } from 'react'
import './App.css'
import ShowItem from './showItem/main.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
          <ShowItem/>
    </>
  )
}

export default App
