import React, {useState} from 'react'
import { useRecipe } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';
import { Link } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80vw',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Home = () => {
    const {recipeList, setRecipeList}  = useRecipe();



  return (
    <div className='home'>
        <section className='home-section'>

            <div className='container'>
                {
                    (recipeList?.length > 0) ? (
                        recipeList?.map((recipe) => {
                            return <RecipeCard recipe={recipe} key={recipe.id}/>
                        })
                    ) : (
                        <h3>Add some recipe</h3>
                    )
                }
            </div>
        </section>

    </div>
  )
}

export default Home