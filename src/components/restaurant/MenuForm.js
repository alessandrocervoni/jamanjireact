import { useAtom } from "jotai";
import { currentDelivery, currentRestaurant, currentUser } from "../../App";
import { useEffect, useState } from "react";
import axios from "axios";


export default function MenuForm(props)
{
    const [menu, setMenu] = useState({});
    const [dishDelivery, setDishDelivery] = useState([]);
    const [delivery, setDelivery] = useAtom(currentDelivery);
    
    
    useEffect(
    function ()
    {
        axios.get(`/menu/${props.id}/dishescat`)
        .then((response) => {
            
          setMenu(response.data);

        })
    },
    []
    )

    function handleAdd(dishid) {
        axios.put("/dishes/adding/" + dishid + "/" + delivery.id)
            
    }

    function readOnlyCard(d) {
        return (
            <div className="card text-center" style={{ backgroundColor: "rgba(233, 233, 253, 0.5)" }}>
                <div className="card-body text-center">
                    <h5 className="card-title text-center"> Category: {d.category} <br /> Name: {d.name}</h5>
                    <button className="btn" onClick={() => handleAdd(d.id)} style={{ color: "#562BA6" }}><strong>ADD TO CART</strong></button>
                    {/* <button className="btn" onClick={() => handleRemove(d.id)} style={{ color: "#562BA6" }}><strong>REMOVE</strong></button> */}
                </div>
            </div>
        )
    }

    return (
        <div className="col-8 p-4">
            <div className="row" style={{ backgroundColor: '#180434', minHeight: '100vh' }}>
                <div class="card m-3" style={{ backgroundColor: "#E9E9FD", height: '60%' }}>
                    <h2> AMERICAN </h2>
                    {menu.dishes && menu.dishes.filter(d => d.category == 'American').map(d => (
                        <div key={d.id} className="col-4 p-2" >
                            <div className="card text center" style={{ backgroundColor: "rgba(233, 233, 253, 0.5)" }}>
                                {readOnlyCard(d)}
                            </div>
                        </div>
                    ))}
                    <h2> JAPANESE </h2>
                    {menu.dishes && menu.dishes.filter(d => d.category == 'Japanese').map(d => (
                        <div key={d.id} className="col-4 p-2" >
                            <div className="card text center" style={{ backgroundColor: "rgba(233, 233, 253, 0.5)" }}>
                                {readOnlyCard(d)}
                            </div>
                        </div>
                    ))}
                    <h2> ITALIAN </h2>
                    {menu.dishes && menu.dishes.filter(d => d.category == 'Italian').map(d => (
                        <div key={d.id} className="col-4 p-2" >
                            <div className="card text center" style={{ backgroundColor: "rgba(233, 233, 253, 0.5)" }}>
                                {readOnlyCard(d)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="menu-items">
                {delivery && delivery.dishesDeliveries && delivery.dishesDeliveries.map(dish => (
                    <div>
                        <p>Prezzo del piatto: {dish.getPrice()}</p> 
                        <p>Prezzo della consegna:  {delivery.getTotalPrice()}</p>
                        <p>Prezzo totale: {delivery.getTotalPrice()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}