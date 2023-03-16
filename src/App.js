import { Routes, Route } from "react-router-dom";

import Signin from "./pages/Signin";
import Signup from './pages/Signup';
import ChatsPage from "./pages/homePage";
import ErrorPage from "./pages/ErrorPage";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/signin" element={<Signin/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<ChatsPage/>} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </div>
  )
}

export default App;
