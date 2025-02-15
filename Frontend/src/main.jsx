import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'
import App from './App';
import Home from './pages/Home.jsx'
import Create from './pages/Create.jsx';
import SignUp from './pages/SignUp.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
          <Route index element={<Home/>}></Route>
          <Route path='/create' element={<Create/>}></Route>
          <Route path='/edit/:id' element={<Create/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>,
)
