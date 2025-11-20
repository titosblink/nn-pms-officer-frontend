import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Officers() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      navigate("/");   // redirect if no session
      return;
    }

    setUser(JSON.parse(savedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Officers Page</h1>

        {user && (
          <p style={styles.welcome}>Welcome, {user.name}</p>
        )}

        {/* Back to Home */}
        <button style={styles.backBtn} onClick={() => navigate("/home")}>
          Back to Home
        </button>

        {/* Logout Button */}
        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
  },
  card: {
    padding: "30px",
    width: "400px",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
  },
  welcome: {
    marginBottom: "20px",
    fontSize: "18px",
  },
  backBtn: {
    padding: "12px",
    width: "100%",
    fontSize: "16px",
    background: "#00306e",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  logoutBtn: {
    padding: "12px",
    width: "100%",
    fontSize: "16px",
    background: "#900000",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  },
};
