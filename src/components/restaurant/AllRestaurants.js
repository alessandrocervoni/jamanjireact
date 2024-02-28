import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllRestaurants() 
{
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const searchFoodTypes = useRef(null);
    const searchDistance = useRef(null);

    useEffect(() => {
        axios.get("/restaurants").then((response) => {
            setRestaurants(response.data);
            setFilteredRestaurants(response.data);
        });
    }, []);

    function filter() {
        // Verifica se entrambi i campi sono stati compilati
        if (!searchFoodTypes.current.value || !searchDistance.current.value) {
            alert('Tutti i campi devono essere compilati per effettuare il filtro.');
            return;
        }
    
        const foodTypes = searchFoodTypes.current.value.trim().toLowerCase();
        const maxDistance = parseInt(searchDistance.current.value);
    
        const filtered = restaurants.filter((restaurant) => {
            // Converti food_types in lowercase per confrontare in modo case-insensitive
            const restaurantFoodTypes = restaurant.foodTypes.map(foodType => foodType.toLowerCase());
            // Controlla se almeno uno dei tipi di cibo selezionati è incluso in restaurantFoodTypes
            const matchFoodTypes = foodTypes.some(selectedFoodType => restaurantFoodTypes.includes(selectedFoodType));
            // Controlla se la distanza massima di consegna è minore o uguale a maxDistance
            const withinDistance = restaurant.distance <= maxDistance || !maxDistance;
            return matchFoodTypes && withinDistance;
        });
    
        setFilteredRestaurants(filtered);
    }

    function FilterForm() {
        return (
            <div className="card text-center mb-3" style={{ position: "sticky", top: "100px", width: "14rem", marginLeft: "2%", marginTop: "10%" }}>
                <form className="row g-3">
                    <div className="col-12">
                        <label htmlFor="filter" className="form-label">Filter</label>
                    </div>
                    <div className="col-12">
                        <input name="food_types" ref={searchFoodTypes} type="text" className="form-control" id="inputFoodTypes" placeholder="Food Types" />
                    </div>
                    <div className="col-12">
                        <input name="max_delivery_distance" ref={searchDistance} type="number" className="form-control" id="inputDistance" placeholder="Distance" />
                    </div>
                    <div className="col-12">
                        <button onClick={filter} type="button" className="btn btn-primary">Filter</button>
                    </div>
                </form>
            </div>
        );
    }

    function CardGrid() {
        return (
            <div className="row row-cols-2 g-4" style={{ marginTop: "0%" }}>
                {filteredRestaurants.map((restaurant) => (
                    <div key={restaurant.id} className="col">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{restaurant.name}</h5>
                                <p className="card-text">Food Types: {restaurant.foodTypes.join(', ')}</p>
                                <p className="card-text">Distance: {restaurant.distance}</p>
                                {/* Aggiungi il pulsante per andare a RestaurantDetail.js */}
                                <Link to={"/restaurantDetail/"+restaurant.id} className="btn btn-primary">Go to Restaurant Detail</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div class="/*text-bg-dark*/ p-3 text-center">
            <div class="row">
                <div class="col-sm-3">
                    <FilterForm />
                </div>
                <div class="col-sm-9">
                    <div class="row">
                        <div class="col-12">
                            <CardGrid />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}