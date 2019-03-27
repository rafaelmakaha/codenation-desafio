import React, { Component } from 'react';
import Navbar from './Navbar'
import RecipeItem from './RecipeItem'
import recipes from '../sample_data/recipes.json'

class App extends Component {
  constructor(props) {
    super(props);

    this.recipes = recipes.results;
    this.state = {
      searchString: '',
      recipes,
    };
  }

  render() { 
    const recipes = this.state.recipes.results;
    return (
      <div className="App">
        <Navbar />
        <div className="container mt-10">
          <div className="row">
          {recipes.map( (item) => {
            return(
            <RecipeItem 
              title={item.title}
              ingredients={item.ingredients}
              href={item.href}
              thumbnail={item.thumbnail}
            />
            );
          })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
