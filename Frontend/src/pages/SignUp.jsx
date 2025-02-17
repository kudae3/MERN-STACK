import { useContext, useState } from "react";
import api from "../../axios.config";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

function SignUp() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordMatch, setPasswordMatch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState([]);
  const {dispatch} = useContext(AuthContext);

  const navigate = useNavigate();

  let handleSubmit = async(e) => {
    e.preventDefault();
    try{
      if(password !== confirmPassword){
        setPasswordMatch(false);
        return;
      }
      let data = {name: username, email, password}
      let user = await api.post('/users/register', data);
      dispatch({type: "LOGIN", payload: user.data});
      navigate('/');
      
    } catch(e){
      setErrors(e.response.data.errors);
    }
  }

  return (
  <div className="border border-gray-200 p-8 rounded-md shadow-md container mx-auto max-w-md">
    
    <h2 className="text-teal-500 font-bold text-center text-2xl">Sign Up to Recipefy</h2>
    
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      
      <div className="">
        <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
          Username
        </label>

        <input 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text" 
          name="username"
          className="mt-1 block w-full border rounded-md shadow-sm p-2 focus-within:outline-[0.5px] focus-within:outline-teal-400" 
      />
      {errors.name && <p className="text-red-600 text-xs font-semibold">{errors.name.msg}</p>}
      </div>

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
            onClick={() => setShowPassword(!showPassword)} // Toggle the state
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-7"
          >
            {showPassword ? "🔒" : "🔓"} 
          </button>
      </div>
      <span>{errors.password && <p className="text-red-600 text-xs font-semibold">{errors.password.msg}</p>}</span>

      <div className="relative">
          <label className="block text-sm font-medium text-gray-700">
            Password Confirmation
          </label>

          <input
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              if(password !== e.target.value){
                setPasswordMatch(false)
              }
              else{
                setPasswordMatch(true);
              }
            }}
            type={showConfirmPassword ? "text" : "password"} 
            id="confirm-password"
            name="confirm-password"
            className="mt-1 block w-full border rounded-md shadow-sm p-2 focus-within:outline-[0.5px] focus-within:outline-teal-400"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-7"
          >
            {showConfirmPassword ? "🔒" : "🔓"} 
          </button>
      </div>
      <span>{ password && !passwordMatch && <p className="text-red-600 text-xs font-semibold">Passwords do not match</p>}</span>


      <div className="col-span-6">
        <p className="text-sm text-gray-500">
          By creating an account, you agree to our
          <a href="#" className="text-gray-700 underline"> terms and conditions </a>
          and
          <a href="#" className="text-gray-700 underline">privacy policy</a>.
        </p>
      </div>

      <div className="space-y-5">
        <button
          type="submit"
          className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-hidden"
        >
          Create an account
        </button>

        <p className="mt-4 text-sm text-gray-500 sm:mt-0 space-x-2">
          <span>Already have an account?</span>
          <Link to="/login" className="text-gray-700 underline">Log in</Link>.
        </p>
      
      </div>
    </form>
  </div>
  )
}

export default SignUp;


