import { useState } from "react"
import { Link, useNavigate } from "react-router"
import api from "../../axios.config";

function Login() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        let data = {email, password};
        await api.post('/users/login', data);
        navigate('/');
    } catch (e) {
        setErrors(e.response.data.errors)                
    }
  }

  return (
    <div className="border border-gray-200 p-8 rounded-md shadow-md container mx-auto max-w-md">
    
    <h2 className="text-teal-500 font-bold text-center text-2xl">Login to Recipefy</h2>
    
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">

      <div className="">
        <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>

        <input 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email" 
          id="email"
          name="email"
          className="mt-1 block w-full border rounded-md shadow-sm p-2 focus-within:outline-[0.5px] focus-within:outline-teal-400" 
      />
      {errors.email && <p className="text-red-600 text-xs font-semibold">{errors.email.msg}</p>}
      </div>

      <div className="relative">
          <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
            Password
          </label>

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"} 
            id="password"
            name="password"
            className="mt-1 block w-full border rounded-md shadow-sm p-2 focus-within:outline-[0.5px] focus-within:outline-teal-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} 
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-7"
          >
            {showPassword ? "🔒" : "🔓"} 
          </button>
      </div>
      <span>{errors.password && <p className="text-red-600 text-xs font-semibold">{errors.password.msg}</p>}</span>


      <div className="space-y-5">
        <button
          type="submit"
          className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-hidden"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-gray-500 sm:mt-0 space-x-2">
          <span>Do not have an account?</span>
          <Link to="/signup" className="text-gray-700 underline">Sing Up</Link>.
        </p>
      </div>
    </form>
  </div>
  )
}

export default Login
