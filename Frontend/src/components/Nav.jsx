import { NavLink, useNavigate } from "react-router"
import { useContext, useState } from "react"
import { AuthContext } from "../contexts/AuthContext";
import api from "../../axios.config";
import Modal from "./Modal";

function Nav() {
  
  let {user, dispatch} = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let navigate = useNavigate();
  
  const handleLogout = async() => {
    try {
      await api.post('api/users/logout');
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
        <h1 className="font-bold text-2xl lg:text-3xl text-orange-400 tracking-wider">
          <NavLink to="/">
            Recipefy
          </NavLink>
        </h1>
      </div>
      <ul className="flex space-x-5">
        <li>
          <NavLink
            to="/" 
            className={({isActive}) => isActive ? 'text-teal-400 font-semibold underline decoration-orange-500 decoration-2 underline-offset-8': 'text-teal-400 font-semibold'} >
            Home
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
          !!user && (
            <>
              <li>
                <NavLink 
                  to="/create" 
                  className={({isActive}) => isActive ? 'text-teal-400 font-semibold underline decoration-orange-500 decoration-2 underline-offset-8': 'text-teal-400 font-semibold'} >
                  Create
                </NavLink>
              </li>
              <li>
                  <p className="text-teal-400 font-semibold">{user && user.user.name}</p>
              </li>
              <li>
                <button onClick={()=>setIsModalOpen(true)} className="text-teal-400 font-semibold">Logout</button>
              </li>
            </>
          )
        }
      </ul>
    </nav>
    <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          handleLogout();
          setIsModalOpen(false);
        }}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
      />
  </div>
  )
}

export default Nav
