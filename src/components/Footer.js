import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
const Footer = () => {
    return (
        <footer className="bg-gray-800 pt-10 sm:mt-10 pt-10">
            <div className="max-w-6xl m-auto text-gray-800 flex flex-wrap justify-left">
                {/* Column 1 */}


                {/* Column 2 */}
                <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
                    <div className="text-xs uppercase text-gray-400 font-medium mb-6">
                        Social Media
                    </div>
                    <a href="/" className="my-3 block text-gray-300 hover:text-white">
                        <FaFacebook className="inline mr-2" />
                        Facebook
                    </a>
                    <a href="/" className="my-3 block text-gray-300 hover:text-white">
                        <FaInstagram className="inline mr-2" />
                        Instagram
                    </a>
                    <a href="/" className="my-3 block text-gray-300 hover:text-white">
                        <FaTwitter className="inline mr-2" />
                        Twitter
                    </a>
                </div>

                {/* Column 3 */}
                <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
                    <div className="text-xs uppercase text-gray-400 font-medium mb-6">
                        Contact Us
                    </div>
                    <p className="my-3 block text-gray-300 hover:text-white">
                        Uttar Pradesh
                    </p>
                    <p className="my-3 block text-gray-300 hover:text-white">
                        Dasna
                    </p>
                    <p className="my-3 block text-gray-300 hover:text-white">
                        8383997202
                    </p>
                </div>
                <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
                    <p className="text-gray-400">© 2023 Zwigato. All rights reserved.</p>
                    <ul className="flex space-x-4">
                        <li><a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook"></i></a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
