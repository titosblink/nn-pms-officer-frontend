import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
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
      // Optional: ping test to check backend
      await axios.get(`${BACKEND_URL}/ping`).catch(() => {
        throw new Error("Backend not reachable");
      });

      const res = await axios.post(`${BACKEND_URL}/auth/login`, { email, password });

      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setMessage("Login successful!");
        navigate("/dashboard");
      } else {
        setMessage("Login failed. Check credentials.");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || err.message || "No response from server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleLogin}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">{loading ? "Logging in..." : "Login"}</button>
      </form>
    </div>
  );
}

export default LoginPage;
