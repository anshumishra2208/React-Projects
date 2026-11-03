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
  const [recipes,setRecipies] = useState([])
  const [total,setTotal] = useState(0);
  const [isLoading,setIsloading] = useState(true);
  
  async function fetchRecipes(skipCount,query) {

    try {
      let url = `https://dummyjson.com/recipes?limit=9&skip=${skipCount}`

      if(query){
        url = `https://dummyjson.com/recipes/search?limit=9&skip=${skipCount}&q=${query}`
      }

      const response = await fetch(url);
      const data = await response.json();
      setRecipies((prev)=> skipCount===0 ? data.recipes : [...prev,...data.recipes]);
      setTotal(data.total)
      
    } catch (error) {
      
    }
    setIsloading(false)

  }

  function handleSearch(e){
    e.preventDefault();
    let formData = new FormData(e.target);
    let query = formData.get("query");
    console.log(query);
    fetchRecipes(0,query);

  }

  useEffect(()=>{
    fetchRecipes(0);
  },[])

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
      
      <form className="flex gap-2 max-w-md mx-auto mb-8" onSubmit={handleSearch}>
        <input
        
          type="text"
          name='query'
          placeholder="Search recipes..."
          className="flex-1 border border-border rounded px-3 py-2 bg-card text-text outline-none focus:border-accent"
        />
        <button type="submit"  className="bg-accent hover:bg-accent-hover text-white rounded px-4 py-2 font-medium">
          Search
        </button>
      </form>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      { recipes.length < total && <div className="text-center mt-8">
        <button
          type="button" onClick={()=>{
            fetchRecipes(recipes.length)
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
