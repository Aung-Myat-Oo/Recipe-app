/* eslint-disable react/prop-types */
import heart from '../assets/heart (1).png'
function MealDisplay({ meal }) {
    console.log(meal)
  return (
    <div className='relative'>
      <img src={meal.strMealThumb} className="w-full rounded-t-md h-[240px] object-cover"/>
      <span className='bg-white absolute top-4 px-2 rounded-r-sm'>Random</span>
      <div className='flex items-center justify-between'>
        <h2 className="px-4 py-3 font-bold text-lg">{meal.strMeal}</h2>
        <button><img src={heart} className='w-6 mr-5'/></button>
      </div>
    </div>
  );
}

export default MealDisplay;
