import { NavLink } from "react-router"

function Nav() {
  return (
    <div className="bg-gray-700">
    <nav className="flex justify-between items-center p-5 text-white md:max-w-xl lg:max-w-5xl mx-auto">
      <div>
        <h1 className="font-bold text-2xl lg:text-3xl text-orange-400">Recipefy</h1>
      </div>
      <ul className="flex space-x-5">
        <li>
          <NavLink
            to="/" 
            className={({isActive}) => isActive ? 'text-teal-400 text-lg font-bold underline decoration-orange-500 decoration-2 underline-offset-8': 'text-teal-400 text-lg font-bold'} >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/about" 
            className={({isActive}) => isActive ? 'text-teal-400 text-lg font-bold underline decoration-orange-500 decoration-2 underline-offset-8': 'text-teal-400 text-lg font-bold'} >
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  </div>
  )
}

export default Nav
