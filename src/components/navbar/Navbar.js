import { Link, useNavigate } from "react-router-dom";
import { currentUser } from "../../App";
import { useAtom } from "jotai";


const Navbar = () => {
    const [user, setUser] = useAtom(currentUser);

    let navigate = useNavigate();

    function logout() {
        setUser(null);
        navigate("http://localhost:3000/")
        // Effettua il logout e rimuovi eventuali informazioni di autenticazione salvate
    }

    return (
        <>
            {user ? (
                // Passa user e logout come props
                <AuthenticatedNavbar user={user} logout={logout} />
            ) : (
                <UnauthenticatedNavbar />
            )}
        </>
    );
};

const UnauthenticatedNavbar = () => {
    return (
        <nav class="navbar navbar-expand-lg bg-light mb-4 sticky-top bg-dark bg-gradient">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item ms-5 p-3 fw-bold">
                            <Link class="text-white nav-link" to="/">All Restaurants</Link>
                        </li>
                    </ul>
                    <div class="d-flex">
                        <div class="text-white me-5 fw-bold">
                            <Link class="text-white nav-link" to="/login">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

const AuthenticatedNavbar = ({ user, logout }) => {
    return (
        <nav class="navbar navbar-expand-lg bg-light mb-4 sticky-top bg-dark bg-gradient">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item ms-5 p-3 fw-bold">
                            <Link class="text-white nav-link" to="/">All Restaurants</Link>
                        </li>
                    </ul>
                    <div class="d-flex">
                        <div class="text-white me-5 fw-bold">
                            Ciao, {user.mail}
                        </div>
                        <div class="text-white me-5 fw-bold">
                            <Link class="text-white nav-link" onClick={logout}>Logout</Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;