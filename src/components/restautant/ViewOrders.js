import React from 'react'
import { useState, useEffect } from "react";
import { ref, orderByChild, equalTo, get, off, query, update, remove } from "firebase/database";
import { database } from "../../firebaseConfig";
import { useSubmit } from 'react-router-dom';
import Header from '../Header';





function ViewOrder() {
    const [orders, setOrders] = useState([])
    const [userEmail, setUserEmail] = useState("")
    const [customerEmail, setCustomerEmail] = useState("")
    useEffect(() => {
        const userEmail1 = JSON.stringify(localStorage.getItem("email"));
        console.log(userEmail1)
        setUserEmail(userEmail1)

        const dbRef = ref(database);
        console.log(dbRef)
        const userEmail2 = localStorage.getItem("email")
        const restaurantRef = query(ref(database, 'users'), orderByChild('email'), equalTo(userEmail2))
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
    }, [userEmail]);


    const updateOrderVerified = (orderId, verifiedStatus) => {
        const userEmail3 = localStorage.getItem("email")
        const usersRef = ref(database, "users");

        get(usersRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const users = snapshot.val();
                    let userId = null;

                    // Find the user with the provided email
                    for (const key in users) {
                        if (users[key].email === userEmail3) {
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
                                    orderData.verified = verifiedStatus;
                                    const customerEmail = orderData.email
                                    console.log(customerEmail)
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
                                                                        orderData.verified = verifiedStatus;


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
    // Example usage when the user accepts the order
    const handleAcceptOrder = (orderId) => {
        console.log(orderId, userEmail)
        updateOrderVerified(orderId, true);
    };

    // Example usage when the user declines the order
    const handleDeclineOrder = (orderId) => {
        const email = localStorage.getItem("email")
        const queryRef = query(ref(database, 'users'), orderByChild('email'), equalTo(email))


        get(queryRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const userId = Object.keys(snapshot.val())[0];
                    const orderRef = ref(database, `users/${userId}/orders/${orderId}`);

                    remove(orderRef)
                        .then(() => {
                            console.log('Order deleted successfully.');
                            setUserEmail("sda")

                        })
                        .catch((error) => {
                            console.error('Error deleting order:', error);
                        });
                } else {
                    console.error('User not found for the provided email.');
                }
            })
            .catch((error) => {
                console.error('Error retrieving user data:', error);
            });
    };
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
                {order.verified ?
                    (
                        <div className="flex justify-end p-4">
                            <button className="bg-green-500 text-white font-medium py-2 px-4 rounded-lg">
                                Accepted
                            </button>
                        </div>
                    )
                    :
                    (
                        <div className="flex justify-end p-4">
                            <button className="bg-green-500 text-white font-medium py-2 px-4 rounded-lg mr-2" onClick={() => { handleAcceptOrder(order.id) }}
                            >
                                Accept
                            </button>
                            <button className="bg-red-500 text-white font-medium py-2 px-4 rounded-lg" onClick={() => { handleDeclineOrder(order.id) }}>
                                Decline
                            </button>
                        </div>
                    )
                }
                {order.pickup && (<div className="text-center bg-blue-200">Delivery Boy Assigned : {order.deliveryBoy}</div>)}
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