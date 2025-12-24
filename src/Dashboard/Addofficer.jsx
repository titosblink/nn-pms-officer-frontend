import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Sidenav from "./Sidenav";
import Footer from "./Footer";

export default function Addofficer() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      navigate("/");
      return;
    }
    setUser(JSON.parse(savedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const [form, setForm] = useState({
    surname: "",
    firstname: "",
    othername: "",
    gender: "",
    religion: "",
    serviceNumber: "",
    state: "",
    lga: "",
    passportUrl: "",
  });

  const [passportFile, setPassportFile] = useState(null);
  const [passportPreview, setPassportPreview] = useState(null);
  const [lgas, setLgas] = useState([]);
  const [success, setSuccess] = useState(false);

  // Example of states with LGAs
  const statesWithLgas = {
    Lagos: ["Ikeja", "Epe", "Surulere"],
    Ogun: ["Abeokuta North", "Abeokuta South"],
    FCT: ["Abaji", "Bwari", "Kuje"],
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setForm({ ...form, state, lga: "" });
    setLgas(statesWithLgas[state] || []);
  };

  const handlePassport = (e) => {
    const file = e.target.files[0];
    setPassportFile(file);
    if (file) setPassportPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      if (passportPreview) URL.revokeObjectURL(passportPreview);
    };
  }, [passportPreview]);

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "officers-nnpms"); // Replace with your Cloudinary preset
    const res = await axios.post("https://api.cloudinary.com/v1_1/dpswnndfc/image/upload", data);
    return res.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ["surname", "firstname", "gender", "serviceNumber", "state", "lga"];
    for (let field of requiredFields) {
      if (!form[field]) {
        alert(`Please fill ${field}`);
        return;
      }
    }

    if (!passportFile) {
      alert("Please upload a passport image");
      return;
    }

    try {
      // Upload image to Cloudinary
      const uploadedUrl = await uploadToCloudinary(passportFile);

      // Send to backend
      const payload = { ...form, passportUrl: uploadedUrl };
      await axios.post("http://localhost:5000/api/register", payload);

      setSuccess(true);
      setForm({
        surname: "", firstname: "", othername: "", gender: "", religion: "",
        serviceNumber: "", state: "", lga: "", passportUrl: ""
      });
      setPassportFile(null);
      setPassportPreview(null);
    } catch (err) {
      console.error(err);
      alert("Error saving record.");
    }
  };

  return (
    <div className="bg-base-200 flex min-h-screen flex-col">
      <Header user={user} />
      <Sidenav handleLogout={handleLogout} />

      <div className="lg:ps-75 flex grow flex-col">
        <main className="mx-auto w-full max-w-[1280px] flex-1 grow space-y-6 p-6">
          <h4>Create Officer Record</h4>
          {success && <div className="alert alert-success">Record saved successfully!</div>}

          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>

                <div className="row">
                  <div className="col-md-4">
                    <label>Surname *</label>
                    <input type="text" name="surname" className="form-control" value={form.surname} onChange={handleChange} />
                  </div>

                  <div className="col-md-4">
                    <label>First Name *</label>
                    <input type="text" name="firstname" className="form-control" value={form.firstname} onChange={handleChange} />
                  </div>

                  <div className="col-md-4">
                    <label>Other Name</label>
                    <input type="text" name="othername" className="form-control" value={form.othername} onChange={handleChange} />
                  </div>

                  <div className="col-md-4">
                    <label>Gender *</label>
                    <select name="gender" className="form-control" value={form.gender} onChange={handleChange}>
                      <option value="">-- Select Gender --</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label>Religion</label>
                    <select name="religion" className="form-control" value={form.religion} onChange={handleChange}>
                      <option value="">-- Select Religion --</option>
                      <option>Christianity</option>
                      <option>Islam</option>
                      <option>Traditional</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label>Service Number *</label>
                    <input type="text" name="serviceNumber" className="form-control" value={form.serviceNumber} onChange={handleChange} />
                  </div>

                  <div className="col-md-4">
                    <label>State of Origin *</label>
                    <select className="form-control" value={form.state} onChange={handleStateChange}>
                      <option value="">-- Select State --</option>
                      {Object.keys(statesWithLgas).map(st => <option key={st} value={st}>{st}</option>)}
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label>Local Government Area *</label>
                    <select className="form-control" name="lga" value={form.lga} onChange={handleChange}>
                      <option value="">-- Select LGA --</option>
                      {lgas.map((lga, i) => <option key={i} value={lga}>{lga}</option>)}
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label>Passport *</label>
                    <input type="file" className="form-control" accept="image/*" onChange={handlePassport} />
                    {passportPreview && (
                      <img
                        src={passportPreview}
                        alt="Passport"
                        style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "10px", border: "1px solid #ccc", marginTop: "10px" }}
                      />
                    )}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary mt-3">Submit Record</button>
              </form>
            </div>
          </div>

        </main>
        <Footer />
      </div>
    </div>
  );
}
