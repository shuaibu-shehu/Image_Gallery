import './App.css';
import  SignIn  from './components/SignIn';
import { Routes, Route } from 'react-router';
import SignUp from './components/SignUp';
import Gallery from './components/Gallery';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/Gallery' element={<Gallery />} />
      </Routes>
    </div>
  )
}

export default App;
