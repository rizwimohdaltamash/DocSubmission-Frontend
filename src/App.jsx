import React, { useState } from 'react'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import { Toaster } from "react-hot-toast";

//comnponents
import HomePage from './components/HomePage';
import ClientForm from './components/ClientForm';
import Admin from './components/Admin';

//pages
import Login from './pages/Login/Login'



const App = () => {

  const [showLogin,setShowLogin] = useState(false);


  return (
    <>
      <Router>
      {/* Render Login as a modal if showLogin is true */}
      {showLogin && <Login setShowLogin={setShowLogin} />}

    <Routes>
    <Route path="/" element={<HomePage setShowLogin={setShowLogin} />} />
    <Route path="/client-form" element={< ClientForm/>} />
    <Route path="/admin-panel" element={< Admin/>} />
    </Routes>
    <Toaster />
   </Router>
    </>
   
  )
}

export default App
