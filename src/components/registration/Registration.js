import { currentUser } from "../../App";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export default function Registration()
{
    const [user, setUser] = useAtom(currentUser);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const [newUser, setNew] = useState({
        mail:"",
        password:"",
        phone:"",
        positionX:"",
        positionY:""
    });

    useEffect(  
        ()=>
        {
            axios.get("/users").then(
                (response)=>
                {
                    setUsers(response.data);
                }
            );
        },
        []
    )

    function UploadUser()
    {
                axios.post("/users", newUser).then((response)=>{
                    setNew({
                        mail:"",
                        password:"",
                        phone:"",
                        positionX:"",
                        positionY:""
                    });
                if(response.data) 
                {
                    setUser(response.data);
                    navigate('/login')
                } 
                else
                {
                    alert('Registrazione non riuscita, spiacente');
                }
                })
    }

    function synchronize(e)
    {
        let clone = {...newUser};
        clone[e.target.name] = e.target.value;
        setNew(clone);
    }

    // const searchName = useRef(null);
    // const searchPassword = useRef(null);

    // function log(event)
    // {
    //     event.preventDefault();
    //     let keyName = searchName.current.value;
    //     let keyPassword = searchPassword.current.value;
    //     for(let i = 0; i < users.length; i++)
    //         if(users[i].name == keyName && users[i].authentication_seal == keyPassword)
    //         {
    //             setUser(users[i]);
    //             navigate("/Homepage")
    //         }
    // }

    return(
        <>
            <div class="container">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h2 class="text-center mb-4">Registration</h2>
            <form>
                <div class="form-group mb-3">
                    <input id="mail" name="mail" type="email" className="form-control" onChange={synchronize} placeholder="Insert e-mail"/>
                </div>
                <div class="form-group mb-3">
                    <input id="password" name="password" type="password" className="form-control" onChange={synchronize} placeholder="Insert password"/>
                </div>
                <div class="form-group mb-3">
                    <input id="phone" name="phone" type="text" className="form-control" onChange={synchronize} placeholder="Insert phone number"/>
                </div>
                <div class="form-group mb-3">
                    <input id="positionX" name="positionX" type="numeric" className="form-control" onChange={synchronize} placeholder="Insert position X"/>
                </div>
                <div class="form-group mb-4">
                    <input id="positionY" name="positionY" type="numeric" className="form-control" onChange={synchronize} placeholder="Insert position Y"/>
                </div>

                {/* BUTTON REGISTRAZIONE */}
                <div class="d-grid gap-2 col-3 mx-auto">
                    <Link className="btn btn-primary" role="button" onClick={/*log &&*/ UploadUser}>Register</Link>
                </div>

            </form>
        </div>
    </div>
</div>
        </>
    );
}