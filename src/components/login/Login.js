import { currentUser } from "../../App";
import { useRef  } from "react"
import { atom, useAtom } from 'jotai';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


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
            if (!passwordRegex.test(requestBody.password)) {
                alert('La password deve contenere almeno 8 caratteri, una lettera minuscola, una lettera maiuscola e un numero.');
                return;
            }

         
        axios.post("/userlogin", requestBody)
            .then(response =>{
                if(response.data) 
                {
                    setUser(response.data);

                    navigate("/")
                } 
                else
                {
                    alert('Email e/o Password non validi.');
                }

            })


        }

    return(
        <>
            <div className="container">
                <div className="row justify-content-center mb-4">
                <div className="col-md-6 ">
                    <h2 className="text-center mb-4">Login</h2>
                    <form>
                    <div className="form-group mb-3">
                        <label>Email:</label>
                        <input type="text" ref={emailIn} className="form-control" placeholder="Email" required />
                    </div>
                    <div className="form-group mb-4">
                        <label>Password:</label>
                        <input type="password" ref={pwIn} className="form-control" placeholder="Password" required />
                    </div>
                    <div className="d-grid gap-2 col-3 mx-auto mb-2">
                        <Link className="btn btn-primary btn-block " role="button" onClick={handleLogin}>Login</Link>
                    </div>
                    <div className="d-grid gap-2 col-3 mx-auto">
                        <Link className="btn btn-primary btn-block " role="button" to="/registration">Register here</Link>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </>
    )
}