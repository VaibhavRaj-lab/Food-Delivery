import React, { useEffect, useState } from 'react'
import Logo from "../../img/logo.png";
import Avatar from "../../img/avatar.png";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";


function DeliveryBoyHeader() {
    const navigate = useNavigate()
    const [userName, setUserName] = useState('')
    useEffect(() => {
        const email = localStorage.getItem("email")
        const username = email.split("@")[0]
        setUserName(username)
    }, [])


    const logoutHandler = () => {
        navigate("/")
        localStorage.removeItem("email")
    }

    return (
        <header className="sticky top-0 z-50 w-full px-4 py-2 bg-red-100 shadow-md">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <a >

                        <img src={Logo} className="w-8 object-contain" alt="logo" />
                        <h1 className="text-headingColor text-xl font-bold">Zwigato</h1>
                    </a>
                </div>
                <nav className="hidden md:flex items-center gap-8">


                    <div className='flex flex-row'>
                        <img
                            src="https://cdn3.iconfinder.com/data/icons/essential-rounded/64/Rounded-31-512.png"
                            alt="User avatar"
                            className="w-8 h-8 rounded-full"
                        />
                        <span className="ml-2 font-medium">{userName}</span>
                    </div>


                    <div className="relative flex items-center justify-center" onClick={logoutHandler}>
                        {/* Add icon here */}
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-base font-medium transition-colors duration-200">
                            Logout
                        </button>
                    </div>
                </nav>
                <div className="md:hidden">
                    {/* Add icon here */}
                </div>
            </div>
        </header>
    )
}

export default DeliveryBoyHeader