import axios from "axios";
import { useEffect, useState } from "react";
import MealDisplay from "../components/MealDisplay";

function GetRandomMeal() {
  const [meal, setMeal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMeal() {
      try {
        const res = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/random.php"
        );
        if (res.status === 200) {
          const resData = res.data.meals[0];
          setMeal(resData);
        } else {
          setError("Something went wrong");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    return () => {
      fetchMeal();
      // Fetch meal when the component mounts
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className="rounded-md bg-[#babfbc]">
      {isLoading && <h1 className="font-bold text-center py-4">Loading...</h1>}
      {error && <p className="font-bold text-center">Error: {error}</p>}
      {meal && <MealDisplay meal={meal} />}
    </div>
  );
}

export default GetRandomMeal;
