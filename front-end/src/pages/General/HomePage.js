import React from 'react';
import Header from '../../components/Header';

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-primary-dark h-screen">
      {/* Wrapper with background image */}
      <div
        className="relative w-full h-full bg-cover bg-center flex flex-col items-center text-white"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/11884556/pexels-photo-11884556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        }}
      >
        {/* Header with adjusted spacing from the top */}
        <div className="mt-8 w-full flex justify-center">
          <Header />
        </div>

        {/* Title with margin to space it below the navbar */}
        <h1 className="text-4xl font-bold mb-6 bg-black bg-opacity-60 p-4 rounded-md mt-20">
          Welcome to Myanmar Flood Platform
        </h1>
      </div>
    </div>
  );
}

export default HomePage;
