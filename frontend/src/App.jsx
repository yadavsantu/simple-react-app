import { useState } from 'react'
import './App.css'
import RegistrationForm from './components/RegistrationForm'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      <RegistrationForm/>
      <Footer/>
    </div>
     
  )
}

export default App
