import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import { useStateValue } from "../../context/StateProvider";
import { MdShoppingBasket } from "react-icons/md";
import { actionType } from "../../context/reducer";
import CustomerCart from './CustomerCart';
import { useNavigate } from 'react-router-dom';
import Logo from "./../../img/logo.png"

function AlternateHeader() {
    const email = localStorage.getItem("email")
    const navigate = useNavigate()
    const [{ cartShow, cartItems }, dispatch] = useStateValue();
    const username = email.split("@")[0];
    const showCart = () => {
        console.log(true)
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        });
    };
    const [showDropdown, setShowDropdown] = useState(false);
    const handleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    const logoutHandler = () => {
        navigate("/")
        localStorage.removeItem("email")
    }
    return (

        <div className="max-w-screen-lg mx-auto flex justify-between items-center py-3 px-4">
            <div className="flex-shrink-0">
                <a href="/customerHeader" >

                    <img src={Logo} className="w-8 object-contain" alt="logo" />
                    <h1 className="text-headingColor text-xl font-bold">Zwigato</h1>
                </a>
            </div>
            <div className="flex-1 mx-4">
                <div className="relative text-gray-400 focus-within:text-gray-600">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2 cursor-pointer">
                        <FontAwesomeIcon icon={faSearch} />
                    </span>
                    <input
                        type="text"
                        className="block w-full py-2 pl-10 pr-3 text-gray-900 placeholder-gray-500 rounded-lg border border-transparent focus:outline-none focus:placeholder-gray-400 focus:border-blue-500 focus:shadow-outline-blue sm:text-sm sm:leading-5"
                        placeholder="Search for your State Capital"
                        disabled
                    />
                </div>
            </div>
            <div className="flex items-center relative">
                <button className="flex items-center mr-4 text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900" onClick={handleDropdown}>
                    <div>
                        <img
                            src="https://cdn3.iconfinder.com/data/icons/essential-rounded/64/Rounded-31-512.png"
                            alt="User avatar"
                            className="w-8 h-8 rounded-full"
                        />
                        <span className="ml-2 font-medium">{username}</span>
                    </div>
                    {showDropdown && (
                        <div className="absolute right-0 top-10 bg-white border rounded-lg z-10">
                            <ul>
                                <li className="px-4 py-2 hover:bg-gray-100">
                                    <a href="/customerOrder">Orders</a>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100">
                                    <a href="/editProfile">Profile</a>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100">
                                    <a onClick={logoutHandler}>Logout</a>
                                </li>
                            </ul>
                        </div>
                    )}
                </button>

            </div>
            <div
                className="relative flex items-center justify-center m-7"
                onClick={showCart}
            >
                <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer" />
                {cartItems && cartItems.length > 0 && (
                    <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-orange-600 flex items-center justify-center">
                        <p className="text-xs text-white font-semibold">
                            {cartItems.length}
                        </p>
                    </div>
                )}
            </div>
            {cartShow && <CustomerCart></CustomerCart>}
        </div>

    )
}

export default AlternateHeader