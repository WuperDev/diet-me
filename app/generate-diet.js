const mealsInput = document.querySelector("#meals");
const caloriesInput = document.querySelector("#calories");
const tableBody = document.querySelector("#diet tbody");
const caloriesRemaining = document.querySelector("#calories-remaining");
const mealDetailsContainer = document.querySelector("#meal-details");
const generateBtn = document.querySelector("#generate-btn");
const dietTable = document.getElementById("diet");
const newDiv = document.getElementById("diet-description");
const dietType = document.getElementById("diet-type");
const dietInfo = document.getElementById("#diet-info");

let totalCalories = 0;
let remainingCalories = 0;
let meals = [];

dietType.addEventListener("change", () => {
  switch (dietType.value) {
    case "balanced":
      newDiv.innerText =
        "Dieta zbilansowana to sposób żywienia, który zapewnia organizmowi odpowiednią ilość składników odżywczych, takich jak białko, węglowodany i tłuszcze, aby utrzymać zdrowie i dobrą formę.";
      break;
    case "sport":
      newDiv.innerText =
        "Dieta sportowa to plan żywieniowy, który zapewnia odpowiednią ilość kalorii i makroskładników, przede wszystkim węglowodanów (55-65%), białek (1,2-2.2 g/kg masy ciała) i tłuszczów (20-30%), w zależności od rodzaju aktywności i celów treningowych. Ważne jest również utrzymanie odpowiedniego bilansu płynów i elektrolitów oraz uzupełnienie diety o witaminy i składniki mineralne.";
      break;
    case "keto":
      newDiv.innerText =
        "Dieta ketogeniczna to plan żywieniowy, który skupia się na wysokim spożyciu tłuszczów, umiarkowanym spożyciu białek i bardzo niskim spożyciu węglowodanów. W diecie ketogenicznej rozkład makroskładników powinien wynosić około 70-80% kalorii z tłuszczów, 10-20% kalorii z białek i tylko 5-10% kalorii z węglowodanów.";
      break;
    case "vegetarian":
      newDiv.innerText =
        "Dieta wegetariańska to plan żywieniowy, który wyklucza spożywanie mięsa i ryb, ale pozwala na spożywanie produktów pochodzenia roślinnego, takich jak warzywa, owoce, zboża, orzechy i nasiona. ypowy rozkład makroskładników w diecie wegetariańskiej to około 45-65% kalorii z węglowodanów, 10-35% kalorii z białek i 20-35% kalorii z tłuszczów.";
      break;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const tdee = sessionStorage.getItem("tdee");
  const caloriesField = document.getElementById("calories");
  if (caloriesField) {
    caloriesField.value = Math.round(tdee);
  }
});

function generateMeals() {
  const caloriesInput = document.getElementById("calories");
  const caloriesInputMessage = document.getElementById(
    "calories-input-message"
  );
  const dietInfo = document.getElementById("diet-info");

  // ograniczenie ilości posiłków
  if (caloriesInput.value > 1900) {
    if (mealsInput.value < 4) {
      caloriesInputMessage.innerText =
        "Przy tej kalorycznośći musisz wybrać minimum 4 posiłki";
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

  let dietTypeValue = dietType.value;
  let fetchValue = [];
  if (dietTypeValue == "balanced") {
    fetchValue = fetch("https://wuperdev.github.io/diet-me/meals.json?count=" + numberOfMeals);
  } else if (dietTypeValue == "sport") {
    fetchValue = fetch("https://wuperdev.github.io/diet-me/mealsSport.json?count=" + numberOfMeals);
  } else if (dietTypeValue == "keto") {
    fetchValue = fetch("https://wuperdev.github.io/diet-me/mealsKeto.json?count=" + numberOfMeals);
  } else if (dietTypeValue == "vegetarian") {
    fetchValue = fetch("https://wuperdev.github.io/diet-me/mealsVegetarian.json?count=" + numberOfMeals);
  }

  fetchValue
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
                <td><button type="button" class="show-details-btn">Pokaż</button></td>
              `;
        row
          .querySelector(".show-details-btn")
          .addEventListener("click", function () {
            showDetails(meal);
          });
        tableBody.appendChild(row);
        dietInfo.style.display = "flex";
      });

      function addMeal(mealName, calories) {
        const mealList = document.querySelector("#diet tbody");

        // Tworzymy element li z nazwą posiłku i kaloriami
        const mealListItem = document.createElement("tr");
        mealListItem.innerHTML = `<td>${mealName}</td>
                                  <td>${calories}</td> `;

        // Dodajemy element li do listy
        mealList.appendChild(mealListItem);

        // Aktualizujemy liczbę pozostałych kalorii
        const remainingCaloriesElement = document.querySelector(
          "#calories-remaining"
        );
        const remainingCalories = parseInt(remainingCaloriesElement.value);
        remainingCaloriesElement.setAttribute(
          "style",
          "background-color: white;"
        );
        remainingCaloriesElement.innerHTML = `<button id="download-section" onclick="downloadMeals()">Pobierz jadłospis</button>`;
      }

      const addSnackButton = document.querySelector(".snack");
      if (addSnackButton) {
        addSnackButton.parentNode.removeChild(addSnackButton);
      }

      remainingCalories = caloriesInput.value - totalCalories;
      if (remainingCalories >= 50) {
        const addSnackButton = document.createElement("button");
        addSnackButton.textContent = "Dodaj przekąskę";
        addSnackButton.classList = "snack";
        addSnackButton.addEventListener("click", () => {
          // Pobieramy listę przekąsek z pliku przekaski.json
          fetch("https://wuperdev.github.io/diet-me/snacks.json")
            .then((response) => response.json())
            .then((snacks) => {
              // Wybieramy przekąskę o podobnej kaloryczności co pozostałe kalorie
              // Wybieramy losową przekąskę o podobnej kaloryczności co pozostałe kalorie
              const snacksWithSimilarCalories = snacks.filter(
                (snack) => snack.calories <= remainingCalories
              );
              const randomIndex = Math.floor(
                Math.random() * snacksWithSimilarCalories.length
              );
              const randomSnack = snacksWithSimilarCalories[randomIndex];

              // Dodajemy wybraną przekąskę do jadłospisu
              addMeal(randomSnack.name, randomSnack.calories);
            });
        });
        document.body.appendChild(addSnackButton);
        caloriesRemaining.innerText = `Pozostało kalorii: ${remainingCalories}`;
        caloriesRemaining.style.backgroundColor = "#4CAF50";
        addSnackButton.addEventListener("click", () => {
          addSnackButton.remove();
        });
      } else {
        const remainingCaloriesElement = document.querySelector(
          "#calories-remaining"
        );
        remainingCaloriesElement.setAttribute(
          "style",
          "background-color: white;"
        );
        remainingCaloriesElement.innerHTML = `<button id="download-section" onclick="downloadMeals()">Pobierz jadłospis</button>`;
      }

      // Dodaj kod, aby wyświetlić ilość białka, węglowodanów i tłuszczu w diecie
      const proteinTotal = document.querySelector("#protein-total");
      const carbsTotal = document.querySelector("#carbs-total");
      const fatTotal = document.querySelector("#fat-total");

      let proteinSum = 0;
      let carbsSum = 0;
      let fatSum = 0;

      for (let i = 0; i < selectedMeals.length; i++) {
        proteinSum += selectedMeals[i].protein;
        carbsSum += selectedMeals[i].carbs;
        fatSum += selectedMeals[i].fats;
      }

      proteinTotal.innerText = `Białko: ${proteinSum}g`;
      carbsTotal.innerText = `Węglowodany: ${carbsSum}g`;
      fatTotal.innerText = `Tłuszcze: ${fatSum}g`;

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
          <div id="close-details-btn"><i class="fa-regular fa-circle-xmark"></i></div>  
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

function downloadIngredients() {
  let shoppingList = "Lista zakupów:\r\n\r\n";
  const ingredients = [];

  tableBody.querySelectorAll("tr").forEach((row) => {
    const mealName = row.querySelector("td:first-of-type").innerText;
    const btn = row.querySelector(".show-details-btn");
    if (btn) {
      btn.click();
      const ingredientsList = mealDetailsContainer.querySelectorAll("p");
      const ingredientsText = ingredientsList[0].innerText;
      const ingredientsArray = ingredientsText.split("\n");
      ingredients.push(...ingredientsArray);
    }
  });

  const uniqueIngredients = Array.from(new Set(ingredients));
  uniqueIngredients.forEach((ingredient) => {
    shoppingList += "- " + ingredient + "\r\n";
  });

  const element = document.createElement("a");
  const file = new Blob([shoppingList], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = "lista_zakupow.txt";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

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
