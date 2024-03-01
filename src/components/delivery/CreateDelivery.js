import { Link } from "react-router-dom";

export default function CreateDelivery() 
{
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title text-center mb-4">Create Delivery</h5>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="deliveryTime" className="form-label">Delivery Time:</label>
                                    <select id="deliveryTime" className="form-select">
                                        <option value="">Select delivery time</option>
                                        {/* Opzioni per l'orario di consegna */}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="notes" className="form-label">Notes:</label>
                                    <textarea className="form-control" placeholder="Insert notes here" id="notes" rows="3"></textarea>
                                </div>
                                <div className="d-grid">
                                    <Link to={"/confirmDelivery/"} className="btn btn-primary">Go to payment method</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
