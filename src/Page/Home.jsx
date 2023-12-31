import React, {useState} from 'react'
import { useRecipe } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

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
    const {recipeList, addReciepe}  = useRecipe();
    const [recipe, setRecipe] = useState({});
    const [searchText, setSearchText] = useState("");
    const [filter, setFilter] = useState("name");
    const [open, setModelOpen] = useState(false);

    const searchSuggestions = recipeList?.filter(({name, ingredients, cuisine}) => {
            if(filter === 'name') {
                return name?.toLowerCase()?.includes(searchText.toLowerCase());
            }

            if(filter === 'ingredients') {
                return ingredients?.toLowerCase()?.includes(searchText.toLowerCase());
            }

            if(filter === 'cuisine') {
                return cuisine?.toLowerCase()?.includes(searchText.toLowerCase());
            }
        });

    const handleModalClose = () => {
        setModelOpen(false);
    };
    const adddRecipeHandle = () => {
        setRecipe({
            id : "",
            name: "",
            ingredients: "",
            instructions: "",
            cuisine : "",
            image: ""
        })
        setModelOpen(true);
    }

    const handleSave = (e) => {
        e.preventDefault();
        if(recipe.name || recipe.ingredients || recipe.instructions || recipe.cuisine) {
            addReciepe(recipe);
            setModelOpen(false);
            setRecipe({
                id : "",
                name: "",
                ingredients: "",
                instructions: "",
                cuisine : "",
                image: ""
            })
        }
    }

  return (
    <div className='home'>
        <section className='home-section'>
            <div className="action">
                <TextField
                    id="outlined-required"
                    label="Search the items you want"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <strong>
                    Filters:
                </strong>
                <FormControl>
                    <RadioGroup
                        row
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel checked={filter === "name"} value="name" control={<Radio />} label="Name" onChange={(e) => setFilter(e.target.value)}/>
                        <FormControlLabel checked={filter === "ingredients"} value="ingredients" control={<Radio />} label="Ingredients" onChange={(e) => setFilter(e.target.value)}/>
                        <FormControlLabel checked={filter === "cuisine"} value="cuisine" control={<Radio />} label="Cuisine" onChange={(e) => setFilter(e.target.value)}/>
                    </RadioGroup>
                </FormControl>
            </div>
            <div className='container'>
                <div>
                    <h2>
                        All recipies :
                    </h2>
                </div>
                <div className='recipies'>
                    {
                        (searchSuggestions?.length > 0) && (
                            searchSuggestions?.map((recipe) => {
                                return <RecipeCard recipe={recipe} key={recipe.id}/>
                            })
                        )
                    }

                    <div className='cursor-pointer btn-content' onClick={adddRecipeHandle}>
                        <svg width={'5rem'} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#1d1b1b"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Add_Plus_Circle"> <path id="Vector" d="M8 12H12M12 12H16M12 12V16M12 12V8M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" stroke="#929090" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
                    </div>
                </div>
            </div>
        </section>
        <Modal
        open={open}
        onClose={handleModalClose}
      >
        <Box sx={style}
            component="form">
            <h3> Add recipe</h3>
            <div style={{marginTop:"1rem", display:"flex", flexDirection:"column", gap:"1rem"}}>
                <TextField id="outlined-basic" label="Name" variant="outlined"
                value={recipe.name}
                onChange={(e) => {setRecipe((prev) => ({...prev, name: e.target.value}))}} required={true}/>

                <TextField id="outlined-basic" label="Ingredients" variant="outlined"
                value={recipe.ingredients}
                onChange={(e) => {setRecipe((prev) => ({...prev, ingredients: e.target.value}))}} required={true}/>

                <TextField id="outlined-basic" label="Instructions" variant="outlined"
                value={recipe.instructions} multiline rows={3}
                onChange={(e) => {setRecipe((prev) => ({...prev, instructions: e.target.value}))}} required={true}/>

                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel >Cuisine</InputLabel>
                    <Select
                        label="Cuisine"
                        value={recipe.cuisine}
                        onChange={(e) => {setRecipe((prev) => ({...prev, cuisine: e.target.value}))}}
                        required={true}
                    >
                        <MenuItem value={'Indian'}>Indian</MenuItem>
                        <MenuItem value={'American'}>American</MenuItem>
                        <MenuItem value={'Italian'}>Italian</MenuItem>
                    </Select>
                </FormControl>

                <TextField id="outlined-basic" label="Image Link" variant="outlined"
                value={recipe.image}
                onChange={(e) => {setRecipe((prev) => ({...prev, image: e.target.value}))}}/>

            </div>
            <div style={{marginTop:"1rem", display:"flex", gap:"1rem"}}>
                <Button size="small" variant="outlined" onClick={handleModalClose}>Close</Button>
                <Button size="small" type='submit' variant="contained" onClick={handleSave}>Save</Button>
            </div>
        </Box>
      </Modal>
    </div>
  )
}

export default Home