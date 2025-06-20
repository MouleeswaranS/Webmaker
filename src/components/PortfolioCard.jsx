import React from "react";
import PropTypes from "prop-types";

const PortfolioCard = ({ item, isGrid = false }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4">
      <img
        src={item.image}
        alt={item.title}
        className={`rounded-2xl shadow-xl object-cover transition-transform duration-500 ${
          isGrid
            ? "w-full aspect-[4/3] hover:scale-105"
            : "w-[75vw] h-[70vh]"
        }`}
      />
      <h3 className="text-xl md:text-2xl font-semibold text-white mt-4">
        {item.title}
      </h3>
      {item.description && (
        <p className="text-gray-300 text-sm md:text-base max-w-md mt-1">
          {item.description}
        </p>
      )}
    </div>
  );
};

PortfolioCard.propTypes = {
  item: PropTypes.object.isRequired,
  isGrid: PropTypes.bool,
};

export default PortfolioCard;
