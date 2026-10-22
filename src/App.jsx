import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Dashboard from './Dashboard'

function SignIn() {
  const navigate = useNavigate()

  return (
    <>
      <main className="app-main">
        <section className="app-section">
          <h1 className="app-title">Welcome to Myrna App</h1>
          <h2 className="app-subtitle">Make every peso count</h2>

          <div className="form-group">

            <label className="form-label">
            Email
            <input className="form-input" type="text" placeholder="Email"></input>
          </label>
          
          <label className="form-label">
            Password
            <input className="form-input" type="password" placeholder="Password"></input>
          </label>

          <div className="form-actions">
            <button className="form-button" onClick={() => navigate('/dashboard')}>Sign in</button>

            <div className="form-footer">
              <p className="form-footer-link"><a className='anchor' href="#">Sign up</a></p>
              <p className="form-footer-link"><a className='anchor'  href="#">Forgot Password</a></p>
            </div>
          </div>

          </div>
          
        </section>
      </main>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
