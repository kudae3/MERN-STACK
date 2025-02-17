import { NavLink, useNavigate } from "react-router"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext";
import api from "../../axios.config";

function Nav() {
  
  let {user, dispatch} = useContext(AuthContext);

  let navigate = useNavigate();
  
  const logout = async() => {
    try {
      await api.post('/users/logout');
      navigate('/login');
      dispatch({type: "LOGOUT", payload: null});
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div className="bg-gray-700">
    <nav className="flex justify-between items-center p-5 text-white md:max-w-xl lg:max-w-5xl mx-auto">
      <div>
        <h1 className="font-bold text-2xl lg:text-3xl text-orange-400 tracking-wider">Recipefy</h1>
      </div>
      <ul className="flex space-x-5">
        <li>
          <NavLink
            to="/" 
            className={({isActive}) => isActive ? 'text-teal-400 font-semibold underline decoration-orange-500 decoration-2 underline-offset-8': 'text-teal-400 font-semibold'} >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/create" 
            className={({isActive}) => isActive ? 'text-teal-400 font-semibold underline decoration-orange-500 decoration-2 underline-offset-8': 'text-teal-400 font-semibold'} >
            Create
          </NavLink>
        </li>
        {
          !user && (
            <>
              <li>
                <NavLink 
                  to="/signup" 
                  className={({isActive}) => isActive ? 'text-teal-400 font-semibold underline decoration-orange-500 decoration-2 underline-offset-8': 'text-teal-400 font-semibold'} >
                  Sign up
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/login" 
                  className={({isActive}) => isActive ? 'text-teal-400 font-semibold underline decoration-orange-500 decoration-2 underline-offset-8': 'text-teal-400 font-semibold'} >
                  Login
                </NavLink>
              </li>
            </>
          )
          
        }
        {
          user && (
            <>
              <li>
                <NavLink 
                  to="/profile" 
                  className={({isActive}) => isActive ? 'text-teal-400 font-semibold underline decoration-orange-500 decoration-2 underline-offset-8': 'text-teal-400 font-semibold'} >
                  {user && user.user.name}
                </NavLink>
              </li>
              <li>
                <button onClick={logout} className="text-teal-400 font-semibold">Logout</button>
              </li>
            </>
          )
        }
      </ul>
    </nav>
  </div>
  )
}

export default Nav
