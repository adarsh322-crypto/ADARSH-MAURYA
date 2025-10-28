
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between text-white">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
            <i className="fa-solid fa-thermometer-half text-xl text-white"></i>
        </div>
        <h1 className="text-2xl font-bold">AI Fever Check</h1>
      </div>
      <button className="w-10 h-10 flex items-center justify-center">
        <i className="fa-solid fa-gear text-xl"></i>
      </button>
    </header>
  );
};

export default Header;
