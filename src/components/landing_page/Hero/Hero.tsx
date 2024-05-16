import React from "react";

const Hero = () => {
  // const [priceValue, setPriceValue] = React.useState(30);

  return (
    <div className=" bg-black/20 h-full">
      <div className="h-full flex items-center p-4 bg-primary/10">
        <div className="container grid grid-cols-1 gap-4">
          <div className="text-white">
            <p data-aos="fade-up" className="text-5xl font-mono border-4 border-teal-500 inline-block rounded p-2">
            TDocman
            </p>
            <p
              data-aos="fade-up"
              data-aos-delay="300"
              className="font-bold text-5xl"
            >
              Contracts, Simplified. Management, Amplified
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className="space-y-4 rounded-md py-4"
          >
            
            <button className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:scale-105 px-8 py-5 text-xl rounded-full duration-200">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
