import { createContext, useContext, useState } from "react";
import { recipes } from "../data/recipes";
const RecipeContext = createContext({
  recipeList: [],
  setRecipeList: () => {}
});

export const RecipeProvider = ({ children }) => {

  const [recipeList, setRecipeList] = useState(recipes);
  return (
    <RecipeContext.Provider
      value={{
        recipeList,
        setRecipeList
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipe = () => useContext(RecipeContext);