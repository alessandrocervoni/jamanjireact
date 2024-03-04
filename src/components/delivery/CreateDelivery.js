import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { currentDelivery } from "../../App";
import { useAtom } from "jotai";
import axios from "axios";

export default function CreateDelivery() {
    const [delivery, setDelivery] = useAtom(currentDelivery);
    const deliveryTimeRef = useRef(null);
    const [notes, setNotes] = useState("");
    const [deliveryStartTime, setDeliveryStartTime] = useState("");
    let navigate = useNavigate();
   


    function deliveryTime() {
        let currentHour = new Date();
        let min = currentHour.getMinutes(); // Ottiene i minuti attuali
        let integerMinutes = parseInt(min); // Converte i minuti in un numero intero
    
        integerMinutes = delivery.distance / 100 * 2;
        
        // Calcola l'orario di consegna aggiungendo integerMinutes ai minuti attuali
        let deliveryTimestamp = currentHour.setMinutes(currentHour.getMinutes() + integerMinutes);
    
        // Crea un nuovo oggetto Date utilizzando il timestamp
        let deliveryDate = new Date(deliveryTimestamp);
        let hours = deliveryDate.getHours();
        let minutes = deliveryDate.getMinutes();
    
        // Formatta l'ora aggiungendo zero iniziali se necessario e restituisci una stringa
        return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    }

    // Funzione per generare le opzioni di tempo di consegna
    function generateDeliveryTimeOptions() {
        let currentHour = new Date();
        let min = currentHour.getMinutes(); // Ottiene i minuti attuali
        let integerMinutes = parseInt(min); // Converte i minuti in un numero intero
    
        integerMinutes = delivery.distance / 100 * 2;
        
        // Calcola l'orario di consegna aggiungendo integerMinutes ai minuti attuali
        let deliveryTimestamp = currentHour.setMinutes(currentHour.getMinutes() + integerMinutes);
    
        // Crea un nuovo oggetto Date utilizzando il timestamp
        let deliveryDate = new Date(deliveryTimestamp);
        let hour = deliveryDate.getHours();
        let minutes = deliveryDate.getMinutes();
        let options = [];

        // Arrotonda verso l'alto i minuti per ogni intervallo di 15 minuti
        minutes = Math.ceil(minutes / 15) * 15;

        if (minutes >= 60) {
            minutes = 59;
        }
        
        // Aggiunge le opzioni di tempo di consegna al menu a discesa fino a mezzanotte
        while (hour < 24) {
            // Aggiungi l'opzione al formato "hh:mm" al menu a discesa
            options.push(`${hour < 10 ? '0' + hour : hour}:${minutes < 10 ? '0' + minutes : minutes}`);

            // Aumenta l'ora e i minuti di 15 minuti
            minutes += 15;
            if (minutes >= 60) {
                minutes = 0;
                hour++;
            }
        }

        return options;
    }

    // Quando il componente viene montato, aggiorna le opzioni del menu a tendina
    useEffect(() => {
        const options = generateDeliveryTimeOptions();
        if (deliveryTimeRef.current) {
            options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.text = option;
                deliveryTimeRef.current.appendChild(optionElement);
            });
        }
    }, []);


    function handleChangeNotes(event) {
        // Aggiorna lo stato locale delle note quando l'utente modifica il campo di testo
        setNotes(event.target.value);
    }

    function handleChangeDeliveryTime(event) 
    {
        // Aggiorna lo stato locale dell'orario di inizio consegna quando l'utente seleziona un nuovo orario
        setDeliveryStartTime(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        // Aggiorna la variabile globale delivery con l'orario di inizio consegna e le note inserite dall'utente
        setDelivery({
            ...delivery,
            expected_arrival: deliveryStartTime,
            notes: notes
        });

        
        navigate('/confirmDelivery');

        // Effettua qui altre azioni come l'invio dei dati al server, il reindirizzamento a una nuova pagina, ecc.
    }

    

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title text-center mb-4">Create Delivery</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="deliveryTime" className="form-label">Starting delivery Time:</label>
                                    <select 
                                        id="deliveryTime" 
                                        className="form-select" 
                                        ref={deliveryTimeRef}
                                        value={deliveryStartTime} // Imposta il valore selezionato sullo stato locale
                                        onChange={handleChangeDeliveryTime} // Gestisce l'evento onChange per aggiornare lo stato dell'orario di inizio consegna
                                    >
                                        <option value="">Select delivery time</option>
                                        {/* Inserisci qui le opzioni di tempo di consegna */}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="notes" className="form-label">Notes:</label>
                                    <textarea 
                                        className="form-control" 
                                        placeholder="Insert notes here" 
                                        id="notes" 
                                        rows="3" 
                                        value={notes} // Imposta il valore del campo di testo sullo stato locale
                                        onChange={(e) => setNotes(e.target.value)} // Gestisce l'evento onChange per aggiornare lo stato delle note
                                    ></textarea>
                                </div>
                                <div className="d-grid">
                                <button to={"/confirmDelivery"} className="btn btn-primary" onClick={handleSubmit}>Go to payment method</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


