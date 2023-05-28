import React, { useEffect, useState } from 'react'
import { ref, orderByChild, equalTo, get, off, query, update, remove, onValue } from "firebase/database";

import { database } from "../../firebaseConfig";
import Header from '../Header';
import DeliveryBoyHeader from './DeliveryBoyHeader';

function DeliveryBoyComponent() {
    const [restaurant, setRestaurant] = useState([])
    const [userEmail, setUserEmail] = useState("")

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Note: January is 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    useEffect(() => {

        const dbRef = ref(database);
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data)
            if (data) {
                const restaurants = Object.values(data.users).reduce((acc, user) => {
                    if (user.userType == "restaurant") {
                        console.log(user.userType)
                        if (user.orders) {
                            console.log(user.orders)
                            const billsList = Object.keys(user.orders).map((id) => ({ id, ...user.orders[id] }))

                            acc.push(...billsList);
                        }
                    }
                    console.log(acc)

                    return acc;
                }, []);
                console.log(restaurants)
                setRestaurant(restaurants)
                localStorage.setItem("restaurants", JSON.stringify(restaurants))
            }
        });
    }, [setUserEmail]);

    const updateOrderVerified = (orderId, restaurantEmail, customerEmail, verifiedStatus) => {

        const usersRef = ref(database, "users");

        get(usersRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const users = snapshot.val();
                    let userId = null;

                    // Find the user with the provided email
                    for (const key in users) {
                        if (users[key].email === restaurantEmail) {
                            userId = key;
                            break;
                        }
                    }

                    if (userId) {
                        const ordersRef = ref(database, `users/${userId}/orders/${orderId}`);
                        console.log(ordersRef)
                        get(ordersRef)
                            .then((orderSnapshot) => {
                                if (orderSnapshot.exists()) {
                                    const orderData = orderSnapshot.val();
                                    // Update the verified field to true
                                    const deliveryBoyRest = localStorage.getItem("email")

                                    const usernameRest = deliveryBoyRest.split("@")[0]
                                    orderData.pickup = verifiedStatus;
                                    orderData.deliveryBoy = usernameRest;
                                    // Update the order
                                    update(ref(database), {
                                        [`users/${userId}/orders/${orderId}`]: orderData,
                                    })
                                        .then(() => {
                                            console.log("Order verified successfully.");
                                            const usersRef = ref(database, "users");

                                            get(usersRef)
                                                .then((snapshot) => {
                                                    if (snapshot.exists()) {
                                                        const users = snapshot.val();
                                                        let userId = null;

                                                        // Find the user with the provided email
                                                        for (const key in users) {
                                                            if (users[key].email === customerEmail) {
                                                                userId = key;
                                                                break;
                                                            }
                                                        }

                                                        if (userId) {
                                                            const ordersRef = ref(database, `users/${userId}/orders/${orderId}`);
                                                            console.log(ordersRef)
                                                            get(ordersRef)
                                                                .then((orderSnapshot) => {
                                                                    if (orderSnapshot.exists()) {
                                                                        const orderData = orderSnapshot.val();
                                                                        // Update the verified field to true
                                                                        const deliveryBoy = localStorage.getItem("email")
                                                                        const username = deliveryBoy.split("@")[0]
                                                                        orderData.pickup = verifiedStatus;
                                                                        orderData.deliveryBoy = username;



                                                                        // Update the order
                                                                        update(ref(database), {
                                                                            [`users/${userId}/orders/${orderId}`]: orderData,
                                                                        })
                                                                            .then(() => {
                                                                                console.log("Order verified successfully.");

                                                                                setUserEmail("sda")

                                                                            })
                                                                            .catch((error) => {
                                                                                console.error("Failed to update order:", error);
                                                                            });
                                                                    } else {
                                                                        console.error("Order not found.");
                                                                    }
                                                                })
                                                                .catch((error) => {
                                                                    console.error("Error retrieving order:", error);
                                                                });
                                                        } else {
                                                            console.error("User not found for the provided email.");
                                                        }
                                                    } else {
                                                        console.error("No users found in the database.");
                                                    }
                                                })
                                                .catch((error) => {
                                                    console.error("Error retrieving users:", error);
                                                });
                                            setUserEmail("sda")

                                        })
                                        .catch((error) => {
                                            console.error("Failed to update order:", error);
                                        });
                                } else {
                                    console.error("Order not found.");
                                }
                            })
                            .catch((error) => {
                                console.error("Error retrieving order:", error);
                            });
                    } else {
                        console.error("User not found for the provided email.");
                    }
                } else {
                    console.error("No users found in the database.");
                }
            })
            .catch((error) => {
                console.error("Error retrieving users:", error);
            });
    };
    // Example

    const renderCartItems = (cartItems) => {
        return cartItems.map((item) => (
            <>
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


            </>
        ));
    };

    const renderOrders = () => {
        return restaurant.map((order) => (
            <>
                {order.verified && (
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
                                <span className="font-medium mr-2">Restaurant Address:</span>
                                <span className="font-medium">{(order.cartItems.reduce((total, item) => (item.restaurantAddress), " "))}</span>
                                <div className="py-2 flex justify-end">
                                    <span className="font-medium mr-2">Total:</span>


                                    <span className="font-medium">{(order.cartItems.reduce((total, item) => total + (item.price * item.qty), 0))}</span>
                                </div>
                            </div>
                        </div>
                        {order.pickup ?
                            (
                                <div className="flex justify-end p-4">
                                    <button className="bg-orange-500 text-white font-medium py-2 px-4 rounded-lg">
                                        Accepted
                                    </button>
                                </div>
                            )
                            :
                            (
                                <div className="flex justify-end p-4">
                                    <button className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg mr-2" onClick={() => { updateOrderVerified(order.id, order.restaurantEmail, order.email, true) }}
                                    >
                                        Accept Pickup
                                    </button>

                                </div>
                            )
                        }
                    </div>
                )}
            </>
        ));
    };

    return (
        <>

            <DeliveryBoyHeader></DeliveryBoyHeader>
            <div className="max-w-3xl mx-auto">
                <p className="text-4xl mb-7 font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-36 before:h-1 before:-bottom-2 before:left-200 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto text-center">
                    Your Orders
                </p>
                {restaurant.length ? renderOrders() : <p className="text-gray-600">You have no orders yet.</p>}
            </div>
        </>
    );

}

export default DeliveryBoyComponent