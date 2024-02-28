import { BrowserRouter, Route, Routes } from "react-router-dom";
import { atom } from "jotai";
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "./components/navbar/Navbar";
// import Homepage from "./components/homepage/Homepage";
import Registration from "./components/registration/Registration";
import Login from "./components/login/Login";
import { useAtom } from "jotai";
import AllRestaurants from "./components/restaurant/AllRestaurants";

// export const currentGuild = atom();
export const currentUser = atom();

function App() 
{ 
//   const [guild, setGuild] = useAtom(currentGuild);
  const [user, setUser] = useAtom(currentUser);
  

  return (
    <>  
      <BrowserRouter>

        <Navbar /> 
        <Routes>
          {/* <Route index element={<Homepage />} /> */}
          <Route index element={<AllRestaurants />} /> 
          <Route path="registration" element={<Registration />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;