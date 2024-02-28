import axios from "axios";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { currentRestaurant } from "../../App";
import MenuForm from "./MenuForm";

export default function RestaurantDetail(props)
{
    let {id} = useParams();

    const [user, setUsers] = useState([]);
    const [restaurant, setRestaurant] = useState();

    // useEffect(
    //     ()=>
    //     {
    //         axios.get("/restaurant/"+id).then(
    //             (response) =>
    //             {
    //                 setUsers(response.data);
    //             }
    //         );
    //     },
    //     []
    // )

    useEffect(() => {
        axios.get("/restaurant/"+id).then((response) => {
            setRestaurant(response.data);
        });
    }, []);

    function CardGrid() {
        return (
            <div className="row row-cols-md-3 g-4" style={{ marginTop: "0%" }}>
               
                   
                        <div className="card">
                            <div className="card-body">
                            <h5 className="card-title">{restaurant.name}</h5>
                            <span className="input-group-text">Phone</span>
                                <li className="list-group-item"> {restaurant.phone} </li>
                            <span className="input-group-text">Opening Hour</span>
                                <li className="list-group-item"> {restaurant.openingHour} </li>
                            <span className="input-group-text">Closing Hour</span>
                                <li className="list-group-item"> {restaurant.closingHour} </li>
                            <span className="input-group-text">Position X</span>
                                <li className="list-group-item"> {restaurant.positionX} </li>
                            <span className="input-group-text">Position Y</span>
                                <li className="list-group-item"> {restaurant.positionY} </li>
                                <span className="input-group-text">Food Types</span>
                                <li className="list-group-item"> {restaurant.foodTypes} </li>
                            <span className="input-group-text">Delivery Price Per Unit</span>
                                <li className="list-group-item"> {restaurant.deliveryPricePerUnit} </li>
                            <span className="input-group-text">Max Delivery Distance</span>
                                <li className="list-group-item"> {restaurant.maxDeliveryDistance} </li>
                            <span className="input-group-text">Image</span>
                                <li className="list-group-item"> {restaurant.imgUrl} </li>
                            <MenuForm id={restaurant.id}/>
                            {/* <span className="input-group-text">Deliveries</span>
                                <li className="list-group-item"> {restaurant.deliveries} </li> */}
                            </div>
                        </div>
                    </div>
                
          
        );
    }
    


        return(
            <>            
                    <div className="card" >
                       < CardGrid />
                    </div>

            </>
        );
    
}