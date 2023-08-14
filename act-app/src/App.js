import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home/Home';
import Exercises from './pages/Exercises/Exercises';
import Diary from './pages/Diary/Diary';
import Values from './pages/Values/Values';
import AcessDenied from './pages/AcessDenied/AccessDenied';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import "./css/common.css";

function App() {
  const { user } = useContext(UserContext);

  // useEffect(() => {
  //   console.log("App opened");
  // }, []);

  return (
    <div className="App">
      <Routes>
          <Route path="/" element={user ? <Home/> : <Navigate to='/accessdenied'/>}/>
          <Route exact path='/exercises' element={user ? <Exercises/> : <Navigate to='/accessdenied'/>}/>
          <Route exact path='/diary' element={user ? <Diary/> : <Navigate to='/accessdenied'/>}/>
          <Route exact path='/values' element={user ? <Values/> : <Navigate to='/accessdenied'/>}/>
          <Route exact path='/accessdenied' element={< AcessDenied />}></Route>
      </Routes>
    </div>
  );
}

export default App;
