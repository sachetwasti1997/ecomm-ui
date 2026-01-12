import { useNavigate } from "react-router-dom";
import logo from "../assets/cart.png";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.userReducer);
  return (
    <div className="bg-grey-500 shadow-md fixed sticky top-0 z-50 10px grid grid-cols-21 bg-opacity-100">
      <div className="col-span-2" onClick={() => navigate("/")}>
        <div className="flex align-middle">
          <img className="w-12 h-12" src={logo} />
        </div>
      </div>
      <div className="col-span-17">
        <input />
      </div>
      {!user.token && (
        <>
          <div className="col-span-1" onClick={() => navigate("/login")}>
            <span className="pt-2 pb-2 inline-block align-middle">Login</span>
          </div>
          <div className="col-span-1" onClick={() => navigate("/signup")}>
            <span className="pt-2 pb-2 inline-block align-middle">Sign Up</span>
          </div>
        </>
      )}
      {user.token && (
        <>
          <div className="col-span-1" onClick={() => navigate("/user-info")}>
            <span className="pt-3 pb-2 inline-block align-middle">User</span>
          </div>
          <div className="p-1">
            <button
              className="text-white col-span-1 bg-blue-500 rounded p-2"
              onClick={() => navigate("/signup")}
            >
              Log Out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
