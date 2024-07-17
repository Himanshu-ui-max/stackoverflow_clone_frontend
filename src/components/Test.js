import React from 'react';

const HeroSection = () => {
  return (
    <div className='page'>
      
    <div className="bg-gradient-to-b from-white to-gray-200 text-black py-20 flex justify-center">
      <div className="w-1/2 text-center bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">
          Forgotten Password !!!
        </h1>
        <p className="text-gray-600 mb-8">
          NO worries, Get the OTP by clicking below and validate it by clicking below to change your password to new password
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600">
            Get OTP
          </button>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600">
            Validate OTP
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HeroSection;
