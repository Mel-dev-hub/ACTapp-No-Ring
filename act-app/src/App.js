import './App.css';
import { Routes, Route } from "react-router-dom";
import Exercises from './pages/Exercises/Exercises';
import Diary from './pages/Diary/Diary';
import Values from './pages/Values/Values';

function App() {
  return (
    <div className="App">
        <Routes>
            <Route exact path='/' element={< Exercises />}></Route>
            <Route exact path='/diary' element={< Diary />}></Route>
            <Route exact path='/values' element={< Values />}></Route>
        </Routes>
    </div>
  );
}

export default App;
