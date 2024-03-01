import { useAtom } from "jotai";
import { currentDelivery, currentRestaurant, currentUser } from "../../App";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export default function MenuForm(props)
{
    const [menu, setMenu] = useState({});
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
        .then((response) => 
        {
            setDelivery(response.data);
        })
    }

    function handleRemove(dishid)
    {
        axios.delete("/dishes/deleting/"+ dishid + "/" + delivery.id)
        .then((response) => 
        {
            setDelivery(response.data);
        })

    }

    function readOnlyCard(d) {
        return (
            <div className="card text-center" style={{ backgroundColor: "rgba(233, 233, 253, 0.5)" }}>
                <div className="card-body text-center">
                    <h5 className="card-title text-center"> Category: {d.category} <br /> Name: {d.name}</h5>
                    <button className="btn" onClick={() => handleAdd(d.id)} style={{ color: "#562BA6" }}><strong>ADD TO CART</strong></button>
                    <button className="btn" onClick={() => handleRemove(d.id)} style={{ color: "#562BA6" }}><strong>REMOVE</strong></button>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="col-8 p-4">
                <div className="row">
                    <div className="card m-3 text-center">
                        {menu.dishes && menu.dishes.filter(d => d.category === 'American').length > 0 && (
                            <div className="row">
                                <h2> AMERICAN </h2>
                                {menu.dishes.filter(d => d.category === 'American')
                                    .map(d => (
                                        <div key={d.id} className="col-4 p-2">
                                            <div className="card text-center" style={{ backgroundColor: "rgba(233, 233, 253, 0.5)" }}>
                                                {readOnlyCard(d)}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                        {menu.dishes && menu.dishes.filter(d => d.category === 'Japanese').length > 0 && (
                            <div className="row">
                                <h2> JAPANESE </h2>
                                {menu.dishes.filter(d => d.category === 'Japanese')
                                    .map(d => (
                                        <div key={d.id} className="col-4 p-2">
                                            <div className="card text-center" style={{ backgroundColor: "rgba(233, 233, 253, 0.5)" }}>
                                                {readOnlyCard(d)}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                        {menu.dishes && menu.dishes.filter(d => d.category === 'Italian').length > 0 && (
                            <div className="row">
                                <h2> ITALIAN </h2>
                                {menu.dishes.filter(d => d.category === 'Italian')
                                    .map(d => (
                                        <div key={d.id} className="col-4 p-2">
                                            <div className="card text-center" style={{ backgroundColor: "rgba(233, 233, 253, 0.5)" }}>
                                                {readOnlyCard(d)}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="col-4 p-4">
                <div className="card">
                    <div className="card-body">
                        <div className="menu-items">
                            <label>CARRELLO</label>
                            {delivery && delivery.dishesDeliveries && delivery.dishesDeliveries.map(dish => (
                                <div key={dish.id}>
                                    <p>Prezzo del piatto: {dish.price}</p>
                                    <p>Quantità {dish.quantity} </p>
                                </div>

                            ))}
                            
                            {delivery &&
                            <>
                                    <p>Prezzo della consegna: {delivery.riderRevenue}</p>
                                    <p>Prezzo totale: {delivery.totalPrice}</p>
                                    <p>Distanza {delivery.distance}</p>
                                    <p>Delivery Price Per Unit: {delivery.restaurant.deliveryPricePerUnit}</p>

                                    <div className="mb-2">
                                        <Link to={"/createDelivery"} className="btn btn-primary">Buy</Link>
                                    </div>
                            </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
    
}