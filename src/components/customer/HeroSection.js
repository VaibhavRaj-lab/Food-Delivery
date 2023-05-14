import React from 'react';

function HeroSection() {
    return (
        <div className="relative h-96">
            <div className="absolute inset-0 z-0">
                <img
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1589010588553-46e8e7c21788?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1260&q=80"
                    alt="Hero Background"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-90"></div>
            </div>
            <div className="flex flex-col justify-center items-center relative z-10 h-full">
                <h1 className="text-6xl font-extrabold text-white tracking-tight mb-6 text-center leading-tight">
                    The Greatest
                    <br />
                    Delivery
                </h1>
                <h2 className="text-3xl font-bold text-white tracking-tight mb-8 text-center">
                    Wishlists curated by TASTE.
                </h2>
                <button className="bg-white text-black font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-100">
                    Order Now
                </button>
            </div>
        </div>
    );
}

export default HeroSection;
