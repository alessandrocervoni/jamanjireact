import { useAtom } from "jotai";
import { currentRestaurant, currentUser } from "../../App";
import { useEffect, useState } from "react";
import axios from "axios";


export default function MenuForm(props)
{
    const [menu, SetMenu] = useState();
    const [dish, setDish] = useState();
    


    const [tempMenu, setTempMenu] = useState({
        dishes:"",
    });

    function synchronize(e)
    {
        setTempMenu({...tempMenu, [e.target.name]: e.target.value});
    }

    useEffect(
    function ()
    {
        axios.get(`/menu/${props.id}/dishescat`, tempMenu)
        .then((response) => {
            
          setTempMenu(response.data);

        })
    },
    []
    )

    function clear()
    {
        setTempMenu({
            dishes:"",
        })
    }

    return (
        <>
        <div className="d-flex justify-content-center text-center" style={{ backgroundColor: '#180434', minHeight: '100vh' }}>
            <div class="card m-3" style={{ backgroundColor: "#E9E9FD", height: '60%' }}>
                <div class="card-body">
                    <h2>FILTRA MENU' PER PIATTI</h2>
                    <div> 
                        
                    </div>
                    {/* <div class="input-group mb-3 card-title">
                        <span class="input-group-text" >Name</span>
                        <input type="date" class="form-control" name="name" value={setTempMenu.name} onChange={synchronize} />
                    </div>
                    <div class="input-group mb-3 card-title">
                        <span class="input-group-text" >Category</span>
                        <input type="text" class="form-control" name="category" value={setTempMenu.category} onChange={synchronize} />
                    </div> */}
                    <div>
                        <button className="btn" onClick={clear} style={{ color: "#562BA6" }}><strong>CANCEL</strong></button>
                    </div>
                </div>
            </div>
        </div>

    </>
    )
}