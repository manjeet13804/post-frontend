import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp';
import Dashboard from './components/dashboard';
import Login from './components/Login';
import Create from './components/create';
import Blog from './components/Blog';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<Create />} />
          <Route path='blog/:id' element={<Blog/>}/>
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
