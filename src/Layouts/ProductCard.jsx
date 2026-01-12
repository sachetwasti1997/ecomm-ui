import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({value}) => {
  const images = value['imagesDto'];
  const navigate = useNavigate();
  
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden" onClick={() => navigate(`/details/${value.id}`)}>
      {/* <!-- Product Image --> */}
      <img
        className="w-full h-48 object-cover"
        src={images ? images[images.length - 1].url: "default"}
        alt="Product Image"
      />

      {/* <!-- Card Body --> */}
      <div className="p-6">
        {/* <!-- Product Title --> */}
        <h4 className="text-xl font-semibold mb-2 text-gray-800">
          {value.title}
        </h4>
        {/* <!-- Product Description --> */}
        <p className="text-gray-600 mb-4 leading-normal">
          {value.description}
        </p>

        {/* <!-- Price & Button Container --> */}
        <div className="flex items-center justify-between">
          {/* <!-- Product Price --> */}
          <span className="text-2xl font-bold text-gray-900">${value.price}</span>

          {/* <!-- Add to Cart Button --> */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out shadow-md">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;


/*

category
: 
"womens-jewellery"
description
: 
"The Green Crystal Earring is a dazzling accessory that features a vibrant green crystal. With a classic design, it adds a touch of elegance to your ensemble, perfect for formal or special occasions."
discountPercentage
: 
15.24
id
: 
942
imagesDto
: 
(5) [{…}, {…}, {…}, {…}, {…}]
price
: 
29.99
rating
: 
3.96
reviews
: 
[]
stock
: 
54
tags
: 
(2) ['fashion accessories', 'earrings']
title
: 
"Green Crystal Earring"
*/