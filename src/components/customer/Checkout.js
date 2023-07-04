import React, { useEffect, useState } from "react";
import CustomerHeader from "./CustomerHeader";
import AlternateHeader from "./AlternateHeader";
import { auth, database } from '../../firebaseConfig';
import { ref, set, query, get, orderByChild, equalTo, child, push } from 'firebase/database';
import { useNavigate, useSubmit } from "react-router-dom";
import axios from "axios";


import { loadStripe } from '@stripe/stripe-js';


const Checkout = () => {
    const navigate = useNavigate
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [formData, setFormData] = useState({
        fullName: "",
        streetNumber: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        date: Date.now()
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [eroor, setError] = useState(false)
    // const history = useHistory();



    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("cartItems"));

        if (items) {
            setCartItems(items);
            let total = 0;
            items.forEach((item) => {
                total += item.price * item.qty;
            });
            setTotalPrice(total);
        }
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        console.log(formData)
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Submit form data
        const email = localStorage.getItem("email");

        // Clear form data
        setFormData({
            fullName: "",
            streetNumber: "",
            streetAddress: "",
            city: "",
            state: "",
            zipCode: "",
            date: Date.now()
        });

        const billRef = query(ref(database, 'users'), orderByChild('email'), equalTo(email));
        const userSnapshot = await get(billRef);
        const obj = userSnapshot.val();
        const userId = Object.keys(userSnapshot.val())[0];
        const userBillRef = child(billRef, `${userId}/orders`);

        // Save the order in the user's orders
        const orderId = push(userBillRef, { ...formData, cartItems }).key;

        const restaurantEmail = cartItems[0].email;
        const userQuery = query(ref(database, 'users'), orderByChild('email'), equalTo(restaurantEmail));

        // Retrieve the restaurant's user ID
        const restaurantSnapshot = await get(userQuery);
        const restaurantId = Object.keys(restaurantSnapshot.val())[0];

        // Save the order in the restaurant's orders with the same ID
        const restaurantOrderRef = ref(database, `users/${restaurantId}/orders/${orderId}`);
        await set(restaurantOrderRef, { cartItems, date: Date.now(), email, restaurantEmail });
        console.log(cartItems)
        await handleCheckout()

        setError(true);

        navigate("/customerOrder");

        // Clear cart items
        localStorage.removeItem("cartItems");
        setTotalPrice(0);

    };
    const handleFormSubmitCod = async (e) => {
        e.preventDefault();

        // Submit form data
        const email = localStorage.getItem("email");

        // Clear form data
        setFormData({
            fullName: "",
            streetNumber: "",
            streetAddress: "",
            city: "",
            state: "",
            zipCode: "",
            date: Date.now()
        });

        const billRef = query(ref(database, 'users'), orderByChild('email'), equalTo(email));
        const userSnapshot = await get(billRef);
        const obj = userSnapshot.val();
        const userId = Object.keys(userSnapshot.val())[0];
        const userBillRef = child(billRef, `${userId}/orders`);

        // Save the order in the user's orders
        const orderId = push(userBillRef, { ...formData, cartItems }).key;

        const restaurantEmail = cartItems[0].email;
        const userQuery = query(ref(database, 'users'), orderByChild('email'), equalTo(restaurantEmail));

        // Retrieve the restaurant's user ID
        const restaurantSnapshot = await get(userQuery);
        const restaurantId = Object.keys(restaurantSnapshot.val())[0];

        // Save the order in the restaurant's orders with the same ID
        const restaurantOrderRef = ref(database, `users/${restaurantId}/orders/${orderId}`);
        await set(restaurantOrderRef, { cartItems, date: Date.now(), email, restaurantEmail });
        navigate("/customerOrder");
        setErrorMessage("Order Successfull")
        console.log(cartItems)


        setError(true);

        // Clear cart items
        localStorage.removeItem("cartItems");
        setTotalPrice(0);

    };

    const handleCheckout = async () => {
        try {
            // Replace 'YOUR_SERVER_ENDPOINT' with your actual server endpoint
            const response = await axios.post('http://localhost:5001/checkout', {
                items: cartItems,
                totalPrice: totalPrice,
            });

            // Redirect the user to the Stripe Checkout page
            window.location.href = response.data.redirectUrl;
        } catch (error) {
            // Handle error
            console.error('Error during checkout:', error);
        }
    };
    return (
        <>
            <>
                <AlternateHeader></AlternateHeader>
            </>
            <div className="flex flex-row justify-center items-start p-8">

                <div className="flex flex-col w-full p-6 md:w-1/2">
                    <h2 className="mb-8 text-xl font-bold text-gray-700">Shipping Address</h2>
                    <form className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="full-name">
                                Full Name (First and Last name)
                            </label>
                            <input
                                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-400 rounded-md focus:border-indigo-500 focus:outline-none focus:shadow-outline-indigo"
                                id="full-name"
                                type="text"
                                placeholder="John Doe"
                                onChange={handleInputChange}
                                name="fullName"


                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="street-number">
                                Street number
                            </label>
                            <input
                                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-400 rounded-md focus:border-indigo-500 focus:outline-none focus:shadow-outline-indigo"
                                id="street-number"
                                type="text"
                                onChange={handleInputChange}
                                name="streetNumber"
                                placeholder="123"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="street-address">
                                Street address
                            </label>
                            <input
                                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-400 rounded-md focus:border-indigo-500 focus:outline-none focus:shadow-outline-indigo"
                                id="street-address"
                                type="text"
                                onChange={handleInputChange}
                                name="streetAddress"
                                placeholder="123 Main St"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="city">
                                City
                            </label>
                            <input
                                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-400 rounded-md focus:border-indigo-500 focus:outline-none focus:shadow-outline-indigo"
                                id="city"
                                type="text"
                                onChange={handleInputChange}
                                name="city"
                                placeholder="San Francisco"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="state">
                                State / Province / Region
                            </label>
                            <input
                                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-400 rounded-md focus:border-indigo-500 focus:outline-none focus:shadow-outline-indigo"
                                id="state"
                                type="text"
                                onChange={handleInputChange}
                                name="state"
                                placeholder="California"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="zip">
                                PIN Code
                            </label>
                            <input
                                onChange={handleInputChange}
                                name="zipCode"
                                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-400 rounded-md focus:border-indigo-500 focus:outline-none focus:shadow-outline-indigo"
                                id="zip"
                                type="text"
                                placeholder="12345"
                            />
                        </div>
                        {/* <button className="bg-orange-500 text-white py-2 px-4 rounded-md mt-4 " onClick={handleFormSubmit}>Save</button> */}

                    </form>
                </div>
                {/* Order history */}
                <div className="w-1/4 mt-4">
                    <h2 className="text-xl font-medium mb-4">Order History</h2>
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex flex-row items-center justify-between mb-2">
                            <div className="flex flex-row items-center">
                                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md mr-2" />
                                <div>
                                    <p className="text-sm font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-400">{item.qty} x {item.price}</p>
                                </div>
                            </div>
                            <p className="text-sm font-medium">₹{item.qty * item.price}</p>
                        </div>
                    ))}
                    <div className="flex flex-row items-center justify-between mt-4">
                        <p className="text-sm font-medium">Total</p>
                        <p className="text-sm font-medium">₹ {totalPrice}</p>
                    </div>
                    <button className="bg-green-500 text-white py-2 px-4 rounded-md mt-4" onClick={handleFormSubmit}>CHECKOUT WITH STRIPE</button>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4" onClick={handleFormSubmitCod}>CASH ON DELIVERY</button>

                    {errorMessage && <div style={{
                        marginTop: "20px",
                        padding: "10px",
                        borderRadius: "5px",
                        color: "#721c24",
                        backgroundColor: "#f8d7da",
                        borderColor: "#f5c6cb",
                    }} >{errorMessage}</div>}

                </div>
            </div>

        </>
    );
};

export default Checkout;




