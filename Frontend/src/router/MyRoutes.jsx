import { Navigate, Route, Routes } from "react-router"
import App from '../App.jsx';
import Home from '../pages/Home.jsx'
import Create from '../pages/Create.jsx';
import SignUp from '../pages/SignUp.jsx';
import Login from '../pages/Login.jsx';
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";

function MyRoutes() {
  const {user} = useContext(AuthContext);
  return (
    <div>
        <Routes>
          <Route path="/" element={<App />}>
              <Route index element={<Home/>}></Route>
              <Route path='/create' element={ user ? <Create/> : <Navigate to="/login" /> }></Route>
              <Route path='/edit/:id' element={<Create/>}></Route>
              <Route path='/signup' element={ !user ? <SignUp/> : <Navigate to="/" /> }></Route>
              <Route path='/login' element={ !user ? <Login/> : <Navigate to="/" /> }></Route>
          </Route>
      </Routes>
    </div>
  )
}

export default MyRoutes
