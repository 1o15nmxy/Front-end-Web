
const foods = [
    {
      name: "Strawberry",
      fact: "Strawberries have their seeds on the outside."
    },
    {
      name: "Tomato",
      fact: "Tomatoes are fruits, botanically speaking."
    },
    {
      name: "Honey",
      fact: "Honey can stay edible for a very long time when stored properly."
    },
    {
      name: "Carrot",
      fact: "Carrots were originally grown in several colors, including purple."
    },
    {
      name: "Banana",
      fact: "Bananas are berries in botanical terms."
    }
  ];
  
  let currentIndex = 0;
  let showingFact = false;
  
  const card = document.querySelector("#card");
  const foodName = document.querySelector("#food-name");
  const foodInfo = document.querySelector("#food-info");
  const nextButton = document.querySelector("#next-button");
  
  // Flip the card when it is clicked.
  card.addEventListener("click", function () {
    showingFact = !showingFact;
  
    if (showingFact) {
      foodName.style.display = "none"; //not visible
      foodInfo.textContent = foods[currentIndex].fact;
      card.classList.add("flipped");
    } else {
      foodName.style.display = "block"; //visible
      foodInfo.textContent = "Click to flip";
      card.classList.remove("flipped");
    }
  });
  
  
  // Show the next food when the button is clicked.
  nextButton.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % foods.length;
    showingFact = false;
  
    foodName.textContent = foods[currentIndex].name;
    foodInfo.textContent = "Click to flip";
  });
  