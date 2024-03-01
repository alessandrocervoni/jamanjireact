import { BrowserRouter, Route, Routes } from "react-router-dom";
import { atom } from "jotai";
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "./components/navbar/Navbar";
// import Homepage from "./components/homepage/Homepage";
import Registration from "./components/registration/Registration";
import Login from "./components/login/Login";
import { useAtom } from "jotai";
import AllRestaurants from "./components/restaurant/AllRestaurants";
import RestaurantDetail from "./components/restaurant/RestaurantDetail";
import MenuForm from "./components/restaurant/MenuForm";
import CreateDelivery from "./components/delivery/CreateDelivery";
import ConfirmDelivery from "./components/delivery/ConfirmDelivery";


// export const currentGuild = atom();
const currentUserStore = atom(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
const currentRestaurantStore = atom(localStorage.getItem("restaurant") ? JSON.parse(localStorage.getItem("restaurant")) : null);
const currentDeliveryStore = atom(localStorage.getItem("delivery") ? JSON.parse(localStorage.getItem("delivery")) : null);

export const currentUser = atom(
  (get) => get(currentUserStore),
  (get,set,newCurrentUser)=>
  {
    set(currentUserStore,newCurrentUser);
    localStorage.setItem("user",JSON.stringify(newCurrentUser));
  }
);

export const currentRestaurant = atom(
  (get) => get(currentRestaurantStore),
  (get,set,newCurrentRestaurant)=>
  {
    set(currentRestaurantStore,newCurrentRestaurant);
    localStorage.setItem("restaurant",JSON.stringify(newCurrentRestaurant));
  }
);

export const currentDelivery = atom(
  (get) => get(currentDeliveryStore),
  (get,set,newCurrentDelivery)=>
  {
    set(currentDeliveryStore,newCurrentDelivery);
    localStorage.setItem("delivery",JSON.stringify(newCurrentDelivery));
  }
);



function App() 
{ 
  const [user, setUser] = useAtom(currentUser);
  

  return (
    <>  
      <BrowserRouter>

        <Navbar /> 
        <Routes>
          {/* <Route index element={<Homepage />} /> */}
          <Route index element={<Login />} /> 
          <Route path="allRestaurants" element={<AllRestaurants />} />
          <Route path="registration" element={<Registration />} />
          <Route path="login" element={<Login />} />
          <Route path="restaurantDetail/:id/:uid" element={<RestaurantDetail />} />
          <Route path="menuForm" element={<MenuForm />} />
          <Route path="createDelivery" element={<CreateDelivery />} />
          {/* <Route path="confirmDelivery" element={<ConfirmDelivery />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;