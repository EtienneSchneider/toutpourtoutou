import "./NavBar.scss";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext.jsx";

const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { setIsAuthentificated, isAuthentificated } = useAppContext();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        navigate("/login");
        setIsAuthentificated(false);
    };

    return (
        <nav className="bg-white">
            <img src="/toutpourtoutou.svg" alt="logo" />
            <ul className="col-gray">
                <li>
                    <NavLink
                        reloadDocument
                        to={"/dashboard"}
                        isActive={() =>
                            location.pathname.includes("/dashboard")
                        }
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        <span className="material-symbols-outlined">
                            grid_view
                        </span>
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={"/products"}
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        <span className="material-symbols-outlined">
                            package_2
                        </span>
                        Produits
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={"/articles"}
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        <span className="material-symbols-outlined">
                            article
                        </span>
                        Articles
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={"/forum"}
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        <span className="material-symbols-outlined">Forum</span>
                        Forum
                    </NavLink>
                </li>
                <li>
                    {isAuthentificated && (
                        <button className="logout" onClick={handleLogout}>
                            Déconnexion
                            <span className="material-symbols-outlined">logout</span>
                        </button>
                    )}
                </li>
            </ul>
            
        </nav>
    );
};

export default NavBar;
