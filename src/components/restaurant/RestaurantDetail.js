import axios from "axios";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { currentDelivery, currentRestaurant, currentUser } from "../../App";
import MenuForm from "./MenuForm";

export default function RestaurantDetail(props)
{
    let {id,uid} = useParams();

    
    const [restaurant, setRestaurant] = useState({});
    const [user, setUser] = useAtom(currentUser);
    const [delivery, setDelivery] = useAtom(currentDelivery);


    useEffect(() => {
        axios.get("/restaurant/"+id).then((response) => {
            setRestaurant(response.data);
            
        });
    }, []);

    useEffect(() => {
        axios.get("/createDelivery/"+ uid +"/"+id).then((response) => {
            setDelivery(response.data);

        });
    }, []);

   
        return (
            <div>
                <div className="restaurant-info" style={{ border: '2px solid #ccc', padding: '10px', textAlign: 'center', width: '300px', fontFamily: 'Arial, sans-serif' }}>
                                {/* Contenuto del rettangolo */}
                                <h5 className="card-title">{restaurant.name}</h5>
                                <ul className="list-group">
                                    <li className="list-group-item">Phone: {restaurant.phone}</li> <li className="list-group-item">Opening Hour: {restaurant.openingHour}</li>
                                    <li className="list-group-item">Closing Hour: {restaurant.closingHour}</li> <li className="list-group-item">Position X: {restaurant.positionX}</li>
                                    <li className="list-group-item">Position Y: {restaurant.positionY}</li> <li className="list-group-item">Food Types: {restaurant.foodTypes}</li>
                                    <li className="list-group-item">Delivery Price Per Unit: {restaurant.deliveryPricePerUnit}</li>  <li className="list-group-item">Max Delivery Distance: {restaurant.maxDeliveryDistance}</li>
                                    <li className="list-group-item">Max Delivery Distance: {restaurant.maxDeliveryDistance}</li>
                                    <li className="list-group-item">Image: {restaurant.imgUrl}</li>
                                </ul>
                </div>
                    <div className="menu-form">
                    <MenuForm id={id}/>
                     </div>
            </div>
        );
    }
    


        
    

