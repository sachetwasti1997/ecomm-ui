import { useEffect, useState } from "react";
import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";
import { Counter } from "./counter/Counter";
import { BrowserRouter, replace, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";
import BuyPage from "./pages/BuyPage";
import { useDispatch, useSelector } from "react-redux";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { getUserDetails, setUserToken } from "./store/userSlice";
import { getProduct } from "./store/productSlice";
import ProductPage from "./pages/ProductPage";

function App() {
  const userState = useSelector((store) => store.userReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(userState);
  

  const loggedInRoutes = () => {
    return (
      <>
        <Route path="/buy/:id" element={<BuyPage />} />
      </>
    );
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    

    if (token) {
      dispatch(setUserToken(token));
      dispatch(getUserDetails(token));
    }
  }, []);

  useEffect(() => {
      if (userState.token != null && userState.token.length > 0) {
        // console.log("Got the token");
        localStorage.setItem('token', userState.token)
        navigate("/", {replace: true});
      }
    }, [userState.token]);

  const loggedOutRoutes = () => {
    return (
      <>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </>
    );
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex-grow-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/details/:id" element={<ProductPage />} />
          {!userState.token && loggedOutRoutes()}
          {userState.token && loggedInRoutes()}
        </Routes>
      </div>
    </div>
  );
}

export default App;
