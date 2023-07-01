import React from 'react'
import { useRecipe } from '../context/RecipeContext';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
const RecipeDetails = () => {
    const {recipeList}  = useRecipe();
  return (
    <div className='home'>
        <section className='home-section'>
            <div className="action">
            <Button variant="contained">
                <Link to="/" className='btn-link'>Go back</Link>
            </Button>
            </div>
            <div className='container'>

            </div>
        </section>
    </div>
  )
}

export default RecipeDetails