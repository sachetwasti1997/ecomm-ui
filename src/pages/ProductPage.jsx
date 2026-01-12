import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ProductPage = ({ productId }) => {
  // Use state to manage product data, loading, and errors (if fetching from API)
  // const [product, setProduct] = useState(null);

  // Mock product data for demonstration
  //   const product = {
  //     name: "Center [0] Premium Wireless Headphones",
  //     price: 349.99,
  //     description:
  //       "Experience premium sound quality and industry-leading noise cancellation with these wireless headphones. Perfect for music lovers and frequent travelers.",
  //     features: [
  //       "Industry-leading noise cancellation",
  //       "30-hour battery life",
  //       "Touch sensor controls",
  //       "Speak-to-chat technology",
  //     ],
  //     images: ["image1.jpg", "image2.jpg"],
  //     reviews: 120,
  //     rating: 4.5,
  //   };

  console.log(window.location.pathname.split("/"), productId);
  const [product, setProduct] = useState({});

  const fetchProduct = async () => {
    const id = window.location.pathname.split("/")[2];
    const res = await axios.post(
      `http://localhost:32500/product/get-products-async`,
      [id]
    );
    setProduct(res.data[0]);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const images = product.imagesDto;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column: Image Gallery */}
        <div className="md:w-1/2">
          {/* Main Image */}
          <img
            src={images ? images[images.length - 1].url : "default"}
            alt={product.title}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
          {/* Thumbnail Images */}
          <div className="flex gap-4 mt-4">
            <ul>
              {product.imagesDto &&
                product.imagesDto.forEach((element) => {
                  <li>This is </li>;
                })}
            </ul>
          </div>
        </div>

        {/* Right Column: Product Details & Actions */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <div className="flex items-center mb-4">
            <span className="text-xl font-semibold text-gray-800">
              ${product.price}
            </span>
            <span className="ml-4 text-sm text-gray-500">
              {product.rating} stars (
              {product.reviews ? product.reviews.length : 0} reviews)
            </span>
          </div>

          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Key Features:</h2>
            <ul className="list-disc list-inside text-gray-600">
              {product.tags &&
                product.tags.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
            </ul>
          </div>

          <div className="flex items-center gap-4">
            {/* Add to Cart Button */}
            <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200">
              Add to Cart
            </button>
            {/* Wishlist Button */}
            <button className="border border-gray-300 text-gray-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition duration-200">
              Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
