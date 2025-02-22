import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router"
import api from "../../axios.config";
import { AuthContext } from "../contexts/AuthContext";

function Login() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();
  const {dispatch} = useContext(AuthContext);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        let data = {email, password};
        let user = await api.post('api/users/login', data);
        dispatch({type: "LOGIN", payload: user.data});
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
            {showPassword ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 font-bold">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 font-bold">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            )} 
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
