import { useAtom } from "jotai";
import { currentDelivery, currentRestaurant } from "../../App";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

export default function AcceptedDelivery() {
    const [restAcc, setRestAcc] = useAtom(currentRestaurant);
    const [delivery, setDelivery] = useAtom(currentDelivery);
    let navigate = useNavigate();
    const [riders, setRiders] = useState([]);



    useEffect(
        function () {
            axios.get("/riders/" + restAcc.id)
                .then((response) => {

                    setRiders(response.data);

                })
        },
        []
    )

    function getAvailableRider() {
        const now = dayjs();
        const availableRiders = [];

        for (let rider of riders) {
            let available = true;
            for (let delivery of rider.deliveries) {
                let startingTime = dayjs(delivery.expected_arrival);
                startingTime.subtract(delivery.distance * 2, 'minute');
                let endingTime = dayjs(delivery.expected_arrival);
                if (now.isAfter(startingTime) && now.isBefore(endingTime)) {
                    available = false;
                }
            }
            available && availableRiders.push(rider);
        }


        // Se ci sono rider disponibili, seleziona uno random
        if (availableRiders.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableRiders.length);
            return availableRiders[randomIndex];
        } else {
            return null; // Nessun rider disponibile
        }
    }

    const rider = getAvailableRider();
    console.log(rider);

    return (
        <>
            <div className="mb-3">
                <label htmlFor="payment" className="form-label">RIEPILOGO:</label>
                <p>Il ristorante {restAcc.name} ti ringrazia per l'ordine!</p>
                <p>Totale: {delivery.totalPrice} €</p>
                {rider && (
                    <div>
                        <h3>Random Rider</h3>
                        <p>Name: {rider.name}</p>
                        {/* Aggiungi altri dettagli del rider qui... */}
                    </div>
                )}
                <p>Orario confermato alle {delivery.expected_arrival}</p>
                <p>Note inserite: {delivery.notes}</p>

            </div>
        </>
    );
}