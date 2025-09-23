import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SideBar from './components/SideBar/SideBar'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <>
      <BrowserRouter>
        <SideBar />
        <div className='app-container'>
          <h1>Component Library Forms</h1>
          <main>
            <Routes>
              <Route path="/" element={<Onboarding />} />
              <Route path="/Dashboard" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
