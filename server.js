require('dotenv').config();
const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const port = 3000;

const apiKey = process.env.API_KEY;

app.use(express.static('public')); 

app.get('/api/search', async (req, res) => {
  const ingredients = req.query.ingredients;
  if (!ingredients) return res.status(400).json({error: "Missing ingredients param"});

  try {
    const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${encodeURIComponent(ingredients)}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({error: "Failed to fetch recipes"});
  }
});

app.get('/api/recipe/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&includeNutrition=false`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({error: "Failed to fetch recipe details"});
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
