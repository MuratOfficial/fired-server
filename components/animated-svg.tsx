import React from 'react';

const AnimatedSVG: React.FC = () => {
  return (
    <div className="flex justify-center items-center  ">
        <svg
        className="w-16 h-16 animate-rotate"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="10"
          y="10"
          width="80"
          height="80"
          fill="currentColor"
          className=" animate-shapeChange "
        />
      </svg>
    </div>
  );
};

export default AnimatedSVG;
