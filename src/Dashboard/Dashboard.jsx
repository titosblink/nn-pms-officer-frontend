//src/Dashboard/Dashboard.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Example officer count
  const officersCount = 5000;

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
            <Link className="github-button" href="https://github.com/themeselection/flyonui" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star themeselection/flyonui on GitHub">Star</Link>
          </div>
          {/* Profile Dropdown */}
          <div className="dropdown relative inline-flex [--offset:21]">
            <button id="profile-dropdown" type="button" className="dropdown-toggle avatar" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
              <span className="rounded-field size-9.5">
                <img src="assets/img/avatars/2.png" alt="User Avatar" />
              </span>
            </button>
            <ul className="dropdown-menu dropdown-open:opacity-100 max-w-75 hidden w-full space-y-0.5" role="menu" aria-orientation="vertical" aria-labelledby="profile-dropdown">
              <li className="dropdown-header pt-4.5 mb-1 gap-4 px-5 pb-3.5">
                <div className="avatar avatar-online-top">
                  <div className="w-10 rounded-full">
                    <img src="assets/img/avatars/2.png" alt="avatar" />
                  </div>
                </div>
                <div>
                  <h6 className="text-base-content mb-0.5 font-semibold">OC Aluu</h6>
                  <p className="text-base-content/80 font-medium">Lieutenant</p>
                </div>
              </li>
              <li>
                <Link className="dropdown-item px-3" href="#">
                  <span className="icon-[tabler--settings] size-5" />
                  Change Password
                </Link>
              </li>
              <li>
                <hr className="border-base-content/20 -mx-2 my-1" />
              </li>
              <li className="dropdown-footer p-2 pt-1">
                <Link className="btn btn-text btn-error btn-block h-11 justify-start px-3 font-normal" href="#">
                  <span className="icon-[tabler--logout] size-5" />
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
  {/* Menu */}
  <aside id="layout-sidebar" className="overlay overlay-open:translate-x-0 drawer drawer-start sm:w-75 inset-y-0 start-0 hidden h-full [--auto-close:lg] lg:z-50 lg:block lg:translate-x-0 lg:shadow-none" aria-label="Sidebar" tabIndex={-1}>
    <div className="drawer-body border-base-content/20 h-full border-e p-0">
      <div className="flex h-full max-h-full flex-col">
        <button type="button" className="btn btn-text btn-circle btn-sm absolute end-3 top-3 lg:hidden" aria-label="Close" data-overlay="#layout-sidebar">
          <span className="icon-[tabler--x] size-4.5" />
        </button>
        <div className="text-base-content border-base-content/20 flex flex-col items-center gap-4 border-b px-4 py-6">
          <div className="avatar">
            <div className="size-17 rounded-full">
              <img src="assets/img/avatars/2.png" alt="avatar" />
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-base-content text-lg font-semibold">OC Aluu</h3>
            <p className="text-base-content/80">aluu.nn4545@navy.mil.ng</p>
          </div>
          <div className="flex gap-3">
            Administrator
          </div>
        </div>
        <div className="h-full overflow-y-auto">
          <ul className="accordion menu menu-sm gap-1 p-3">
            {/* Accordion Menu Item (Level 0) */}
            <li className="active accordion-item" id="dashboard">
              <button className="accordion-toggle accordion-item-active:bg-neutral/10 inline-flex w-full items-center p-2 text-start text-sm font-normal" aria-controls="dashboard-collapse-dashboard" aria-expanded="true">
                <span className="icon-[tabler--dashboard] size-4.5" />
                <span className="grow">Dashboard</span>
              </button>
            </li>
            {/* Section Divider */}
            <li className="text-base-content/50 before:bg-base-content/20 mt-2 p-2 text-xs uppercase before:absolute before:-start-3 before:top-1/2 before:h-0.5 before:w-2.5">Pages</li>
            {/* Accordion Menu Item (Level 0) */}
            <li className="accordion-item" id="account-settings">
              <button className="accordion-toggle accordion-item-active:bg-neutral/10 inline-flex w-full items-center p-2 text-start text-sm font-normal">
                <span className="icon-[tabler--users] size-4.5" />
                <span className="grow">Officers</span>
              </button>
            </li>                
          </ul>
        </div>
      </div>
    </div>
  </aside>
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
    <footer className="mx-auto w-full max-w-[1280px] px-6 py-3.5 text-sm">
      <div className="flex items-center justify-between gap-3 max-lg:flex-col">
        <p className="text-base-content text-center">
          ©2025
          <Link href="https://flyonui.com/" className="text-primary">Nigerian Navy</Link>
        </p>
        <div className="justify-enter flex items-center gap-4 max-sm:flex-col">
          <Link href="#" className="link link-primary link-animated font-normal" aria-label="More Templates" target="_blank">Designed by OC Aluu</Link>
        </div>
      </div>
    </footer>
    {/* Footer: End */}
  </div>
  {/* / Layout Container */}
</div>


   </>
  );
}
