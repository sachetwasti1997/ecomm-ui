import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useNavigation } from "react-router-dom";
import { removeError, userSignUp } from "../store/userSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const dispatch = useDispatch();

  const userState = useSelector((store) => store.userReducer);


  const changeState = (setState, value) => {
    if(userState.error) {
      dispatch(removeError());
    }
    setState(value);
  }
  

  useEffect(() => {
    // console.log(userState.signUpMessage);
    
    if (userState.signUpMessage) {
      navigate("/login");
    }
  }, [userState]);

  const handleButtonSubmit = (event) => {
    event.preventDefault();

    dispatch(
      userSignUp({
        firstName: firstName,
        lastName: lastName,
        middleName: middleName,
        email: email,
        password: password,
        roles: {
          userRole: role,
        },
      })
    );
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleButtonSubmit}>
      <div className="mb-5">
        <label
          htmlFor="firstName"
          className="block mb-2.5 text-sm font-medium text-heading"
        >
          First Name*
        </label>
        <input
          type="text"
          id="firstName"
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="First Name, Jhon, Alexa"
          required
          onChange={(txt) => changeState(setFirstName, txt.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="middleName"
          className="block mb-2.5 text-sm font-medium text-heading"
        >
          Middle Name
        </label>
        <input
          type="text"
          id="middleName"
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="Middle Name(Optional)"
          onChange={(txt) => changeState(setMiddleName, txt.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="lastName"
          className="block mb-2.5 text-sm font-medium text-heading"
        >
          Last Name*
        </label>
        <input
          type="text"
          id="lastName"
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="Last Name"
          required
          onChange={(txt) => changeState(setLastName, txt.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2.5 text-sm font-medium text-heading"
        >
          Your email*
        </label>
        <input
          type="email"
          id="email"
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="name@flowbite.com"
          required
          onChange={(txt) => changeState(setEmail, txt.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2.5 text-sm font-medium text-heading"
        >
          Your password*
        </label>
        <input
          type="password"
          id="password"
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="**********"
          required
          onChange={(txt) => changeState(setPassword, txt.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="role"
          className="block mb-2.5 text-sm font-medium text-heading"
        >
          Your Role*
        </label>
        <input
          type="text"
          id="role"
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="Supported roles, USER, SELLER"
          required
          onChange={(txt) => changeState(setRole, txt.target.value)}
        />
      </div>
      <label htmlFor="remember" className="flex items-center mb-5">
        <p className="ms-2 text-sm font-medium text-heading">
          Already Have An Account{" "}
          <a
            className="text-fg-brand hover:underline"
            onClick={() => navigate("/login")}
          >
            Sign In!
          </a>
        </p>
      </label>
      <button
        disabled={!firstName || !lastName || !email || !password}
        type="submit"
        className="text-white bg-blue-500 box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-sm px-4 py-2.5 focus:outline-none hover:bg-blue-700"
      >
        Submit
      </button>
      {userState.error && (
        <label htmlFor="remember" className="flex items-center mb-5">
          <p className="text-red-500 ms-2 text-sm font-medium text-heading">
            {userState.error}{"!"}
          </p>
        </label>
      )}
    </form>
  );
};

export default SignUp;
