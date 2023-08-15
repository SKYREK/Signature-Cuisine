import React, { useState, useEffect } from "react";

const Slider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Auto move the slider every 5 seconds
    const autoMove = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(autoMove);
    };
  }, [images.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  return (
    <div className="relative w-full " data-carousel="slide">
      {/* Carousel wrapper */}
      <div className="relative h-96 md:h-72 overflow-hidden rounded-lg">
        {/* Carousel items */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 w-full h-full`}
            data-carousel-item
          >
            <img
              src={image.src}
              alt={image.alt}
              className="object-cover w-full h-full"
            />
            {image.discount && (
              <div className="discount-details absolute bottom-0 left-0 mb-4 ml-4">
                <p className="text-white bg-red-500 px-4 py-2 rounded">
                  {image.discount}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Slider indicators */}
      <div className="absolute z-30 flex space-x-2 -bottom-8 left-1/2 transform -translate-x-1/2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === currentSlide
                ? "bg-white/50 dark:bg-gray-800/60"
                : "bg-white/20 dark:bg-gray-800/40"
            }`}
            aria-current={index === currentSlide}
            aria-label={`Slide ${index + 1}`}
            data-carousel-slide-to={index}
          ></button>
        ))}
      </div>
      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-1/2 -left-8 z-30 flex items-center justify-center h-10 w-10 rounded-full bg-white dark:bg-gray-800 shadow-lg transform -translate-y-1/2 focus:outline-none"
        data-carousel-prev
        onClick={handlePrevSlide}
      >
        {/* Left arrow SVG */}
        <svg
          className="w-4 h-4 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
      </button>
      <button
        type="button"
        className="absolute top-1/2 -right-8 z-30 flex items-center justify-center h-10 w-10 rounded-full bg-white dark:bg-gray-800 shadow-lg transform -translate-y-1/2 focus:outline-none"
        data-carousel-next
        onClick={handleNextSlide}
      >
        {/* Right arrow SVG */}
        <svg
          className="w-4 h-4 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
      </button>
    </div>
  );
};

export default Slider;
