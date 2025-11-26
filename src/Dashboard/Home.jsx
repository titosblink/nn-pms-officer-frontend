import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Header from "./Header";
import Sidenav from "./Sidenav";
import Footer from "./Footer";
// import "../App.css";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // LOAD USER
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      navigate("/");
      return;
    }

    setUser(JSON.parse(savedUser));
  }, [navigate]);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      {/* FULL-WIDTH HEADER */}
      <div className="navbar-bg" />
      <Header user={user} handleLogout={handleLogout} />

      {/* SIDENAV + CONTENT WRAPPER */}
      <div className="main-wrapper main-wrapper-1">

        {/* SIDENAV */}
        <Sidenav />

        {/* MAIN CONTENT */}
        <div className="main-content">
          <section className="section">
            <div className="section-body">
            <div className="row">

              {/* CARD 1 */}
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <div className="card">
                  <div className="card-statistic-4">
                    <div className="row">
                      <div className="col-lg-6 pt-3">
                        <div className="card-content">
                          <h5 className="font-15">Officers</h5>
                          <h2 className="mb-3 font-18">258</h2>
                          <p className="mb-0">
                            <span className="col-green"><Link to="/add-officer">Add officer</Link></span>
                          </p>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="banner-img">
                          <img src="assets/images/user.png" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add the other cards here... */}
</div>
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <Footer />
      </div>
    </>
  );
}
