import React from 'react'
import { useState, useEffect } from "react";
import { ref, orderByChild, equalTo, get, off, query } from "firebase/database";
import { database } from "../../firebaseConfig";
import { useSubmit } from 'react-router-dom';
import Header from '../Header';





function ViewOrder() {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        const userEmail = localStorage.getItem("email");

        const dbRef = ref(database);
        console.log(dbRef)

        const restaurantRef = query(ref(database, 'users'), orderByChild('email'), equalTo(userEmail))
        console.log(restaurantRef)

        const fetchRestaurants = async () => {
            try {
                const snapshot = await get(restaurantRef);
                let arr;

                if (snapshot.exists()) {
                    const data = snapshot.val();
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                            const nestedObj = data[key];
                            console.log(nestedObj)
                            const billValue = nestedObj.orders
                            console.log(billValue)
                            const arr = [];
                            if (billValue) {
                                const billsList = Object.keys(billValue).map((id) => ({ id, ...billValue[id] }))

                                console.log("31", billsList)
                                for (let i = billsList.length - 1; i >= 0; i--) {
                                    arr.push(billsList[i])
                                }
                            }
                            setOrders(arr)
                            console.log(arr)
                            localStorage.setItem('order', JSON.stringify(arr))
                            let arr1 = [];
                            arr.forEach(obj => {
                                arr1.push(...obj.cartItems);
                                arr1.push(obj.date);

                            });
                            // setOrders(arr1)
                            console.log(arr1)
                        }
                    }
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchRestaurants();

        // Cleanup function
        return () => {
            off(restaurantRef);
        };
    }, []);

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Note: January is 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const renderCartItems = (cartItems) => {
        return cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b">
                <div className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded-lg" />
                    <div>
                        <h3 className="text-lg font-medium">{item.name}</h3>
                        <p className="text-gray-600">{item.category}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-gray-600">{item.price}</span>
                    <span className="text-gray-600">x {item.qty}</span>
                    <span className="font-medium">{(item.price * item.qty)}</span>
                </div>
            </div>
        ));
    };

    const renderOrders = () => {
        return orders.map((order) => (
            <div key={order.id} className="bg-white shadow rounded-lg mb-4">
                <div className="p-4">
                    <h2 className="text-xl font-medium mb-2">Order #{order.id}</h2>

                    <h2 className="text-xl font-medium mb-2">Date : {formatDate(order.date)}</h2>
                    <div className="mb-2">
                        <span className="font-medium">Shipping address:</span>{' '}
                        {`${order.fullName}, ${order.streetAddress} ${order.streetNumber}, ${order.city}, ${order.state} ${order.zipCode}`}
                    </div>
                    <div className="border-t border-gray-300 mt-4">

                        {renderCartItems(order.cartItems)}
                        <div className="mb-2">
                            <span className="font-medium">Shipping address:</span>{' '}
                            {order.restaurantAddress
                            }
                        </div>
                        <div className="py-2 flex justify-end">
                            <span className="font-medium mr-2">Total:</span>
                            <span className="font-medium">{(order.cartItems.reduce((total, item) => total + (item.price * item.qty), 0))}</span>
                        </div>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <>
            <Header></Header>
            <div className="max-w-3xl mx-auto ">
                <p className="text-4xl mb-7 font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-36 before:h-1 before:-bottom-2 before:left-200 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto text-center">
                    Your Orders
                </p>
                {orders.length ? renderOrders() : <p className="text-gray-600">You have no orders yet.</p>}
            </div>
        </>
    );

}

export default ViewOrder