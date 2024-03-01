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

        if(delivery==null || delivery.restaurant.id!=id)
        axios.get("/createDelivery/"+ uid +"/"+id).then((response) => {
            setDelivery(response.data);

        });
    }, []);

   
        return (
            <div>
                {/* <div className="restaurant-info" style={{ border: '2px solid #ccc', padding: '10px', textAlign: 'center', width: '300px', fontFamily: 'Arial, sans-serif' }}>
                                <h5 className="card-title">{restaurant.name}</h5>
                                <ul className="list-group">
                                    <img src={restaurant.imgUrl} className="card-img-top" alt="UrlImg" />
                                    <li className="list-group-item">Phone: {restaurant.phone}</li> <li className="list-group-item">Opening Hour: {restaurant.openingHour}</li>
                                    <li className="list-group-item">Closing Hour: {restaurant.closingHour}</li> <li className="list-group-item">Position X: {restaurant.positionX}</li>
                                    <li className="list-group-item">Position Y: {restaurant.positionY}</li> <li className="list-group-item">Food Types: {restaurant.foodTypes}</li>
                                    <li className="list-group-item">Delivery Price Per Unit: {restaurant.deliveryPricePerUnit}</li>  <li className="list-group-item">Max Delivery Distance: {restaurant.maxDeliveryDistance}</li>
                                    <li className="list-group-item">Max Delivery Distance: {restaurant.maxDeliveryDistance}</li>
                                </ul>
                </div> */}


                            <div style={{ display: "flex", justifyContent: "center" }}>
                            <div
                                className="restaurant-info"
                                style={{
                                border: "2px solid #ccc",
                                padding: "10px",
                                textAlign: "center",
                                maxWidth: "500px", 
                                width: "300%", 
                                fontFamily: "Arial, sans-serif",
                                marginBottom: "20px", 
                                }}
                            >
                               
                                    <h5 className="card-title">{restaurant.name}</h5>
                                    <ul className="list-group">
                                    <img src={restaurant.imgUrl} className="card-img-top" alt="UrlImg" />
                                    <li className="list-group-item">Phone: {restaurant.phone} </li>
                                    <li className="list-group-item">Opening Hour: {restaurant.openingHour} | Closing Hour: {restaurant.closingHour} </li>
                                    {/* <li className="list-group-item">Closing Hour: {restaurant.closingHour}</li> */}
                                    <li className="list-group-item">Position X: {restaurant.positionX} | Position Y: {restaurant.positionY}</li>
                                    {/* <li className="list-group-item">Position Y: {restaurant.positionY}</li> */}
                                    <li className="list-group-item">Food Types: {restaurant.foodTypes}</li>
                                    <li className="list-group-item">Delivery Price Per Unit: {restaurant.deliveryPricePerUnit} | Max Delivery Distance: {restaurant.maxDeliveryDistance}</li>
                                    {/* <li className="list-group-item">Max Delivery Distance: {restaurant.maxDeliveryDistance}</li> */}
                                </ul>
                            </div>
                            </div>
                        
                    <MenuForm id={id}/>
                     </div>
        );
    }
    


        
    

