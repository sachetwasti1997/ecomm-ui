import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeError, userLogIn } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const userState = useSelector((store) => store.userReducer);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userState.signedUp) {
      setMessage(
        "Successfully Registered, please login with the credentials now!"
      );
    }
  }, []);

  const changeState = (setState, value) => {
    if (userState.error) {
      dispatch(removeError());
    }
    setState(value);
  };

  const handleButtonSubmit = async (event) => {
    event.preventDefault();

    dispatch(
      userLogIn({
        email: email,
        password: password,
      })
    );


  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleButtonSubmit}>
      <div className="mb-5">
        <label
          for="email"
          className="block mb-2.5 text-sm font-medium text-heading"
        >
          Your email
        </label>
        <input
          type="email"
          id="email"
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="name@flowbite.com"
          required
          onChange={(txt) => {
            changeState(setEmail, txt.target.value);
          }}
        />
      </div>
      <div className="mb-5">
        <label
          for="password"
          className="block mb-2.5 text-sm font-medium text-heading"
        >
          Your password
        </label>
        <input
          type="password"
          id="password"
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="••••••••"
          required
          onChange={(txt) => changeState(setPassword, txt.target.value)}
        />
      </div>
      <label for="remember" className="flex items-center mb-5">
        <input
          id="remember"
          type="checkbox"
          value=""
          className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
          required
        />
        <p className="ms-2 text-sm font-medium text-heading select-none">
          I agree with the{" "}
          <a href="#" className="text-fg-brand hover:underline">
            terms and conditions
          </a>
          .
        </p>
      </label>
      {userState.signedUp && (
        <p className="text-green-500 ms-2 text-sm font-medium text-heading select-none">
          {message}
        </p>
      )}
      <button
        disabled={!email || !password}
        type="submit"
        className="text-white bg-blue-500 box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-sm px-4 py-2.5 focus:outline-none hover:bg-blue-700"
      >
        Log In!
      </button>
      {userState.error && (
        <label htmlFor="remember" className="flex items-center mb-5">
          <p className="text-red-500 ms-2 text-sm font-medium text-heading">
            {userState.error}
            {"!"}
          </p>
        </label>
      )}
    </form>
  );
};

export default LogIn;
