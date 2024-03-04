import { useAtom } from "jotai";
import { currentDelivery } from "../../App";
import { useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ConfirmDelivery()
{
    const [delivery, setDelivery] = useAtom(currentDelivery);
    const payMet = useRef(null);
    const [payment, setPayment] = useState("");
    const MetodiPag = ["Cash" , "Card" , "Paypal"];

    function saveDelivery()
    {
        let ea = new Date();
        ea.setHours(delivery.expected_arrival.substring(0,2))
        ea.setMinutes(delivery.expected_arrival.substring(3))
        ea.setSeconds(0)
        ea.setMilliseconds(0)
        let requestBody = {
            notes: delivery.notes,
            paymentMethod: delivery.paymentMethod,
            expected_arrival: ea
        }
        axios.put("/delivery/buy/"+delivery.id,requestBody)
        alert("Ordine confermato");
    }

    function handleChange(event)
    {
        setPayment(event.target.value);
    }

    function handleSubmit(event) 
    {
        event.preventDefault();

        // Aggiorna la variabile globale delivery con l'orario di inizio consegna e le note inserite dall'utente
        setDelivery({
            ...delivery,
            paymentMethod: payment,
        });

        // Effettua qui altre azioni come l'invio dei dati al server, il reindirizzamento a una nuova pagina, ecc.
    }


    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="payment" className="form-label">Starting delivery Time:</label>
                <select
                    id="payment"
                    className="form-select"
                    ref={payMet}
                    value={payment} // Imposta il valore selezionato sullo stato locale
                    onChange={handleChange} // Gestisce l'evento onChange per aggiornare lo stato del metodo di pagamento
                >
                    <option value="">Select Payment Method</option>
                    {MetodiPag.map((metodo, index) => (
                        <option key={index} value={metodo}>{metodo}</option>
                    ))}
                </select>
            </div>
            <Link type="submit" className="btn btn-primary" to="/acceptedDelivery" onClick={saveDelivery}> Save Payment Method</Link>
        </form>
    );
}