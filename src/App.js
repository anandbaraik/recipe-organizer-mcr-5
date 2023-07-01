import "./styles.css";
import { Route, Routes } from 'react-router-dom';
import Home from "./Page/Home";
import RecipeDetails from "./Page/RecipeDetails";
export default function App() {
  return (
  <div className="App">
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/recipe-details/:id" element={<RecipeDetails/>}/>
    </Routes>
  </div>
);
}