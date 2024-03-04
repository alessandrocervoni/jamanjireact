import { useAtom } from "jotai";
import { currentDelivery, currentRestaurant } from "../../App";
import { useNavigate } from "react-router-dom";

export default function AcceptedDelivery()
{
    const [restAcc, setRestAcc] = useAtom(currentRestaurant);
    const [delivery, setDelivery] = useAtom(currentDelivery);
    let navigate = useNavigate();


    return (
        <>
            <div className="mb-3">
                <label htmlFor="payment" className="form-label">RIEPILOGO:</label>
                <p>Il ristorante {restAcc.name} ti ringrazia per l'ordine!</p>
                <p>Totale: {delivery.totalPrice} €</p>
                <p>Orario confermato alle {delivery.expected_arrival}</p>
                <p>Note inserite: {delivery.notes}</p>
                
            </div>
        </>
    );
}