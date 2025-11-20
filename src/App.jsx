import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      setLoading(false);
      setMessage(res.data.message);

      // Save token + user in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirect to home page
      navigate("/home");

    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Something went wrong. Try again.");
      }
    }
  };

  return (
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

          <center>{message && <span class="right badge badge-danger">{message}</span>}</center>
          <br/>

          <form onSubmit={handleLogin}>
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="input-group mb-3">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Sign In"}
              </button>
            </div>
          </form>

          <p className="mb-1">
            <a href="#">I forgot my password</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
