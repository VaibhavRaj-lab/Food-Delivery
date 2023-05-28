import { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import CustomerComponent from "./CustomerComponent";
import CustomerCart from "./CustomerCart";
import { useStateValue } from "../../context/StateProvider";
import { MdShoppingBasket } from "react-icons/md";
import { actionType } from "../../context/reducer";
import HeroSection from "./HeroSection";
import { useNavigate } from "react-router-dom";
import Logo from "../../img/logo.png";

function CustomerHeader() {
    const email = localStorage.getItem("email")
    const [state, setState] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate()
    const handleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const [scrollValue, setScrollValue] = useState(0);
    const [{ cartShow, cartItems }, dispatch] = useStateValue();
    useEffect(() => {

    }, [scrollValue, cartShow]);

    const handleStateChange = (event) => {
        setState(event.target.value);
        console.log(state)
    };
    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        });
    };
    const restaurants = JSON.parse(localStorage.getItem("restaurants"))
    console.log(restaurants)

    const filteredRestaurants = state
        ? restaurants.filter((restaurant) =>
            restaurant.city === state)
        : restaurants;
    const username = email.split("@")[0]

    const logoutHandler = () => {

        navigate("/")
        localStorage.removeItem("email")

    }
    return (
        <>
            <Fragment>
                <header className="bg-white fixed w-full z-50">
                    <div className="max-w-screen-lg mx-auto flex justify-between items-center py-3 px-4">
                        <div className="flex-shrink-0">
                            <a href="/customerHeader" >

                                <img src={Logo} className="w-8 object-contain" alt="logo" />
                                <h1 className="text-headingColor text-xl font-bold">Zwigato</h1>
                            </a>
                        </div>
                        <div className="flex-1 mx-4">
                            <div className="relative text-gray-400 focus-within:text-gray-600">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2 cursor-pointer" onClick={handleStateChange}>
                                    <FontAwesomeIcon icon={faSearch} />
                                </span>
                                <input
                                    type="text"
                                    className="block w-full py-2 pl-10 pr-3 text-gray-900 placeholder-gray-500 rounded-lg border border-transparent focus:outline-none focus:placeholder-gray-400 focus:border-blue-500 focus:shadow-outline-blue sm:text-sm sm:leading-5"
                                    placeholder="Search for your State Capital"
                                    disabled
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                                    <select
                                        className="block form-select w-full sm:text-sm sm:leading-5"
                                        value={state}
                                        onChange={handleStateChange}
                                    >
                                        <option value="">--Select a Capital City--</option>
                                        <option value="Amaravati">Amaravati (Andhra Pradesh)</option>
                                        <option value="Itanagar">Itanagar (Arunachal Pradesh)</option>
                                        <option value="Dispur">Dispur (Assam)</option>
                                        <option value="Patna">Patna (Bihar)</option>
                                        <option value="Raipur">Raipur (Chhattisgarh)</option>
                                        <option value="Panaji">Panaji (Goa)</option>
                                        <option value="Gandhinagar">Gandhinagar (Gujarat)</option>
                                        <option value="Chandigarh">Chandigarh (Haryana)</option>
                                        <option value="Shimla">Shimla (Himachal Pradesh)</option>
                                        <option value="Srinagar">Srinagar (Jammu and Kashmir)</option>
                                        <option value="Ranchi">Ranchi (Jharkhand)</option>



                                        <option value="Bengaluru">Bengaluru (Karnataka)</option>
                                        <option value="Thiruvananthapuram">Thiruvananthapuram (Kerala)</option>
                                        <option value="Bhopal">Bhopal (Madhya Pradesh)</option>
                                        <option value="Mumbai">Mumbai (Maharashtra)</option>
                                        <option value="Imphal">Imphal (Manipur)</option>
                                        <option value="Shillong">Shillong (Meghalaya)</option>
                                        <option value="Aizawl">Aizawl (Mizoram)</option>
                                        <option value="Kohima">Kohima (Nagaland)</option>
                                        <option value="Bhubaneswar">Bhubaneswar (Odisha)</option>
                                        <option value="Chandigarh">Chandigarh (Punjab)</option>
                                        <option value="Jaipur">Jaipur (Rajasthan)</option>
                                        <option value="Gangtok">Gangtok (Sikkim)</option>
                                        <option value="Chennai">Chennai (Tamil Nadu)</option>
                                        <option value="Hyderabad">Hyderabad (Telangana)</option>
                                        <option value="Agartala">Agartala (Tripura)</option>
                                        <option value="Lucknow">Lucknow (Uttar Pradesh)</option>
                                        <option value="Dehradun">Dehradun (Uttarakhand)</option>
                                        <option value="Kolkata">Kolkata (West Bengal)</option>
                                        {/* Add more options here */}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center relative ">
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
                                            <li className="px-4 py-2 hover:bg-gray-100 " onClick={logoutHandler}>
                                                Logout
                                            </li>

                                        </ul>
                                    </div>
                                )}
                            </button>
                            <div
                                className="relative flex items-center justify-center m-7"
                                onClick={showCart}
                            >
                                <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer" />
                                {cartItems && cartItems.length > 0 && (
                                    <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                                        <p className="text-xs text-white font-semibold">
                                            {cartItems.length}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="h-16"></div>

            </Fragment>
            <div className="mt-11">
                <HeroSection></HeroSection>
            </div>
            <p className="text-4xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-36 before:h-1 before:-bottom-2 before:left-200 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto text-center mt-7">
                Our Restaurant
            </p>
            <CustomerComponent restaurants={filteredRestaurants} ></CustomerComponent>
            {cartShow && <CustomerCart />}
        </>
    );
}

export default CustomerHeader