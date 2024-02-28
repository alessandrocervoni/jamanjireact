import { currentUser } from "../../App";
import { useAtom } from "jotai";
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Registration() 
{
    const [user, setUser] = useAtom(currentUser);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const mail = useRef(null);
    const password = useRef(null);
    const phone = useRef(null);
    const positionX = useRef(null);
    const positionY = useRef(null);

    const [newUser, setNew] = useState({
        mail: "",
        password: "",
        phone: "",
        positionX: "",
        positionY: ""
    });

    function UploadUser() {
        if (!newUser.mail || !newUser.password || !newUser.phone || !newUser.positionX || !newUser.positionY) {
            alert('Tutti i campi sono obbligatori.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newUser.mail)) {
            alert('Inserisci un indirizzo email valido.');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(newUser.password)) {
            alert('La password deve contenere almeno 8 caratteri, una lettera minuscola, una lettera maiuscola e un numero.');
            return;
        }

        if (newUser.phone.length !== 10 || isNaN(newUser.phone)) {
            alert('Il numero di telefono deve essere composto da 10 cifre numeriche.');
            return;
        }

        if (newUser.positionX < 1 || newUser.positionX > 999 || isNaN(newUser.positionX)) {
            alert('La posizione X deve essere un numero intero compreso tra 1 e 999.');
            return;
        }

        if (newUser.positionY < 1 || newUser.positionY > 999 || isNaN(newUser.positionY)) {
            alert('La posizione Y deve essere un numero intero compreso tra 1 e 999.');
            return;
        }

        axios.post("/user/register", newUser)
            .then((response) => {
                setNew({
                    mail: "",
                    password: "",
                    phone: "",
                    positionX: "",
                    positionY: ""
                });

                if (response.data) 
                {
                    setUser(response.data);
                    navigate('/login');
                } 
                else 
                {
                    alert('Registrazione non riuscita, spiacente.');
                }
            })
            .catch((error) => {
                console.error('Errore durante la registrazione:', error);
                alert('Si è verificato un errore durante la registrazione. Riprova più tardi.');
            });
    }

    function synchronize(e) {
        let clone = { ...newUser };
        clone[e.target.name] = e.target.value;
        setNew(clone);
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center mb-4">Registration</h2>
                    <form>
                        <div className="form-group mb-3">
                            <input ref={mail} name="mail" type="email" className="form-control" onChange={synchronize} placeholder="Insert e-mail" />
                        </div>
                        <div className="form-group mb-3">
                            <input ref={password} name="password" type="password" className="form-control" onChange={synchronize} placeholder="Insert password" />
                        </div>
                        <div className="form-group mb-3">
                            <input ref={phone} name="phone" type="text" className="form-control" onChange={synchronize} placeholder="Insert phone number" />
                        </div>
                        <div className="form-group mb-3">
                            <input ref={positionX} name="positionX" type="number" className="form-control" onChange={synchronize} placeholder="Insert position X" />
                        </div>
                        <div className="form-group mb-4">
                            <input ref={positionY} name="positionY" type="number" className="form-control" onChange={synchronize} placeholder="Insert position Y" />
                        </div>

                        {/* BUTTON REGISTRAZIONE */}
                        <div className="d-grid gap-2 col-3 mx-auto">
                            <button className="btn btn-primary" type="button" onClick={UploadUser}>Register</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}