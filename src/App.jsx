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

  const BACKEND_URL = "https://nn-pms-officers-2dd5ac29e658.herokuapp.com";

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(`${BACKEND_URL}/auth/login`, { email, password });

      setLoading(false);

      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        setMessage("Login successful!");
        navigate("/home");
      } else {
        setMessage("Login failed. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);
      } else if (err.request) {
        setMessage("No response from server. Check your backend.");
      } else {
        setMessage("Something went wrong. Try again.");
      }
    }
  };

  return (
    <div className="app">
      <section className="section">
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-md-6 col-lg-4">
              <div className="card card-primary p-4">
                <div className="text-center mb-3">
                  <img
                    src="/assets/images/navylogo.png"
                    alt="Nigerian Navy Logo"
                    className="navy-logo"
                    style={{ width: "70px", height: "auto" }}
                  />
                  <h3 className="mt-2">Personnel Mgt System</h3>
                </div>

                <form onSubmit={handleLogin} className="needs-validation" noValidate>
                  <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="form-control"
                      autoFocus
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="form-control"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                    style={{ backgroundColor: "#001f3f", borderColor: "#001f3f" }}
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Sign In"}
                  </button>
                </form>

                {message && (
                  <div className={`alert mt-3 ${message.includes("successful") ? "alert-success" : "alert-danger"}`}>
                    {message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
