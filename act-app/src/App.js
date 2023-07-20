import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Exercises from './pages/Exercises/Exercises';
import Diary from './pages/Diary/Diary';
import Values from './pages/Values/Values';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route exact path='/' element={< Home />}></Route>
          <Route exact path='/exercises' element={< Exercises />}></Route>
          <Route exact path='/diary' element={< Diary />}></Route>
          <Route exact path='/values' element={< Values />}></Route>
      </Routes>
    </div>
  );
}

export default App;
