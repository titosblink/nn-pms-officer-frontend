import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="login-box">
        <div className="card card-outline card-primary">
          <img
            src="/dist/images/navylogo.png"
            alt="Nigerian Navy Logo"
            className="navy-logo"
          />
          <div className="card-header text-center">
            <a href="#" className="h1"><b>Nigerian Navy</b></a>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Personnel Management System</p>
            <form action="#" method="post">
              <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="Email" />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input type="password" className="form-control" placeholder="Password" />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <button type="submit" className="btn btn-primary btn-block">Sign In</button>
              </div>
            </form>

            <p className="mb-1">
              <a href="#">I forgot my password</a>
            </p>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
