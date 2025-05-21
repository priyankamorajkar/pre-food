let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let userInp = document.getElementById("user-inp");

let recipes = [];

searchBtn.addEventListener("click", () => {
  let userInput = userInp.value.trim();

  if (userInput.length === 0) {
    result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
  } else {
    fetch(`/api/search?ingredients=${encodeURIComponent(userInput)}`)
      .then(res => res.json())
      .then(data => {
        if (data.length === 0) {
          result.innerHTML = `<h3>No recipes found with the given ingredients</h3>`;
        } else {
          recipes = data;
          shuffleRecipes();
        }
      })
      .catch(() => {
        result.innerHTML = `<h3>Invalid Input or API Error</h3>`;
      });
  }
});

function shuffleRecipes() {
  if (recipes.length === 0) {
    result.innerHTML = `<h3>No recipes available</h3>`;
  } else {
    const shuffledRecipes = shuffleArray(recipes);
    let myRecipe = shuffledRecipes[0];
    let recipeTitle = myRecipe.title;
    let recipeId = myRecipe.id;

    const renderRecipeInfo = (recipeData) => {
      let ingredients = recipeData.extendedIngredients;
      let recipeImage = recipeData.image;
      let recipeInstructions = recipeData.instructions || "";
      let readyInMinutes = recipeData.readyInMinutes;
      let cuisine = recipeData.cuisines;

      recipeInstructions = recipeInstructions.replace(/\.\s/g, '.<br/>');

      if (ingredients && recipeImage) {
        let ingredientsList = ingredients.map(i => `<li>${i.original}</li>`).join('');

        result.innerHTML = `
          <div class="recipe-details">
            <img src="${recipeImage}" alt="${recipeTitle}">
            <h1>${recipeTitle}</h1>
            <h5>(Ready in ${readyInMinutes} Minutes)</h5>
            ${cuisine && cuisine.length ? `<p>Cuisine: ${cuisine.join(", ")}</p>` : ""}
          </div>
          <div id="recipe-ingredients">
            <h3>Recipe Ingredients:</h3>
            <ul>${ingredientsList}</ul>
          </div>
          <div id="recipe-instructions" style="display: none;">
            <h3>Recipe Instructions:</h3>
            <p>${recipeInstructions}</p>
          </div>
          <button id="show-recipe">View Recipe</button>
          <button id="hide-recipe" style="display: none;">Hide Recipe</button>
        `;

        let showRecipe = document.getElementById("show-recipe");
        let hideRecipe = document.getElementById("hide-recipe");
        let recipeIngredients = document.getElementById("recipe-ingredients");
        let recipeInstructionsDiv = document.getElementById("recipe-instructions");

        showRecipe.addEventListener("click", () => {
          recipeInstructionsDiv.style.display = "block";
          recipeIngredients.style.display = "none";
          showRecipe.style.display = "none";
          hideRecipe.style.display = "inline-block";
        });

        hideRecipe.addEventListener("click", () => {
          recipeInstructionsDiv.style.display = "none";
          recipeIngredients.style.display = "block";
          showRecipe.style.display = "inline-block";
          hideRecipe.style.display = "none";
        });
      } else {
        result.innerHTML = `<h3>No detailed recipe information available for '${recipeTitle}'</h3>`;
      }
    };

    fetch(`/api/recipe/${recipeId}`)
      .then(res => res.json())
      .then(renderRecipeInfo)
      .catch(() => {
        result.innerHTML = `<h3>Error fetching recipe information</h3>`;
      });
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
