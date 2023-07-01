import React, {useState} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useRecipe } from '../context/RecipeContext';

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

const RecipeCard = ({recipe}) => {
    const {id, name, ingredients, instructions, cuisine, image} = recipe;
    const {deleteReciepe, updateReciepe} = useRecipe();
    const navigate = useNavigate();
    const [editRecipe, setEditrecipe] = useState({});
    const [open, setModelOpen] = useState(false);
    const deleteHandler = () => {
        deleteReciepe(id);
    }

    const handleModalClose = () => {
      setModelOpen(false);
  };
  const editHandler = () => {
      setEditrecipe({
          id : id,
          name: name,
          ingredients: ingredients,
          instructions: instructions,
          cuisine : cuisine,
          image: image
      })
      setModelOpen(true);
  }

  const handleUpdate = (e) => {
      e.preventDefault();
      if(editRecipe.name || editRecipe.ingredients || editRecipe.instructions || editRecipe.cuisine) {
          updateReciepe(editRecipe);
          setModelOpen(false);
      }
  }

  return (
    <>
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
        <Button variant="outlined" onClick={editHandler}>
            Edit
        </Button>
      </CardActions>
    </Card>
    <Modal
    open={open}
    onClose={handleModalClose}
  >
    <Box sx={style}
        component="form">
        <h3> Add recipe</h3>
        <div style={{marginTop:"1rem", display:"flex", flexDirection:"column", gap:"1rem"}}>
            <TextField id="outlined-basic" label="Name" variant="outlined"
            value={editRecipe.name}
            onChange={(e) => {setEditrecipe((prev) => ({...prev, name: e.target.value}))}} required={true}/>

            <TextField id="outlined-basic" label="Ingredients" variant="outlined"
            value={editRecipe.ingredients}
            onChange={(e) => {setEditrecipe((prev) => ({...prev, ingredients: e.target.value}))}} required={true}/>

            <TextField id="outlined-basic" label="Instructions" variant="outlined"
            value={editRecipe.instructions} multiline rows={3}
            onChange={(e) => {setEditrecipe((prev) => ({...prev, instructions: e.target.value}))}} required={true}/>

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel >Cuisine</InputLabel>
                <Select
                    label="Cuisine"
                    value={editRecipe.cuisine}
                    onChange={(e) => {setEditrecipe((prev) => ({...prev, cuisine: e.target.value}))}}
                    required={true}
                >
                    <MenuItem value={'Indian'}>Indian</MenuItem>
                    <MenuItem value={'American'}>American</MenuItem>
                    <MenuItem value={'Italian'}>Italian</MenuItem>
                </Select>
            </FormControl>

            <TextField id="outlined-basic" label="Image Link" variant="outlined"
            value={editRecipe.image}
            onChange={(e) => {setEditrecipe((prev) => ({...prev, image: e.target.value}))}}/>

        </div>
        <div style={{marginTop:"1rem", display:"flex", gap:"1rem"}}>
            <Button size="small" variant="outlined" onClick={handleModalClose}>Close</Button>
            <Button size="small" type='submit' variant="contained" onClick={handleUpdate}>Update</Button>
        </div>
    </Box>
  </Modal>
    </>
  )
}

export default RecipeCard