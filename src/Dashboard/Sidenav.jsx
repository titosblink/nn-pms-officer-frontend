export default function Sidenav() {
  return (
    <div className="main-sidebar sidebar-style-2">
      <aside id="sidebar-wrapper">
        <div className="sidebar-brand">
          <Link href="/home">
          <br/>
            <img src="/assets/images/navylogo.png" className="header-logo" alt="logo" style={{ width: "60px", height: "80px", filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.6))" }}/>
          </Link>
        </div>

        <br/><br/><br/>

        <ul className="sidebar-menu">
          <li className="dropdown active">
            <Link href="/home" className="nav-link">
              <i data-feather="monitor" />
              <span>Dashboard</span>
            </Link>
          </li>

          <li className="dropdown">
            <Link to="/officers" className="nav-link">
              <i data-feather="user" />
              <span>Officers</span>
            </Link>
          </li>
        </ul>
      </aside>
      
    </div>
  );
}
