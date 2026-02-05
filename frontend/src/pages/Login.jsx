import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/auth/login',{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        credentials:'include',
        body: JSON.stringify({email,password})
      })
      const data = await response.json()
      if(!response.ok){
        setError(data.message)
      }else{
        navigate('/')
      }

    } catch (error) {
      setError('Something went wrong')
      console.error(error)
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">

        
        <h2 className="text-2xl font-bold text-center mb-6">
          Welcome Back
        </h2>

        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>

   
        <div className="text-sm text-center mt-4 text-gray-500 space-y-2">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-black font-semibold hover:underline">
              Sign Up
            </Link>
          </p>

          <p>
            <span className="cursor-pointer hover:underline">
              Forgot password?
            </span>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Login
