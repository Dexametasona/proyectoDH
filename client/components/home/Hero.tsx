import React from "react";

const Hero = () => {
  return (
    <div
      className="relative h-64 sm:h-96 bg-cover bg-center bg-no-repeat flex items-center justify-center text-center"
      style={{ backgroundImage: "url(/assets/images/hero-bg.png)" }}
    >
     <div className="relative z-10 text-white px-4">
        <h3 className="text-lg font-bold">TODO</h3>
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-2">LO QUE NECESITAS</h2>
        <h3 className="text-lg font-bold">PARA TU FIESTA</h3>
      </div>
    </div>
  );
};

export default Hero;
