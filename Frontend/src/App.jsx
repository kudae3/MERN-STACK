import { Outlet } from "react-router"
import Nav from "./components/Nav"

function App() {
  return (
    <>
      <Nav/>
      <div className="p-5 mb-10 bg-[#fdfdfd]">
        <Outlet/>
      </div>
        
    </>
  )
}

export default App
