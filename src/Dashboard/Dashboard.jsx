import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Sidenav from "./Sidenav";
import Sidenav from "./Header";

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);

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

    // Close dropdown if clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (

        <>
            <div className="bg-base-200 flex min-h-screen flex-col">
                {/* Layout Navbar */}
                {/* ---------- HEADER ---------- */}
                < Header/>
                {/* Menu */}
                < Sidenav/>
                {/* / Menu */}
                {/* Layout Container */}
                <div className="lg:ps-75 flex grow flex-col">
                    {/* Content */}
                    <main className="mx-auto w-full max-w-[1280px] flex-1 grow space-y-6 p-6">
                        {/* Stats */}
                        <div className="shadow-base-300/10 rounded-box bg-base-100 flex gap-4 p-6 shadow-md max-xl:flex-col">
                            <Link href="#">
                                <div className="flex flex-1 gap-4 max-sm:flex-col">
                                    <div className="flex flex-1 flex-col gap-4">
                                        <div className="text-base-content flex items-center gap-2">
                                            <div className="avatar avatar-placeholder">
                                                <div className="bg-base-200 rounded-field size-9">
                                                    <span className="icon-[tabler--users] size-5" />
                                                </div>
                                            </div>
                                            <h5 className="text-lg font-medium">Officers</h5>
                                        </div>
                                        <div>
                                            <div className="text-base-content text-xl font-semibold">5,000</div>
                                            <div className="flex items-center gap-2 text-sm font-semibold">
                                                <span className="text-base-content/50 font-medium">Click to view</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider sm:divider-horizontal" />
                                </div>
                            </Link>
                        </div>
                    </main>
                    {/* / Content */}
                    {/* Footer: Start */}
                        <Footer/>
                    {/* Footer: End */}
                </div>
                {/* / Layout Container */}
            </div>


        </>
    );
}
