import { createContext, useContext, useState } from "react";
import { recipes } from "../data/recipes";
import { useEffect } from "react";
const RecipeContext = createContext({
  recipeList: [],
  setRecipeList: () => {},
  deleteReciepe : () => {},
  addReciepe: () => {},
  updateReciepe: () => {}
});

export const RecipeProvider = ({ children }) => {

  const [recipeList, setRecipeList] = useState(() => {
    const storedRecipes = localStorage.getItem('recipes');
    return storedRecipes ? JSON.parse(storedRecipes) : recipes;
  });

  const deleteReciepe = (reciepeId) => {
    const reciepes =  recipeList.filter(({id}) => id != reciepeId);
    localStorage.setItem('recipes', JSON.stringify(reciepes));
    setRecipeList(reciepes);
  }
  const addReciepe = (data) => {
    data = {...data, id:Math.floor(Math.random() * 100000)};
    const reciepes = [...recipeList, data];
    localStorage.setItem('recipes', JSON.stringify(reciepes));
    setRecipeList(reciepes);
  }

  const updateReciepe = (data) => {
    const reciepes =  [...recipeList].map((recipe) => {
      if(data.id === recipe.id) {
          return {...data};
      }
      return recipe;
  });
  localStorage.setItem('recipes', JSON.stringify(reciepes));
  setRecipeList(reciepes);
  }
  return (
    <RecipeContext.Provider
      value={{
        recipeList,
        setRecipeList,
        deleteReciepe,
        addReciepe,
        updateReciepe
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipe = () => useContext(RecipeContext);