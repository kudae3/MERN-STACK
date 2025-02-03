import { NavLink, Outlet } from "react-router"

function App() {
  return (
    <>
      <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
        </ul>
        <div>
          <Outlet/>
        </div>
      </nav>
    </>
  )
}

export default App
