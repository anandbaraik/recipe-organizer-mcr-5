import React, {useState} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useRecipe } from '../context/RecipeContext';
const RecipeCard = ({recipe}) => {
    const {id, name, ingredients, instructions, cuisine, image} = recipe;
    const {deleteReciepe} = useRecipe();
    const navigate = useNavigate();
    const deleteHandler = () => {
        deleteReciepe(id);
    }
  return (
    <Card className='card-width cursor-pointer' sx={{width : 398,  maxWidth: 400 }}>
      <CardMedia
        component="img"
        alt={name}
        height="140"
        image={image || 'https://www.saltandlavender.com/wp-content/uploads/2020/04/tomato-goat-cheese-pasta-recipe-1.jpg'}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography className='spacer' gutterBottom variant="p" component="p">
          <span>
          Cuisine Type
          </span>
          <span>
          {cuisine}
          </span>
        </Typography>
        <Typography className='spacer cursor-pointer' gutterBottom variant="p" component="p" onClick={() => {navigate(`/recipe-details/${id}`)}}>
            <span>
            Ingredients
            </span>
            <span>
            See reciepe {'>'}
            </span>
        </Typography>
        <Typography className='spacer cursor-pointer' gutterBottom variant="p" component="p" onClick={() => {navigate(`/recipe-details/${id}`)}}>
            <span>
            Instructions
            </span>
            <span>
            See reciepe {'>'}
            </span>
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" onClick={deleteHandler}>
            Delete
        </Button>
      </CardActions>
    </Card>
  )
}

export default RecipeCard