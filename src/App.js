import { BrowserRouter, Route, Routes } from "react-router-dom";
import { atom } from "jotai";
import 'bootstrap/dist/css/bootstrap.css';
// import Navbar from "./components/navbar/Navbar";
// import Homepage from "./components/homepage/Homepage";
import Registrazione from "./components/registrazione/Registrazione";
import Login from "./components/login/Login";
import { useAtom } from "jotai";

// export const currentGuild = atom();
export const currentUser = atom();

function App() 
{ 
//   const [guild, setGuild] = useAtom(currentGuild);
  const [user, setUser] = useAtom(currentUser);
  

  return (
    <>  
      <BrowserRouter>

        {/* <Navbar />  */}
        <Routes>
          {/* <Route index element={<Homepage />} /> */}
          <Route index element={<Registrazione />} />
          <Route path="Login" element={<Login />} />
          <Route path="Registrazione" element={<Registrazione />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;