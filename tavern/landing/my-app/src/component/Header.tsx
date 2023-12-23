import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-semibold">Taverne Chrétienne</h1>
        <a href="/contact"><button className="bg-white text-blue-500 px-4 py-2 rounded">Me Contacter</button></a>
      </div>
    </header>
  );
};

export default Header;

