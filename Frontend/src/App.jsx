import { Outlet } from "react-router"
import Nav from "./components/Nav"

function App() {
  return (
    <>
      <Nav/>
      <div className="p-4 bg-gray-300 h-screen">
        <Outlet/>
      </div>
        
    </>
  )
}

export default App
