import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../store/counterSlice";
import { fetchProducts } from "../store/toolkitApi";
import banner from "../assets/banner.jpeg";

export const Counter = () => {
  const count = useSelector((store) => store.counterReducer);
  const product = useSelector((store) => store.productReducer);
  const dispatch = useDispatch();

  const fetchIncrement = () => {
    dispatch(increment());
    dispatch(fetchProducts(count.count + 1));
  };

  return (
    // <div className="text-center container border rounded bg-green-200 p-2">
    <div className={`bg-[url(${banner})] h-64 bg-cover bg-center pb-10`}>
      {/*  <!-- Content can be placed here, e.g., text, buttons -->}*/}
      <div className="flex items-center justify-center h-full bg-red-200 bg-opacity-1">
        <h1 className="text-white text-4xl font-bold">Welcome to The Site, Buy Or Sell Anything</h1>
      </div>
    </div>
    // </div>
  );
};
