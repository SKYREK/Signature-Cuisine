import React from "react";
import Slider from "./Slider"; // Assuming that Slider.jsx is in the same directory as HomeTab.jsx

const HomeTab = () => {
  // Sample images for the slider
  const images = [
    {
      src: "https://images.unsplash.com/photo-1592861956120-e524fc739696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      alt: "Sample image 1",
      discount: "Happy Hour: Buy 1 Get 1 Free on drinks!",
    },
    {
      src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      alt: "Sample image 2",
      discount: "Enjoy 20% off on our special dishes!",
    },
    {
      src: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      alt: "Sample image 3",
    },
    // Add more images as needed...
  ];

  return (
    <div className="w-full flex flex-col p-8">
      {/* Image Slider */}
      <Slider images={images} />

      {/* About Us */}
      <section className="about-us mt-28">
        <h2 className="text-3xl font-bold mb-4">Welcome to Signature Cuisine</h2>
        <p className="text-lg">
          At [Restaurant Name], we are passionate about serving you
          exceptional food and creating unforgettable dining experiences. Our
          restaurant is a reflection of our commitment to providing
          mouthwatering dishes made from the finest ingredients, all served in
          a warm and welcoming atmosphere.
        </p>
        <p className="text-lg mt-4">
          Our team of talented chefs takes great pride in crafting every
          dish with creativity and attention to detail, ensuring that each
          bite is a delightful experience for your taste buds. We believe in
          using fresh, locally sourced ingredients to bring out the true
          flavors of our dishes, and we are dedicated to delivering the
          highest quality in every plate we serve.
        </p>
        <p className="text-lg mt-4">
          Whether you're joining us for a casual lunch, a romantic dinner, or
          a special celebration, our friendly staff is here to make your
          visit memorable. We strive to exceed your expectations and provide
          personalized service that leaves a lasting impression on our
          guests.
        </p>
        <p className="text-lg mt-4">
          Thank you for choosing [Restaurant Name]. We look forward to
          welcoming you and creating a dining experience that will keep you
          coming back for more.
        </p>
      </section>

      {/* Special Dishes */}
      <section className="special-dishes mt-8">
        <h2 className="text-3xl font-bold mb-4">Special Dishes</h2>
        {/* Add your special dishes here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <img
              src="https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
              alt="Special Dish 1"
              className="w-full h-40 object-cover mb-4 rounded-md"
            />
            <h3 className="text-lg font-semibold">Grilled Salmon Steak</h3>
            <p className="text-sm text-gray-600">
            A mouthwatering grilled salmon steak seasoned with a delightful blend of herbs and spices. Served with a side of fresh seasonal vegetables and a tangy lemon dill sauce. The salmon's tender and flaky texture, combined with the perfectly balanced flavors, creates a delightful culinary experience.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <img
              src="https://images.unsplash.com/photo-1596797038530-2c107229654b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80"
              alt="Special Dish 1"
              className="w-full h-40 object-cover mb-4 rounded-md"
            />
            <h3 className="text-lg font-semibold">Creamy Chicken Alfredo</h3>
            <p className="text-sm text-gray-600">
            Creamy Chicken Alfredo is a classic Italian-inspired pasta dish. It features tender pieces of grilled chicken served over a bed of fettuccine noodles, all smothered in a rich and velvety Alfredo sauce made with Parmesan cheese, butter, and cream. Topped with a sprinkle of fresh parsley and grated Parmesan for an extra touch of flavor.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <img
              src="https://plus.unsplash.com/premium_photo-1675715403284-9fa4a961b06f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="Special Dish 1"
              className="w-full h-40 object-cover mb-4 rounded-md"
            />
            <h3 className="text-lg font-semibold">Vegetarian Stuffed Bell Peppers</h3>
            <p className="text-sm text-gray-600">
            A delicious and nutritious vegetarian option, the Stuffed Bell Peppers are a colorful medley of flavors. Roasted bell peppers are filled with a savory mix of quinoa, black beans, diced tomatoes, onions, and a blend of spices. Topped with melted cheese and fresh herbs, these stuffed peppers are both satisfying and wholesome.
            </p>
          </div>
          {/* Add more special dishes */}
        </div>
      </section>

      {/* Contact Us */}
      <section className="contact-us mt-8">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <form className="mt-4">
          <div className="form-group">
            <label htmlFor="name" className="block font-semibold mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="email" className="block font-semibold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="message" className="block font-semibold mb-2">
              Message:
            </label>
            <textarea
              id="message"
              rows="4"
              className="w-full px-4 py-2 border rounded"
            ></textarea>
          </div>
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
          >
            Submit
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer mt-8 text-center">
        <p>&copy; {new Date().getFullYear()} Signature Cuisine. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomeTab;
