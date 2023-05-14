import { useEffect, useRef, useState } from "react";
import { getDatabase, ref, onValue, child } from "firebase/database";
import { database } from "../../firebaseConfig";
import CustomerHeader from "./CustomerHeader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faPhone } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

function CustomerComponent({ restaurants }) {
  const [restaurantsList, setRestaurants] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    const dbRef = ref(database);
    console.log(restaurants)
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      if (data) {
        const restaurants = Object.values(data.users).reduce((acc, user) => {
          console.log(user.userType)

          if (user.restaurant) {
            console.log(user.restaurant)
            const billsList = Object.keys(user.restaurant).map((id) => ({ id, ...user.restaurant[id] }))

            acc.push(...billsList);
          }

          console.log(acc)

          return acc;
        }, []);
        setRestaurants(restaurants);
        localStorage.setItem("restaurants", JSON.stringify(restaurants))
      }
    });
  }, []);

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


  const ViewMenuContainer = (id) => {
    navigate(`/viewMenuCustomer/${id}`)
  }


  return (

    <div>


      <div className="flex flex-wrap justify-center items-center px-5">
        {restaurants?.map((restaurant, index) => (
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
  );
}

export default CustomerComponent