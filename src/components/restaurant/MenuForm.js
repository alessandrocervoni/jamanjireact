import { useAtom } from "jotai";
import { currentDelivery, currentRestaurant, currentUser } from "../../App";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

export default function MenuForm(props)
{
    const [menu, setMenu] = useState({});
    const [delivery, setDelivery] = useAtom(currentDelivery);
    const [restGlob, setRestGlob] = useAtom(currentRestaurant);

    
    
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
                let d = response.data;
                d.dishesDeliveries = d.dishesDeliveries.filter(dt => dt.quantity != 0);
                setDelivery(d);
        })

    }

    function readOnlyCard(d) {
        return (
            <div className="card text-center" style={{ backgroundColor: "white", border: "2px solid black" }}>
                <div className="card-body text-center">
                    <h5 className="card-title text-center"> Category: {d.category} <br /> Name: {d.name}</h5>
                    <button className="btn btn-dark  mb-1" onClick={() => handleAdd(d.id)} ><strong>Add to cart</strong></button>
                    <br>
                    </br>
                    <button className="btn btn-dark" onClick={() => handleRemove(d.id)} ><strong>Remove</strong></button>
                </div>
            </div>
        )
    }

    function listaPiatti()
    {
        return (
            <>
                <div className="col-10 p-0">
                <div className="row">
                    <div className="card m-3 text-center" style={{ backgroundColor: "rgba(233, 233, 253, 0)",  border: "2px solid rgba(0, 0, 0, 0)"}}>
                        {menu.dishes && menu.dishes.filter(d => d.category === 'American').length > 0 && (
                            <div className="row">
                                <h2> AMERICAN </h2>
                                {menu.dishes.filter(d => d.category === 'American')
                                    .map(d => (
                                        <div key={d.id} className="col-5 p-2">
                                            <div className="card text-center">
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
                                        <div key={d.id} className="col-5 p-2">
                                            <div className="card text-center">
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
                                        <div key={d.id} className="col-5 p-2">
                                            <div className="card text-center">
                                                {readOnlyCard(d)}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                        {menu.dishes && menu.dishes.filter(d => d.category === 'Chinese').length > 0 && (
                            <div className="row">
                                <h2> CHINESE </h2>
                                {menu.dishes.filter(d => d.category === 'Chinese')
                                    .map(d => (
                                        <div key={d.id} className="col-5 p-2">
                                            <div className="card text-center">
                                                {readOnlyCard(d)}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
        );
    }

    function carrello()
    {
        return (
            <>
            <div className="col-5" style={{ marginTop:"1%",border: "2px solid black"  }}>
            <div className="card">
                <div className="card-body">
                    <div className="menu-items">
                        <label> CARRELLO: </label>
                        {delivery && delivery.dishesDeliveries && delivery.dishesDeliveries.map(dish => (
                            <div key={dish.id}>
                                <p>Prezzo del piatto: {dish.price}</p>
                                <p>Quantità  {dish.quantity} </p>
                            </div>
                        ))}
                        {delivery && (
                            <>
                                <p>Prezzo della consegna: {delivery.riderRevenue}</p>
                                <p>Prezzo totale: {delivery.totalPrice}</p>
                                <p>Distanza {delivery.distance}</p>
                                <p>Delivery Price Per Unit: {delivery.restaurant.deliveryPricePerUnit}</p>
                                <div className="mb-2">
                                    {restGlob && restGlob.isOpen === "Aperto" ? (
                                        <Link to={"/createDelivery"} className="btn btn-dark">Buy</Link>
                                    ) : (
                                        <button className="btn btn-dark" disabled>Not Available</button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
        );
    }

    return (
            <div className="p-3 text-center" style={{ minHeight: '100vh', marginLeft: "20%", marginTop: "5%", display: 'flex' }}>
                <div style={{ flex: 1, height: '100%' }}>
                    <div className="p-2" style={{ height: '100%', width: '100%', float: 'left' }}>
                        {listaPiatti()}
                    </div>
                </div>
                <div style={{ flex: 1, height: '100%' }}>
                    <div className="p-3 mb-1" style={{ height: '100%', width: '150%', float: 'left' }}>
                        {carrello()}
                    </div>
                </div>
            </div>
    
    );
} 