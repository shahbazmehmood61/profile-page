import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import Home from "./Pages/Home";
import { useEffect } from "react";
import { getData } from "./firebase.client";
import Profile from "./Pages/Profile";

function App() {
  useEffect(() => {
    localStorage.clear();
    getData("users").then((res) => {
      localStorage.setItem("users", JSON.stringify(res));
    });
  }, []);

  return (
    <div className="main__container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />}></Route>
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
