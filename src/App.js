import { Routes, Route } from "react-router-dom";

import Signin from "./pages/Signin";
import Signup from './pages/Signup';
import ChatsPage from "./pages/homePage";
import ErrorPage from "./pages/ErrorPage";

import { socket, SocketContext } from "./context/SocketContext";

function App() {

  return (
    <SocketContext.Provider value={socket}>
      <Routes>
        <Route path="/signin" element={<Signin/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<ChatsPage/>} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </SocketContext.Provider>
  )
}

export default App;
