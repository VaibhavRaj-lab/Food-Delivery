import React, { useEffect, useRef, useState } from 'react'
import Header from '../Header'
import { MdShoppingBasket } from "react-icons/md";
import { getDatabase, ref, child, get, orderByChild, query, equalTo } from "firebase/database";
import { motion } from "framer-motion";
import { useParams } from 'react-router-dom';
import CustomerHeader from './CustomerHeader';
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import AlternateHeader from './AlternateHeader';
import CategoryFilter from './CategoryFilter';
function ViewMenuCustomer() {
    const [menus, setMenus] = useState([]);
    const { id } = useParams()
    const email = localStorage.getItem("email")
    // useEffect(() => {
    //     const db = getDatabase();
    //     const usersRef = ref(db, "users");
    //     // Query the database for the user with the specified email
    //     const userQuery = query(ref(db, 'users'), orderByChild('email'), equalTo("test2@gmail.com"));
    //     get(userQuery).then((snapshot) => {
    //         const userId = Object.keys(snapshot.val())[0]; // Assumes only one user with the given email
    //         console.log(userId)
    //         // const user = snapshot.val()[userId];
    //         const restaurant = snapshot.child(`${userId}/restaurant/${id}`).val();

    //         console.log(restaurant.menu)

    //         const menuArray = restaurant.menu
    //         const menuItems = Object.keys(menuArray).map((id) => {
    //             return { id, ...menuArray[id] };
    //         });
    //         console.log(menuItems)
    //         setMenus(menuItems);

    //         // console.log(user)
    //     })
    // Listen for changes to the user data
    useEffect(() => {
        const restaurantId = id
        const restaurants = JSON.parse(localStorage.getItem('restaurants'));
        console.log(restaurants)
        const foundRestaurant = restaurants.find((restaurant) => restaurant.id === restaurantId);
        const foodRestaurant = foundRestaurant.menu

        if (foundRestaurant && foundRestaurant.menu) {
            const menuItems = Object.keys(foodRestaurant).map((id) => {
                return { id, ...foodRestaurant[id] };
            })
            setMenus(menuItems);
        }
        console.log(menus)
    }, [])


    const heroData = [

        {
            id: 2,
            name: "Strawberries",
            decp: "Fresh Strawberries",
            price: "10.25",
            imageSrc: "https://firebasestorage.googleapis.com/v0/b/foodapp-a63c7.appspot.com/o/Images%2F1682755760592-c1.png?alt=media&token=1d6b05f4-9b06-4217-91c9-8f53fcd0e305",
        },
        {
            id: 3,
            name: "Chicken Kebab",
            decp: "Mixed Kebab Plate",
            price: "8.25",
            imageSrc: "https://firebasestorage.googleapis.com/v0/b/foodapp-a63c7.appspot.com/o/Images%2F1682755760592-c1.png?alt=media&token=1d6b05f4-9b06-4217-91c9-8f53fcd0e305"
        },
        {
            id: 4,
            name: "Fish Kebab",
            decp: "Mixed Fish Kebab",
            price: "5.25",
            imageSrc: "https://firebasestorage.googleapis.com/v0/b/foodapp-a63c7.appspot.com/o/Images%2F1682755760592-c1.png?alt=media&token=1d6b05f4-9b06-4217-91c9-8f53fcd0e305",
        },
    ];


    const [items, setItems] = useState([]);

    const [{ cartItems }, dispatch] = useStateValue();
    const isFirstRender = useRef(true);
    const addtocart = () => {

        dispatch({
            type: actionType.SET_CARTITEMS,
            cartItems: items,
        });
        localStorage.setItem("cartItems", JSON.stringify(items));
    };


    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        } else {
            // Your code to be executed after the first render
            console.log("useEffect ran after the first render");
            addtocart()
        }
    }, [items]);

    return (
        <>

            <AlternateHeader></AlternateHeader>

            <p className="text-4xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-36 before:h-1 before:-bottom-2 before:left-200 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto text-center">
                Our Hot Dishes
            </p>
            <div

                className={`w-full flex items-center gap-3  my-12 scroll-smooth  ${true
                    ? "overflow-x-scroll scrollbar-none"
                    : "overflow-x-hidden flex-wrap justify-center"
                    }`}
            >
                {menus && menus.length > 0 ? (
                    menus.map((item) => (

                        <div
                            key={item.id}

                            className="w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
                        >
                            <div className="w-full flex items-center justify-between">
                                <motion.div
                                    className="w-40 h-40 -mt-8 drop-shadow-2xl"
                                    whileHover={{ scale: 1.2 }}
                                >
                                    <img
                                        src={item.image}
                                        alt=""
                                        className="w-full h-full object-contain"
                                    />
                                </motion.div>

                            </div>

                            <div className="w-full flex flex-col items-end justify-end -mt-8">

                                <p className="text-textColor font-semibold text-base md:text-lg">
                                    {item.name}
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    {item.decp}
                                </p>
                                <div className="flex items-center gap-8">
                                    <p className="text-lg text-headingColor font-semibold">
                                        <span className="text-sm text-red-500">$</span> {item.price}
                                    </p>
                                </div>

                            </div>
                            <motion.div
                                whileTap={{ scale: 0.75 }}
                                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                                onClick={() => setItems([...cartItems, item])}
                            >
                                <MdShoppingBasket className="text-white" />
                            </motion.div>
                        </div>
                    ))
                ) : (
                    <div className="w-full flex flex-col items-center justify-center">
                        {/* <img src={NotFoun} className="h-340" /> */}
                        <p className="text-xl text-headingColor font-semibold my-2">
                            Items Not Available
                        </p>
                    </div>
                )}
            </div>

        </>

    )
}

export default ViewMenuCustomer