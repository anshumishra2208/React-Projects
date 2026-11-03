import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';

// const recipes = [
//   {
//     id: 1,
//     name: 'Margherita Pizza',
//     image: '/images/recipe-1.svg',
//     cuisine: 'Italian',
//     difficulty: 'Easy',
//     rating: 4.8,
//     prepTimeMinutes: 20,
//     cookTimeMinutes: 15,
//   },
//   {
//     id: 2,
//     name: 'Vegetable Stir-Fry',
//     image: '/images/recipe-2.svg',
//     cuisine: 'Asian',
//     difficulty: 'Easy',
//     rating: 4.6,
//     prepTimeMinutes: 15,
//     cookTimeMinutes: 10,
//   },
//   {
//     id: 3,
//     name: 'Chocolate Chip Cookies',
//     image: '/images/recipe-3.svg',
//     cuisine: 'American',
//     difficulty: 'Medium',
//     rating: 4.9,
//     prepTimeMinutes: 15,
//     cookTimeMinutes: 12,
//   },
//   {
//     id: 4,
//     name: 'Chicken Alfredo Pasta',
//     image: '/images/recipe-4.svg',
//     cuisine: 'Italian',
//     difficulty: 'Medium',
//     rating: 4.7,
//     prepTimeMinutes: 15,
//     cookTimeMinutes: 20,
//   },
//   {
//     id: 5,
//     name: 'Mango Lassi',
//     image: '/images/recipe-5.svg',
//     cuisine: 'Indian',
//     difficulty: 'Easy',
//     rating: 4.9,
//     prepTimeMinutes: 10,
//     cookTimeMinutes: 0,
//   },
//   {
//     id: 6,
//     name: 'Caprese Salad',
//     image: '/images/recipe-6.svg',
//     cuisine: 'Italian',
//     difficulty: 'Easy',
//     rating: 4.5,
//     prepTimeMinutes: 10,
//     cookTimeMinutes: 0,
//   },
// ];

function Home() {
  const [recipes, setRecipies] = useState([])
  const [total, setTotal] = useState(0);
  const [isLoading, setIsloading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  async function fetchRecipes(skipCount, query) {

    try {
      let url = `https://dummyjson.com/recipes?limit=9&skip=${skipCount}`

      if (query) {
        url = `https://dummyjson.com/recipes/search?limit=3&skip=${skipCount}&q=${query}`
      }

      const response = await fetch(url);
      const data = await response.json();
      setRecipies((prev) => skipCount === 0 ? data.recipes : [...prev, ...data.recipes]);
      setTotal(data.total);

    } catch (error) {

    }
    setIsloading(false)

  }

  function handleSearch(e) {
    setIsloading(true);
    e.preventDefault();
    let formData = new FormData(e.target);
    let query = formData.get("query").trim();
    setSearchQuery(query)
    fetchRecipes(0, query);

  }

  useEffect(() => {
    fetchRecipes(0);
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

if (!isLoading && recipes.length === 0) {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">

      {/* Search Form */}
      <form
        className="flex gap-2 max-w-md mx-auto mb-8"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          name="query"
          placeholder="Search recipes..."
          className="flex-1 border border-border rounded px-3 py-2 bg-card text-text outline-none focus:border-accent"
        />

        <button
          type="submit"
          className="bg-accent hover:bg-accent-hover text-white rounded px-4 py-2 font-medium"
        >
          Search
        </button>
      </form>

      {/* No Recipes Found */}
      <div className="min-h-[65vh] flex flex-col justify-center items-center text-center px-4 py-10 bg-[#faf7f2] rounded-xl">

        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#f3e8dc] flex items-center justify-center mb-6">
          <span className="text-4xl sm:text-5xl">🍽️</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#795548] mb-3">
          No Recipes Found!
        </h2>

        <p className="text-[#9a7966] text-base sm:text-lg max-w-md leading-relaxed">
          Sorry, we couldn't find any recipes for{" "}
          <span className="font-bold text-[#795548]">
            "{searchQuery}"
          </span>.
        </p>

        <p className="text-sm text-[#a1887f] mt-3">
          Try searching with a different recipe name.
        </p>

      </div>

    </main>
  );
}

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">

      <form className="flex gap-2 max-w-md mx-auto mb-8" onSubmit={handleSearch}>
        <input

          type="text"
          name='query'
          placeholder="Search recipes..."
          className="flex-1 border border-border rounded px-3 py-2 bg-card text-text outline-none focus:border-accent"
        />
        <button type="submit" className="bg-accent hover:bg-accent-hover text-white rounded px-4 py-2 font-medium">
          Search
        </button>
      </form>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {recipes.length < total && <div className="text-center mt-8">
        <button
          type="button" onClick={() => {
            fetchRecipes(recipes.length, searchQuery)
          }}
          className="bg-accent hover:bg-accent-hover text-white rounded px-6 py-2 font-medium"
        >
          Load More
        </button>
      </div>}


    </main>
  );
}

export default Home;
