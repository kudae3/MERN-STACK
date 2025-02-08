import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'
import App from './App';
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Create from './pages/Create.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
          <Route index element={<Home/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/create' element={<Create/>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>,
)
