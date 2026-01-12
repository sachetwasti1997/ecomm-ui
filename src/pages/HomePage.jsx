import React, { useEffect, useRef } from "react";
import { Counter } from "../counter/Counter";
import ProductCard from "../Layouts/ProductCard";
import ProductHolder from "../Layouts/ProductHolder";

const HomePage = () => {;

  return (
    <div className="overflow-y-auto" >
      <Counter />
      <ProductHolder />
    </div>
  );
};

export default HomePage;
