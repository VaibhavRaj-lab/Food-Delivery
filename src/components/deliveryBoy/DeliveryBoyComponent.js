import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, child } from "firebase/database";
import { database } from "../../firebaseConfig";
import Header from '../Header';
import DeliveryBoyHeader from './DeliveryBoyHeader';

function DeliveryBoyComponent() {
    const [restaurant, setRestaurant] = useState([])
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
    }, []);

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
            </div>
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