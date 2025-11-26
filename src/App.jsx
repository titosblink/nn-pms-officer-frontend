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

  // 🌐 Replace this with your actual backend URL
  const BACKEND_URL = "https://nn-pms-officers-2dd5ac29e658.herokuapp.com/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(`${BACKEND_URL}/auth/login`, {
        email,
        password,
      });

      setLoading(false);
      setMessage(res.data.message || "Login successful!");

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
    <div>
      <div id="app">
        <section className="section">
          <div className="container mt-5">
            <div className="row">
              <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                <div className="card card-primary">
                  <br />
                  <center>
                    <img
                      src="/assets/images/navylogo.png"
                      alt="Nigerian Navy Logo"
                      className="navy-logo"
                      style={{ width: "70px", height: "auto" }}
                    />
                    <br />
                    <br />
                    <h3>Personnel Mgt System</h3>
                  </center>

                  <div className="card-body">
                    <form
                      method="POST"
                      action="#"
                      className="needs-validation"
                      noValidate
                      onSubmit={handleLogin}
                    >
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="form-control"
                          name="email"
                          tabIndex={1}
                          autoFocus
                        />
                        <div className="invalid-feedback">
                          Please fill in your email
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="d-block">
                          <label htmlFor="password" className="control-label">
                            Password
                          </label>
                          <div className="float-right">
                            <a href="#" className="text-small">
                              Forgot Password?
                            </a>
                          </div>
                        </div>
                        <input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control"
                          name="password"
                          tabIndex={2}
                          required
                        />
                        <div className="invalid-feedback">
                          Please fill in your password
                        </div>
                      </div>

                      <div className="form-group">
                        <button
                          style={{
                            backgroundColor: "#001f3f",
                            borderColor: "#001f3f",
                          }}
                          type="submit"
                          className="btn btn-primary btn-lg btn-block"
                          tabIndex={4}
                          disabled={loading}
                        >
                          {loading ? "Logging in..." : "Sign In"}
                        </button>
                      </div>
                    </form>

                    {message && (
                      <div className="alert alert-danger alert-dismissible show fade">
                        <div className="alert-body">
                          <button className="close" data-dismiss="alert">
                            <span>&times;</span>
                          </button>
                          {message}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
