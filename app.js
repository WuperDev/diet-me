const mealsInput = document.querySelector("#meals");
const caloriesInput = document.querySelector("#calories");
const tableBody = document.querySelector("#diet tbody");
const caloriesRemaining = document.querySelector("#calories-remaining");
const mealDetailsContainer = document.querySelector("#meal-details");
const generateBtn = document.querySelector("#generate-btn");
const dietTable = document.getElementById("diet");
let totalCalories = 0;
let remainingCalories = 0;
let meals = [];

document.addEventListener("DOMContentLoaded", function () {
  const tdee = sessionStorage.getItem("tdee");
  const caloriesField = document.getElementById("calories");
  if (caloriesField) {
    caloriesField.value = Math.round(tdee);
  }
});

function generateMeals() {
  const caloriesInput = document.getElementById("calories");
  const caloriesInputMessage = document.getElementById("calories-input-message");

  // ograniczenie ilości posiłków 
  if (caloriesInput.value > 1900) {
    if (mealsInput.value < 4) {
      caloriesInputMessage.innerText = "Przy tej kalorycznośći musisz wybrać minimum 4 posiłki";
      return;
    } else {
      caloriesInputMessage.innerText = "";
    }
  }

  
  if (!caloriesRemaining) {
    console.error("Element o id #calories-remaining nie został znaleziony");
  } else {
    caloriesRemaining.classList.add("active");
  }

  if (!mealsInput.value || !caloriesInput.value) {
    return;
  }

  totalCalories = 0;
  tableBody.innerHTML = "";

  const numberOfMeals = mealsInput.value;

fetch("meals.json?count=" + numberOfMeals)
    .then((response) => response.json())
    .then((mealsData) => {
      const selectedMeals = [];
      for (let i = 0; i < numberOfMeals; i++) {
        let randomIndex = Math.floor(Math.random() * mealsData.length);
        let selectedMeal = mealsData[randomIndex];
        while (selectedMeals.includes(selectedMeal)) {
          randomIndex = Math.floor(Math.random() * mealsData.length);
          selectedMeal = mealsData[randomIndex];
        }
        selectedMeals.push(selectedMeal);
        totalCalories += selectedMeal.calories;
      }

      while (
        totalCalories < caloriesInput.value - 100 ||
        totalCalories > caloriesInput.value + 100
      ) {
        totalCalories = 0;
        selectedMeals.length = 0;
        tableBody.innerHTML = "";

        for (let i = 0; i < numberOfMeals; i++) {
          let randomIndex = Math.floor(Math.random() * mealsData.length);
          let selectedMeal = mealsData[randomIndex];
          while (selectedMeals.includes(selectedMeal)) {
            randomIndex = Math.floor(Math.random() * mealsData.length);
            selectedMeal = mealsData[randomIndex];
          }
          selectedMeals.push(selectedMeal);
          totalCalories += selectedMeal.calories;
        }
      }

      selectedMeals.forEach((meal) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${meal.name}</td>
                <td>${meal.calories}</td>
                <td><button type="button" class="show-details-btn">Szczegóły</button></td>
              `;
        row
          .querySelector(".show-details-btn")
          .addEventListener("click", function () {
            showDetails(meal);
          });
        tableBody.appendChild(row);
      });

      remainingCalories = caloriesInput.value - totalCalories;
      if (remainingCalories >= 0) {
        caloriesRemaining.innerText = `Pozostało kalorii: ${remainingCalories}`;
        caloriesRemaining.style.backgroundColor = "#4CAF50";
      } else {
        caloriesRemaining.innerText = `Przekraczasz kalorie o: ${Math.abs(
          remainingCalories
        )}`;
        caloriesRemaining.style.backgroundColor = "red";
      }
      dietTable.style.display = "table";
      tableBody.scrollIntoView({ behavior: "smooth" });
    });
}

function showDetails(meal) {
  const ingredientsList = meal.ingredients.split(", ").join("<br>");
  document.querySelector("#meal-details").innerHTML = `
          <h2>${meal.name}</h2>
          <h3>Składniki:</h3>
          <p>${ingredientsList}</p>
          <h3>Przygotowanie:</h3>
          <p>${meal.instructions}</p>
          <button id="close-details-btn">Zamknij</button>  
          <button id="download-section" onclick="downloadMeals()">Pobierz jadłospis</button>
    
        `;
  mealDetailsContainer.classList.add("show");
  mealDetailsContainer.classList.add("meal-details");
  mealDetailsContainer.scrollIntoView({ behavior: "smooth" });

  const closeBtn = document.querySelector("#close-details-btn");
  closeBtn.addEventListener("click", hideDetails);
}

function hideDetails() {
  mealDetailsContainer.classList.remove("show");
  mealDetailsContainer.classList.remove("meal-details");
  document.querySelector("#meal-details").innerHTML = "";
}

generateBtn.addEventListener("click", generateMeals);

function downloadMeals() {
  let mealDetails = "Twoj jadłospis:\r\n\r\n";
  tableBody.querySelectorAll("tr").forEach((row) => {
    const mealName = row.querySelector("td:first-of-type").innerText;
    const calories = row.querySelector("td:nth-of-type(2)").innerText;
    mealDetails += mealName + "\r\nKalorie: " + calories + "\r\n";

    const btn = row.querySelector(".show-details-btn");
    if (btn) {
      btn.click();
      const ingredients =
        mealDetailsContainer.querySelector("p:first-of-type").innerText;
      const instructions =
        mealDetailsContainer.querySelector("p:nth-of-type(2)").innerText;
      mealDetails +=
        "Składniki:\r\n" +
        ingredients +
        "\r\nPrzygotowanie:\r\n" +
        instructions +
        "\r\n\r\n";
      // const closeBtn = mealDetailsContainer.querySelector("#close-details-btn");
      // closeBtn.click();
    }
  });

  const element = document.createElement("a");
  const file = new Blob([mealDetails], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = "moj_jadlospis.txt";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
