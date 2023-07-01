import React from 'react'
import { useRecipe } from '../context/RecipeContext';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Link, useParams } from 'react-router-dom';
const RecipeDetails = () => {
    const {recipeList}  = useRecipe();
    const {id} = useParams();
    const recipe = recipeList?.find((recipe) => recipe.id == id);
  return (
    <div className='home'>
        <section className='home-section'>
            <div className="action">
                <Link to="/">
                  <Button variant="contained">
                    Go back  to recipe list
                  </Button>
                </Link>
            </div>
            <div className='container'>
				<h1>
					{recipe?.name}
				</h1>
			<Card sx={{ display: 'flex' }}>
				<CardMedia
					component="img"
					sx={{ width: 151 }}
					image={recipe?.image || 'https://www.saltandlavender.com/wp-content/uploads/2020/04/tomato-goat-cheese-pasta-recipe-1.jpg'}
					alt={recipe?.name}
				/>
				<Box sx={{ display: 'flex', flexDirection: 'column' }}>
					<CardContent sx={{ display: 'flex', flexDirection: 'column', flex: '1 0 auto', justifyContent: 'start' }}>
						<Typography component="h1" variant="h4">
							Cuisine : {recipe?.cuisine}
						</Typography>
						<Typography  gutterBottom variant="div" component="div" x={{ display: 'flex', justifyContent: 'start' }}>
							<strong>
								Ingredients : {' '}
							</strong>
							{recipe?.ingredients}
						</Typography>
						<Typography  gutterBottom variant="p" component="p">
							<strong>
								Instructions :
							</strong>
						</Typography>
						<Typography  gutterBottom variant="p" component="p">
							{recipe?.instructions}
						</Typography>
					</CardContent>
				</Box>
				</Card>
            </div>
        </section>
    </div>
  )
}

export default RecipeDetails