import React, { useState, useEffect } from 'react';
import img1 from '../../assets/img1.jpeg';
import img2 from '../../assets/img2.jpeg';
import img3 from '../../assets/img3.jpeg';
import img4 from '../../assets/img4.jpeg';
import img5 from '../../assets/img5.jpeg';

const AyushStartup = () => {
  const slides = [
    {
      title: "Ayush Startup Registration",
      description: "Get your Ayush-based startup recognized and leverage government incentives and resources.",
      buttonText: "Register Now",
      imgSrc: img1,
      bgColor: "#d1e7dd", // Light green
    },
    {
      title: "Why Register Your Ayush Startup?",
      description: "Access to funding, mentorship, and a network of like-minded entrepreneurs in the Ayush sector.",
      buttonText: "Learn More",
      imgSrc: img2,
      bgColor: "#d6e0f0", // Light blue
    },
    {
      title: "Government Support for Ayush Startups",
      description: "Explore various government schemes tailored for Ayush startups to help you scale your business.",
      buttonText: "Explore Schemes",
      imgSrc: img3,
      bgColor: "#f0e6d6", // Light beige
    },
    {
      title: "Innovate in the Ayush Sector",
      description: "Leverage traditional knowledge and modern technology to create innovative Ayush products.",
      buttonText: "Start Innovating",
      imgSrc: img4,
      bgColor: "#fce5c4", // Light orange
    },
    {
      title: "Join the Ayush Startup Community",
      description: "Connect with other Ayush entrepreneurs and share knowledge and resources.",
      buttonText: "Join Now",
      imgSrc: img5,
      bgColor: "#d9f7be", // Light green
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        setAnimating(false);
      }, 300); // Animation duration
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-green-100 bg-cover bg-center"
      style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/ayurvedic-spices_6751-83.jpg?size=626&ext=jpg&ga=GA1.1.1532003599.1724182688&semt=ais_hybrid')" }}>
      {/* Main Container */}
      <div className="max-w-7xl w-full p-4 sm:p-8 lg:p-12">
        {/* Carousel */}
        <div
          className={`relative p-6 sm:p-8 lg:p-12 rounded-lg shadow-lg transition-all duration-500 ease-in-out ${animating ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}
          style={{ backgroundColor: slides[currentIndex].bgColor }}
        >
          <div className="flex flex-col sm:flex-row items-center">
            <div className="sm:w-3/4">
              <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black">
                {slides[currentIndex].title}
              </h1>
              <p className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-black">
                {slides[currentIndex].description}
              </p>
              <button className="mt-6 bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">
                {slides[currentIndex].buttonText}
              </button>
            </div>
            <div className="sm:w-1/4 flex justify-center items-center mt-4 sm:mt-0">
              <img
                src={slides[currentIndex].imgSrc}
                alt={`Slide ${currentIndex + 1}`}
                className="w-32 sm:w-48 md:w-56 lg:w-72 transition-transform duration-500 ease-in-out transform hover:scale-105"
              />
            </div>
          </div>
          <div className="absolute bottom-0 w-full flex justify-center mt-4">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 mx-1 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-blue-500 scale-125' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-8 p-6 rounded-lg shadow-md bg-transparent">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            <StatItem count="10,000+" label="AYURVEDA" />
            <StatItem count="500,000+" label="YOGA registration" />
            <StatItem count="500,000+" label="UNANI registration" />
            <StatItem count="500,000+" label="SIDDHA registration" />
            <StatItem count="500,000+" label="HOMEOPATHY registration" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Statistic Item Component
const StatItem = ({ count, label }) => (
  <div className="text-center p-4 bg-green-50 rounded-lg shadow-md transition-all duration-300 hover:bg-green-100 hover:shadow-lg">
    <p className="text-2xl font-bold text-green-600">{count}</p>
    <p className="text-sm text-gray-700">{label}</p>
  </div>
);

export default AyushStartup;
