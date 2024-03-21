import "./NavBar.scss";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="bg-white">
            <ul className="col-gray">
                <li>
                    <NavLink
                        to={"/"}
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
            </ul>
        </nav>
    );
};

export default NavBar;
