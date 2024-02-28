import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { currentRestaurant } from "../../App";
import MenuForm from "./MenuForm";

export default function RestaurantDetail(props)
{
    let {id} = useParams();

    // const [user, setUsers] = useState([]);
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


    function CardGrid() 
    {
        const [isAlertShown, setIsAlertShown] = useState(true);

        if (!restaurant && isAlertShown) 
        {
            alert('Loading...');
            setIsAlertShown(false); // Imposta isAlertShown a false dopo aver mostrato l'alert una volta
            return null; // Restituisci null per evitare la resa del resto del componente
        }

        if (!restaurant) {
            return null; // Se restaurant è ancora undefined, non renderizzare nulla
        }
    
        return (
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title text-center">{restaurant.name}</h5>
                            <ul className="list-group list-group-flush">
                                <RenderListItem label="Image" value={restaurant.imgUrl} />
                                <RenderListItem label="Phone" value={restaurant.phone} />
                                <RenderListItem label="Opening Hour" value={restaurant.openingHour} />
                                <RenderListItem label="Closing Hour" value={restaurant.closingHour} />
                                <RenderListItem label="Position X" value={restaurant.positionX} />
                                <RenderListItem label="Position Y" value={restaurant.positionY} />
                                <RenderListItem label="Delivery Price Per Unit" value={restaurant.deliveryPricePerUnit} />
                                <RenderListItem label="Max Delivery Distance" value={restaurant.maxDeliveryDistance} />
                                <RenderListItem label="Food Types" value={restaurant.foodTypes.join(', ')} />
                            </ul>
                            <MenuForm id={restaurant.id} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    function RenderListItem({ label, value }) {
        return (
            <>
                <span className="input-group-text">{label}</span>
                <li className="list-group-item">{value}</li>
            </>
        );
    }
    
    return (
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center vh-100">
                <div className="col-md-8">
                    <CardGrid />
                </div>
            </div>
        </div>
    );
}