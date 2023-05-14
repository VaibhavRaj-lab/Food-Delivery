import { useState, useEffect } from "react";
import { ref, orderByChild, equalTo, get, off, query } from "firebase/database";
import { database } from "../../firebaseConfig";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faPhone } from '@fortawesome/free-solid-svg-icons';
import Header from "../Header";
import { Navigate, useNavigate } from "react-router-dom";
import AddMenu from "./AddMenu";

const style = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // minHeight: "100vh",
        marginTop: "100px",
        width: "100%",

        backgroundImage: "url('your-image-url.jpg')",
        backgroundSize: "cover",
    },
    card: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        margin: "10px",
        width: "300px",
        height: "400px",
        borderRadius: "10px",
        backgroundColor: "#f4f4f4",
        boxShadow: "2px 2px 5px rgba(0,0,0,0.3)",
        transition: "transform 0.2s ease-in-out",
    },
    cardHover: {
        transform: "scale(1.05)",
    },
    name: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "10px",
        textAlign: "center",
    },
    contact: {
        fontSize: "18px",
        fontWeight: "normal",
        marginBottom: "10px",
        textAlign: "center",
    },
    address: {
        fontSize: "16px",
        fontWeight: "normal",
        marginBottom: "10px",
        textAlign: "center",
        color: "#555",
    },
    restaurantListContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        fontFamily: "Arial, sans-serif",
        backgroundColor: "#F8F8F8",
    },
    restaurantListHeading: {
        fontSize: "36px",
        fontWeight: "bold",
        marginBottom: "50px",
    },
    restaurantCard: {
        display: "flex",
        flexDirection: "column",
        width: "300px",
        height: "400px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
        borderRadius: "10px",
        overflow: "hidden",
    },


};

const YourRestaurant = () => {
    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate()
    const [addMenu, setAddMenu] = useState(false)
    const [restaurantId, setRestaurantId] = useState('')
    const [restaurantName, setRestaurantName] = useState('')
    let userEmail
    useEffect(() => {
        userEmail = localStorage.getItem("email");
        setAddMenu(false)
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
                            const billValue = nestedObj.restaurant
                            console.log(billValue)
                            const arr = [];
                            if (billValue) {
                                const billsList = Object.keys(billValue).map((id) => ({ id, ...billValue[id] }))
                                console.log("31", billsList)
                                for (let i = billsList.length - 1; i >= 0; i--) {
                                    arr.push(billsList[i])
                                }

                            }
                            setRestaurants(arr)
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


    const handleCardHover = (index) => {
        setRestaurants((prevList) => {
            const updatedList = [...prevList];
            updatedList[index] = {
                ...updatedList[index],
                hover: true,
            };
            return updatedList;
        });
    };

    const handleCardLeave = (index) => {
        setRestaurants((prevList) => {
            const updatedList = [...prevList];
            updatedList[index] = {
                ...updatedList[index],
                hover: false,
            };
            return updatedList;
        });
    };

    // const restaurantCards = restaurants.map((restaurant, index) => (

    // ));\
    const MenuContainer = (id, address) => {
        console.log(address)
        console.log(id)
        setRestaurantName(address)
        setRestaurantId(id)
        setAddMenu(true)

    }
    const ViewMenuContainer = (id) => {
        navigate(`/viewMenu/${id}`)
    }

    return (
        <>
            <div className="flex flex-col">
                {addMenu ? (
                    <AddMenu name={restaurantId} address={restaurantName} />
                ) : (
                    <div className="flex flex-col">
                        <Header />
                        <div className="bg-gray-400 text-center py-5 h-24">
                            <h1 className="text-3xl font-bold text-white">Your Restaurants</h1>
                        </div>
                        <div className="flex flex-wrap justify-center items-center px-5">
                            {restaurants.map((restaurant, index) => (
                                <div
                                    key={restaurant.id}
                                    className={`w-72 rounded-lg bg-white m-4 p-4 ${restaurant.hover ? "shadow-lg" : ""
                                        }`}
                                    onMouseEnter={() => handleCardHover(index)}
                                    onMouseLeave={() => handleCardLeave(index)}
                                >
                                    <div>
                                        <div className="text-lg font-bold text-center">{restaurant.name}</div>
                                        <img
                                            className="h-32 w-full object-cover mt-4 mb-2 rounded-lg"
                                            src={
                                                "https://media.istockphoto.com/id/857744820/fr/vectoriel/fa%C3%A7ade-de-design-plat-de-restaurant-vector.jpg?s=612x612&w=0&k=20&c=WcdvzM5DeziIs-tlVHCmpzEbFEHkp87aB547MG9PtZY="
                                            }
                                            alt="restaurant"
                                        />
                                        <div className="text-base text-center">{restaurant.city}</div>
                                        <div className="text-base text-center">{restaurant.address}</div>
                                        <div className="flex flex-row items-center justify-center mt-2">
                                            <FontAwesomeIcon icon={faPhone} className="text-xl" />
                                            <div className="text-base">{restaurant.contactNo}</div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col mt-4">
                                        <button
                                            className="px-4 py-2 rounded-md bg-blue-500 text-white font-bold mb-2"
                                            onClick={() => {
                                                MenuContainer(restaurant.id, restaurant.address);
                                            }}
                                        >
                                            Add Menu
                                        </button>
                                        <button
                                            className="px-4 py-2 rounded-md bg-orange-500 text-white font-bold"
                                            onClick={() => {
                                                ViewMenuContainer(restaurant.id);
                                            }}
                                        >
                                            View Menu
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default YourRestaurant;