import { Routes, Route, Link } from "react-router-dom";
import  Home  from './pages/Home.jsx'
import  Login  from './pages/Login.jsx'
import  Signup  from './pages/Signup.jsx'
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer.jsx"; 
import './App.css'

function App() {

  return (
    <>
    <Navbar/>

    <Routes>
      <Route path = "/" element = {<Home />}/>
      <Route path = "/login" element = {<Login />}/>
      <Route path = "/signup" element = {<Signup />}/>
      <Route path = "/dashboard" element = {<Dashboard />}/>
    </Routes>
    <Footer />
    </>
  )
}

export default App
