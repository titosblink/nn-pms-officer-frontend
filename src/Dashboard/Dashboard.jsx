import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Sidenav from "./Sidenav";

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
                <div className="bg-base-100 border-base-content/20 lg:ps-75 sticky top-0 z-50 flex border-b">
                    <div className="mx-auto w-full max-w-7xl">
                        <nav className="navbar py-2">
                            <div className="navbar-start items-center gap-2">
                                <button type="button" className="btn btn-soft btn-square btn-sm lg:hidden" aria-haspopup="dialog" aria-expanded="false" aria-controls="layout-sidebar" data-overlay="#layout-sidebar">
                                    <span className="icon-[tabler--menu-2] size-4.5" />
                                </button>
                                {/* Search  */}
                                <div className="input no-focus border-0 px-0">
                                    <span className="icon-[tabler--search] text-base-content/80 my-auto me-2 size-4 shrink-0" />
                                    <input type="search" className="grow placeholder:text-sm" placeholder="Type to Search..." id="kbdInput" />
                                    <label className="sr-only" htmlFor="kbdInput">Search</label>
                                </div>
                            </div>
                            <div className="navbar-end items-end gap-6">
                                {/* GitHub Button */}
                                <div className="max-md:hidden">
                                    <Link className="github-button" href="#" data-icon="octicon-star" data-size="large" data-show-count="true">Welcome</Link>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
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
