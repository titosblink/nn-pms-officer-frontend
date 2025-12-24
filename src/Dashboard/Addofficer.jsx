import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Addofficer() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Load user
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      navigate("/");
      return;
    }
    setUser(JSON.parse(savedUser));
  }, [navigate]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  // Form state
  const [form, setForm] = useState({
    surname: "",
    firstname: "",
    othername: "",
    gender: "",
    religion: "",
    serviceNumber: "",
    state: "",
    lga: "",
    passport: null,
  });

  const [passportPreview, setPassportPreview] = useState(null);
  const [lgas, setLgas] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // States & LGAs (abbreviated for brevity)
  const statesWithLgas = {
    Lagos: ["Ikeja", "Surulere", "Epe", "Badagry", "Apapa"],
    Abuja: ["Abaji", "Bwari", "Gwagwalada", "Kuje", "Kwali", "Municipal"],
    // Add all other states as before
  };

  // Handle input change
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Handle passport file
  const handlePassport = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, passport: file });
    if (file) setPassportPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      if (passportPreview) URL.revokeObjectURL(passportPreview);
    };
  }, [passportPreview]);

  // Load LGAs when state changes
  const handleStateChange = (e) => {
    const state = e.target.value;
    setForm({ ...form, state, lga: "" });
    setLgas(statesWithLgas[state] || []);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requiredFields = ["surname", "firstname", "gender", "serviceNumber", "state", "lga", "passport"];
    for (let field of requiredFields) {
      if (!form[field]) {
        alert(`Please fill ${field}`);
        setLoading(false);
        return;
      }
    }

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => formData.append(key, form[key]));

      const response = await axios.post("http://localhost:5000/api/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const savedOfficer = response.data.data;
      setSuccess(true);

      setForm({
        surname: "",
        firstname: "",
        othername: "",
        gender: "",
        religion: "",
        serviceNumber: "",
        state: "",
        lga: "",
        passport: null,
      });

      setPassportPreview(savedOfficer.passportUrl);
    } catch (err) {
      console.error(err);
      alert("Error saving record.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">Add Officer</h1>
        {user && (
          <div className="flex items-center gap-4">
            <span>Welcome, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto py-10 px-4">
        {success && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded shadow">
            Record saved successfully!
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block mb-1 font-medium">Surname *</label>
              <input
                type="text"
                name="surname"
                value={form.surname}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">First Name *</label>
              <input
                type="text"
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Other Name</label>
              <input
                type="text"
                name="othername"
                value={form.othername}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Gender *</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">-- Select Gender --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Religion</label>
              <select
                name="religion"
                value={form.religion}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">-- Select Religion --</option>
                <option>Christianity</option>
                <option>Islam</option>
                <option>Traditional</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Service Number *</label>
              <input
                type="text"
                name="serviceNumber"
                value={form.serviceNumber}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">State of Origin *</label>
              <select
                name="state"
                value={form.state}
                onChange={handleStateChange}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">-- Select State --</option>
                {Object.keys(statesWithLgas).map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Local Government Area *</label>
              <select
                name="lga"
                value={form.lga}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">-- Select LGA --</option>
                {lgas.map((lga, i) => (
                  <option key={i} value={lga}>
                    {lga}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Passport *</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePassport}
                className="w-full border px-3 py-2 rounded"
              />
              {passportPreview && (
                <img
                  src={passportPreview}
                  alt="Passport"
                  className="mt-2 w-32 h-32 object-cover rounded border"
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Saving..." : "Submit Record"}
          </button>
        </form>
      </main>
    </div>
  );
}
