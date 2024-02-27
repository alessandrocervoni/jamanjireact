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
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item ms-5 p-3 fw-bold">
                        <Link className="text-white nav-link" to="/">All Restaurants</Link>
                    </li>
                    {/* <li class="nav-item p-3 fw-bold position-absolute top-50 start-50 translate-middle">
                        <Link className="nav-link disabled" to="/AllGuildQuests">My Quests</Link>
                    </li> */}
                    <li class="nav-item p-3 me-3 position-absolute top-25 end-0 fw-bold">
                        <Link class="text-white nav-link" to="/login">Login</Link>
                    </li>
                </ul>
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
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item ms-5 p-3 fw-bold">
                        <Link class="text-white nav-link" to="/">All Restaurants</Link>
                    </li>
                    {/* <li class="nav-item ms-5 p-3 fw-bold">
                        <Link className="text-white nav-link" to="/MyQuestsAwaitingPage">Available Quests</Link>
                    </li> */}
                    {/* <li class="nav-item p-3 fw-bold position-absolute top-50 start-50 translate-middle">
                        <Link class="text-white nav-link" to="/AllGuildQuests">My Quests</Link>
                    </li> */}
                    <li class="text-white nav-item p-4 me-5 position-absolute top-25 end-0 fw-bold">
                        Ciao {user.email}
                    </li>
                    <li class="nav-item p-3 me-3 position-absolute top-25 end-0 fw-bold">
                        <button onClick={logout}> Logout </button>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;