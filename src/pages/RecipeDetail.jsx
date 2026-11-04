import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// const dummyRecipe = {
//   id: 1,
//   name: 'Margherita Pizza',
//   image: '/images/recipe-1.svg',
//   cuisine: 'Italian',
//   difficulty: 'Easy',
//   rating: 4.8,
//   reviewCount: 42,
//   prepTimeMinutes: 20,
//   cookTimeMinutes: 15,
//   servings: 4,
//   caloriesPerServing: 280,
//   tags: ['Pizza', 'Italian', 'Vegetarian'],
//   mealType: ['Dinner', 'Lunch'],
//   ingredients: [
//     'Pizza dough',
//     'Fresh mozzarella cheese',
//     'Tomato sauce',
//     'Fresh basil leaves',
//     'Extra virgin olive oil',
//     'Salt and black pepper',
//   ],
//   instructions: [
//     'Preheat the oven to 450 degrees F (230 degrees C).',
//     'Roll out the pizza dough on a lightly floured surface.',
//     'Spread the tomato sauce evenly over the dough.',
//     'Top with sliced fresh mozzarella and fresh basil leaves.',
//     'Drizzle with olive oil and season with salt and pepper.',
//     'Bake for 12 to 15 minutes until the crust is golden and cheese is bubbly.',
//     'Slice and serve warm.',
//   ],
// };

function RecipeDetail() {
  const [recipe, setRecipe] = useState({})
  const { id } = useParams();
  const [isLoading, setIsloading] = useState(true);


  async function fetchRecipe(params) {
    try {
      const response = await fetch(`https://dummyjson.com/recipes/${id}`)
      const recipe = await response.json();
      setRecipe(recipe)

    } catch (error) {

    }
    setIsloading(false);
  }

  useEffect(() => {
    fetchRecipe()
  }, [])

  if (isLoading) {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center gap-5 px-4 bg-[#faf7f2]">
      <div className="w-12 h-12 border-[5px] border-[#e8d8c3] border-t-[#795548] rounded-full animate-spin"></div>

      <p className="text-[#795548] text-base sm:text-lg md:text-xl font-semibold tracking-wide text-center">
        Preparing delicious recipes...
      </p>

      <span className="text-[#9a7966] text-sm text-center">
        Please wait a moment
      </span>
    </div>
  );
}

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      { }
      <Link to={"/"} className="text-accent hover:underline inline-flex items-center gap-1 mb-6">
        <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to Home
      </Link>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full md:w-1/2 h-80 object-cover rounded-md border border-border"
        />
        <div className="md:w-1/2 flex flex-col justify-center">
          <h1 className="font-serif text-3xl font-bold text-text mb-2">{recipe.name}</h1>
          <p className="text-muted mb-4">{recipe.cuisine} - {recipe.difficulty}</p>
          <div className="flex items-center gap-1 mb-4 font-medium">
            <svg className="w-4 h-4 fill-accent" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span>{recipe.rating} ({recipe.reviewCount} reviews)</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm border-t border-border pt-4 mb-4">
            <p><strong>Prep time:</strong> {recipe.prepTimeMinutes} mins</p>
            <p><strong>Cook time:</strong> {recipe.cookTimeMinutes} mins</p>
            <p><strong>Servings:</strong> {recipe.servings}</p>
            <p><strong>Calories:</strong> {recipe.caloriesPerServing} kcal</p>
          </div>
          <p className="text-sm text-muted mb-1">
            <strong>Meal Type:</strong> {recipe?.mealType?.join(', ')}
          </p>
          <p className="text-sm text-muted">
            <strong>Tags:</strong> {recipe?.tags?.join(', ')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border pt-8">
        <div>
          <h2 className="font-serif text-xl font-bold mb-4">Ingredients</h2>
          <ul className="list-disc pl-5 space-y-1">
            {recipe?.ingredients?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-xl font-bold mb-4">Instructions</h2>
          <ol className="list-decimal pl-5 space-y-2">
            {recipe?.instructions?.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </main>
  );
}

export default RecipeDetail;
