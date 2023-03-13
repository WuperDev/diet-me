const calculateHarrisBenedict = (gender, weight, height, age, activityLevel, goal) => {
  let BMR;

  if (gender === 'male') {
    BMR = 66 + (13.7 * weight) + (5 * height) - (6.8 * age);
  } else if (gender === 'female') {
    BMR = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
  }

  let TDEE;

  if (activityLevel === 'sedentary') {
    TDEE = BMR * 1.2;
  } else if (activityLevel === 'light') {
    TDEE = BMR * 1.375;
  } else if (activityLevel === 'moderate') {
    TDEE = BMR * 1.55;
  } else if (activityLevel === 'active') {
    TDEE = BMR * 1.725;
  } else if (activityLevel === 'very active') {
    TDEE = BMR * 1.9;
  }

  let goalFactor;

  if (goal === 'gain weight') {
    goalFactor = 300;
  } else if (goal === 'Maintain weight') {
    goalFactor = 0;
  } else if (goal === 'Lose weight') {
    goalFactor = -300;
  }

  return TDEE + goalFactor;
};

const calculateResult = () => {
  const gender = document.getElementById("gender").value;
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const age = parseFloat(document.getElementById("age").value);
  const activityLevel = document.getElementById("activity-level").value;
  const goal = document.getElementById("goal").value;

  if (gender && weight && height && age && activityLevel && goal) {
    const tdee = calculateHarrisBenedict(
      gender,
      weight,
      height,
      age,
      activityLevel,
      goal
    );
   
    const result = document.getElementById("result");
    result.innerHTML =
      "Aby osiągnąć swój cel twoje zapotrzebowanie kaloryczne wynosi:" +
      " " +
      Math.round(tdee);

    const calculateBtn = document.getElementById("calculate");
    calculateBtn.addEventListener("click", calculateBtn);
    calculateBtn.className = "move-calculate-btn";

    const generateDietBtn = document.createElement("a"); 
    generateDietBtn.innerHTML = "Wygeneruj dietę";
    generateDietBtn.href = "diet-generator.html"; 
    generateDietBtn.className = "generate-diet-btn";
    result.appendChild(generateDietBtn);
  } else {
    alert("Proszę uzupełnić wszystkie pola.");
  }
};


const calculateBtn = document.getElementById("calculate");
calculateBtn.addEventListener('click', calculateResult);

function redirectToGenerator() {
  window.location.href = "diet-generator.html";
}