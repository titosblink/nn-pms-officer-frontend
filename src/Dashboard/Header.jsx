export default function Header({ user, handleLogout }) {
    return (
        <>


            <nav className="navbar navbar-expand-lg main-navbar sticky">
                <h5>Nigerian Navy Personnel Management System</h5>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <ul className="navbar-nav ms-auto">
                    <li className="dropdown">
                        <a
                            href="#"
                            data-toggle="dropdown"
                            className="nav-link dropdown-toggle nav-link-lg nav-link-user"
                        >
                            <img
                                alt="image"
                                src="assets/img/user.png"
                                className="user-img-radious-style"
                            />
                        </a>

                        <div className="dropdown-menu dropdown-menu-right pullDown">
                            <div className="dropdown-title">Hello {user?.name}</div>

                            <a className="dropdown-item has-icon">
                                <i className="far fa-user" /> Profile
                            </a>

                            <a className="dropdown-item has-icon">
                                <i className="fas fa-bolt" /> Activities
                            </a>

                            <a className="dropdown-item has-icon">
                                <i className="fas fa-cog" /> Settings
                            </a>

                            <div className="dropdown-divider" />

                            <a
                                href="#"
                                onClick={handleLogout}
                                className="dropdown-item has-icon text-danger"
                            >
                                <i className="fas fa-sign-out-alt" /> Logout
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    );
}
