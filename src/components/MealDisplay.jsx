import { useContext, useState } from "react";
import heart from "../assets/heart (1).png";
import heartActive from "../assets/heart.png";
import { MealContext } from "../context/MealContext";
function MealDisplay({ meal }) {
  const {isActive,setIsActive} = useContext(MealContext)
  //addMealID to LocalStorage
  const addMealLs = (mealId) => {
    const mealLs = getMealLs();
    localStorage.setItem("MealId", JSON.stringify([...mealLs, mealId]));
  };
  //delete mealID from localStorage
  const removeMealLs = (mealId) => {
    const mealLs = getMealLs();
    localStorage.setItem(
      "MealId",
      JSON.stringify(mealLs.filter((meal) => meal !== mealId))
    );
  };
  const handleClick = () => {
    if (!isActive) {
      addMealLs(meal.idMeal);
      setIsActive(true);
    } else {
      removeMealLs(meal.idMeal);
      setIsActive(false);
    }
  };

  //get MealId from LocalStorage
  const getMealLs = () => {
    const getId = JSON.parse(localStorage.getItem("MealId")) || [];
    return getId;
  };
  return (
    <div className="relative">
      <img
        src={meal.strMealThumb}
        className="w-full rounded-t-md h-[240px] object-cover"
      />
      <span className="bg-white absolute top-4 px-2 rounded-r-sm">Random</span>
      <div className="flex items-center justify-between py-4">
        <h2 className="px-4 font-bold text-lg">{meal.strMeal}</h2>
        <button onClick={handleClick}>
          <img src={isActive ? heartActive : heart} className="w-5 mr-5" />
        </button>
      </div>
    </div>
  );
}

export default MealDisplay;
