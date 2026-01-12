import React, { useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../store/productSlice";
import Arrow from "./Arrow";

const ProductHolder = () => {
  const prd = useSelector((store) => store.productReducer.products);
  const lastPage = useSelector((store) => store.productReducer.lastPage);
  const dispatch = useDispatch();
  const listInnerRef = useRef();

  const onClick = () => {
    dispatch(getProduct(lastPage+1))
  };

  // useEffect(() => {
  //   const listInnerElements = listInnerRef.current;
  //   if (listInnerElements) {
  //     listInnerElements.addEventListener("scroll", scroll);

  //     //clean-up
  //     listInnerElements.removeEventListener("scroll", scroll);
  //   }

  //   dispatch(getProduct(1));
  // }, []);

  useEffect(() => {
    dispatch(getProduct(1));
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* {prd.map((ele, indx) => ( */}
        {/* <> */}
        {/* <ProductCard /> */}
        {/* </> */}
        {/* ))} */}
        {Object.keys(prd).map((key) => (
          <ProductCard key={key} value={prd[key]} />
        ))}
      </div>
      <button
        onClick={onClick}
        // Position the button: fixed position, bottom-4 (1rem from bottom), right-4 (1rem from right)
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        aria-label="Add new item"
      >
        <Arrow />
      </button>
    </div>
  );
};

export default ProductHolder;
