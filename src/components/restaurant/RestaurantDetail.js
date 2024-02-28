import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function RestaurantDetail(props)
{
    let {id} = useParams();

    const [user, setUsers] = useState([]);

    useEffect(
        ()=>
        {
            axios.get("/restaurants/"+id).then(
                (response) =>
                {
                    setUsers(response.data);
                }
            );
        },
        []
    )

    function Card({name, phone, openingHour, closingHour, positionX, positionY, foodTypes, deliveryPricePerUnit, maxDeliveryDistance, imgUrl, menu, deliveries})
    {
        return(
            <div className="col">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                            <span className="input-group-text">Phone</span>
                                <li className="list-group-item"> {phone} </li>
                            <span className="input-group-text">Opening Hour</span>
                                <li className="list-group-item"> {openingHour} </li>
                            <span className="input-group-text">Closing Hour</span>
                                <li className="list-group-item"> {closingHour} </li>
                            <span className="input-group-text">Position X</span>
                                <li className="list-group-item"> {positionX} </li>
                            <span className="input-group-text">Position Y</span>
                                <li className="list-group-item"> {positionY} </li>
                            <span className="input-group-text">Food Types</span>
                                <li className="list-group-item"> {foodTypes} </li>
                            <span className="input-group-text">Delivery Price Per Unit</span>
                                <li className="list-group-item"> {deliveryPricePerUnit} </li>
                            <span className="input-group-text">Max Delivery Distance</span>
                                <li className="list-group-item"> {maxDeliveryDistance} </li>
                            <span className="input-group-text">Image</span>
                                <li className="list-group-item"> {imgUrl} </li>
                            <span className="input-group-text">Menu</span>
                                <li className="list-group-item"> {menu} </li>
                            <span className="input-group-text">Deliveries</span>
                                <li className="list-group-item"> {deliveries} </li>   
                    </div>
                </div>
            </div>
                
        );
    }

        return(
            <>            
                    <div className="card" >
                        {Card(user)}
                    </div>

            </>
        );
    
}