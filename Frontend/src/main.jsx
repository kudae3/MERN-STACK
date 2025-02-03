import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'
import App from './App';
import Home from './components/Home.jsx';
import About from './components/About.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
          <Route index element={<Home/>}></Route>
          <Route path='/about' element={<About/>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>,
)
