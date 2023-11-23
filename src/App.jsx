import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './Pages/Shared/NavBar/NavBar'
import Footer from './Pages/Shared/Footer/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='container mx-auto space-y-5'>

      <div>
        <NavBar></NavBar>
      </div>
      <div className='px-2'>
        <Outlet></Outlet>
      </div>
      <div className='px-2'>
        <Footer></Footer>
      </div>

    </div>
  )
}

export default App
