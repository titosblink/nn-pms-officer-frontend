import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

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
        navigate("/dashboard"); // redirect after login
      } else {
        setMessage("Login failed. Please check your credentials.");
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
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Nigerian Navy PMS</h2>

        {message && (
          <div
            className={`mb-4 p-2 rounded ${
              message.includes("successful") ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-900 text-white rounded hover:bg-blue-800"
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </p>
      </div>
    </div>
  );
}

export default App;
