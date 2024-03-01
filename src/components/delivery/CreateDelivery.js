import { Link } from "react-router-dom";
import { currentDelivery } from "../../App";
import { useAtom } from "jotai";

export default function CreateDelivery() 
{
    const [delivery, setDelivery] = useAtom(currentDelivery);

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
    
    

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title text-center mb-4">Create Delivery</h5>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="deliveryTime" className="form-label">Starting delivery Time: {deliveryTime()}</label>
                                    <select id="deliveryTime" className="form-select">
                                        <option value="">Select delivery time</option>
                                        
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="notes" className="form-label">Notes:</label>
                                    <textarea className="form-control" placeholder="Insert notes here" id="notes" rows="3"></textarea>
                                </div>
                                <div className="d-grid">
                                    <Link to={"/confirmDelivery"} className="btn btn-primary">Go to payment method</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}