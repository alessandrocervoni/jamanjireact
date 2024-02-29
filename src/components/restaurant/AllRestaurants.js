import { currentUser } from "../../App";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";

export default function AllRestaurants() 
{
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [foodTypes, setFoodTypes] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);
    const [user, setUser] = useAtom(currentUser);

    useEffect(() => {
        axios.get("/restaurants").then((response) => {
            const data = response.data;
            setRestaurants(data);
            setFilteredRestaurants(data);
            const types = data.map(restaurant => restaurant.foodTypes).flat();
            setFoodTypes([...new Set(types)]);
        });
    }, []);

    const searchFoodTypes = useRef(null);
    const searchMaxDistance = useRef(null);

    function filter() 
    {
        const selectedFoodType = searchFoodTypes.current.value;
        const maxDistance = parseInt(searchMaxDistance.current.value);
    
        let filtered = restaurants.filter((restaurant) => {
            let isFoodTypeMatch = true;
            if (selectedFoodType !== "") {
                isFoodTypeMatch = restaurant.foodTypes.includes(selectedFoodType);
            }
    
            let isDistanceMatch = true;
            if (!isNaN(maxDistance)) {
                const distance = calculateDistance(user, restaurant);
                isDistanceMatch = distance <= maxDistance;
            }
    
            return isFoodTypeMatch && isDistanceMatch;
        });
    
        setFilteredRestaurants(filtered);
        setIsFiltered(true);
    }
    
    function calculateDistance(user, restaurant) 
    {
        const x1 = user.positionX;
        const y1 = user.positionY;
        const x2 = restaurant.positionX;
        const y2 = restaurant.positionY;
    
        const base = x1 - x2;
        const height = y1 - y2;
        const distance = Math.sqrt(Math.pow(base, 2) + Math.pow(height, 2));
    
        return Math.round(distance);
    }

    function resetFilter() 
    {
        setFilteredRestaurants(restaurants);
        setIsFiltered(false);
    }

    function FilterForm() 
    {
        const foodTypeOptions = foodTypes.map((foodType, index) => (
            <option key={index} value={foodType}>{foodType}</option>
        ));

        return (
            <div className="card text-center mb-3" style={{ position: "sticky", top: "100px", width: "18rem", margin: "3% auto" }}>
                <div className="card-body">
                    <h5 className="card-title">Filter</h5>
                    <form>
                        <div className="mb-3">
                            <select name="food_types" ref={searchFoodTypes} className="form-control" id="inputFoodTypes" disabled={isFiltered}>
                                <option value="">Select food type</option>
                                {foodTypeOptions}
                            </select>
                        </div>
                        <div className="mb-3">
                            <input type="number" ref={searchMaxDistance} className="form-control" placeholder="Select max distance (m)" disabled={isFiltered} />
                        </div>
                        <div className="d-grid">
                            {isFiltered ? (
                                <button onClick={resetFilter} type="button" className="btn btn-secondary">Reset Filter</button>
                            ) : (
                                <button onClick={filter} type="button" className="btn btn-primary">Filter now</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    function CardGrid() 
    {
        return (
            <>
                {
                    user && 
                    <div className="row row-cols-md-3 g-4" style={{ marginTop: "0%" }}>
                        {filteredRestaurants.map((restaurant) => {
                            return (
                                <div key={restaurant.id} className="col">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">{restaurant.name}</h5>
                                            <img src={restaurant.imgUrl} className="card-img-top" alt="UrlImg" />
                                            <p className="card-text">{restaurant.isOpen}</p>
                                            <p className="card-text">Food Types: {restaurant.foodTypes.join(', ')}</p>
                                            <p className="card-text">Distance: {calculateDistance(user, restaurant)}m</p>
                                            <Link to={"/restaurantDetail/"+restaurant.id} className="btn btn-primary">Go to Restaurant Detail</Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                }
            </>
        );
    }

    return (
        <div className="p-3 text-center">
            <div className="row">
                <div className="col-sm-3">
                    <FilterForm />
                </div>
                <div className="col-sm-9">
                    <div className="row">
                        <div className="col-12">
                            <CardGrid />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
