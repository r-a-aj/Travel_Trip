import {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import {Context} from '../Context/context'
import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const {login} = useContext(Context)
  const history = useHistory()

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const response = await axios.post('https://apis.ccbp.in/login', {
        username,
        password,
      })
      if (response.data.success) {
        login()
        history.push('/home')
      } else {
        setError(response.data.message)
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleUsernameChange = e => {
    const {value} = e.target
    const regex = /^[A-Za-z]*$/ // Only allows alphabetic characters
    if (regex.test(value)) {
      setUsername(value)
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2 className="login-title">Travel Trip</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="form-input"
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
