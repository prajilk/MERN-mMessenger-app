import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Signin from "./pages/Signin";
import Signup from './pages/Signup';
import ChatsPage from "./pages/homePage";

function App() {
  const [user, setUser] = useState();
  
  return (
    <div>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<ChatsPage />} />
      </Routes>
    </div>
  )
}

export default App;
