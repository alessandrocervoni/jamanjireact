import { currentUser } from "../../App";
import { useRef  } from "react"
import { atom, useAtom } from 'jotai';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';


export default function Login()
{
    const [user, setUser] = useAtom(currentUser);
    const emailIn = useRef(null);
    const pwIn = useRef(null);

    let navigate = useNavigate();

    function handleLogin()
    {
        const requestBody = 
        {
            mail: emailIn.current.value,
            password: pwIn.current.value
        };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

            if (!emailRegex.test(requestBody.mail)) 
            {
                alert('Inserisci un indirizzo email valido.');
                return;
            }

            // Validazione della password per robustezza
            if (!passwordRegex.test(requestBody.password)) 
            {
                alert('La password deve contenere almeno 8 caratteri, una lettera minuscola, una lettera maiuscola e un numero.');
                return;
            }

         
        axios.post("/userlogin", requestBody)
            .then(response =>{
                if(response.data) 
                {
                    setUser(response.data);

                    navigate("/allRestaurants")
                }
                else
                {
                    alert('Email e/o Password non validi.');
                }
            })

            .catch((error) => {
                console.error('Errore durante il Login:', error);
                alert('Si è verificato un errore durante il Login. Riprova più tardi.');
            });
        }

        return (
            <>
        <div style={{ minHeight: '100vh', backgroundImage: `url('http://localhost:3000/Sfondo.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="row justify-content-center">
                <div className="col-6">
                    <form>
                        <br>
                        </br>
                        <br>
                        </br>
                        <br>
                        </br>
                        <div className="form-group mt-5 mb-3 text-dark">
                            <label>Email:</label>
                            <input type="text" ref={emailIn} className="form-control" placeholder="Email" required />
                        </div>
                        <div className="form-group mb-4 text-dark">
                            <label>Password:</label>
                            <input type="password" ref={pwIn} className="form-control" placeholder="Password" required />
                        </div>
                        <div className="d-grid gap-2 col-6 mx-auto mb-2">
                            <button className="btn btn-dark btn-block" type="button" onClick={handleLogin}>Login</button>
                        </div>
                        <div className="d-grid gap-2 col-6 mx-auto">
                            <Link className="btn btn-dark btn-block" to="/registration">Register here</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
);
}
            


    
 