const males = document.getElementById("males");
const favMealContainer = document.getElementById("fav-meal-container");
const search = document.getElementById("text");
const searchBtn = document.getElementById("search");

const info = document.getElementById("meal-info-container");
const closeInfoBtn = document.getElementById("close-info");
const mealInfo = document.getElementById("meal-info-add");

getRandomMeal();
getFavMeal();
async function getRandomMeal() {
  try {
    const resp = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const respData = await resp.json();
    const randomMeal = respData.meals[0];
    loadRandomMeal(randomMeal);
  } catch (error) {
    console.log("error");
  }
}
async function getMealById(id) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const respData = await resp.json();
  const meal = respData.meals[0];

  return meal;
}
async function getMealBySearch(term) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );
  const respData = await resp.json();
  const meal = respData.meals;
  return meal;
}

function loadRandomMeal(maleData) {
  console.log(maleData);
  const male = document.createElement("div");
  male.classList.add("male");

  male.innerHTML = `
        <div class="male-header">
             <span>Random</span>
            <img
              src="${maleData.strMealThumb}"
              alt="${maleData.strMeal}"
            />
        </div>
        <div class="male-body">
            <h4>${maleData.strMeal}</h4>
            <button class="gray fav-btn"><i class=" fa-fw fa-solid fa-heart"></i></button>
          </div>
        </div>`;

  males.append(male);
  const favBtn = male.querySelector(".fav-btn");

  favBtn.addEventListener("click", (e) => {
    if (favBtn.classList.contains("active")) {
      removeMealsLs(maleData.idMeal);
      favBtn.classList.remove("active");
    } else {
      addMealsLs(maleData.idMeal);
      favBtn.classList.add("active");
    }
    getFavMeal();
  });
  const image = male.querySelector("img");

  image.addEventListener("click", () => {
    mealInfoUpdate(maleData);
  });
}
function addMealsLs(maleId) {
  const maleIds = getMealsLs();
  localStorage.setItem("maleId", JSON.stringify([...maleIds, maleId]));
}
function removeMealsLs(maleId) {
  const maleIds = getMealsLs();
  localStorage.setItem(
    "maleId",
    JSON.stringify(maleIds.filter((data) => data !== maleId))
  );
}
function getMealsLs() {
  const maleIds = JSON.parse(localStorage.getItem("maleId"));
  return maleIds === null ? [] : maleIds;
}

async function getFavMeal() {
  favMealContainer.innerHTML = "";
  const maleIds = getMealsLs();
  for (i = 0; i < maleIds.length; i++) {
    const maleId = maleIds[i];
    meal = await getMealById(maleId);
    addMealsFav(meal);
  }
}

function addMealsFav(data) {
  const favMale = document.createElement("li");

  favMale.innerHTML = `
            <img
              src="${data.strMealThumb}"
              alt="${data.strMeal}"
            />
            <span> ${data.strMeal}</span>
            <button class="clear"><i class="fa-solid fa-xmark"></i></button>
            `;
  const image = favMale.querySelector("img");
  const clear = favMale.querySelector(".clear");
  clear.addEventListener("click", () => {
    removeMealsLs(data.idMeal);
    getFavMeal();
  });
  favMealContainer.append(favMale);
  image.addEventListener("click", () => {
    mealInfoUpdate(data);
  });
}
function mealInfoUpdate(mealData) {
  mealInfo.innerHTML = ``;
  const ingredient = [];

  for (let i = 1; i <= 20; i++) {
    if (mealData["strIngredient" + i]) {
      ingredient.push(
        `${mealData["strIngredient" + i]}/ ${mealData["strMeasure" + i]}`
      );
    } else {
      break;
    }
  }
  mealInfo.innerHTML = `
      <h2>${mealData.strMeal}</h2>
      <img src="${mealData.strMealThumb}" alt="">
      <p>${mealData.strInstructions}abo repudiandae voluptatum ex veritatis
        molestias inventore minima amet et doloribus illum ratione, commodi officiis! Numquam veniam repudiandae
        tempora nobis impedit. Fugit?</p>
      <ul>
        ${ingredient.map((data) => `<li>${data}</li>`).join("")}
      </ul>
      <div class="youtubeBox">
        <a href=${mealData.strYoutube} target="_blank"><i class="fa-solid fa-play"></i>Show in Youtube</a>
      </div>`;

  info.classList.remove("hide");
}

closeInfoBtn.addEventListener("click", () => {
  info.classList.add("hide");
});
searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  males.innerHTML = "";
  const mealsSearch = search.value;
  const dataMeals = await getMealBySearch(mealsSearch);

  if (dataMeals) {
    dataMeals.forEach((meal) => {
      loadRandomMeal(meal);
    });
  }
});
