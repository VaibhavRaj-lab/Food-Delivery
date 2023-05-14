import React, { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { motion } from "framer-motion";
import { IoFastFood } from "react-icons/io5";
import C3 from "../../img/c1.png";
import D2 from "../../img/d2.png"
import I1 from "../../img/i1.png"
import Fi2 from "../../img/fi2.png"
import F1 from "../../img/f1.png"
import Cu1 from "../../img/cu1.png"
import R1 from "../../img/r1.png"

// import { categoryList } from './categoryList'; // assuming you have a category list in a separate file

function CategoryFilter() {
  // const [selectedCategory, setSelectedCategory] = useState(null);
  const [filter, setFilter] = useState("chicken");

  const categories = [
    {
      id: 1,
      name: "Chicken",
      imageUrl: C3,
      urlParamName: "chicken",
    },
    {
      id: 2,
      name: "Curry",
      urlParamName: "curry",
      imageUrl: Cu1,
    },
    {
      id: 3,
      name: "Rice",
      urlParamName: "rice",
      imageUrl: R1
    },
    {
      id: 4,
      name: "Fish",
      urlParamName: "fish",
      imageUrl: Fi2
    },
    {
      id: 5,
      name: "Fruits",
      urlParamName: "fruits",
      imageUrl: F1
    },
    {
      id: 6,
      name: "Icecreams",
      urlParamName: "icecreams",
      imageUrl: I1
    },

    {
      id: 7,
      name: "Soft Drinks",
      urlParamName: "drinks",
      imageUrl: D2
    },
  ];



  return (
    <section className="w-full h-36 my-6" id="menu">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-4xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-36 before:h-1 before:-bottom-2 before:left-200 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto text-center">
          Our Hot Dishes
        </p>

        <div className="w-full  flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-auto no-scrollbar">
          {categories.map((category) => (
            <motion.div
              whileTap={{ scale: 0.9 }}
              key={category.id}
              className={`group ${filter === category.urlParamName ? "bg-yellow-500" : "bg-white"
                } w-36 min-w-[94px] h-36 cursor-pointer rounded-lg shadow-md flex flex-col gap-3 items-center justify-center hover:bg-yellow-500 hover:text-black transition-all ease-in-out duration-200`}
              onClick={() => setFilter(category.urlParamName)}
            >
              <div className="w-15 h-20 rounded-full shadow-lg bg-white group-hover:bg-white flex items-center justify-center">
                <img src={category.imageUrl} alt={category.name} className="w-28 h-28 rounded-full" />
              </div>

              <p
                className={`text-lg font-medium ${filter === category.urlParamName
                  ? "text-yellow-500"
                  : "text-gray-700"
                  } group-hover:text-white transition-all ease-in-out duration-200`}
              >
                {category.name}
              </p>
            </motion.div>
          ))}
        </div>

        {/* <div className="w-full">
          <RowContainer
            flag={false}
            data={foodItems.filter((n) => n.category === filter)}
          />
        </div> */}
      </div>
    </section>
  );
}

export default CategoryFilter;
