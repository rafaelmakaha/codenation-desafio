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
    this.onChangeSearch = this.onChangeSearch.bind(this);
  }

  onChangeSearch(event){
    this.setState({searchString: event});
    console.log(event);
  }

  render() { 
    const recipes = this.state.recipes.results;
    let searchString = this.state.searchString;
    return (
      <div className="App">
        <Navbar onChange={this.onChangeSearch}/>
        <div className="container mt-10">
          <div className="row">
          {recipes.map( (item) => {
            if(searchString.length == 0 || item.title.includes(searchString) || item.ingredients.includes(searchString)){
              return(
              <RecipeItem 
                title={item.title}
                ingredients={item.ingredients}
                href={item.href}
                thumbnail={item.thumbnail}
              />
              );
            }
          })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
